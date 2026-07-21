// types.ts for Addictive Marketing Agency Website

import aeNotificationMockup from "./assets/images/after_effects_thumb.jpg";
import buriedVideosMockup from "./assets/images/buried_thumb.jpg";
import iosConceptMockup from "./assets/images/ios_video_thumb.jpg";
import shopifyScaleMockup from "./assets/images/prosper_thumb.jpg";
import agencySystemMockup from "./assets/images/agency_blueprint_thumb.jpg";
import ishowspeedJourneyMockup from "./assets/images/ishowspeed_thumb.jpg";

import ytLcmThumb from "./assets/images/yt_LCMDoXDFlcE_max.jpg";
import ytUzulThumb from "./assets/images/yt_UzULROh6Q9w_max.jpg";
import ytUcrpThumb from "./assets/images/yt_UcRpReM5kaI_max.jpg";
import ytW1hwThumb from "./assets/images/yt_W1HW8nDduQM_max.jpg";
import ytJtvuThumb from "./assets/images/yt_JtvUQB0ThAA_max.jpg";
import ytTpmfThumb from "./assets/images/yt_tPMf7wX2IKQ_max.jpg";
import ytJh6jThumb from "./assets/images/yt_jH6JHr0QHgg_max.jpg";
import ytXqkaThumb from "./assets/images/yt_xqkas8YGtN8_max.jpg";
import yt04vvThumb from "./assets/images/yt_04vvERVKV6g_max.jpg";

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  beforeStats: string;
  afterStats: string;
  growthMetric: string;
  revenueImpact: string;
  description: string;
  accentColor: string;
  chartData: { name: string; value: number }[];
}

export interface WorkItem {
  id: string;
  title: string;
  category: "shorts" | "reels" | "youtube" | "ads" | "campaigns";
  thumbnail: string;
  videoUrl?: string; // Simulator / mockup video source or custom rich presentation
  description: string;
  metrics: string;
}

export interface ChatMessage {
  sender: "client" | "me";
  text: string;
  time?: string;
  isAttachment?: boolean;
  attachmentName?: string;
  isVideo?: boolean;
  videoUrl?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientInitials: string;
  clientColor: string;
  company: string; // e.g. "Agency Partner" / "E-commerce Founder"
  role: string;
  dateHeader?: string;
  messages: ChatMessage[];
  highlightQuote: string;
  highlightText: string; // portion of quote that is highlighted in blue
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Client Grayscale logos data with reveal effect
export interface ClientLogo {
  id: string;
  name: string;
  logoSvg: string;
  instagramUrl?: string;
}

// Premium content data
export const LOGO_SVG_TEMPLATES = {
  vanguard: "VANGUARD",
  apex: "APEX MEDIA",
  nova: "NOVA CO.",
  solstice: "SOLSTICE",
  quantum: "QUANTUM",
  pulse: "PULSE"
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "1", name: "Paul Getter", logoSvg: "P A U L  G E T T E R", instagramUrl: "https://www.instagram.com/paul/" },
  { id: "2", name: "Unspeakable", logoSvg: "U N S P E A K A B L E", instagramUrl: "https://www.instagram.com/unspeakable/" },
  { id: "3", name: "iitztimmy", logoSvg: "I I T Z T I M M Y", instagramUrl: "https://www.instagram.com/iitztimmy/" },
  { id: "4", name: "Lethamyr", logoSvg: "L E T H A M Y R  R L", instagramUrl: "https://www.instagram.com/lethamyr_rl/" },
  { id: "5", name: "Inoxtag", logoSvg: "I N O X T A G", instagramUrl: "https://www.instagram.com/inoxtag/" },
  { id: "6", name: "Ofek Alon", logoSvg: "O F E K . A L O N _", instagramUrl: "https://www.instagram.com/ofek.alon_/" },
  { id: "7", name: "Saif Shawaf", logoSvg: "S A I F  S H A W A F", instagramUrl: "https://www.instagram.com/saifshawaf/" },
  { id: "8", name: "Telly CTR", logoSvg: "T E L L Y  C T R", instagramUrl: "https://www.instagram.com/tellyctr/" }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    clientName: "Viral Scale Blueprint",
    industry: "Short-Form Content Strategy",
    beforeStats: "1,600 Views Average per Video",
    afterStats: "300K+ and 185K+ TikTok Views",
    growthMetric: "+18,650% Peak Viewer Velocity",
    revenueImpact: "Hyperactive Audience Acquisition & Mass Shareability",
    description: "Took this brand from videos averaging just 1,600 views to 300K+ and 185K+ view performances on TikTok through a content strategy built for retention, precise visual pacing, and strategic auditory triggers.",
    accentColor: "from-blue-500 to-indigo-500",
    chartData: [
      { name: "Baseline", value: 1.6 },
      { name: "Week 2", value: 8.5 },
      { name: "Week 4", value: 24.3 },
      { name: "Week 6", value: 87.1 },
      { name: "Week 8", value: 185.6 },
      { name: "Week 10", value: 299.5 }
    ]
  },
  {
    id: "cs-2",
    clientName: "Authority Prestige Catalyst",
    industry: "Personal Brand & Podcast Strategy",
    beforeStats: "17.7K Views Average per Video",
    afterStats: "107K+ Organic Video Performance",
    growthMetric: "+504% View Velocity Shift",
    revenueImpact: "Rebuilt Video Strategy for High-Authority Leads",
    description: "We turned average-performing content into a 100K+ view piece by rebuilding the video strategy around audience attention, pattern-interrupt pacing, and elite high-engagement packaging.",
    accentColor: "from-indigo-500 to-rose-500",
    chartData: [
      { name: "Baseline", value: 17.7 },
      { name: "Week 2", value: 25.1 },
      { name: "Week 4", value: 48.3 },
      { name: "Week 6", value: 72.9 },
      { name: "Week 8", value: 107.0 }
    ]
  }
];

