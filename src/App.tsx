/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LuxuryLoader from "./components/LuxuryLoader";
import FloatingSocials from "./components/FloatingSocials";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vsl from "./components/Vsl";
import CaseStudies from "./components/CaseStudies";
import PastWork from "./components/PastWork";
import WhoWeWorkedWith from "./components/WhoWeWorkedWith";
import ClientVerdicts from "./components/ClientVerdicts";
import Faq from "./components/Faq";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-bg select-text">
      {/* Luxury Preloader */}
      <LuxuryLoader />

      {/* Premium Floating Social Buttons */}
      <FloatingSocials />

      {/* Subtle global backing noise grain layout */}
      <div className="noise-overlay" />

      {/* Transparent Sticky Navbar */}
      <Navbar />

      {/* Hero Intro */}
      <Hero />

      {/* VSL Case Explanation section */}
      <Vsl />

      {/* Metric-focused Case Studies */}
      <CaseStudies />

      {/* Rich categorized visual portfolio past work grids */}
      <PastWork />

      {/* Who We Worked With (Infinite Marquee) */}
      <WhoWeWorkedWith />

      {/* Dedicated client testimonials video player and custom review collage */}
      <ClientVerdicts />

      {/* Dynamic founder background narrative and mission timeline */}
      <About />

      {/* FAQ interactives */}
      <Faq />

      {/* Secure booking scheduler and premium budgeting form */}
      <Contact />

      {/* Footer credits and sitemap hooks */}
      <Footer />
    </div>
  );
}
