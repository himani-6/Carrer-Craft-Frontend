// DefaultPreview.js
import React from "react";

export default function DefaultPreview({ data = {}, theme = {} }) {
  return (
    <div className="max-w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-indigo-600">{data.name || "Your Name"}</div>
          <div className="text-sm text-gray-700 mt-1">{data.title || "Job Title"}</div>
        </div>

        <div className="text-right text-sm text-gray-600">
          <div>{data.contact?.email}</div>
          <div>{data.contact?.phone}</div>
          <div className="text-indigo-600">{data.contact?.linkedin}</div>
        </div>
      </div>

      {data.summary && (
        <div className="mt-6">
          <h3 className="text-indigo-600 font-semibold">Profile</h3>
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{data.summary}</p>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-indigo-600 font-semibold">Experience</h3>
          <div className="mt-2 space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div className="font-medium">{exp.role} — {exp.company}</div>
                  <div className="text-sm text-gray-600">{exp.from} — {exp.to}</div>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {exp.bullets?.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-indigo-600 font-semibold">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <div key={i} className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700">{s}</div>
            ))}
          </div>
        </div>
      )}

      {data.sections?.length > 0 && (
        <div className="mt-6 space-y-4">
          {data.sections.map((s) => (
            <div key={s.id}>
              <h3 className="text-indigo-600 font-semibold">{s.title}</h3>
              {s.type === "text" ? (
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{s.content}</p>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                  {s.content?.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
