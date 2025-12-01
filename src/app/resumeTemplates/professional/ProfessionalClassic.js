// src/app/resumeTemplates/professional/ProfessionalClassic.js
import React from "react";

const ProfessionalClassic = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";

  const email = data?.email || "";
  const phone = data?.phone || "";
  const address = data?.address || "";
  const linkedin = data?.linkedin || "";
  const github = data?.github || "";
  const portfolio = data?.portfolio || "";

  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const contactParts = [];
  if (email) contactParts.push(email);
  if (phone) contactParts.push(phone);
  if (address) contactParts.push(address);
  if (linkedin) contactParts.push(linkedin);
  if (github) contactParts.push(github);
  if (portfolio) contactParts.push(portfolio);

  const contactLine = contactParts.join(" • ");

  const mid = Math.ceil(skills.length / 2);
  const col1 = skills.slice(0, mid);
  const col2 = skills.slice(mid);

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-900 w-[210mm] min-h-[297mm] p-10 leading-relaxed font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center border-b border-gray-300 pb-4 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
            <h2 className="text-lg text-gray-600 font-medium">{role}</h2>
            {contactLine && (
              <p className="text-sm text-gray-500 mt-2">{contactLine}</p>
            )}
          </header>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="resume-section">
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {summary}
              </p>
            </section>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title || ""}
                      {exp?.company ? ` — ${exp.company}` : ""}
                    </p>
                    {exp?.duration && (
                      <p className="text-gray-500 text-xs mb-1">
                        {exp.duration}
                      </p>
                    )}
                    {Array.isArray(exp?.bullets) ? (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    ) : exp?.description ? (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>{exp.description}</li>
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Education
              </h3>
              <div className="space-y-4 text-sm">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold">{ed?.degree || ""}</p>
                    {ed?.school && (
                      <p className="text-gray-600">{ed.school}</p>
                    )}
                    {ed?.year && (
                      <p className="text-gray-500 text-xs">
                        Graduated: {ed.year}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Skills
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-wrap gap-2">
                  {col1.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-blue-600 text-white shadow-sm"
                    >
                      {typeof s === "string" ? s : s?.name || ""}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {col2.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-blue-600 text-white shadow-sm"
                    >
                      {typeof s === "string" ? s : s?.name || ""}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Projects
              </h3>
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {proj?.title || proj?.name || ""}
                    </p>
                    {proj?.description && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>{proj.description}</li>
                      </ul>
                    )}
                    {proj?.link && (
                      <p className="text-blue-600 text-xs mt-1">{proj.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((sec, i) => (
            <div className="resume-section" key={i}>
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                  {sec.heading || ""}
                </h3>
                {Array.isArray(sec?.content) ? (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {sec.content.map((c, ci) => (
                      <li key={ci}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {sec.content || ""}
                  </p>
                )}
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfessionalClassic;
