import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X, MessageSquare } from "lucide-react";
import AdictiveLogo from "./AdictiveLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Testimonials", href: "#testimonials" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleMobileNav = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-dark-bg/90 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group">
            <AdictiveLogo iconSize="w-8 h-8" textSize="text-base" className="group-hover:scale-[1.02] transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-orange group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold text-white hover:opacity-95 text-xs font-mono font-bold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <span>Book Call</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50 bg-dark-bg/98 backdrop-blur-2xl border-b border-white/5 md:hidden w-full overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-6 flex flex-col gap-5">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleMobileNav}
                    className="text-lg font-display font-medium text-neutral-300 hover:text-white transition-colors py-1 block cursor-pointer"
                  >
                    {item.label}
                  </a>
                ))}
                <hr className="border-white/5 my-2" />
                <div className="flex flex-col gap-4">
                  <a
                    href="#contact"
                    onClick={handleMobileNav}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold text-white font-semibold text-xs font-mono uppercase tracking-widest cursor-pointer rounded-full shadow-lg"
                  >
                    <span>START YOUR JOURNEY</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
