// src/app/resumeTemplates/creative/CreativePortfolio.js
import React from "react";

const CreativePortfolio = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";
  const photoUrl = data?.photoUrl ?? "";
  const summary = data?.summary ?? "";
  const projects = data?.projects ?? [];
  const experiences = data?.experience ?? [];
  const skills = data?.skills ?? [];
  const customSections = data?.customSections ?? [];

  // Contact fields
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const address = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-800 p-10 leading-relaxed font-sans">

        {/* SECTION 1 — HEADER + SUMMARY */}
        <div className="resume-section">
          <header className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-8 mb-8">
            {photoUrl ? (
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                {fullName}
              </h1>
              <h2 className="text-lg text-violet-600 font-medium">{role}</h2>

              {(email || phone || address || linkedin || github || portfolio) && (
                <p className="mt-2 text-sm text-gray-600">
                  {email && <span>Email: {email}</span>}
                  {email && (phone || address || linkedin || github || portfolio) && " | "}
                  {phone && <span>Phone: {phone}</span>}
                  {phone && (address || linkedin || github || portfolio) && " | "}
                  {address && <span>{address}</span>}
                  {address && (linkedin || github || portfolio) && " | "}
                  {linkedin && <span>LinkedIn: {linkedin}</span>}
                  {linkedin && (github || portfolio) && " | "}
                  {github && <span>GitHub: {github}</span>}
                  {github && portfolio && " | "}
                  {portfolio && <span>Portfolio: {portfolio}</span>}
                </p>
              )}
            </div>
          </header>

          {/* SUMMARY BELOW HEADER */}
          {summary && (
            <div className="resume-block mb-10">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-200 pb-1 mb-3">
                About Me
              </h3>
              <p className="text-sm text-gray-700">{summary}</p>
            </div>
          )}
        </div>


        {/* SECTION 2 — PROJECTS */}
        {projects.length > 0 && (
          <div className="resume-section">
            <div className="resume-block mb-10">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-200 pb-1 mb-5">
                Featured Projects
              </h3>

              <ul className="list-disc list-inside text-sm text-gray-700 space-y-3">
                {projects.map((p, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-900">
                      {p?.title ?? p?.name ?? ""}
                    </span>{" "}
                    {p?.description ?? ""}
                    {p?.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:underline"
                      >
                        (link)
                      </a>
                    )}

                    {Array.isArray(p?.bullets) && p.bullets.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1 text-sm">
                        {p.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}


        {/* SECTION 3 — EXPERIENCE */}
        {experiences.length > 0 && (
          <div className="resume-section">
            <div className="resume-block mb-10">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-200 pb-1 mb-3">
                Experience
              </h3>

              <div className="space-y-5 text-sm">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title ?? ""}
                      {exp?.company ? ` — ${exp.company}` : ""}
                    </p>

                    <p className="text-gray-500 text-xs mb-1">
                      {exp?.duration ?? ""}
                    </p>

                    {exp?.description && (
                      <p className="mb-1">{exp.description}</p>
                    )}

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
            </div>
          </div>
        )}


        {/* SECTION 4 — SKILLS */}
        {skills.length > 0 && (
          <div className="resume-section">
            <div className="resume-block mb-10">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-200 pb-1 mb-4">
                Skills & Tools
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-2 bg-violet-50 rounded-md shadow-sm hover:bg-violet-100 transition"
                  >
                    {typeof s === "string" ? s : s?.name ?? ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* SECTION 5 — ALL Custom Sections Together */}
        {customSections.length > 0 && (
          <div className="resume-section">
            <div className="resume-block space-y-8">
              {customSections.map((sec, idx) => {
                const type = sec?.type || sec?.mode || "text";
                const content = sec?.content;

                return (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-200 pb-1 mb-3">
                      {sec.heading || "Additional Information"}
                    </h3>

                    {type === "contact" && typeof content === "object" ? (
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
                      <ul className="list-disc ml-5 space-y-1 text-sm">
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

export default CreativePortfolio;




