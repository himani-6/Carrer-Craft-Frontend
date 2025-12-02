// src/app/ats/page.js
"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";   // ⭐ Needed for userId
import { auth } from "../../firebase/firebaseConfig";



export default function AtsUploadPage() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Convert file to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const validateFile = (file) => {
    if (!file) return false;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    return allowed.includes(file.type);
  };

  const handleFileSelect = async (file) => {
    setError("");
    if (!validateFile(file)) {
      setError("Please upload a PDF or DOC/DOCX file.");
      return;
    }
    setFileName(file.name);

    // Keep your base64 temp system (not used in new logic but safe)
    try {
      const base64 = await fileToBase64(file);
      sessionStorage.setItem(
        "atsTempFile",
        JSON.stringify({
          fileName: file.name,
          fileBase64: base64,
          jobDescription: jobDesc || "",
        })
      );
    } catch (err) {
      setError("Failed to read file. Try again.");
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFileSelect(file);
  };

  const pickFile = () => fileInputRef.current?.click();

  // ⭐⭐⭐ IMPORTANT: NEW ANALYZE FUNCTION (replaces old one)
  const handleAnalyze = async () => {
    setError("");

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please upload your resume (PDF/DOC/DOCX) before analyzing.");
      return;
    }

    if (!validateFile(file)) {
      setError("Please upload a PDF or DOC/DOCX file.");
      return;
    }

    if (!jobDesc || jobDesc.trim().length < 20) {
      const accept = confirm("Job description seems short. Analyze anyway?");
      if (!accept) return;
    }

    // ⭐ Get logged-in user
    
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to analyze ATS.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("job_description", jobDesc);
      formData.append("userId", user.uid); // ⭐ VERY IMPORTANT

      const res = await fetch("https://carrer-craft-backend.onrender.com/ats-analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to analyze resume.");
      }

      const data = await res.json();

      if (!data.id) {
        alert("Something went wrong — no report ID returned.");
        return;
      }

      sessionStorage.removeItem("atsTempFile");

      // ⭐ Redirect to saved Firestore result page
      router.push(`/ats/result?id=${data.id}`);

    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing. Try again.");
    }
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-300 text-center drop-shadow-lg">
          ATS Resume Analyzer
        </h1>

        <p className="text-center text-gray-300 mt-3">
          Upload your resume and paste the job description — check your ATS score instantly.
        </p>

        <div className="mt-12 bg-gradient-to-b from-black/40 to-black/20 rounded-xl border border-white/10 shadow-xl backdrop-blur-md overflow-hidden p-8"
          style={{
            boxShadow:
              "0 0 30px rgba(19,255,236,0.20), 0 0 60px rgba(99,102,241,0.18), 0 0 100px rgba(124,58,237,0.16)"
          }}
        >
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`relative rounded-lg border border-white/10 p-6 transition duration-300 ${
              dragOver ? "scale-[1.02]" : ""
            }`}
            style={{
              boxShadow:
                "0 0 35px rgba(19,255,236,0.28), 0 0 55px rgba(99,102,241,0.25), 0 0 85px rgba(124,58,237,0.22)"
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) await handleFileSelect(file);
              }}
            />

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 cursor-pointer" onClick={pickFile}>
                <div className="rounded-lg p-6 border-2 border-dashed border-indigo-700 hover:border-indigo-500 transition">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-md flex items-center justify-center text-indigo-200 text-xl font-semibold"
                      style={{
                        boxShadow:
                          "0 0 22px rgba(19,255,236,0.28), 0 0 44px rgba(99,102,241,0.25)",
                        background:
                          "linear-gradient(180deg, rgba(17,24,39,0.5), rgba(0,0,0,0.3))"
                      }}
                    >
                      📄
                    </div>

                    <div>
                      <p className="text-indigo-200 font-semibold">
                        {fileName || "Click to upload or drag & drop your resume"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Supported: PDF, DOC, DOCX
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80">
                <div
                  className="rounded-lg p-4 border border-white/10"
                  style={{
                    boxShadow:
                      "0 0 25px rgba(19,255,236,0.18), 0 0 40px rgba(99,102,241,0.15)"
                  }}
                >
                  <h4 className="text-indigo-300 font-semibold">Quick tips</h4>
                  <ul className="mt-3 text-sm text-gray-300 space-y-2">
                    <li>Use a clean resume layout.</li>
                    <li>Add relevant keywords.</li>
                    <li>Prefer PDF format.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm text-gray-300 mb-2">
                Job description
              </label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste job description here..."
                rows={8}
                className="w-full rounded-md p-4 bg-black/40 border border-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            {error && (
              <div className="mt-4 text-red-400 text-sm font-medium">{error}</div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAnalyze}
                className="px-6 py-3 rounded-xl font-semibold text-indigo-50 transition hover:scale-[1.03]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.25), rgba(124,58,237,0.22))",
                  boxShadow:
                    "0 0 32px rgba(99,102,241,0.25), 0 0 55px rgba(19,255,236,0.17)"
                }}
              >
                Analyze ATS Score
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
