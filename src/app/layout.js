import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./glowfix.css";
import "./print.css";
import { Toaster } from "react-hot-toast";

import { ResumeProvider } from "../context/ResumeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Career Craft",
  description: "Resume Builder + ATS + Job Recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Global providers */}
        <ResumeProvider>
          {children}
        </ResumeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}