export const WORK_ITEMS: WorkItem[] = [
  {
    id: "w-0",
    title: "After Effects — Better than DaVinci",
    category: "shorts",
    thumbnail: aeNotificationMockup,
    videoUrl: `${import.meta.env.BASE_URL}AFTER EFFECTS.mp4`,
    description: "Our signature App Store conversion funnel concept. Utilizes highly persuasive UI notification mechanics, pattern-interrupt screenshots, and high-velocity pacing to maximize installation intent.",
    metrics: "140K+ Reach & Conversion Boost"
  },
  {
    id: "w-0-2",
    title: "90% of Videos Get Buried Instantly",
    category: "shorts",
    thumbnail: buriedVideosMockup,
    videoUrl: `${import.meta.env.BASE_URL}BURIED.mp4`,
    description: "An aggressive pattern-interrupt sequence combatting instant dropoffs. Structured using premium custom visual icons, auditory triggers, and cognitive open loops.",
    metrics: "+92% Audited Watch-Time Boost"
  },
  {
    id: "w-0-3",
    title: "Apple Concept — iOS 26 New Look",
    category: "shorts",
    thumbnail: iosConceptMockup,
    videoUrl: `${import.meta.env.BASE_URL}IOS VIDEO.mp4`,
    description: "A highly cinematic user-interface reveal conceptualizing the next iOS flight notification and mapping integration under high-energy transition effects.",
    metrics: "2.1M+ Volatile Impressions"
  },
  {
    id: "w-0-4",
    title: "Prosper Scale — $10K/Month to $10K/Day",
    category: "shorts",
    thumbnail: shopifyScaleMockup,
    videoUrl: `${import.meta.env.BASE_URL}PROSPER.mp4`,
    description: "A financial performance review video detailing Shopify e-commerce scaling secrets. Blends high-pace talking head footage with sleek custom Shopify analytics screenshots.",
    metrics: "+1,077% Sales Velocity Lift"
  },
  {
    id: "w-0-5",
    title: "Agency Blueprint — Over $10,000/Month",
    category: "shorts",
    thumbnail: agencySystemMockup,
    videoUrl: `${import.meta.env.BASE_URL}AGENCY BLUEPRINT 10k $.mp4`,
    description: "An elite strategic consulting program sequence showing briefcase stacks and problem-solving puzzles to command premium client retainers.",
    metrics: "$84K MRR Deployed Pipeline"
  },
  {
    id: "w-0-6",
    title: "IShowSpeed — From Nothing to Global Icon",
    category: "shorts",
    thumbnail: ishowspeedJourneyMockup,
    videoUrl: `${import.meta.env.BASE_URL}ISHOWSPPEED.mp4`,
    description: "A comprehensive motivational storytelling documentary short tracking IShowSpeed from a zero-viewer streamer into a global icon.",
    metrics: "+3.2M Fan Retention Velocity"
  },
  {
    id: "proj-1780650798356",
    title: "🔥 This Changes Everything! | Must Watch 😱",
    category: "youtube",
    thumbnail: ytLcmThumb,
    videoUrl: "https://youtu.be/LCMDoXDFlcE",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780650909221",
    title: "Sam edits intro",
    category: "youtube",
    thumbnail: ytUzulThumb,
    videoUrl: "https://youtu.be/UzULROh6Q9w",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780650993615",
    title: "Intro",
    category: "youtube",
    thumbnail: ytUcrpThumb,
    videoUrl: "https://youtu.be/UcRpReM5kaI",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780651080177",
    title: "Apple style intro | the guy behind edits",
    category: "youtube",
    thumbnail: ytW1hwThumb,
    videoUrl: "https://youtu.be/W1HW8nDduQM",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780651199683",
    title: "Ambitious person",
    category: "youtube",
    thumbnail: ytJtvuThumb,
    videoUrl: "https://youtu.be/JtvUQB0ThAA",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780651258316",
    title: "Commercial company trailer",
    category: "youtube",
    thumbnail: ytTpmfThumb,
    videoUrl: "https://youtu.be/tPMf7wX2IKQ",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780651322188",
    title: "Motivational",
    category: "youtube",
    thumbnail: ytJh6jThumb,
    videoUrl: "https://youtu.be/jH6JHr0QHgg",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780651388228",
    title: "Proper long video",
    category: "youtube",
    thumbnail: ytXqkaThumb,
    videoUrl: "https://youtu.be/xqkas8YGtN8",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  },
  {
    id: "proj-1780651443616",
    title: "Long video",
    category: "youtube",
    thumbnail: yt04vvThumb,
    videoUrl: "https://youtu.be/04vvERVKV6g",
    description: "Dynamic high-converting creative project launched on premium digital systems.",
    metrics: "100% Attended Engagement"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-0",
    clientName: "CCR",
    clientInitials: "CC",
    clientColor: "bg-red-600",
    role: "YouTube Partner / Creator",
    company: "CCR YouTube Channel",
    messages: [
      { sender: "client", text: "Yo, what's up everybody, this is CCR. Just want to give a quick shoutout to Sam branding, man. Absolutely overdelivered when it came to editing my video!", time: "3:40 PM" },
      { sender: "client", text: "Video review of the work:", isVideo: true, videoUrl: `${import.meta.env.BASE_URL}VSL.mp4`, time: "3:41 PM" },
      { sender: "me", text: "Bro! Appreciated! So hyped with the retention metrics we got on this.", time: "3:45 PM" },
      { sender: "client", text: "Sam came in, negotiated the pricing, and took the edit above and beyond what I requested. Tap in with him, he is the real deal!", time: "3:46 PM" }
    ],
    highlightQuote: "Absolutely overdelivered. He is the real deal!",
    highlightText: "the real deal!"
  },
  {
    id: "t-1",
    clientName: "David K.",
    clientInitials: "DK",
    clientColor: "bg-purple-600",
    role: "Brand Director",
    company: "Aesthetic Apparel",
    messages: [
      { sender: "client", text: "https://drive.google.com/file/d/1X9a.../view\ndrive.google.com", isAttachment: true, attachmentName: "Asset Delivered Link" },
      { sender: "me", text: "hey here it is, lmk about this", time: "1:54 AM" },
      { sender: "client", text: "I like this a lot, let me send over to client! I think you SNAPPED.", time: "1:58 AM" },
      { sender: "me", text: "Yessir delivered in 12 hours 😂💪", time: "1:59 AM" },
      { sender: "client", text: "Love it bro, if you can do more of this and stuff like that with quick delivery, I'll have TONS and I mean TONS of work for you.", time: "2:00 AM" }
    ],
    highlightQuote: "I think you SNAPPED.",
    highlightText: "SNAPPED."
  },
  {
    id: "t-2",
    clientName: "Alex M.",
    clientInitials: "AM",
    clientColor: "bg-blue-600",
    role: "Agency Client",
    company: "Whitelabel Systems",
    dateHeader: "Sat, 9 May",
    messages: [
      { sender: "me", text: "Hey man" },
      { sender: "me", text: "Here is the edit", time: "4:18 AM" },
      { sender: "client", text: "Yes", time: "4:18 AM" },
      { sender: "client", text: "Whitelabel sfx.mp4\ndrive.google.com", isAttachment: true, attachmentName: "Whitelabel sfx.mp4" },
      { sender: "client", text: "I'm ready", time: "4:18 AM" },
      { sender: "me", text: "Lmk what you think bro", time: "4:19 AM" },
      { sender: "client", text: "i love it" }
    ],
    highlightQuote: "I love it",
    highlightText: "I love it"
  },
  {
    id: "t-3",
    clientName: "Siddharth S.",
    clientInitials: "SS",
    clientColor: "bg-emerald-600",
    role: "Content Coordinator",
    company: "Venture Media Hub",
    dateHeader: "Today",
    messages: [
      { sender: "client", text: "Started right here. at min 5:05" },
      { sender: "me", text: "need to remove one IN?", time: "1:10 PM" },
      { sender: "client", text: "yah he repeats", time: "1:11 PM" },
      { sender: "me", text: "okkk", time: "1:11 PM" },
      { sender: "client", text: "yoo", time: "1:36 PM" },
      { sender: "me", text: "yea man", time: "1:44 PM" },
      { sender: "me", text: "everything's uploaded", time: "1:46 PM" },
      { sender: "client", text: "got it" },
      { sender: "client", text: "I reviewed it, and it looks very good. Good job.", time: "1:59 PM" },
      { sender: "me", text: "alright" },
      { sender: "me", text: "We could move on thr next then", time: "2:01 PM" }
    ],
    highlightQuote: "It looks very good. Good job.",
    highlightText: "very good. Good job."
  },
  {
    id: "t-4",
    clientName: "Jordan T.",
    clientInitials: "JT",
    clientColor: "bg-cyan-600",
    role: "E-Commerce Founder",
    company: "Cyber D2C Brand",
    messages: [
      { sender: "client", text: "wow brother, i love it" },
      { sender: "client", text: "you can proceed with the remaining videos", time: "6:09 AM" },
      { sender: "me", text: "Alright man appreciate you" },
      { sender: "me", text: "Will start on the remaining ones", time: "6:11 AM" },
      { sender: "client", text: "Great brother", time: "6:16 AM" }
    ],
    highlightQuote: "Wow brother, I love it.",
    highlightText: "I love it."
  },
  {
    id: "t-5",
    clientName: "Tyler R.",
    clientInitials: "TR",
    clientColor: "bg-amber-600",
    role: "Creator Strategist",
    company: "NBA Fan Page Partner",
    messages: [
      { sender: "client", text: "And can you get 2 versions of this video please 1 just like it is and 2nd with nba highlights behind" },
      { sender: "client", text: "Thank you bro fire video" },
      { sender: "client", text: "That's it", time: "5:54 AM" },
      { sender: "me", text: "Alright give me like 15 mins man", time: "5:56 AM" }
    ],
    highlightQuote: "Thank you bro fire video.",
    highlightText: "fire video."
  },
  {
    id: "t-6",
    clientName: "Nathan L.",
    clientInitials: "NL",
    clientColor: "bg-rose-600",
    role: "Growth Marketer",
    company: "SaaS Scaleups",
    messages: [
      { sender: "client", text: "you can proceed with the remaining videos", time: "6:09 AM" },
      { sender: "me", text: "Alright man appreciate you" },
      { sender: "me", text: "Will start on the remaining ones", time: "6:11 PM" },
      { sender: "client", text: "Great brother", time: "6:16 AM" }
    ],
    highlightQuote: "Great brother.",
    highlightText: "Great brother."
  }
];

