// src/app/resumeTemplates/professional/ProfessionalElegant.js
import React from "react";

const ProfessionalElegant = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";

  // CONTACT LINE: email | phone | address | linkedin | github | portfolio
  const email = data?.email || "";
  const phone = data?.phone || "";
  const address = data?.address || "";
  const linkedin = data?.linkedin || "";
  const github = data?.github || "";
  const portfolio = data?.portfolio || "";

  const contactParts = [];
  if (email) contactParts.push(email);
  if (phone) contactParts.push(phone);
  if (address) contactParts.push(address);
  if (linkedin) contactParts.push(linkedin);
  if (github) contactParts.push(github);
  if (portfolio) contactParts.push(portfolio);

  const contactLine = contactParts.join(" | ");

  const summary = data?.summary || "";

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const certifications = Array.isArray(data?.certifications)
    ? data.certifications
    : [];
  const languages = Array.isArray(data?.languages) ? data.languages : [];

  const experiences = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  // Helper: if a description is a string with line breaks, make bullets
  const toLines = (content) => {
    if (Array.isArray(content)) return content;
    if (typeof content === "string") {
      return content
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean);
    }
    return [];
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 shadow-xl rounded-2xl p-10 font-sans overflow-y-auto">
        {/* HEADER + CONTACT */}
        <header className="text-center border-b border-gray-200 pb-5 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-wide">
            {fullName}
          </h1>
          <h2 className="text-lg text-gray-600 mt-1">{role}</h2>
          {contactLine && (
            <p className="text-sm text-gray-500 mt-2">{contactLine}</p>
          )}
        </header>

        {/* PROFESSIONAL SUMMARY */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md inline-block mb-3">
              Professional Summary
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>
        )}

        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT COLUMN: Skills / Certifications / Languages / Custom Sections */}
          <div className="md:w-1/3 space-y-6">
            {/* SKILLS */}
            {skills.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-3">
                  Skills
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {skills.map((s, i) => (
                    <li key={i}>
                      {typeof s === "string" ? s : s?.name || ""}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-3">
                  Certifications
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {certifications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-3">
                  Languages
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {languages.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* CUSTOM SECTIONS (LEFT) */}
            {customSections.length > 0 &&
              customSections.map((sec, idx) => {
                const type = sec?.type || sec?.mode || "text";
                const content = sec?.content;

                return (
                  <section key={idx}>
                    <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-3">
                      {sec?.heading || "Additional Information"}
                    </h3>

                    {type === "contact" &&
                    content &&
                    typeof content === "object" &&
                    !Array.isArray(content) ? (
                      <div className="text-sm text-gray-700 space-y-1">
                        {content.email && <p>{content.email}</p>}
                        {content.phone && <p>{content.phone}</p>}
                        {content.address && <p>{content.address}</p>}
                        {content.linkedin && (
                          <p>LinkedIn: {content.linkedin}</p>
                        )}
                        {content.github && <p>GitHub: {content.github}</p>}
                        {content.portfolio && (
                          <p>Portfolio: {content.portfolio}</p>
                        )}
                      </div>
                    ) : type === "bullets" && Array.isArray(content) ? (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {content.map((item, ii) => (
                          <li key={ii}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                        {typeof content === "string" ? content : ""}
                      </p>
                    )}
                  </section>
                );
              })}
          </div>

          {/* RIGHT COLUMN: Experience / Education / Key Projects */}
          <div className="md:w-2/3 space-y-8">
            {/* PROFESSIONAL EXPERIENCE */}
            {experiences.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-3">
                  Professional Experience
                </h3>
                <div className="space-y-5">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-gray-900">
                        {exp?.title || ""}
                        {exp?.company ? ` — ${exp.company}` : ""}
                      </h4>
                      {(exp?.duration || exp?.location) && (
                        <p className="text-sm text-gray-600">
                          {exp?.duration || ""}
                          {exp?.location ? ` | ${exp.location}` : ""}
                        </p>
                      )}

                      {/* bullets from description */}
                      <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                        {toLines(exp?.description).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-3">
                  Education
                </h3>
                {education.map((ed, i) => (
                  <div key={i} className={i === 0 ? "" : "mt-3"}>
                    <h4 className="font-semibold text-gray-900">
                      {ed?.degree || ""}
                    </h4>
                    {(ed?.school || ed?.year) && (
                      <p className="text-sm text-gray-600">
                        {ed?.school || ""}
                        {ed?.year ? ` — ${ed.year}` : ""}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* KEY PROJECTS */}
            {projects.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-3">
                  Key Projects
                </h3>
                <div className="space-y-4">
                  {projects.map((p, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-gray-900">
                        {p?.title || p?.name || ""}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {p?.description || ""}
                        {p?.link && ` (${p.link})`}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalElegant;


