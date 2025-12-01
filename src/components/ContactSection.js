// src/app/components/ContactSection.js
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); alert("Thanks! We'll contact you."); setForm({ name: "", email: "", message: "" }); };

  return (
    <section className="py-16" style={{ backgroundImage: "url('/images/contact_bg.jpg')" }}>
      <div className="bg-black/60 py-16">
        <div className="max-w-3xl mx-auto px-6 text-white">
          <motion.h3 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-2xl font-bold mb-6 text-center">
            Contact Us
          </motion.h3>
          <motion.form onSubmit={submit} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-white/5 p-6 rounded-lg">
            <input name="name" value={form.name} onChange={change} required placeholder="Name" className="w-full p-3 mb-3 rounded bg-white/10 text-white" />
            <input name="email" value={form.email} onChange={change} required placeholder="Email" className="w-full p-3 mb-3 rounded bg-white/10 text-white" />
            <textarea name="message" value={form.message} onChange={change} required rows={4} placeholder="Message" className="w-full p-3 mb-3 rounded bg-white/10 text-white" />
            <motion.button whileHover={{ scale: 1.03 }} className="bg-cyan-400 text-black px-5 py-2 rounded font-semibold">Send</motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}