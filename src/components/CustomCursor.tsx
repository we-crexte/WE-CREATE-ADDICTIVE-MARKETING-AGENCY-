import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Check if pointer support is fine (mouse exists) and screen is wide enough
    if (typeof window === "undefined") return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setHidden(false);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer glowing trace bead */}
      <motion.div
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: hovered ? 1.5 : 1,
          borderColor: hovered ? "#f43f5e" : "#8b5cf6",
        }}
        transition={{ type: "smooth", stiffness: 400, damping: 28 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] opacity-80 mix-blend-screen"
      />
      
      {/* Inner precise dot pointer */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-rose-500 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          transition: "transform 0.05s ease-out"
        }}
      />
    </>
  );
}
