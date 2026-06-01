/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LuxuryLoader from "./components/LuxuryLoader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vsl from "./components/Vsl";
import FeaturedShowreel from "./components/FeaturedShowreel";
import CaseStudies from "./components/CaseStudies";
import PastWork from "./components/PastWork";
import Testimonials from "./components/Testimonials";
import WhoWeWorkedWith from "./components/WhoWeWorkedWith";
import Faq from "./components/Faq";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070708] select-text">
      {/* Luxury Preloader */}
      <LuxuryLoader />

      {/* Cinematic Custom Mouse Cursor Follower */}
      <CustomCursor />

      {/* Subtle global backing noise grain layout */}
      <div className="noise-overlay" />

      {/* Transparent Sticky Navbar */}
      <Navbar />

      {/* Hero Intro */}
      <Hero />

      {/* VSL Case Explanation section */}
      <Vsl />

      {/* Highlight Showreel Video immediately underneath VSL */}
      <FeaturedShowreel />

      {/* Gray wall client logos with hover scale color reveals */}
      <WhoWeWorkedWith />

      {/* Metric-focused Case Studies */}
      <CaseStudies />

      {/* Rich categorized visual portfolio past work grids */}
      <PastWork />

      {/* Customer ratings and dynamic reviews statement carousel */}
      <Testimonials />

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
