"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset link has been sent to your email!");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center w-[90%] max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-cyan-300">Forgot Password?</h2>
        <p className="text-gray-300 mb-4 text-sm">
          Enter your registered email, and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg bg-black/40 border border-gray-400 text-white placeholder-gray-400"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="bg-cyan-400 text-black font-semibold py-2 rounded-lg"
          >
            Send Reset Link
          </motion.button>
        </form>

        {message && <p className="text-green-400 mt-4 text-sm">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

        <div className="mt-6 text-sm text-gray-300">
          <Link href="/login" className="text-cyan-300 hover:underline">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </section>
  );
}