"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AIRecommenderPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const formData = new FormData();

      // 🔹 Load values from sessionStorage (saved from job-matcher/page.js)
      const resumeFile = sessionStorage.getItem("jm_resume");
      const jobTitle = sessionStorage.getItem("jm_jobTitle");
      const location = sessionStorage.getItem("jm_location");
      const jobType = sessionStorage.getItem("jm_jobType");
      const experience = sessionStorage.getItem("jm_experience");

      if (!jobTitle) {
        setError("Missing job title — return back and fill the form.");
        setLoading(false);
        return;
      }

      // 🔹 Attach fields
      formData.append("job_title", jobTitle);
      formData.append("location", location || "");
      formData.append("job_type", jobType || "");
      formData.append("experience", experience || "");

      // 🔹 Attach resume only if uploaded
      if (resumeFile) {
        const blob = await fetch(resumeFile).then((r) => r.blob());
        formData.append("resume", blob, "resume.pdf");
      }

      const res = await fetch("http://127.0.0.1:8000/api/ai-recommend", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations.");
    }

    setLoading(false);
  };

  return (
    <section
      className="min-h-screen px-6 py-16 text-white relative"
      style={{
        backgroundImage: "url('/images/category_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* MAIN CARD */}
      <div
        className="relative max-w-4xl mx-auto bg-white/5 backdrop-blur-xl 
                      rounded-3xl p-10 border border-white/20
                      shadow-[0_0_25px_rgba(124,58,237,0.25),0_0_45px_rgba(19,255,236,0.25)]"
      >
        <h1 className="text-3xl font-bold text-indigo-300 mb-3">
          AI Job Recommendations
        </h1>

        <p className="text-gray-300 mb-6">
          AI is analyzing your resume & preferences to suggest the best roles.
        </p>

        {/* =============== FETCH BUTTON =============== */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-indigo-600/60 border border-indigo-400/40
                     hover:bg-indigo-600/80 transition font-semibold shadow-lg"
        >
          {loading ? "Analyzing..." : "Get AI Recommendations"}
        </motion.button>

        {/* =============== ERROR MESSAGE =============== */}
        {error && (
          <div className="mt-6 text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-400/30">
            {error}
          </div>
        )}

        {/* =============== RESULTS =============== */}
        {results && (
          <div className="mt-8 space-y-5">
            {results.recommendations?.map((rec, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-black/40 border border-indigo-400/20
                           shadow-[0_0_20px_rgba(124,58,237,0.25)]"
              >
                <h3 className="text-xl font-bold text-indigo-300">
                  {rec.title}
                </h3>
                <p className="text-gray-300 mt-1">{rec.description}</p>

                <p className="text-sm text-gray-400 mt-2">
                  <span className="text-indigo-400">Level:</span> {rec.level}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {rec.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder when nothing loaded */}
        {!results && !loading && !error && (
          <div className="p-8 text-center text-gray-300 border border-white/10 bg-black/40 rounded-xl mt-8">
            🔍 AI results will appear here after clicking the button.
          </div>
        )}
      </div>
    </section>
  );
}
