"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// 🔹 TEMPLATE MAP
const TEMPLATE_MAP = {
  professional: [
    "ProfessionalClassic.jpg",
    "ProfessionalCompact.jpg",
    "ProfessionalCorporate.jpg",
    "ProfessionalCreative.jpg",
    "ProfessionalElegant.jpg",
    "ProfessionalMinimalist.jpg",
    "ProfessionalModern.jpg",
    "ProfessionalPremium.jpg",
  ],

  modern: [
    "ModernBold.jpg",
    "ModernClean.jpg",
    "ModernCreative.jpg",
    "ModernElegant.jpg",
    "ModernMinimalist.jpg",
    "ModernProfessional.jpg",
    "ModernSlidebar.jpg",
    "ModernTech.jpg",
  ],

  minimalist: [
    "MinimalistClassic.jpg",
    "MinimalistCompact.jpg",
    "MinimalistCreative.jpg",
    "MinimalistElegant.jpg",
    "MinimalistModern.jpg",
    "MinimalistOnePage.jpg",
    "MinimalistProfessional.jpg",
    "MinimalistSlideBar.jpg",
  ],

  creative: [
    "CreativeArtistic.jpg",
    "CreativeBold.jpg",
    "CreativeColorBurst.jpg",
    "CreativeElegant.jpg",
    "CreativeGrid.jpg",
    "CreativeModern.jpg",
    "CreativePortfolio.jpg",
    "CreativeVisual.jpg",
  ],

  technical: [
    "TechnicalAI.jpg",
    "TechnicalAnalyst.jpg",
    "TechnicalArchitect.jpg",
    "TechnicalCyber.jpg",
    "TechnicalDeveloper.jpg",
    "TechnicalEngineer.jpg",
    "TechnicalInnovator.jpg",
    "TechnicalModern.jpg",
  ],

  fresher: [
    "FresherCampus.jpg",
    "FresherCreative.jpg",
    "FresherElegant.jpg",
    "FresherModern.jpg",
    "FresherProfessional.jpg",
    "FresherSimple.jpg",
    "FresherStudent.jpg",
    "FresherTechStarter.jpg",
  ],

  international: [
    "InternationalAsia.jpg",
    "InternationalAustralia.jpg",
    "InternationalCanada.jpg",
    "InternationalEU.jpg",
    "InternationalGermany.jpg",
    "InternationalUAE.jpg",
    "InternationalUK.jpg",
    "InternationalUSA.jpg",
  ],
};

export default function CategoryTemplatesPage() {
  const router = useRouter();
  const params = useParams();

  const category = (params.category || "").toLowerCase();
  const templates = TEMPLATE_MAP[category] || [];

  const categoryTitle =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section
      className="min-h-screen px-6 py-16 relative text-white"
      style={{
        backgroundImage: "url('/images/category_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-300 text-center drop-shadow-lg">
          {categoryTitle} Templates
        </h1>

        <p className="text-center text-gray-300 mt-3">
          Choose a template to continue.
        </p>

        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {templates.map((file) => {
            const baseName = file.replace(".jpg", "");
            const screenshotPath = `/images/templates/${category}/${file}`;

            return (
              <div
                key={file}
                onClick={() =>
                  router.push(`/resume-category/${category}/${baseName}`)
                }
                className="group relative cursor-pointer p-[3px] rounded-2xl hover:scale-[1.04] transition duration-300"
              >
                {/* ⭐ SOFT ELECTRIC MINT-INDIGO GLOW */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 22px rgba(19,255,236,0.35), 0 0 44px rgba(99,102,241,0.30), 0 0 70px rgba(124,58,237,0.25)",
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(19,255,236,0.15), rgba(99,102,241,0.12), transparent 70%)",
                    filter: "blur(1.8px)",
                    zIndex: 5,
                  }}
                />

                {/* CARD */}
                <div className="relative bg-gradient-to-b from-black/40 to-black/20 rounded-xl border border-white/10 shadow-xl backdrop-blur-md overflow-hidden z-10">
                  <div className="relative w-full h-[480px]">
                    <Image
                      src={screenshotPath}
                      alt={baseName}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-xl mt-4 mb-4 font-semibold text-indigo-300 text-center px-3">
                    {baseName}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

