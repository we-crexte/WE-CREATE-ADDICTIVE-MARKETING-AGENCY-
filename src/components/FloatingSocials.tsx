import { Instagram, MessageCircle, Twitter } from "lucide-react";

// WhatsApp business number (configurable via VITE_WHATSAPP_NUMBER in .env)
const WHATSAPP_CONTACT = import.meta.env.VITE_WHATSAPP_NUMBER || "916392591533";

export default function FloatingSocials() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/samarthmotions/",
      icon: Instagram,
      color: "from-purple-600 via-rose-500 to-amber-500",
      glowColor: "rgba(244,63,94,0.4)",
      label: "@samarthmotions"
    },
    {
      name: "WhatsApp",
      url: WHATSAPP_CONTACT ? `https://wa.me/${WHATSAPP_CONTACT}` : "#contact",
      icon: MessageCircle,
      color: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16,185,129,0.4)",
      label: WHATSAPP_CONTACT ? "Direct Chat" : "Book Call"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/the_sambranding",
      icon: Twitter,
      color: "from-neutral-800 to-neutral-950 border border-white/20",
      glowColor: "rgba(255,255,255,0.15)",
      label: "@the_sambranding"
    }
  ];

  return (
    <div id="floating-socials" className="fixed right-4 md:right-6 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-50 flex flex-col gap-3.5">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        const isExternal = social.url.startsWith("http");
        return (
          <a
            key={social.name}
            href={social.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-neutral-400 hover:text-white transition-all duration-500 hover:scale-110"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
            }}
            title={social.name}
          >
            {/* Hover Glow Ring Backing */}
            <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-tr ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[8px] -z-10`}
            />

            {/* Hover Color Background Overlay */}
            <div 
              className={`absolute inset-[1px] rounded-full bg-gradient-to-tr ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
            />

            {/* Icon Content */}
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <IconComponent className="w-5 h-5 md:w-5.5 md:h-5.5" />
            </span>

            {/* Cinematic Slide-out Tooltip */}
            <div className="absolute right-[130%] top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 hidden md:flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-black/90 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#bcbcc5] whitespace-nowrap shadow-xl">
                <span className="text-white font-bold">{social.name}</span>
                <span className="text-neutral-500 mx-1.5">|</span>
                <span className="text-rose-400">{social.label}</span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
