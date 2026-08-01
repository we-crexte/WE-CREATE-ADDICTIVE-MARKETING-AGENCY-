import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar");
provider.addScope("https://www.googleapis.com/auth/gmail.send");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get access token from Google Auth");
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Google Sign In Error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string) => {
  cachedAccessToken = token;
};

export interface BookingDetails {
  clientName: string;
  clientEmail: string;
  businessName: string;
  budget: string;
  dateStr: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  notes: string;
  ownerEmail?: string;
}

// Convert date string + time slot string to ISO and compact date format
export function parseSlotToDateTimes(dateStr: string, timeSlot: string): { startISO: string; endISO: string; startCompact: string; endCompact: string; formattedDisplay: string } {
  const [timePart, modifier] = timeSlot.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const [year, month, day] = dateStr.split("-").map(Number);
  
  const startDate = new Date(year, month - 1, day, hours, minutes, 0);
  const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);

  const toCompact = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const formattedDisplay = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }) + ` at ${timeSlot}`;

  return {
    startISO: startDate.toISOString(),
    endISO: endDate.toISOString(),
    startCompact: toCompact(startDate),
    endCompact: toCompact(endDate),
    formattedDisplay,
  };
}

// Create Google Calendar event with Google Meet link
export async function createGoogleMeetEvent(
  accessToken: string,
  booking: BookingDetails
): Promise<{ eventId: string; meetLink: string; calendarLink: string }> {
  const { startISO, endISO, formattedDisplay } = parseSlotToDateTimes(booking.dateStr, booking.timeSlot);
  
  const summary = `⚡ Strategy Call: Addictive Marketing x ${booking.clientName}`;
  const description = `Strategy Call booked via Addictive Marketing Website.\n\n` +
    `👤 Client: ${booking.clientName}\n` +
    `📧 Email: ${booking.clientEmail}\n` +
    `💼 Business: ${booking.businessName || "N/A"}\n` +
    `💰 Monthly Budget: ${booking.budget}\n` +
    `📅 Time Slot: ${formattedDisplay}\n\n` +
    `📝 Notes / Goals:\n${booking.notes || "No extra context provided."}`;

  const attendees = [
    { email: booking.clientEmail, displayName: booking.clientName },
  ];

  if (booking.ownerEmail && booking.ownerEmail !== booking.clientEmail) {
    attendees.push({ email: booking.ownerEmail, displayName: "Agency Owner" });
  }

  const eventPayload = {
    summary,
    description,
    start: { dateTime: startISO },
    end: { dateTime: endISO },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 15 },
      ],
    },
  };

  // sendUpdates=all forces Google Calendar to send email invitations to all attendees
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventPayload),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error("Google Calendar API Error:", errText);
    throw new Error(`Calendar API returned ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const meetLink = data.hangoutLink || data.conferenceData?.entryPoints?.[0]?.uri || "https://meet.google.com";
  const calendarLink = data.htmlLink || "https://calendar.google.com";

  return {
    eventId: data.id,
    meetLink,
    calendarLink,
  };
}

// Send Email via Gmail API using clean UTF-8 TextEncoder base64url encoding
export async function sendGmailNotification(
  accessToken: string,
  toEmail: string,
  subject: string,
  htmlContent: string
) {
  const emailString = [
    `To: ${toEmail}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    htmlContent,
  ].join("\r\n");

  const utf8Bytes = new TextEncoder().encode(emailString);
  let binary = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }

  const rawEmail = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: rawEmail }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gmail API Error:", errText);
    throw new Error(`Gmail API returned ${response.status}: ${errText}`);
  }

  return response.json();
}

