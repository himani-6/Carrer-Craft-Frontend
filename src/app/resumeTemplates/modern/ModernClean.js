// src/app/resumeTemplates/modern/ModernClean.js
import React from "react";

const ModernClean = ({ data }) => {
  // CONTACT INFORMATION
  const contactParts = [
    data?.email && `Email: ${data.email}`,
    data?.phone && `Phone: ${data.phone}`,
    data?.location && data.location,
    data?.linkedin && `LinkedIn: ${data.linkedin}`,
    data?.github && `GitHub: ${data.github}`,
    data?.portfolio && `Portfolio: ${data.portfolio}`,
  ].filter(Boolean);

  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const renderDescription = (desc) => {
    if (!desc) return null;

    const lines = Array.isArray(desc)
      ? desc
      : desc.split("\n").map((d) => d.trim()).filter(Boolean);

    return (
      <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
        {lines.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed font-sans text-gray-900 w-[210mm] min-h-[297mm]">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold">{data?.fullName || ""}</h1>
            <p className="text-lg text-gray-600">{data?.role || ""}</p>

            {contactParts.length > 0 && (
              <p className="text-sm text-gray-500 mt-1 break-words">
                {contactParts.map((part, idx) => (
                  <span key={idx}>
                    {part}
                    {idx < contactParts.length - 1 ? " | " : ""}
                  </span>
                ))}
              </p>
            )}
          </header>
        </div>

        {/* SUMMARY */}
        {data?.summary && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">
                Summary
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed break-words">
                {data.summary}
              </p>
            </section>
          </div>
        )}

        {/* EXPERIENCE */}
        {(experience.length > 0 || data?.experience?.length > 0) && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">
                Experience
              </h2>

              {experience.map((exp, idx) => (
                <div key={idx} className={idx > 0 ? "mt-4" : ""}>
                  <h3 className="font-medium">
                    {exp?.title || ""}
                    {exp?.company ? ` — ${exp.company}` : ""}
                  </h3>
                  {exp?.duration && (
                    <p className="text-sm text-gray-600 italic">
                      {exp.duration}
                    </p>
                  )}
                  {renderDescription(exp?.description)}
                </div>
              ))}
            </section>
          </div>
        )}

        {/* EDUCATION */}
        {(education.length > 0 || data?.education?.length > 0) && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">
                Education
              </h2>
              {education.map((ed, idx) => (
                <div key={idx} className={idx > 0 ? "mt-3" : ""}>
                  <p className="font-medium">{ed?.degree || ""}</p>
                  <p className="text-sm text-gray-600 italic">
                    {(ed?.school || "") +
                      (ed?.year ? ` — ${ed.year}` : "")}
                  </p>
                  {ed?.cgpa && (
                    <p className="text-sm text-gray-700">CGPA: {ed.cgpa}</p>
                  )}
                </div>
              ))}
            </section>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full">
                    {typeof s === "string" ? s : s?.name}
                  </span>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">
                Projects
              </h2>

              {projects.map((p, idx) => (
                <div key={idx} className={idx > 0 ? "mt-3" : ""}>
                  <h3 className="font-medium">{p?.title || ""}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {p?.description || ""}
                    {p?.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        {" "}
                        {p.link}
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 && (
          <div className="resume-section">
            {customSections.map((sec, idx) => {
              const type = sec?.type || sec?.mode || "text";
              const content = sec?.content;

              return (
                <section key={idx} className="mb-6">
                  <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">
                    {sec.heading || "Custom Section"}
                  </h2>

                  {type === "bullets" && Array.isArray(content) ? (
                    <ul className="list-disc ml-4 space-y-1 text-sm">
                      {content.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {typeof content === "string" ? content : ""}
                    </p>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernClean;
