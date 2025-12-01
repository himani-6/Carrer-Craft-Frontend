// src/app/resumeTemplates/creative/CreativeBold.js
import React from "react";

const CreativeBold = ({ data }) => {
  const d = data || {};

  const fullName = d.fullName || "";
  const role = d.role || "";

  const email = d.email || "";
  const phone = d.phone || "";
  const address = d.address || "";
  const linkedin = d.linkedin || "";
  const github = d.github || "";
  const portfolio = d.portfolio || "";

  const summary = d.summary || "";

  const skills = Array.isArray(d.skills) ? d.skills : [];
  const experience = Array.isArray(d.experience) ? d.experience : [];
  const education = Array.isArray(d.education) ? d.education : [];
  const projects = Array.isArray(d.projects) ? d.projects : [];
  const customSections = Array.isArray(d.customSections) ? d.customSections : [];

  // Helper to show URLs without protocol but keep them clickable
  const prettyUrl = (url) => url.replace(/^https?:\/\//, "");

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-900 font-sans shadow-xl rounded-2xl overflow-hidden leading-relaxed p-0">
        {/* HEADER */}
        <header className="bg-black text-white text-center py-8">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase">
            {fullName}
          </h1>
          <h2 className="text-lg font-medium text-red-500 mt-1">
            {role}
          </h2>
        </header>

        {/* BODY: LEFT + RIGHT */}
        <div className="flex flex-col md:flex-row">
          {/* LEFT COLUMN */}
          <aside className="w-full md:w-1/3 bg-gray-900 text-white p-8 space-y-8">
            {/* CONTACT */}
            <section className="resume-section">
              <div className="resume-block">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-red-500 border-b border-gray-700 pb-1 mb-3">
                  Contact
                </h3>
                <ul className="text-sm text-gray-200 space-y-2">
                  {email && <li className="break-words">Email: {email}</li>}
                  {phone && <li className="break-words">Phone: {phone}</li>}
                  {address && <li className="break-words">Location: {address}</li>}

                  {linkedin && (
                    <li className="break-words">
                      <a
                        href={linkedin}
                        className="text-red-400 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {prettyUrl(linkedin)}
                      </a>
                    </li>
                  )}

                  {github && (
                    <li className="break-words">
                      <a
                        href={github}
                        className="text-red-400 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {prettyUrl(github)}
                      </a>
                    </li>
                  )}

                  {portfolio && (
                    <li className="break-words">
                      <a
                        href={portfolio}
                        className="text-red-400 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {prettyUrl(portfolio)}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </section>

            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="resume-section">
                <div className="resume-block">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-red-500 border-b border-gray-700 pb-1 mb-3">
                    Skills
                  </h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-200">
                    {skills.map((s, i) => (
                      <li key={i} className="break-words">
                        {typeof s === "string" ? s : s?.name || ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* CUSTOM SECTIONS ON LEFT */}
            {customSections.length > 0 &&
              customSections.map((sec, sidx) => {
                const type = sec?.type || sec?.mode || "text";
                const content = sec?.content;

                return (
                  <section className="resume-section" key={sidx}>
                    <div className="resume-block">
                      <h3 className="text-lg font-semibold uppercase tracking-wide text-red-500 border-b border-gray-700 pb-1 mb-3">
                        {sec.heading || "New Section"}
                      </h3>

                      {/* Contact-style custom section */}
                      {type === "contact" &&
                        content &&
                        typeof content === "object" &&
                        !Array.isArray(content) ? (
                        <div className="text-sm text-gray-200 space-y-1">
                          {content.email && <p className="break-words">{content.email}</p>}
                          {content.phone && <p className="break-words">{content.phone}</p>}
                          {content.address && <p className="break-words">{content.address}</p>}
                          {content.linkedin && (
                            <p className="break-words">
                              LinkedIn: {prettyUrl(content.linkedin)}
                            </p>
                          )}
                          {content.github && (
                            <p className="break-words">
                              GitHub: {prettyUrl(content.github)}
                            </p>
                          )}
                          {content.portfolio && (
                            <p className="break-words">
                              Portfolio: {prettyUrl(content.portfolio)}
                            </p>
                          )}
                        </div>
                      ) : type === "bullets" && Array.isArray(content) ? (
                        // Bulleted custom section
                        <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                          {content.map((item, ii) => (
                            <li key={ii} className="break-words">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        // Plain text custom section
                        <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line break-words">
                          {typeof content === "string" ? content : ""}
                        </p>
                      )}
                    </div>
                  </section>
                );
              })}
          </aside>

          {/* RIGHT COLUMN */}
          <main className="w-full md:w-2/3 p-10 space-y-10">
            {/* SUMMARY */}
            {summary && (
              <section className="resume-section">
                <div className="resume-block">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-red-600 border-b border-gray-300 pb-1 mb-3">
                    Summary
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {summary}
                  </p>
                </div>
              </section>
            )}

            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section className="resume-section">
                <div className="resume-block">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-red-600 border-b border-gray-300 pb-1 mb-3">
                    Experience
                  </h3>
                  <div className="space-y-5 text-sm">
                    {experience.map((exp, idx) => (
                      <div key={idx}>
                        <p className="font-semibold text-gray-900">
                          {(exp.title || "") + (exp.company ? ` — ${exp.company}` : "")}
                        </p>
                        {exp.duration && (
                          <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                        )}

                        {exp.description && (
                          <p className="mb-1">
                            {Array.isArray(exp.description)
                              ? exp.description.join(" ")
                              : exp.description}
                          </p>
                        )}

                        {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                            {exp.bullets.map((b, bi) => (
                              <li key={bi}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="resume-section">
                <div className="resume-block">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-red-600 border-b border-gray-300 pb-1 mb-3">
                    Education
                  </h3>
                  <div className="text-sm space-y-3">
                    {education.map((edu, i) => (
                      <div key={i}>
                        <p className="font-semibold">
                          {edu.degree || ""}
                        </p>
                        {(edu.school || edu.year) && (
                          <p className="text-gray-500 text-xs mb-1">
                            {[edu.school, edu.year].filter(Boolean).join(" | ")}
                          </p>
                        )}
                        {Array.isArray(edu.bullets) && edu.bullets.length > 0 && (
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                            {edu.bullets.map((b, bi) => (
                              <li key={bi}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <section className="resume-section">
                <div className="resume-block">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-red-600 border-b border-gray-300 pb-1 mb-3">
                    Projects
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    {projects.map((p, k) => (
                      <li key={k}>
                        <span className="font-semibold text-gray-900">
                          {p.title || p.name || ""}
                        </span>
                        {p.description && ` — ${p.description}`}
                        {p.link && (
                          <>
                            {" "}
                            (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-red-600 hover:underline"
                            >
                              link
                            </a>
                            )
                          </>
                        )}
                        {Array.isArray(p.bullets) && p.bullets.length > 0 && (
                          <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                            {p.bullets.map((b, bi) => (
                              <li key={bi}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreativeBold;
