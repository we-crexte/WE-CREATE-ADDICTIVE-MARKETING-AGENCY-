import { motion } from "motion/react";
import { Sparkles, Video, TrendingUp, Check } from "lucide-react";

export default function Services() {
  const servicesList = [
    {
      icon: <Sparkles className="w-6 h-6 text-accent-purple" />,
      title: "Content Strategy & Guidance",
      features: [
        "Custom Creative Direction",
        "Copywriting & High-Conversion Scripting",
        "Filming Frameworks & Guides"
      ],
      desc: "We help creators, coaches, and businesses turn raw ideas into high-converting scripts. We build a clear distribution roadmap tailored specifically to your brand so you always know exactly what to film and how to present it."
    },
    {
      icon: <Video className="w-6 h-6 text-accent-orange" />,
      title: "Cinematic Editing & Sound Design",
      features: [
        "Cinematic Premium Video Editing",
        "Kinetic Motion Typography",
        "Custom Sound Design & SFX"
      ],
      desc: "Our editing is engineered to capture and hold attention. We implement strategic pattern-interrupt loops, smooth transitions, and custom-layered sound design that elevates your content above standard generic edits."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-accent-gold" />,
      title: "Growth & Performance Tracking",
      features: [
        "Daily Distribution Systems",
        "Retention Curve Diagnostics",
        "Audience Monetization Funnels"
      ],
      desc: "We don't just edit and leave; we track results. We study retention diagnostics, view patterns, and optimization metrics to continuously refine our approach, ensuring every video feeds into your customer acquisition model."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-dark-bg overflow-hidden border-t border-b border-white/5">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] purple-glow opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] orange-glow opacity-5 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md rounded-full mb-4 text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
            <span>OUR CORE SERVICES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white leading-tight"
          >
            End-To-End Systems. <br />
            <span className="bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent">
              Built For Complete Attention.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
          >
            We provide an end-to-end system that takes care of everything from content strategy and filming direction to professional editing and data-driven performance tracking.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-7xl mx-auto"
        >
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 sm:p-10 rounded-2xl bg-dark-card border border-white/5 hover:border-neutral-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between text-left"
            >
              {/* Top ambient glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                  {service.title}
                </h3>

                {/* Features Checklist */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-mono text-neutral-300 tracking-wide">
                      <Check className="w-4 h-4 text-accent-purple shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Description */}
                <p className="text-neutral-400 text-sm font-sans font-light leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Decorative detail */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono tracking-wider text-neutral-500">
                <span>0{index + 1} // ACTIVE SERVICE</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">READY →</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
