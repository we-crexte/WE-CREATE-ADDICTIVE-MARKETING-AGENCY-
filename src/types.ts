// types.ts for Addictive Marketing Agency Website

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
    thumbnail: "/src/assets/images/ae_notification_mockup_1780316409386.png",
    videoUrl: "/AFTER EFFECTS.mp4",
    description: "Our signature App Store conversion funnel concept. Utilizes highly persuasive UI notification mechanics, pattern-interrupt screenshots, and high-velocity pacing to maximize installation intent.",
    metrics: "140K+ Reach & Conversion Boost"
  },
  {
    id: "w-0-2",
    title: "90% of Videos Get Buried Instantly",
    category: "shorts",
    thumbnail: "/src/assets/images/buried_videos_mockup_1780316859908.png",
    videoUrl: "/BURIED.mp4",
    description: "An aggressive pattern-interrupt sequence combatting instant dropoffs. Structured using premium custom visual icons, auditory triggers, and cognitive open loops.",
    metrics: "+92% Audited Watch-Time Boost"
  },
  {
    id: "w-0-3",
    title: "Apple Concept — iOS 26 New Look",
    category: "shorts",
    thumbnail: "/src/assets/images/ios_concept_mockup_1780317348378.png",
    videoUrl: "/IOS VIDEO.mp4",
    description: "A highly cinematic user-interface reveal conceptualizing the next iOS flight notification and mapping integration under high-energy transition effects.",
    metrics: "2.1M+ Volatile Impressions"
  },
  {
    id: "w-0-4",
    title: "Prosper Scale — $10K/Month to $10K/Day",
    category: "shorts",
    thumbnail: "/src/assets/images/shopify_scale_mockup_1780317375611.png",
    videoUrl: "PROSPER.mp4",
    description: "A financial performance review video detailing Shopify e-commerce scaling secrets. Blends high-pace talking head footage with sleek custom Shopify analytics screenshots.",
    metrics: "+1,077% Sales Velocity Lift"
  },
  {
    id: "w-0-5",
    title: "Agency Blueprint — Over $10,000/Month",
    category: "shorts",
    thumbnail: "/src/assets/images/agency_system_mockup_1780317406987.png",
    videoUrl: "/AGENCY BLUEPRINT 10k $.mp4",
    description: "An elite strategic consulting program sequence showing briefcase stacks and problem-solving puzzles to command premium client retainers.",
    metrics: "$84K MRR Deployed Pipeline"
  },
  {
    id: "w-0-6",
    title: "IShowSpeed — From Nothing to Global Icon",
    category: "shorts",
    thumbnail: "/src/assets/images/ishowspeed_journey_mockup_1780317433540.png",
    videoUrl: "/ISHOWSPEED.mp4",
    description: "A comprehensive motivational storytelling documentary short tracking IShowSpeed from a zero-viewer streamer into a global icon.",
    metrics: "+3.2M Fan Retention Velocity"
  },
  {
    id: "w-3",
    title: "Finance Mentor - Dynamic Cut System",
    category: "youtube",
    thumbnail: "https://picsum.photos/seed/yt1/800/450",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-recording-vertical-video-of-a-man-40073-large.mp4",
    description: "A fast-paced 15-minute documentary cut. Uses high-end vector graphics, stock-trading animations, and sound design.",
    metrics: "+42m Average Watch Time"
  },
  {
    id: "w-4",
    title: "D2C Brand Launch: The Unboxing Engine",
    category: "campaigns",
    thumbnail: "https://picsum.photos/seed/camp1/800/450",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-recording-vertical-video-of-a-man-40073-large.mp4",
    description: "An omnichannel social stunt linking 15 top micro-influencers under a matching narrative envelope.",
    metrics: "Sold out in 22 Hours"
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
      { sender: "client", text: "Video review of the work:", isVideo: true, videoUrl: "/VSL.mp4", time: "3:41 PM" },
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
    question: "How long before we see results?",
    answer: "Typically, you'll see traction within the first 14 days of our client campaign launch. We spend the first 7-10 days researching your specific target demographic, writing psychologically-indexed scripts, and setting up visual guidelines. Once content goes live, our metrics-backed iteration system refines distribution for maximum impact."
  },
  {
    question: "What platforms do you manage?",
    answer: "We focus on high-leveraged attention platforms: Instagram (Reels & Stories), TikTok, YouTube (Shorts & Long-form documentary edits), and premium high-converting paid social placements on Meta (Instagram/Facebook) and TikTok Ads."
  },
  {
    question: "Do you offer content creation?",
    answer: "Yes, fully! We provide an end-to-end service. This includes custom creative direction, copywriting & high-conversion scripting, filming frameworks (if you record yourself, we guide you on exact angles, lighting and delivery), cinematic premium video editing, kinetic motion typography, custom sound design, and full daily distribution."
  },
  {
    question: "Is there a contract?",
    answer: "We offer rolling 3-month commitments to begin. This ensures we have the necessary timeline to map, deploy, and rigorously test creative systems. After the initial term, we pivot to client-friendly month-to-month terms."
  },
  {
    question: "What industries do you work with?",
    answer: "We thrive in High-Ticket Consulting/Coaching, Direct-to-Consumer (D2C) brands, high-end Consumer Services, and venture-backed SaaS startups. Any industry where high-converting visual attention can directly unlock 6 to 7-figure revenue gains."
  },
  {
    question: "How does onboarding work?",
    answer: "Immediately after locking the strategy call and deposit, we run you through our 90-minute digital extraction session. We gather your brand guidelines, core knowledge base, and historical winners, and begin script compilation within 48 hours."
  }
];
