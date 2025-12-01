import React from "react";

const TechnicalAnalyst = ({ data }) => {
  const summary = data?.summary ?? "";
  const customSections = data?.customSections ?? [];
  const experiences = data?.experience ?? [];
  const projects = data?.projects ?? [];
  const education = data?.education ?? [];

  // Collect all skills dynamically
  const skillsSection = customSections.find((s) =>
    (s?.heading || "").toLowerCase().includes("skill")
  );
  const fallbackSkills = Array.isArray(data?.skills) ? data.skills : [];

  const skills = Array.isArray(skillsSection?.content)
    ? skillsSection.content
    : skillsSection?.content
    ? [skillsSection.content]
    : fallbackSkills;

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow">

        <div className="max-w-5xl mx-auto bg-white text-gray-800 font-sans shadow-lg rounded-2xl overflow-hidden p-10 leading-relaxed overflow-y-auto">

          {/* HEADER */}
          <header className="resume-section text-center border-b-2 border-sky-400 pb-4 mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {data?.fullName ?? ""}
            </h1>
            <h2 className="text-lg text-sky-600 font-medium">
              {data?.role ?? ""}
            </h2>

            <p className="text-sm text-gray-600 mt-2 flex justify-center gap-3 flex-wrap">
              {data?.email && <span>Email: {data.email}</span>}
              {data?.phone && <span>• Phone: {data.phone}</span>}
              {data?.linkedin && (
                <span>
                  •{" "}
                  <a
                    href={data.linkedin}
                    className="text-sky-600 hover:underline break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.linkedin}
                  </a>
                </span>
              )}
            </p>
          </header>

          {/* SUMMARY */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-sky-600 border-b border-gray-300 pb-1 mb-3">
              Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </section>

          {/* TECHNICAL SKILLS */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-sky-600 border-b border-gray-300 pb-1 mb-3">
              Technical Skills
            </h3>

            {skills?.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            ) : (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Python (Pandas, NumPy)</li>
                <li>SQL (MySQL, PostgreSQL)</li>
                <li>Power BI / Tableau</li>
                <li>Excel (Pivot Tables, Macros)</li>
              </ul>
            )}
          </section>

          {/* EXPERIENCE */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-sky-600 border-b border-gray-300 pb-1 mb-3">
              Experience
            </h3>

            <div className="space-y-5 text-sm">
              {experiences.length > 0 ? (
                experiences.map((exp, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 shadow-sm">
                    <p className="font-semibold text-gray-900">
                      {exp?.title ?? ""}
                      {exp?.company ? ` — ${exp.company}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs mb-1">{exp?.duration ?? ""}</p>
                    <p className="text-gray-700">{exp?.description ?? ""}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Add your experience...</p>
              )}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-sky-600 border-b border-gray-300 pb-1 mb-3">
              Projects
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {projects.length > 0 ? (
                projects.map((proj, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-900">
                      {proj?.title ?? proj?.name ?? ""}
                      {proj?.link ? ":" : ""}
                    </span>{" "}
                    {proj?.description ?? ""}
                    {proj?.link && (
                      <>
                        {" "}
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 hover:underline break-all"
                        >
                          (link)
                        </a>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">Add your projects...</p>
              )}
            </ul>
          </section>

          {/* EDUCATION */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-sky-600 border-b border-gray-300 pb-1 mb-3">
              Education
            </h3>

            <div className="text-sm">
              {education.length > 0 ? (
                education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold">{edu?.degree ?? ""}</p>
                    <p className="text-gray-500 text-xs">
                      {edu?.school ? `${edu.school} • ${edu.year}` : edu?.year ?? ""}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Add your education...</p>
              )}
            </div>
          </section>

          {/* CUSTOM SECTIONS */}
          {customSections.map((sec, idx) => (
            <section key={idx} className="resume-section mb-10">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-sky-600 border-b border-gray-300 pb-1 mb-3">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed">
                {Array.isArray(sec?.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : sec?.content}
              </div>
            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalyst;
