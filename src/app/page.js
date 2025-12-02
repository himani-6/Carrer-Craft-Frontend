// src/app/page.js
"use client";

import React from "react";
import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HelpSection from "../components/HelpSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import NeedHelpSection from "../components/help";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mt-20">
        {/* ✅ Hero uses useSearchParams → wrap in Suspense */}
        <Suspense fallback={<div className="text-white text-center py-10">Loading...</div>}>
          <Hero />
        </Suspense>

        <Features />
        <HelpSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}