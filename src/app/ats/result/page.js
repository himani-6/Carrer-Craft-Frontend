"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import AtsSidebar from "../components/AtsSidebar";
import ScoreCircle from "../components/ScoreCircle";
import CardSection from "../components/CardSection";
import LoadingAnimation from "../components/LoadingAnimation";

export default function AtsResultPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const id = params.get("id");

    // 🔥 CASE 1: If an ID is present → load from Firestore (correct historical report)
    if (id) {
      loadFromFirestore(id);
      return;
    }

    // 🔥 CASE 2: If no ID (old behavior) → fallback to sessionStorage
    const stored = sessionStorage.getItem("atsResult");
    if (!stored) {
      alert("No ATS result found. Please analyze again.");
      router.push("/ats");
      return;
    }
    setData(JSON.parse(stored));
  }, [router, params]);

  // ------------------------------------------------------
  // 🔥 Load the *correct* ATS result from Firestore
  // ------------------------------------------------------
  async function loadFromFirestore(id) {
    try {
      const ref = doc(db, "atsHistory", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("This ATS report no longer exists.");
        router.push("/dashboard");
        return;
      }

      const raw = snap.data();
      setData(raw.result); // ⭐ load the REAL ATS data
    } catch (err) {
      console.error("Failed to load ATS report:", err);
      alert("Failed to load report.");
    }
  }

  if (!data) {
    return <LoadingAnimation />;
    }

  // normalize fields and provide safe defaults
  const {
    score = 0,
    matched_keywords = [],
    missing_keywords = [],
    formatting_issues = [],
    suggestions = [],
    strengths = [],
    extracted = {},
    grammatical_errors = [],
    professional_tone = "",
    unnecessary_info = [],
    experience_relevance = "",
    skills_relevance = {},
  } = data;

  const scoreLabel =
    score >= 85
      ? "Excellent"
      : score >= 65
      ? "Good"
      : score >= 45
      ? "Fair"
      : "Needs Improvement";

  const sidebarItems = [
    {
      key: "keywordMatch",
      label: "Keyword Match",
      ok: matched_keywords.length > 0,
    },
    {
      key: "grammar",
      label: "Grammar & Spelling",
      ok: grammatical_errors.length === 0,
    },
    { key: "strengths", label: "Strengths", ok: strengths.length > 0 },
    {
      key: "missingKeywords",
      label: "Missing Keywords",
      ok: missing_keywords.length === 0,
    },
    {
      key: "formatting",
      label: "Formatting",
      ok: formatting_issues.length === 0,
    },
    { key: "suggestions", label: "Suggestions", ok: suggestions.length === 0 },
  ];

  return (
    <section
      className="min-h-screen px-4 md:px-8 py-10 relative text-white"
      style={{
        backgroundImage: "url('/images/category_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* SCORE CIRCLE */}
        <div className="flex flex-col items-center md:items-center">
          <ScoreCircle score={score} />
          <div className="mt-3 text-center">
            <h2 className="text-indigo-300 text-xl font-semibold">
              {scoreLabel}
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              AI-powered ATS evaluation — overall match to job description
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
          {/* SIDEBAR */}
          <div className="md:sticky md:top-28 z-20">
            <AtsSidebar
              items={sidebarItems}
              score={score}
              onAnalyze={() => router.push("/ats")}
            />
          </div>

          {/* MAIN CONTENT */}
          <main className="space-y-6">
            {/* Extracted Data */}
            <CardSection title="Extracted Data" accent="blue">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Name</p>
                  <p className="mt-1 text-gray-100 font-medium">
                    {extracted.name || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="mt-1 text-gray-100 font-medium">
                    {extracted.email || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Target Position</p>
                  <p className="mt-1 text-gray-100 font-medium">
                    {extracted.position || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Experience</p>
                  <p className="mt-1 text-gray-100 font-medium">
                    {extracted.experience || "Fresher"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-gray-400 text-xs">Top Skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(extracted.skills || []).length === 0 ? (
                      <span className="text-gray-400 text-sm">
                        No skills extracted
                      </span>
                    ) : (
                      (extracted.skills || []).map((s, idx) => (
                        <span
                          key={idx}
                          className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10"
                        >
                          {s}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </CardSection>

            {/* Grammar */}
            <CardSection title="Grammar & Spelling Errors" accent="red">
              {grammatical_errors.length === 0 ? (
                <p className="text-gray-300">
                  No grammatical or spelling issues detected.
                </p>
              ) : (
                <ul className="space-y-2">
                  {grammatical_errors.map((err, idx) => (
                    <li
                      key={idx}
                      className="text-sm bg-white/5 px-3 py-2 rounded-md border border-red-400/10"
                    >
                      <span className="inline-block mr-2 text-red-300 font-semibold">
                        •
                      </span>
                      <span className="text-gray-200">{err}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardSection>

            {/* Professional Tone */}
            <CardSection title="Professional Tone" accent="yellow">
              {professional_tone ? (
                <p className="text-gray-200 text-sm">{professional_tone}</p>
              ) : (
                <p className="text-gray-300">No tone suggestions provided.</p>
              )}
            </CardSection>

            {/* Unnecessary Info */}
            <CardSection title="Unnecessary Information" accent="purple">
              {unnecessary_info.length === 0 ? (
                <p className="text-gray-300">
                  No unnecessary information detected.
                </p>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                  {unnecessary_info.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              )}
            </CardSection>

            {/* Relevance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardSection title="Experience Relevance" accent="blue">
                {experience_relevance ? (
                  <p className="text-gray-200 text-sm">
                    {experience_relevance}
                  </p>
                ) : (
                  <p className="text-gray-300">
                    No specific relevance feedback.
                  </p>
                )}
              </CardSection>

              <CardSection title="Skills Relevance" accent="green">
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Matched</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(skills_relevance.matched || []).length === 0 ? (
                        <span className="text-gray-400">None</span>
                      ) : (
                        (skills_relevance.matched || []).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-white/5 border"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Missing</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(skills_relevance.missing || []).length === 0 ? (
                        <span className="text-gray-400">None</span>
                      ) : (
                        (skills_relevance.missing || []).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-white/5 border"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardSection>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardSection
                title={`Matched Keywords (${matched_keywords.length})`}
                accent="teal"
              >
                <div className="flex flex-wrap gap-2">
                  {matched_keywords.length === 0 ? (
                    <span className="text-gray-400">No matched keywords</span>
                  ) : (
                    matched_keywords.map((k, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white/5 border"
                      >
                        {k}
                      </span>
                    ))
                  )}
                </div>
              </CardSection>

              <CardSection
                title={`Missing Keywords (${missing_keywords.length})`}
                accent="red"
              >
                <div className="flex flex-wrap gap-2">
                  {missing_keywords.length === 0 ? (
                    <span className="text-gray-400">No missing keywords</span>
                  ) : (
                    missing_keywords.map((k, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white/5 border"
                      >
                        {k}
                      </span>
                    ))
                  )}
                </div>
              </CardSection>
            </div>

            {/* Formatting & Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardSection title="Formatting Issues" accent="yellow">
                {formatting_issues.length === 0 ? (
                  <p className="text-gray-300">
                    No formatting issues detected.
                  </p>
                ) : (
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                    {formatting_issues.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </CardSection>

              <CardSection title="Suggestions" accent="blue">
                {suggestions.length === 0 ? (
                  <p className="text-gray-300">No suggestions provided.</p>
                ) : (
                  <ul className="list-decimal list-inside space-y-1 text-sm text-gray-200">
                    {suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                )}
              </CardSection>
            </div>

            {/* Strengths */}
            <CardSection title="Strengths" accent="purple">
              {strengths.length === 0 ? (
                <p className="text-gray-300">No strengths detected.</p>
              ) : (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                  {strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </CardSection>

            {/* CTA */}
            <div className="flex items-center justify-center py-6">
              <button
                onClick={() => router.push("/resume-category")}
                className="px-6 py-3 rounded-xl font-semibold text-indigo-50 border border-indigo-300/20 shadow-lg hover:scale-[1.03] transition"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.12), rgba(124,58,237,0.10))",
                  boxShadow:
                    "0 6px 24px rgba(99,102,241,0.08), 0 0 32px rgba(19,255,236,0.05)",
                }}
              >
                Improve Resume
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
