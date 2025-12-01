"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SupportPage() {
  return (
    <section
      className="min-h-screen px-6 py-16 text-white relative"
      style={{
        backgroundImage: "url('/images/category_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* MAIN WRAPPER */}
      <div
        className="relative max-w-4xl mx-auto p-10 rounded-3xl border
        bg-gradient-to-br from-gray-900/60 via-black/60 to-gray-900/60
        border-indigo-400/20 shadow-[0_0_35px_rgba(124,58,237,0.35)]
        backdrop-blur-2xl"
      >
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-indigo-300 text-center mb-8">
          Help & Support
        </h1>

        <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
          Here you will find solutions to common issues, FAQs, and steps to use the Job Matcher platform effectively.
        </p>

        {/* HELP CARDS */}
        <div className="space-y-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-black/40 border border-indigo-400/30 shadow-[0_0_20px_rgba(124,58,237,0.35)]"
          >
            <h2 className="text-xl text-indigo-300 font-bold mb-2">
              🔹 How to Use the Job Matcher?
            </h2>
            <p className="text-gray-300">
              Fill the job title, location, experience level, and upload your resume. Then choose AI Job Recommendation or Live Job Fetching.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-black/40 border border-teal-400/30 shadow-[0_0_20px_rgba(19,255,236,0.35)]"
          >
            <h2 className="text-xl text-teal-300 font-bold mb-2">
              🔹 AI Recommendation Not Working?
            </h2>
            <p className="text-gray-300">
              Enter a valid job title. Make sure backend FastAPI is running and Groq API is configured.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-black/40 border border-yellow-400/30 shadow-[0_0_20px_rgba(255,215,19,0.35)]"
          >
            <h2 className="text-xl text-yellow-300 font-bold mb-2">
              🔹 Live Job Fetching Showing No Jobs?
            </h2>
            <p className="text-gray-300">
              Some locations or job titles may have very few openings. Try common roles such as “Software Engineer”.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-black/40 border border-pink-400/30 shadow-[0_0_20px_rgba(255,20,147,0.35)]"
          >
            <h2 className="text-xl text-pink-300 font-bold mb-2">
              🔹 Resume Upload Issues
            </h2>
            <p className="text-gray-300">
              Only PDF and DOCX files are supported. Ensure your resume is not corrupted and under safe size.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-black/40 border border-purple-400/30 shadow-[0_0_20px_rgba(147,112,219,0.35)]"
          >
            <h2 className="text-xl text-purple-300 font-bold mb-2">
              🔹 Still Need Help?
            </h2>
            <p className="text-gray-300">
              Clear sessionStorage, refresh your browser, and restart frontend + backend servers.
            </p>
          </motion.div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-gray-400 mt-10 text-sm">
          © {new Date().getFullYear()} Job Matcher — Support Page
        </p>
      </div>
    </section>
  );
}
