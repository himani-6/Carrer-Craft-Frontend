// src/app/resumeTemplates/modern/ModernSidebar.js
import React from "react";

const ModernSidebar = ({ data }) => {
  // CONTACT (all fields)
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
    address: data?.address || "",
  };

  // ARRAYS
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const languages = Array.isArray(data?.languages) ? data.languages : []; // FIXED
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow">

        <div className="min-h-screen flex overflow-y-auto">
          {/* LEFT SIDEBAR */}
          <aside className="w-1/3 bg-gray-100 border-r border-gray-200 p-6 space-y-8">

            {/* CONTACT */}
            <section className="resume-section">
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
                Contact
              </h2>
              <ul className="text-sm text-gray-700 space-y-1 break-words">
                {contact.email && <li>📧 {contact.email}</li>}
                {contact.phone && <li>📞 {contact.phone}</li>}
                {contact.linkedin && <li>🌐 {contact.linkedin}</li>}
                {contact.github && <li>💻 {contact.github}</li>}
                {contact.portfolio && <li>🔗 {contact.portfolio}</li>}
                {contact.address && <li>📍 {contact.address}</li>}
              </ul>
            </section>

            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="resume-section">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
                  Skills
                </h2>
                <ul className="text-sm text-gray-700 space-y-2 break-words">
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* LANGUAGES — FIXED */}
            {languages.length > 0 && (
              <section className="resume-section">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
                  Languages
                </h2>
                <ul className="text-sm text-gray-700 space-y-1 break-words">
                  {languages.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* CUSTOM SECTIONS (left side, under languages) */}
            {customSections.length > 0 &&
              customSections.map((sec, idx) => (
                <section key={idx} className="resume-section">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
                    {sec.heading || "Section"}
                  </h2>

                  {Array.isArray(sec.content) ? (
                    <ul className="list-disc ml-4 space-y-1 text-sm text-gray-700">
                      {sec.content.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700 break-words">
                      {sec.content}
                    </p>
                  )}
                </section>
              ))}
          </aside>

          {/* RIGHT SIDE AREA */}
          <main className="w-2/3 p-8 space-y-10">

            {/* HEADER (NO PHOTO — FIXED) */}
            <header className="resume-section">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight break-words">
                {data?.fullName || ""}
              </h1>
              <p className="text-teal-600 font-medium text-lg break-words">
                {data?.role || ""}
              </p>
            </header>

            {/* SUMMARY */}
            <section className="resume-section">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wide">
                Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed break-words">
                {data?.summary || ""}
              </p>
            </section>

            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section className="resume-section">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wide">
                  Experience
                </h2>

                {experience.map((exp, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="font-semibold text-gray-900 break-words">
                      {exp?.title || ""}
                      {exp?.company ? ` — ${exp.company}` : ""}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                      {exp?.duration || ""}
                    </p>

                    {exp?.description &&
                      (Array.isArray(exp.description) ? (
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                          {exp.description.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                          {String(exp.description)
                            .split("\n")
                            .map((d) => d.trim())
                            .filter(Boolean)
                            .map((d, i2) => (
                              <li key={i2}>{d}</li>
                            ))}
                        </ul>
                      ))}
                  </div>
                ))}
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="resume-section">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wide">
                  Education
                </h2>

                {education.map((ed, i) => (
                  <div key={i} className={i === 0 ? "" : "mt-2"}>
                    <p className="font-semibold text-gray-900 break-words">
                      {ed?.degree || ""}
                    </p>
                    <p className="text-sm text-gray-600 italic break-words">
                      {ed?.school ? `${ed.school} — ${ed?.year || ""}` : ed?.year}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <section className="resume-section">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wide">
                  Projects
                </h2>

                {projects.map((p, i) => (
                  <div key={i} className={i === 0 ? "" : "mt-3"}>
                    <h3 className="font-semibold text-gray-900 break-words">
                      {p?.title || ""}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed break-words">
                      {p?.description || ""}
                      {p?.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-600 hover:underline ml-1"
                        >
                          {p.link}
                        </a>
                      )}
                    </p>
                  </div>
                ))}
              </section>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default ModernSidebar;
