// src/app/components/Photo.js
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Photo({ src = "/images/404.jpg", alt = "Image" }) {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-900">
      <motion.div initial={{ scale: .95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .8 }}>
        <Image src={src} alt={alt} width={420} height={420} className="rounded-lg shadow-2xl" />
      </motion.div>
    </section>
  );
}