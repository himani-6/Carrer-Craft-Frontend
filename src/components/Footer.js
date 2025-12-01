// src/app/components/Footer.js
"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold">CareerCraft</h4>
          <p className="text-gray-200 mt-3">AI-powered resume & job matching — free for students.</p>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/help">Help</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Resources</h5>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Resume Tips</li>
            <li>ATS Guide</li>
            <li>Interview Prep</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Follow Us</h5>
          <div className="flex gap-3">
            <a className="text-sm text-gray-200">LinkedIn</a>
            <a className="text-sm text-gray-200">GitHub</a>
            <a className="text-sm text-gray-200">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} CareerCraft — All rights reserved
      </div>
    </footer>
  );
}