// src/app/resumeTemplates/creative/CreativeElegant.js
import React from "react";

const CreativeElegant = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";
  const email = data?.email || "";
  const phone = data?.phone || "";
  const linkedin = data?.linkedin || "";
  const summary = data?.summary || "";

  const experiences = Array.isArray(data?.experience) ? data.experience : [];
  const educations = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const contactParts = [];
  if (email) contactParts.push(`Email: ${email}`);
  if (phone) contactParts.push(`Phone: ${phone}`);
  if (linkedin) contactParts.push(linkedin);

  return (
    <div className="resume-doc">
      <div className="resume-page bg-[#fdfcf9] text-gray-800 p-10 leading-relaxed font-serif">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center border-b border-gray-300 pb-4 mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {fullName}
            </h1>
            <h2 className="text-lg text-[#bfa06a] font-medium">
              {role}
            </h2>

            {contactParts.length > 0 && (
              <div className="mt-3 text-sm text-gray-600 space-x-2 break-words">
                {contactParts.map((part, i) => (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {i < contactParts.length - 1 ? <span>•</span> : null}
                  </React.Fragment>
                ))}
              </div>
            )}
          </header>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="resume-section">
            <section className="mb-8">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-[#bfa06a] border-b border-gray-200 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {summary}
              </p>
            </section>
          </div>
        )}

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <div className="resume-section">
            <section className="mb-8">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-[#bfa06a] border-b border-gray-200 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-5 text-sm">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title || ""}{exp?.company ? ` — ${exp.company}` : ""}
                    </p>
                    {exp?.duration && (
                      <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                    )}
                    {exp?.description && <p className="mb-1">{exp.description}</p>}
                    {Array.isArray(exp?.bullets) && exp.bullets.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1 text-sm">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* EDUCATION */}
        {educations.length > 0 && (
          <div className="resume-section">
            <section className="mb-8">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-[#bfa06a] border-b border-gray-200 pb-1 mb-3">
                Education
              </h3>
              <div className="text-sm space-y-3">
                {educations.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold">
                      {edu?.degree || ""}{edu?.school ? ` — ${edu.school}` : ""}
                    </p>
                    {edu?.year && (
                      <p className="text-gray-500 text-xs">
                        {edu.year}
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
            <section className="mb-8">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-[#bfa06a] border-b border-gray-200 pb-1 mb-3">
                Skills
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                {skills.map((s, i) => (
                  <p key={i}>{typeof s === "string" ? s : s?.name || ""}</p>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((sec, idx) => {
            const content = sec?.content;
            return (
              <div className="resume-section" key={idx}>
                <section className="mt-10">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-[#bfa06a] border-b border-gray-200 pb-1 mb-3">
                    {sec.heading || "Additional Information"}
                  </h3>

                  {Array.isArray(content) ? (
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {content.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm whitespace-pre-line">{content}</p>
                  )}
                </section>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CreativeElegant;

