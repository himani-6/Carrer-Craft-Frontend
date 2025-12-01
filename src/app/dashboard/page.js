"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");

  // ⭐ DATA FROM FIRESTORE
  const [resumes, setResumes] = useState([]);
  const [atsHistory, setAtsHistory] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPhoto(currentUser.photoURL || "");
        setName(currentUser.displayName || currentUser.email.split("@")[0]);

        // Load Firestore data for dashboard
        loadResumes(currentUser.uid);
        loadATSHistory(currentUser.uid);
      } else {
        setUser(null);
        setPhoto("");
        setName("");
        setResumes([]);
        setAtsHistory([]);
      }
    });

    return () => unsub();
  }, []);

  // ⭐ Load saved resumes
  async function loadResumes(uid) {
    try {
      const ref = collection(db, "users", uid, "resumes");
      const snapshot = await getDocs(ref);

      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setResumes(list);
    } catch (err) {
      console.error("Error loading resumes:", err);
    }
  }

  // ⭐ Load ATS history
  async function loadATSHistory(uid) {
    try {
      const ref = collection(db, "atsHistory");
      const q = query(ref, where("userId", "==", uid));
      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setAtsHistory(list);
    } catch (err) {
      console.error("Error loading ATS history:", err);
    }
  }

  return (
    <div
      className="min-h-screen relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/dashboard_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* TOP HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-800/70 via-gray-900/70 to-black/70 
                     backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-indigo-300">
                Your Dashboard
              </h1>
              <p className="text-gray-200 mt-1">
                Manage and edit your resumes easily.
              </p>
            </div>

            <Link href="/support">
              <button className="px-4 py-2 rounded-lg 
                     bg-indigo-500/40 border border-indigo-300/30 
                     hover:bg-indigo-600/50 hover:border-indigo-400 
                     transition text-white">
                Need Help?
              </button>
            </Link>
          </div>
        </motion.div>

        {/* GRID: LEFT + RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-12">

          {/* LEFT SIDE */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-800/70 via-gray-900/70 to-black/70
                       backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl"
          >
            <h3 className="text-indigo-300 text-xl font-semibold mb-4">
              Welcome
            </h3>

            <div className="flex items-center gap-4">
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold">
                  {name?.[0]?.toUpperCase()}
                </div>
              )}

              <div>
                <p className="font-semibold">{name || "Guest User"}</p>
                <p className="text-sm text-gray-300">
                  {user?.email || "Not signed in"}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <h4 className="text-sm text-indigo-300 font-semibold">
                Quick Actions
              </h4>

              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/resume-category"
                    className="block px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    + Create New Resume
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ats"
                    className="block px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    ✓ Check ATS Score
                  </Link>
                </li>
              </ul>
            </div>
          </motion.aside>

          {/* RIGHT SIDE – LIST OF RESUMES + ATS HISTORY */}
          <motion.section
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 bg-gradient-to-br 
                       from-gray-800/70 via-gray-900/70 to-black/70
                       backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">
              My Resumes
            </h2>

            {/* RESUME LIST */}
            {resumes.length === 0 ? (
              <div className="rounded-xl bg-black/40 p-6 border border-gray-700 text-gray-300">
                🚧 No resumes yet. Create one from “Quick Actions”.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {resumes.map((item) => (
                  <Link
                    key={item.id}
                    href={`/resume-category/${item.category}/${item.template}/preview`}
                  >
                    <div className="p-5 rounded-xl bg-black/40 border border-gray-700 hover:bg-black/60 transition cursor-pointer">
                      <h3 className="text-indigo-300 font-semibold">{item.template}</h3>
                      <p className="text-gray-400 text-sm">{item.category}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Updated: {new Date(item.updatedAt.seconds * 1000).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* ATS HISTORY */}
            <h2 className="text-2xl font-bold text-indigo-300 mt-10 mb-4">
              ATS History
            </h2>

            {atsHistory.length === 0 ? (
              <div className="rounded-xl bg-black/40 p-6 border border-gray-700 text-gray-300">
                🚧 No ATS checks yet.
              </div>
            ) : (
              <div className="space-y-4">
                {atsHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-black/40 border border-gray-700 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-indigo-300 font-semibold">
                        Score: {item.score}%
                      </p>
                      <p className="text-gray-400 text-sm">
                        {item.createdAt?.seconds
                          ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                          : "—"}
                      </p>
                    </div>

                    <Link
                      href={`/ats/result?id=${item.id}`}

                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm"
                    >
                      View Report
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}
