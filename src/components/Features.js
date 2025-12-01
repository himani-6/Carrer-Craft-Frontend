// src/app/components/Features.js
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const list = [
  {
    title: "Resume Builder",
    desc: "AI-powered templates for tech & non-tech roles.",
    img: "/images/resume_icon.jpg",
    link: "/resume-category",   // ✅ UPDATED
  },
  {
    title: "ATS Checker",
    desc: "See how ATS reads your CV and improve the score.",
    img: "/images/ats_icon.jpg",
    link: "/ats",
  },
  {
    title: "Job Matcher",
    desc: "Get targeted job suggestions based on your skills.",
    img: "/images/job_icon.jpg",
    link: "/job-matcher",
  },
];

export default function Features() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Track login state properly  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleFeatureClick = (link) => {
    if (!authChecked) return;
    if (user) router.push(link);
    else setShowPopup(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-indigo-300">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl text-center cursor-pointer hover:border-indigo-400/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
              onClick={() => handleFeatureClick(f.link)}
            >
              <div className="mx-auto w-24 h-24 mb-4">
                <Image
                  src={f.img}
                  alt={f.title}
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-200">
                {f.title}
              </h3>
              <p className="text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-gray-700 p-8 rounded-2xl text-center shadow-2xl w-80"
          >
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">
              Please sign in to access this feature
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium"
              >
                Sign Up
              </button>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 text-sm text-gray-400 hover:text-gray-200 underline"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
