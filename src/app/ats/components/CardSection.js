"use client";

import React from "react";

export default function CardSection({ title, accent = "blue", children }) {
  const accentClass = {
    blue: "text-blue-300",
    red: "text-red-300",
    green: "text-green-300",
    yellow: "text-yellow-300",
    purple: "text-purple-300",
    teal: "text-teal-300",
  }[accent];

  return (
    <section
      className="rounded-xl p-5 bg-gradient-to-b from-black/40 to-black/20 border border-white/10 backdrop-blur-md shadow-xl"
      role="region"
      aria-labelledby={`section-${title}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 id={`section-${title}`} className={`${accentClass} text-lg font-semibold`}>
          {title}
        </h3>
      </div>

      <div className="pt-1">{children}</div>
    </section>
  );
}
