"use client";

import { Suspense } from "react";
import AtsResultContent from "./AtsResultContent";

export default function AtsResultPageWrapper() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <AtsResultContent />
    </Suspense>
  );
}
