// src/app/components/HelpSection.js
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HelpSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            Check guides and FAQs to make the best resume for your target role — both for India and international formats.
          </p>
          <Link href="/help">
            <motion.button whileHover={{ scale: 1.05 }} className="bg-indigo-600 text-white px-5 py-3 rounded">
              Go to Help
            </motion.button>
          </Link>
        </motion.div>

        <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="md:w-1/2">
          <Image src="/images/help_illustration.jpg" alt="Help" width={600} height={400} className="rounded-lg shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
}