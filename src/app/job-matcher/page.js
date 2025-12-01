"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function JobMatcher() {
  const router = useRouter();

  const [resumeFile, setResumeFile] = useState(null); // actual File object (optional)
  const [resumePreviewDataUrl, setResumePreviewDataUrl] = useState(null); // data URL stored in sessionStorage
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [experience, setExperience] = useState("Fresher");

  // restore previously saved session storage (if user navigated back)
  useEffect(() => {
    try {
      const jmResume = sessionStorage.getItem("jm_resume");
      const jmJobTitle = sessionStorage.getItem("jm_jobTitle");
      const jmLocation = sessionStorage.getItem("jm_location");
      const jmJobType = sessionStorage.getItem("jm_jobType");
      const jmExperience = sessionStorage.getItem("jm_experience");

      if (jmResume) setResumePreviewDataUrl(jmResume);
      if (jmJobTitle) setJobTitle(jmJobTitle);
      if (jmLocation) setLocation(jmLocation);
      if (jmJobType) setJobType(jmJobType);
      if (jmExperience) setExperience(jmExperience);
    } catch (err) {
      console.warn("Failed to restore job matcher state:", err);
    }
  }, []);

  // helper: save all fields to sessionStorage (called on navigation)
  const saveFormData = () => {
    try {
      if (resumePreviewDataUrl) {
        sessionStorage.setItem("jm_resume", resumePreviewDataUrl);
      } else {
        sessionStorage.removeItem("jm_resume");
      }

      sessionStorage.setItem("jm_jobTitle", jobTitle || "");
      sessionStorage.setItem("jm_location", location || "");
      sessionStorage.setItem("jm_jobType", jobType || "");
      sessionStorage.setItem("jm_experience", experience || "");
    } catch (err) {
      console.warn("Failed to save job matcher state:", err);
    }
  };

  // called on file input change -> read file as data URL and store in sessionStorage
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      setResumePreviewDataUrl(null);
      sessionStorage.removeItem("jm_resume");
      return;
    }

    setResumeFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setResumePreviewDataUrl(dataUrl);
      try {
        sessionStorage.setItem("jm_resume", dataUrl);
      } catch (err) {
        console.warn("Failed to store resume in sessionStorage:", err);
      }
    };
    reader.onerror = (err) => {
      console.error("File read error:", err);
    };

    // read as data URL (works for PDF/DOCX as binary-encoded data URL; backend expects file upload separately)
    reader.readAsDataURL(file);
  };

  // update handlers that also mirror into sessionStorage immediately so user doesn't lose input
  const handleJobTitleChange = (v) => {
    setJobTitle(v);
    sessionStorage.setItem("jm_jobTitle", v);
  };
  const handleLocationChange = (v) => {
    setLocation(v);
    sessionStorage.setItem("jm_location", v);
  };
  const handleJobTypeChange = (v) => {
    setJobType(v);
    sessionStorage.setItem("jm_jobType", v);
  };
  const handleExperienceChange = (v) => {
    setExperience(v);
    sessionStorage.setItem("jm_experience", v);
  };

  // navigation helpers
  const goToAIRecommender = () => {
    saveFormData();
    router.push("/job-matcher/ai-recommender");
  };

  const goToLiveJobs = () => {
    saveFormData();
    router.push("/job-matcher/live-jobs");
  };

  return (
    <section
      className="min-h-screen px-6 py-16 relative text-white"
      style={{
        backgroundImage: "url('/images/category_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* ⚡ MAIN GLOW WRAPPER */}
      <div
        className="
          relative max-w-4xl mx-auto p-10 rounded-3xl border
          bg-gradient-to-br from-gray-900/60 via-black/60 to-gray-900/60
          border-indigo-400/20
          shadow-[0_0_25px_rgba(124,58,237,0.25),0_0_45px_rgba(19,255,236,0.25)]
          backdrop-blur-2xl
        "
      >
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-indigo-300 text-center mb-10 drop-shadow-lg">
          Job Matcher
        </h1>

        {/* ---------------- FORM ---------------- */}
        <div className="grid grid-cols-1 gap-6">
          {/* Resume Upload */}
          <div>
            <label className="text-sm text-gray-300">Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="
                w-full mt-2 p-3 rounded-lg 
                bg-black/40 border border-white/10 
                focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-300
              "
            />
            {/* show small filename preview if available */}
            {resumeFile?.name ? (
              <div className="mt-2 text-sm text-gray-300">
                Selected: {resumeFile.name}
              </div>
            ) : resumePreviewDataUrl ? (
              <div className="mt-2 text-sm text-gray-300">
                Resume loaded (previously uploaded)
              </div>
            ) : null}
          </div>

          {/* Job Title */}
          <div>
            <label className="text-sm text-gray-300">Desired Job Title</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={jobTitle}
              onChange={(e) => handleJobTitleChange(e.target.value)}
              className="
                w-full mt-2 p-3 rounded-lg 
                bg-black/40 border border-white/10 
                focus:ring-2 focus:ring-indigo-500/40
              "
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-300">Preferred Location</label>
            <input
              type="text"
              placeholder="e.g. Delhi, Bangalore, Remote"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="
                w-full mt-2 p-3 rounded-lg 
                bg-black/40 border border-white/10 
                focus:ring-2 focus:ring-indigo-500/40
              "
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="text-sm text-gray-300">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => handleJobTypeChange(e.target.value)}
              className="
                w-full mt-2 p-3 rounded-lg 
                bg-black/40 border border-white/10 
                focus:ring-2 focus:ring-indigo-500/40
              "
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm text-gray-300">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => handleExperienceChange(e.target.value)}
              className="
                w-full mt-2 p-3 rounded-lg 
                bg-black/40 border border-white/10 
                focus:ring-2 focus:ring-indigo-500/40
              "
            >
              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>
        </div>

        {/* ---------------- BUTTONS ---------------- */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Recommender */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={goToAIRecommender}
            className="
              p-6 rounded-2xl 
              bg-black/40 border border-indigo-400/30
              shadow-[0_0_20px_rgba(124,58,237,0.3)]
              hover:shadow-[0_0_25px_rgba(124,58,237,0.45)]
              transition
            "
          >
            <h2 className="text-xl font-bold text-indigo-300">
              AI Job Recommender
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              AI will analyze your resume + job title to suggest the best roles.
            </p>
          </motion.button>

          {/* Live Job Fetching */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={goToLiveJobs}
            className="
              p-6 rounded-2xl 
              bg-black/40 border border-teal-400/30
              shadow-[0_0_20px_rgba(19,255,236,0.25)]
              hover:shadow-[0_0_25px_rgba(19,255,236,0.45)]
              transition
            "
          >
            <h2 className="text-xl font-bold text-teal-300">
              Live Job Fetching
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              Fetch real job openings from Adzuna based on your details.
            </p>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
