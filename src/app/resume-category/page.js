"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BACKGROUND_IMAGE = "/images/category_bg.jpg";

const categories = [
  { name: "Professional", img: "/images/category/professional.jpg", slug: "professional" },
  { name: "Modern", img: "/images/category/modern.jpg", slug: "modern" },
  { name: "Minimalist", img: "/images/category/minimalist.jpg", slug: "minimalist" },
  { name: "Creative", img: "/images/category/creative.jpg", slug: "creative" },
  { name: "Technical", img: "/images/category/technical.jpg", slug: "technical" },
  { name: "Fresher", img: "/images/category/fresher.jpg", slug: "fresher" },
  { name: "International", img: "/images/category/international.jpg", slug: "international" },
];

export default function ResumeCategoryPage() {
  const router = useRouter();

  return (
    <section
      className="min-h-screen py-16 px-6 relative"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-300 drop-shadow-lg">
            Browse Resume Categories
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
            Pick a category to explore curated templates — professional, creative, technical and more.
          </p>
        </header>

        {/* GRID */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              onClick={() => router.push(`/resume-category/${cat.slug}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="relative cursor-pointer group rounded-2xl p-[3px] overflow-visible"
            >
              {/* ⭐ PREMIUM SOFT MINT-INDIGO NEON BORDER */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 18px rgba(19,255,236,0.30), 0 0 36px rgba(99,102,241,0.28), 0 0 60px rgba(124,58,237,0.25)",
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(19,255,236,0.12), rgba(99,102,241,0.10), transparent 70%)",
                  filter: "blur(1.4px)",
                  zIndex: 5,
                }}
              ></div>

              {/* CARD */}
              <div className="relative bg-gradient-to-b from-black/50 via-black/40 to-black/30 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm border border-white/5 z-10">
                <div className="w-full h-56 md:h-64 relative">
                  <Image
                    src={cat.img}
                    alt={`${cat.name} preview`}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-indigo-200">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Explore {cat.name} templates — clean, modern and ready to customize.
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/resume-category/${cat.slug}`);
                      }}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition text-white"
                    >
                      View Templates
                    </button>

                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: "linear-gradient(90deg,#3afce3,#6366f1)",
                          boxShadow: "0 0 12px rgba(19,255,236,0.9)",
                        }}
                      />
                      <span className="text-xs text-gray-400">Popular</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          Tip: Click any category to view its templates.
        </div>
      </div>
    </section>
  );
}


