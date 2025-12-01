import React from "react";

export default function EducationBlock({ data }) {
  if (!data?.education?.length) return null;

  return (
    <section className="mb-6">
      <h3 className="font-semibold text-gray-900 text-lg mb-2">Education</h3>

      <div className="space-y-3">
        {data.education.map((edu, i) => (
          <div key={i}>
            <p className="font-semibold text-gray-900">
              {edu.degree}
              {edu.school ? ` — ${edu.school}` : ""}
            </p>
            {edu.year && (
              <p className="text-xs text-gray-500">{edu.year}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
