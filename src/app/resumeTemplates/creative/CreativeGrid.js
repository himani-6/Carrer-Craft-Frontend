// src/app/resumeTemplates/creative/CreativeGrid.js
import React from "react";

const CreativeGrid = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";
  const email = data?.email || "";
  const phone = data?.phone || "";
  const address = data?.address || "";
  const linkedin = data?.linkedin || "";
  const github = data?.github || "";
  const summary = data?.summary || "";
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];
  const tools = Array.isArray(data?.tools) ? data.tools : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-800 p-8 leading-relaxed font-sans">
        <div className="max-w-5xl mx-auto bg-white text-gray-800 shadow-md rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <div className="flex flex-col md:flex-row relative z-10">
            {/* LEFT COLUMN */}
            <aside className="w-full md:w-1/3 bg-gray-50 p-8 space-y-8 border-r border-gray-200">

              {/* CONTACT */}
              <section>
                <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
                  Contact
                </h3>
                <ul className="text-sm text-gray-700 space-y-2 break-words whitespace-normal max-w-full leading-snug">
                  {email && <li>Email: {email}</li>}
                  {phone && <li>Phone: {phone}</li>}
                  {address && <li>Location: {address}</li>}
                  {linkedin && (
                    <li className="break-all">
                      <a href={linkedin} className="text-pink-600 hover:underline" target="_blank" rel="noreferrer">
                        {linkedin}
                      </a>
                    </li>
                  )}
                  {github && (
                    <li className="break-all">
                      <a href={github} className="text-pink-600 hover:underline" target="_blank" rel="noreferrer">
                        {github}
                      </a>
                    </li>
                  )}
                </ul>
              </section>

              {/* SKILLS */}
              {skills.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
                    Skills
                  </h3>
                  <ul className="grid grid-cols-2 text-sm gap-y-1 text-gray-700 break-words whitespace-normal max-w-full leading-snug">
                    {skills.map((skill, i) => (
                      <li key={i}>{typeof skill === "string" ? skill : skill?.name || ""}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* TOOLS */}
              {tools.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
                    Tools
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1 break-words whitespace-normal max-w-full leading-snug list-disc list-inside">
                    {tools.map((tool) => (
                      <li key={tool.id || tool.name}>{tool?.name || tool}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* CUSTOM ON LEFT */}
              {customSections.length > 0 &&
                customSections.map((section, i) => {
                  const type = section?.type || section?.mode || "text";
                  const content = section?.content;
                  return (
                    <section key={i}>
                      <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
                        {section.heading || "New Section"}
                      </h3>
                      {type === "bullets" && Array.isArray(content) ? (
                        <ul className="list-disc list-inside text-sm text-gray-700 break-words whitespace-normal max-w-full leading-snug space-y-1">
                          {content.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700 break-words whitespace-normal max-w-full leading-snug">
                          {typeof content === "string" ? content : ""}
                        </p>
                      )}
                    </section>
                  );
                })}
            </aside>

            {/* RIGHT SIDE (unchanged) */}
            <main className="w-full md:w-2/3 p-10 space-y-8">
              {/* NAME + ROLE */}
              <header className="border-b border-gray-200 pb-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  {fullName}
                </h1>
                <h2 className="text-lg text-pink-600 font-medium">{role}</h2>
              </header>

              {/* SUMMARY */}
              {summary && (
                <section>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-100 pb-1 mb-3">
                    Summary
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
                </section>
              )}

              {/* EXPERIENCE */}
              {experience.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-100 pb-1 mb-3">
                    Experience
                  </h3>
                  <div className="space-y-4 text-sm">
                    {experience.map((exp, i) => (
                      <div className="p-3 rounded-lg hover:bg-pink-50 transition" key={i}>
                        <p className="font-semibold text-gray-900">
                          {exp.title || ""}
                          {exp.company ? ` — ${exp.company}` : ""}
                        </p>
                        {exp.duration && (
                          <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                        )}
                        {exp.description && <p>{exp.description}</p>}
                        {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                          <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                            {exp.bullets.map((b, bi) => (
                              <li key={bi}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* EDUCATION */}
              {education.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-100 pb-1 mb-3">
                    Education
                  </h3>
                  <div className="text-sm text-gray-700 space-y-3">
                    {education.map((ed, i) => (
                      <div key={i}>
                        <p className="font-semibold">
                          {ed.degree || ""} {ed.school && `— ${ed.school}`}
                        </p>
                        {ed.year && (
                          <p className="text-gray-500 text-xs mb-1">{ed.year}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PROJECTS */}
              {projects.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-100 pb-1 mb-3">
                    Projects
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    {projects.map((proj, i) => (
                      <li key={i}>
                        <span className="font-semibold text-gray-900">
                          {proj.title || proj.name}
                        </span>
                        {proj.description && ` — ${proj.description}`}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeGrid;