// Full workflow orchestrator
export async function scheduleAndNotifyCall(
  accessToken: string | null,
  booking: BookingDetails,
  currentUserEmail?: string | null
) {
  const { formattedDisplay } = parseSlotToDateTimes(booking.dateStr, booking.timeSlot);
  const ownerEmail = currentUserEmail || booking.ownerEmail || "samworks1097@gmail.com";
  booking.ownerEmail = ownerEmail;

  let meetLink = "";
  let calendarLink = "";
  let eventCreated = false;

  // 1. Create Google Meet Event if Token is available
  if (accessToken) {
    try {
      const eventResult = await createGoogleMeetEvent(accessToken, booking);
      meetLink = eventResult.meetLink;
      calendarLink = eventResult.calendarLink;
      eventCreated = true;
    } catch (err) {
      console.warn("Failed to create Google Meet event via API, generating fallback link:", err);
    }
  }

  // Fallback Google Meet link generator if no API token or API call failed
  if (!meetLink) {
    // Google Meet requires valid meeting URLs. "https://meet.google.com/new" opens a fresh valid room.
    meetLink = "https://meet.google.com/new";
  }

  if (!calendarLink) {
    const { startCompact, endCompact } = parseSlotToDateTimes(booking.dateStr, booking.timeSlot);
    const calSummary = encodeURIComponent(`⚡ Strategy Call: Addictive Marketing x ${booking.clientName}`);
    const calDetails = encodeURIComponent(`Strategy Call with Addictive Marketing.\nClient: ${booking.clientName}\nEmail: ${booking.clientEmail}\nBudget: ${booking.budget}\nNotes: ${booking.notes || "None"}`);
    calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calSummary}&dates=${startCompact}/${endCompact}&details=${calDetails}&add=${encodeURIComponent(booking.clientEmail)}`;
  }

  // 2. Send Email Notifications via Gmail API if token available
  let emailSentToClient = false;
  let emailSentToOwner = false;

  if (accessToken) {
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #333;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #10b981; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Addictive Marketing</h1>
          <p style="color: #888888; font-size: 12px; margin-top: 4px;">Strategy Call Scheduled</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; color: #e5e5e5;">
          Hi <strong>${booking.clientName}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #cccccc;">
          Your 1-on-1 strategy call with <strong>Addictive Marketing</strong> has been officially confirmed! We look forward to scaling your content and brand.
        </p>

        <div style="background: #141414; border: 1px solid #262626; padding: 20px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">📅 <strong>Date & Time:</strong> <span style="color: #ffffff;">${formattedDisplay}</span></p>
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">💼 <strong>Business:</strong> <span style="color: #ffffff;">${booking.businessName || "N/A"}</span></p>
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">💰 <strong>Monthly Budget:</strong> <span style="color: #ffffff;">${booking.budget}</span></p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${meetLink}" target="_blank" style="background: linear-gradient(135deg, #10b981, #0d9488); color: #000000; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
            Join Google Meet Meeting 🚀
          </a>
        </div>

        ${calendarLink ? `<p style="text-align: center; font-size: 12px;"><a href="${calendarLink}" target="_blank" style="color: #10b981;">View on Google Calendar</a></p>` : ""}

        <hr style="border: 0; border-top: 1px solid #262626; margin: 30px 0;" />
        <p style="font-size: 11px; color: #666666; text-align: center;">
          Addictive Marketing Agency • Growth & Short-Form Video Scaling
        </p>
      </div>
    `;

    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #333;">
        <h2 style="color: #10b981; margin-top: 0;">⚡ New Strategy Call Booked!</h2>
        <p style="font-size: 14px; color: #e5e5e5;">A new prospect has scheduled a strategy call on your calendar.</p>
        
        <div style="background: #141414; border: 1px solid #262626; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">👤 <strong>Client Name:</strong> <span style="color: #ffffff;">${booking.clientName}</span></p>
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">📧 <strong>Email:</strong> <a href="mailto:${booking.clientEmail}" style="color: #10b981;">${booking.clientEmail}</a></p>
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">💼 <strong>Business / IG:</strong> <span style="color: #ffffff;">${booking.businessName || "N/A"}</span></p>
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">💰 <strong>Monthly Budget:</strong> <span style="color: #ffffff;">${booking.budget}</span></p>
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">🕒 <strong>Scheduled Time:</strong> <span style="color: #ffffff;">${formattedDisplay}</span></p>
          <p style="margin: 6px 0; font-size: 13px; color: #a3a3a3;">📝 <strong>Notes:</strong> <span style="color: #ffffff;">${booking.notes || "None"}</span></p>
        </div>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${meetLink}" target="_blank" style="background: #ffffff; color: #000000; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 6px; display: inline-block;">
            Open Google Meet Link
          </a>
        </div>
      </div>
    `;

    try {
      await sendGmailNotification(accessToken, booking.clientEmail, `Strategy Call Confirmed! 🚀 - Addictive Marketing`, clientEmailHtml);
      emailSentToClient = true;
    } catch (e) {
      console.warn("Could not send client email via Gmail API:", e);
    }

    try {
      await sendGmailNotification(accessToken, ownerEmail, `⚡ New Strategy Call Scheduled with ${booking.clientName}`, ownerEmailHtml);
      emailSentToOwner = true;
    } catch (e) {
      console.warn("Could not send owner email via Gmail API:", e);
    }
  }

  // 3. Save booking to Firestore database
  try {
    await addDoc(collection(db, "bookings"), {
      ...booking,
      meetLink,
      calendarLink,
      formattedDisplay,
      eventCreated,
      emailSentToClient,
      emailSentToOwner,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Firestore lead save note:", err);
  }

  return {
    meetLink,
    calendarLink,
    formattedDisplay,
    eventCreated,
    emailSentToClient,
    emailSentToOwner,
  };
}
