// src/app/resumeTemplates/creative/CreativeColorBurst.js
import React from "react";

const CreativeColorBurst = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";

  const email = data?.email || "";
  const phone = data?.phone || "";
  const linkedin = data?.linkedin || "";

  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const customSections = data?.customSections ?? [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-800 p-10 leading-relaxed font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <div className="resume-block">
            <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center py-10 mb-8 rounded-xl shadow">
              <h1 className="text-4xl font-extrabold tracking-tight">
                {fullName}
              </h1>
              <h2 className="text-lg font-medium opacity-90">{role}</h2>
            </header>
          </div>
        </div>

        {/* CONTACT */}
        {(email || phone || linkedin) && (
          <div className="resume-section">
            <div className="resume-block">
              <div className="bg-pink-100 text-gray-800 flex flex-wrap justify-center gap-6 text-sm font-medium py-3 border-b border-gray-200 mb-10">
                {email && <span>Email: {email}</span>}
                {email && phone && <span>•</span>}
                {phone && <span>Phone: {phone}</span>}
                {(email || phone) && linkedin && <span>•</span>}
                {linkedin && (
                  <a
                    href={linkedin}
                    className="text-indigo-600 hover:text-pink-500 transition"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {linkedin}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        {summary && (
          <div className="resume-section">
            <div className="resume-block mb-10">
              <h3 className="text-xl font-semibold text-indigo-600 uppercase tracking-wide border-b-2 border-pink-300 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div className="resume-section">
            <div className="resume-block mb-10">
              <h3 className="text-xl font-semibold text-indigo-600 uppercase tracking-wide border-b-2 border-pink-300 pb-1 mb-3">
                Experience
              </h3>

              <div className="space-y-5 text-sm">
                {experience.map((exp, idx) => (
                  <div key={idx} className="hover:shadow-md transition-all p-3 rounded-lg">
                    <p className="font-semibold text-gray-900">
                      {exp?.title || ""}
                      {exp?.company ? ` — ${exp.company}` : ""}
                    </p>

                    {exp?.duration && (
                      <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                    )}

                    {exp?.description && <p className="mb-1">{exp.description}</p>}

                    {Array.isArray(exp?.bullets) && exp.bullets.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="resume-section">
            <div className="resume-block mb-10">
              <h3 className="text-xl font-semibold text-indigo-600 uppercase tracking-wide border-b-2 border-pink-300 pb-1 mb-3">
                Education
              </h3>

              <div className="text-sm space-y-3">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold">
                      {ed?.degree || ""}
                      {ed?.school ? ` — ${ed.school}` : ""}
                    </p>
                    {ed?.year && (
                      <p className="text-gray-500 text-xs mb-1">{ed.year}</p>
                    )}

                    {Array.isArray(ed?.bullets) && ed.bullets.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                        {ed.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="resume-section">
            <div className="resume-block mb-10">
              <h3 className="text-xl font-semibold text-indigo-600 uppercase tracking-wide border-b-2 border-pink-300 pb-1 mb-4">
                Skills
              </h3>

              <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200 transition"
                  >
                    {typeof s === "string" ? s : s?.name || ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 && (
          <div className="resume-section">
            <div className="resume-block space-y-8">
              {customSections.map((sec, idx) => {
                const type = sec?.type || sec?.mode || "text";
                const content = sec?.content;

                return (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold text-indigo-600 uppercase tracking-wide border-b-2 border-pink-300 pb-1 mb-3">
                      {sec.heading || "Additional Information"}
                    </h3>

                    {type === "contact" && content && typeof content === "object" ? (
                      <div className="text-sm text-gray-700 space-y-1">
                        {content.email && <p>{content.email}</p>}
                        {content.phone && <p>{content.phone}</p>}
                        {content.address && <p>{content.address}</p>}
                        {content.linkedin && <p>LinkedIn: {content.linkedin}</p>}
                        {content.github && <p>GitHub: {content.github}</p>}
                        {content.portfolio && <p>Portfolio: {content.portfolio}</p>}
                      </div>
                    ) : type === "bullets" && Array.isArray(content) ? (
                      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                        {content.map((item, ii) => (
                          <li key={ii}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                        {typeof content === "string" ? content : ""}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreativeColorBurst;
