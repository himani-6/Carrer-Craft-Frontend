"use client";

import React from "react";
import Link from "next/link";

export default function NeedHelpSection() {
  return (
    <div className="w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center px-4 rounded-2xl shadow-xl border border-white/10 mt-10">

      <h1 className="text-4xl font-bold mb-4">Need Help?</h1>

      <p className="text-gray-400 text-lg text-center max-w-2xl mb-6">
        We’re here to guide you! Contact us for any questions about using CareerCraft
        or career advice powered by AI.
      </p>

      {/* ⭐ THIS BUTTON NOW WORKS 100% */}
      <Link href="/support">
        <button
          className="
            mt-4 px-8 py-3 rounded-xl 
            bg-indigo-600/70 border border-indigo-400/40 
            hover:bg-indigo-600/90 transition-all shadow-lg
          "
        >
          Go to Help Page
        </button>
      </Link>

    </div>
  );
}

