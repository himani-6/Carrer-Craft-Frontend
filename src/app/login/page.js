"use client";

import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      // ✅ Mark as returning user
      localStorage.setItem("newUser", "false");

      router.push("/");
    } catch (err) {
      setError("⚠ " + err.message);
    }
  };

  // 🔹 Google Login
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      // ✅ Mark as returning user
      localStorage.setItem("newUser", "false");

      router.push("/");
    } catch (err) {
      setError("⚠ " + err.message);
    }
  };

  // 🔹 Apple (disabled)
  const handleAppleSignIn = () => {
    alert("Apple Sign-In is not available. Please use Google or Email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.form
        className="bg-gray-900/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          required
        />

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <Link href="/forgot-password" className="text-cyan-300 text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg"
        >
          Login
        </motion.button>

        {/* Divider */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Or continue with
        </div>

        {/* Google & Apple */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center gap-2 text-gray-200 hover:text-white transition-all duration-300"
          >
            <img
              src="/images/google_logo.png"
              alt="Google"
              className="w-8 h-8 object-contain rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <button
            onClick={handleAppleSignIn}
            type="button"
            className="flex items-center gap-2 text-gray-200 hover:text-white transition-all duration-300"
          >
            <img
              src="/images/apple_logo.png"
              alt="Apple"
              className="w-8 h-8 object-contain rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            />
            <span className="text-sm font-medium">Continue with Apple</span>
          </button>
        </div>

        {/* Link to Signup */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-cyan-300 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
