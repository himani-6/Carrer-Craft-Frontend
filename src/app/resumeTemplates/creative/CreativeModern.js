// src/app/resumeTemplates/creative/CreativeModern.js
import React from "react";

const CreativeModern = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";

  // Contact fields (merged social links)
  const email = data?.email || "";
  const phone = data?.phone || "";
  const address = data?.address || "";
  const linkedin = data?.linkedin || "";
  const github = data?.github || "";
  const portfolio = data?.portfolio || "";

  const summary = data?.summary || "";

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-800 p-8 leading-relaxed font-sans">

        <div className="max-w-5xl mx-auto rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* LEFT SECTION */}
            <aside className="w-full md:w-1/3 bg-gray-50 p-8 space-y-8 border-r border-gray-300">

              {/* CONTACT SECTION */}
              <section className="resume-section">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b pb-1 mb-3">
                  Contact
                </h3>
                <ul className="text-sm text-gray-700 space-y-2 break-words">
                  {email && <li>Email: {email}</li>}
                  {phone && <li>Phone: {phone}</li>}
                  {address && <li>Location: {address}</li>}

                  {linkedin && (
                    <li className="break-words">
                      <a href={linkedin} target="_blank" className="text-teal-600 hover:underline">
                        {linkedin}
                      </a>
                    </li>
                  )}
                  {github && (
                    <li className="break-words">
                      <a href={github} target="_blank" className="text-teal-600 hover:underline">
                        {github}
                      </a>
                    </li>
                  )}
                  {portfolio && (
                    <li className="break-words">
                      <a href={portfolio} target="_blank" className="text-teal-600 hover:underline">
                        {portfolio}
                      </a>
                    </li>
                  )}
                </ul>
              </section>

              {/* SKILLS SECTION */}
              {!!skills.length && (
                <section className="resume-section">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b pb-1 mb-3">
                    Skills
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {skills.map((s, i) => (
                      <li key={i}>{typeof s === "string" ? s : s?.name}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* CUSTOM SECTIONS on Left */}
              {customSections.length > 0 &&
                customSections.map((sec, idx) => {
                  const type = sec?.type || sec?.mode || "text";
                  const content = sec?.content;

                  return (
                    <section key={idx} className="resume-section">
                      <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b pb-1 mb-3">
                        {sec.heading || "Custom Section"}
                      </h3>

                      {type === "bullets" && Array.isArray(content) ? (
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {content.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed break-words">
                          {typeof content === "string" ? content : ""}
                        </p>
                      )}
                    </section>
                  );
                })}
            </aside>

            {/* RIGHT SECTION */}
            <main className="w-full md:w-2/3 p-10 space-y-10">

              {/* HEADER */}
              <header className="resume-section border-b-4 border-teal-500 pb-3">
                <h1 className="text-4xl font-bold tracking-tight">{fullName}</h1>
                <p className="text-lg text-violet-600 font-medium">{role}</p>
              </header>

              {/* SUMMARY */}
              {!!summary && (
                <section className="resume-section">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b pb-1 mb-3">
                    Summary
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed break-words">
                    {summary}
                  </p>
                </section>
              )}

              {/* EXPERIENCE */}
              {!!experience.length && (
                <section className="resume-section">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b pb-1 mb-3">
                    Experience
                  </h3>

                  <div className="text-sm space-y-5">
                    {experience.map((exp, i) => (
                      <div key={i} className="p-3 rounded">
                        <p className="font-semibold text-gray-900">
                          {exp.title} {exp.company && `— ${exp.company}`}
                        </p>
                        {exp.duration && <p className="text-xs text-gray-500 mb-1">{exp.duration}</p>}

                        {/* description supports string OR array */}
                        {exp.description && (
                          <p className="break-words mb-1">
                            {Array.isArray(exp.description)
                              ? exp.description.join(" ")
                              : exp.description}
                          </p>
                        )}

                        {/* Bullets */}
                        {Array.isArray(exp.bullets) && (
                          <ul className="list-disc list-inside space-y-1">
                            {exp.bullets.map((b, j) => (
                              <li key={j} className="break-words">{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* EDUCATION */}
              {!!education.length && (
                <section className="resume-section">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b pb-1 mb-3">
                    Education
                  </h3>
                  <div className="text-sm space-y-3">
                    {education.map((ed, i) => (
                      <div key={i}>
                        <p className="font-semibold">
                          {ed.degree} {ed.school && `— ${ed.school}`}
                        </p>
                        {ed.year && <p className="text-xs text-gray-500">{ed.year}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PROJECTS */}
              {!!projects.length && (
                <section className="resume-section">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b pb-1 mb-3">
                    Projects
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {projects.map((p, i) => (
                      <li key={i}>
                        <span className="font-semibold break-words">
                          {p.title || ""}
                        </span>

                        {p.description && ` — ${p.description}`}
                        {p.link && (
                          <>
                            {" ("}
                            <a href={p.link} className="text-teal-600 hover:underline" target="_blank">
                              link
                            </a>
                            {")"}
                          </>
                        )}

                        {/* Bullets */}
                        {Array.isArray(p.bullets) && (
                          <ul className="list-disc ml-4 mt-1 space-y-1">
                            {p.bullets.map((b, j) => (
                              <li key={j} className="break-words">{b}</li>
                            ))}
                          </ul>
                        )}
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

export default CreativeModern;
