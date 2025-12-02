"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {

  const [user, setUser] = useState(null);

  // Track login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";   // refresh UI after logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Left Section: Logo + Site Name */}
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.jpg"
            alt="CareerCraft Logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold tracking-wide">CarrerCraft</h1>
        </div>

        {/* Right Section: Navigation Links */}
        <ul className="flex space-x-8 text-lg">

          {/* Always visible */}
          <li>
            <Link
              href="/"
              className="transition-all duration-300 hover:text-blue-400 hover:scale-105"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/support"
              className="transition-all duration-300 hover:text-blue-400 hover:scale-105"
            >
              Help
            </Link>
          </li>

          {/* If NOT logged in → Login + Sign-up */}
          {!user && (
            <>
              <li>
                <Link
                  href="/login"
                  className="transition-all duration-300 hover:text-blue-400 hover:scale-105"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/signup"
                  className="transition-all duration-300 hover:text-blue-400 hover:scale-105"
                >
                  Sign-up
                </Link>
              </li>
            </>
          )}

          {/* If logged in → Dashboard + Logout */}
          {user && (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="transition-all duration-300 hover:text-blue-400 hover:scale-105"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="transition-all duration-300 hover:text-red-400 hover:scale-105"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
