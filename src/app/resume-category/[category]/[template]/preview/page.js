"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import * as PREVIEWS from "../../../PreviewLayouts";
import "../../../../fullPreview.css";

// FIREBASE
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const PAGE_HEIGHT = 1122;

export default function FullPreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { category = "unknown", template = "Template" } = params || {};
  const isPrintMode = searchParams?.get("printMode") === "1";

  const storageKey = `rc_resume_${category}_${template}`;

  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // ⭐ New short “Saved ✔” UI state
  const [showSaved, setShowSaved] = useState(false);

  const PreviewComponent =
    PREVIEWS[template] ||
    PREVIEWS.DefaultPreview ||
    (() => <div>No preview template found.</div>);

  // Load Firebase user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Load resume from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setData(JSON.parse(raw));
    } catch (err) {
      console.warn("Failed loading resume:", err);
    }
  }, [storageKey]);

  // Auto-paginate
  useEffect(() => {
    if (!data) return;
    const timer = setTimeout(() => {
      autoPaginate();
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  // ⭐ SAVE TO FIREBASE (used by print)
  async function saveToFirestore() {
    try {
      if (!currentUser) return false;

      const resumeId = `${category}_${template}`;

      await setDoc(
        doc(db, "users", currentUser.uid, "resumes", resumeId),
        {
          resumeData: data,
          category,
          template,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      return true;
    } catch (err) {
      console.error("Firestore save error:", err);
      return false;
    }
  }

  // PAGE SPLIT LOGIC
  function autoPaginate() {
    const previewRoot = document.getElementById("resume-preview");
    if (!previewRoot) return;

    const docNode = previewRoot;
    const children = Array.from(docNode.children);
    if (children.length === 0) return;

    const firstPage = children[0];

    // remove children from duplicate pages
    const pages = Array.from(docNode.querySelectorAll(".resume-page"));
    for (let i = 1; i < pages.length; i++) {
      const page = pages[i];
      while (page.firstChild) {
        firstPage.appendChild(page.firstChild);
      }
      page.remove();
    }

    let currentPage = firstPage;
    let currentHeight = 0;

    const blocks = Array.from(firstPage.children);
    blocks.forEach((item) => {
      const h = item.offsetHeight || 0;

      if (currentHeight + h > PAGE_HEIGHT && currentPage.children.length > 0) {
        const newPage = firstPage.cloneNode(false);
        newPage.classList.add("resume-page");
        docNode.appendChild(newPage);
        currentPage = newPage;
        currentHeight = 0;
      }

      currentPage.appendChild(item);
      currentHeight += h;
    });
  }

  // ⭐ PRINT HANDLER — Save first, show small "Saved ✔"
  const handlePrint = async () => {
    const ok = await saveToFirestore();

    if (ok) {
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }

    setTimeout(() => {
      window.print();
    }, 400);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#030617]">
        Loading resume...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#030617] text-white ${
        isPrintMode ? "p-0" : "p-6"
      } print:p-0`}
    >
      {/* ⭐ SMALL SAVED ✔ INDICATOR */}
      {showSaved && (
        <div
          className="fixed top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-md fade-out no-print"
          style={{ zIndex: 9999 }}
        >
          ✔ Saved
        </div>
      )}

      {!isPrintMode && (
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-4 no-print">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            ← Back
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 shadow-md text-sm no-print"
          >
            Print / Save as PDF
          </button>
        </div>
      )}

      {/* PAGED PREVIEW */}
      <div className="flex justify-center w-full">
        <div id="resume-preview">
          <div className="resume-page">
            <PreviewComponent data={data} />
          </div>
        </div>
      </div>

      {/* HIDE SAVED INDICATOR IN PRINT */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }

        .fade-out {
          animation: fadeOut 2s ease-out forwards;
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
