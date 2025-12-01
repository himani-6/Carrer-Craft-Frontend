"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { saveATSHistory } from "../../../lib/firestore";

export default function AtsLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      runAnalysis(currentUser);
    });

    return () => unsub();
  }, []);

  const runAnalysis = async (user) => {
    const payloadStr = sessionStorage.getItem("atsPayload");
    if (!payloadStr) {
      alert("No ATS data found. Please upload your resume again.");
      router.push("/ats");
      return;
    }

    const payload = JSON.parse(payloadStr);

    try {
      const formData = new FormData();
      formData.append(
        "file",
        dataURLtoFile(payload.fileBase64, payload.fileName)
      );
      formData.append("job_description", payload.jobDescription);

      const res = await fetch("http://127.0.0.1:8000/ats-analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend error");

      const result = await res.json();

      // Save to sessionStorage
      sessionStorage.setItem("atsResult", JSON.stringify(result));

      let savedId = null;

      // Save to Firestore (only if logged in)
      if (user) {
        savedId = await saveATSHistory(user.uid, result);
      }

      // ⏳ ⭐ FORCE Neon Loading Screen to stay visible for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Redirect
      if (savedId) {
        router.push(`/ats/result?id=${savedId}`);
      } else {
        router.push("/ats/result");
      }
    } catch (err) {
      console.error("ATS ERROR:", err);
      alert("Backend error. Try again.");
      router.push("/ats");
    }
  };

  function dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  }

  return (
    <section
      className="min-h-screen px-6 py-16 relative text-white flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/category_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div
          className="relative w-48 h-48 flex items-center justify-center rounded-full"
          style={{
            boxShadow:
              "0 0 40px rgba(19,255,236,0.35), 0 0 70px rgba(99,102,241,0.32), 0 0 120px rgba(124,58,237,0.28)",
            animation: "pulseGlow 2.2s infinite ease-in-out",
            border: "4px solid rgba(99,102,241,0.45)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full border-4 border-indigo-500"
            style={{
              animation: "spinElectric 3.5s linear infinite",
              boxShadow:
                "0 0 35px rgba(19,255,236,0.32), inset 0 0 30px rgba(124,58,237,0.26)",
            }}
          ></div>

          <p className="text-indigo-300 text-xl font-semibold tracking-wide">
            Analyzing...
          </p>
        </div>

        <p className="mt-8 text-gray-300 text-center">
          We’re scanning your resume with AI…
        </p>
      </div>

      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: .8; }
            50% { opacity: 1; }
            100% { opacity: .8; }
          }
          @keyframes spinElectric {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
}

