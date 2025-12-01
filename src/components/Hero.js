"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useSearchParams } from "next/navigation";

export default function Hero() {
  const [userName, setUserName] = useState(null);
  const [greetText, setGreetText] = useState("");
  const [heading, setHeading] = useState("");
  const [offsetTop, setOffsetTop] = useState(0);
  const searchParams = useSearchParams();

  const isNewUser = searchParams.get("newUser") === "true"; // detect signup

  /* --------------------------------------------------------
        FIX NAVBAR GAP — read actual navbar height
  ---------------------------------------------------------*/
  useEffect(() => {
    if (typeof window !== "undefined") {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setOffsetTop(navbar.offsetHeight);
      }
    }
  }, []);

  /* --------------------------------------------------------
        FETCH USER AND NAME
  ---------------------------------------------------------*/
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.email?.split("@")[0];
        setUserName(name);
      } else {
        setUserName(null);
      }
    });
    return () => unsub();
  }, []);

  /* --------------------------------------------------------
        TYPEWRITER GREETING
  ---------------------------------------------------------*/
  useEffect(() => {
    let text = "";

    if (!userName) {
      text = "Welcome!";
    } else if (isNewUser) {
      text = `Welcome, ${userName}!`;
    } else {
      text = `Welcome back, ${userName}!`;
    }

    let index = 0;
    const interval = setInterval(() => {
      setGreetText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [userName, isNewUser]);

  /* --------------------------------------------------------
        TYPEWRITER MAIN HEADING (loop)
  ---------------------------------------------------------*/
  useEffect(() => {
    const fullText = "Build Your Career with AI";
    let index = 0;
    let isDeleting = false;

    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        setHeading(fullText.slice(0, index));
        index++;

        if (index > fullText.length) {
          isDeleting = true;
          setTimeout(() => {}, 1000);
        }
      } else {
        setHeading(fullText.slice(0, index));
        index--;

        if (index < 0) {
          isDeleting = false;
          index = 0;
        }
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  /* --------------------------------------------------------
        HERO STYLE (removes black gap perfectly)
  ---------------------------------------------------------*/
  const heroStyle = {
    backgroundImage: "url('/images/hero_bg.jpg')",
    minHeight: `calc(100vh - ${offsetTop}px)`,
    marginTop: `-${offsetTop}px`,
    paddingTop: `${offsetTop}px`,
  };

  return (
    <section
      className="relative flex items-center justify-center bg-cover bg-center"
      style={heroStyle}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative text-center px-6 max-w-3xl text-white"
      >
        {/* Greeting */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-indigo-300 drop-shadow-[0_0_10px_rgba(99,102,241,0.9)]">
            {greetText}
          </span>
        </h2>

        {/* Main heading with typewriter */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-300 mb-4 whitespace-nowrap">
          {heading}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-gray-200 mb-8 text-lg">
          Create professional resumes, check ATS compatibility, and get matched with jobs — all from one free platform.
        </p>

        {/* Show Login / Signup only if not logged in */}
        {!userName && (
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-white/10 border border-white/30 text-white font-semibold 
                           hover:bg-white/20 hover:text-indigo-300 transition-all"
              >
                Login
              </motion.button>
            </Link>

            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-white/10 border border-white/30 text-white font-semibold 
                           hover:bg-white/20 hover:text-indigo-300 transition-all"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}


