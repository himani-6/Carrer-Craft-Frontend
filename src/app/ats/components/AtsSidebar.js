"use client";

import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function AtsSidebar({ items = [], score = 0, onAnalyze = () => {} }) {
  return (
    <aside className="rounded-xl p-5 bg-gradient-to-b from-black/40 to-black/20 border border-white/10 backdrop-blur-md shadow-xl">
      <div className="mb-4 text-center">
        <h3 className="text-sm text-gray-400 uppercase tracking-wide">Quick Overview</h3>
        <p className="text-indigo-300 font-bold text-2xl mt-2">{score}%</p>
        <p className="text-gray-400 text-xs mt-1">Resume Match Score</p>
      </div>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {it.ok ? (
                <CheckCircleIcon className="w-6 h-6 text-green-300" />
              ) : (
                <XCircleIcon className="w-6 h-6 text-red-300" />
              )}
              <span className={`text-sm ${it.ok ? "text-gray-100" : "text-gray-300"}`}>
                {it.label}
              </span>
            </div>
            <div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  it.ok ? "bg-green-900/30 text-green-200" : "bg-red-900/30 text-red-200"
                }`}
              >
                {it.ok ? "OK" : "Fix"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={onAnalyze}
          className="w-full px-3 py-2 rounded-md bg-indigo-600/20 text-indigo-100 text-sm border border-indigo-300/10"
        >
          Analyze Another
        </button>
      </div>
    </aside>
  );
}
