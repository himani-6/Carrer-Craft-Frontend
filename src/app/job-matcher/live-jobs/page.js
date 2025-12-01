"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LiveJobsPage() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setJobs(null);

    try {
      // 🔹 Read data from sessionStorage (saved in job-matcher/page.js)
      const jobTitle = sessionStorage.getItem("jm_jobTitle");
      const location = sessionStorage.getItem("jm_location");

      if (!jobTitle) {
        setError("Missing job title — go back & fill the form.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("job_title", jobTitle);
      formData.append("location", location || "");

      const res = await fetch("http://127.0.0.1:8000/api/live-jobs", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch job listings.");
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

      <div
        className="relative max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-10 
                   border border-white/20 shadow-[0_0_25px_rgba(19,255,236,0.25),0_0_45px_rgba(19,255,236,0.25)]"
      >
        <h1 className="text-3xl font-bold text-green-300 mb-3">
          Live Job Fetching
        </h1>

        <p className="text-gray-300 mb-6">
          Real-time job listings from Adzuna will appear here.
        </p>

        {/* FETCH BUTTON */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-teal-600/60 border border-teal-400/40
                     hover:bg-teal-600/80 transition font-semibold shadow-lg"
        >
          {loading ? "Fetching Jobs..." : "Fetch Live Jobs"}
        </motion.button>

        {/* ERROR BOX */}
        {error && (
          <div className="mt-6 text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-400/30">
            {error}
          </div>
        )}

        {/* JOB RESULTS */}
        {jobs && (
          <div className="mt-8 space-y-6">
            {jobs.length === 0 && (
              <p className="text-gray-400 text-center">No jobs found.</p>
            )}

            {jobs.map((job, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-black/40 border border-teal-400/30
                           shadow-[0_0_20px_rgba(19,255,236,0.3)]"
              >
                <h3 className="text-xl font-bold text-teal-300">
                  {job.title || "No Title"}
                </h3>

                <p className="text-gray-300 mt-2">
                  {job.company || "Unknown Company"}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  📍{" "}
                  {Array.isArray(job.location)
                    ? job.location.join(" / ")
                    : job.location || "No location"}
                </p>

                {job.salary_min && job.salary_max && (
                  <p className="text-sm text-gray-400 mt-1">
                    💰 {job.salary_min} - {job.salary_max}
                  </p>
                )}

                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {job.description?.slice(0, 180) || "No description"}...
                </p>

                <a
                  href={job.redirect_url}
                  target="_blank"
                  className="inline-block mt-4 px-4 py-2 rounded-lg bg-teal-500/30 
                             border border-teal-300/40 hover:bg-teal-500/50"
                >
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        )}

        {/* PLACEHOLDER */}
        {!jobs && !loading && !error && (
          <div className="p-8 text-center text-gray-300 border border-white/10 bg-black/40 rounded-xl mt-8">
            🟢 Job results will load here after clicking the button.
          </div>
        )}
      </div>
    </section>
  );
}
