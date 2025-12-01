import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <Image
        src="/images/404.jpg"
        alt="404 Error"
        width={400}
        height={400}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-400 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}