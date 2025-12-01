"use client";

import React from "react";

export default function ScoreCircle({ score = 0 }) {
  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 0 25px rgba(19,255,236,0.28), 0 0 45px rgba(99,102,241,0.25), 0 0 85px rgba(124,58,237,0.22)",
          animation: "pulseGlow 3s infinite ease-in-out",
        }}
      />

      <div
        className="absolute inset-0 rounded-full border-4 border-indigo-500"
        style={{
          animation: "spinElectric 4s linear infinite",
          boxShadow:
            "0 0 20px rgba(19,255,236,0.25), inset 0 0 20px rgba(124,58,237,0.2)",
        }}
      />

      <h1 className="relative text-4xl md:text-5xl font-bold text-indigo-300 drop-shadow-lg">
        {score}%
      </h1>

      <style jsx>{`
        @keyframes pulseGlow {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        @keyframes spinElectric {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