export const FAQs: FaqItem[] = [
  {
    question: "How long does it take to see results?",
    answer: "Results vary depending on your niche, content quality, and starting point. Most clients begin seeing improvements in views, engagement, or content performance within the first few weeks, but long-term growth comes from consistency and ongoing optimization."
  },
  {
    question: "Which platforms do you work with?",
    answer: "We primarily work with Instagram, TikTok, and YouTube. We help clients create content that fits each platform while maintaining a consistent brand presence."
  },
  {
    question: "Do you create the content for us?",
    answer: "Yes. We can help with content strategy, scripting, editing, creative direction, and overall content planning. Depending on the project, we can either work with footage you provide or guide you through recording content yourself."
  },
  {
    question: "Is there a long-term contract?",
    answer: "We usually start with a minimum commitment so we have enough time to properly test, improve, and optimize the content. After that, we can discuss ongoing monthly arrangements based on your goals."
  },
  {
    question: "What types of businesses do you work with?",
    answer: "We work with creators, coaches, personal brands, service businesses, startups, and companies looking to grow their online presence through content."
  },
  {
    question: "What happens after I get started?",
    answer: "We'll schedule an onboarding call, learn about your business, discuss goals, gather the materials we need, and create a plan for moving forward. Once everything is ready, we begin production and keep you updated throughout the process."
  }
];
