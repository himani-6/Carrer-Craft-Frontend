import React from "react";

const InternationalEU = ({ data }) => {
  // PHOTO + BASIC INFO
  const photoUrl = data?.photoUrl ?? "";
  const fullName = data?.fullName ?? "Elena Petrova";
  const role = data?.role ?? "Data Analyst";

  // CONTACT INFO (STRICTLY 6 FIELDS)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const address = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  // REPLACE digitalSkills + additionalSkills → ONE "skills" SECTION
  const skills = data?.skills ?? [];

  const languages = data?.languages ?? [];

  const experiences = data?.experience ?? [];

  const education = data?.education ?? [];

  const summary = data?.summary ?? "";

  // Custom Sections
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white w-[210mm] min-h-[297mm] p-8 leading-relaxed font-sans text-gray-900">

        {/* HEADER */}
        <header className="resume-section flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-300 mb-10">
          
          {photoUrl ? (
            <div className="w-32 h-40 rounded-md overflow-hidden shadow bg-gray-200">
              <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : null}

          <div>
            <h1 className="text-4xl font-bold tracking-tight">{fullName}</h1>
            <p className="text-lg text-blue-700 font-medium mt-1">{role}</p>

            {/* CONTACT INFO */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              {email && <p>Email: {email}</p>}
              {phone && <p>Phone: {phone}</p>}
              {address && <p>Location: {address}</p>}
              {linkedin && (
                <p>
                  LinkedIn:{" "}
                  <a href={linkedin} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                    {linkedin}
                  </a>
                </p>
              )}
              {github && (
                <p>
                  GitHub:{" "}
                  <a href={github} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                    {github}
                  </a>
                </p>
              )}
              {portfolio && (
                <p>
                  Portfolio:{" "}
                  <a href={portfolio} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                    {portfolio}
                  </a>
                </p>
              )}
            </div>
          </div>
        </header>

        {/* BODY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="md:col-span-1 space-y-10">

            {/* SKILLS */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold text-blue-700 uppercase border-b border-gray-300 pb-1 mb-3">
                Skills
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {skills.map((s, i) => (
                  <li key={i}>• {typeof s === "string" ? s : s?.name ?? ""}</li>
                ))}
              </ul>
            </section>

            {/* LANGUAGES */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold text-blue-700 uppercase border-b border-gray-300 pb-1 mb-3">
                Languages
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {languages.map((l, i) => (
                  typeof l === "string" ? (
                    <li key={i}>• {l}</li>
                  ) : (
                    <li key={i}>
                      <strong>{l.language}:</strong> {l.level}
                    </li>
                  )
                ))}
              </ul>
            </section>

          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-10">

            {/* SUMMARY */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold text-blue-700 uppercase border-b border-gray-300 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-sm text-gray-700">{summary}</p>
            </section>

            {/* EXPERIENCE */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold text-blue-700 uppercase border-b border-gray-300 pb-1 mb-4">
                Work Experience
              </h3>

              <div className="space-y-6 text-sm">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp.title} — {exp.company}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {exp.location} | {exp.duration}
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {(exp.bullets ?? []).map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold text-blue-700 uppercase border-b border-gray-300 pb-1 mb-4">
                Education
              </h3>

              <div className="text-sm text-gray-700 space-y-4">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold">{ed.degree}</p>
                    <p className="text-gray-500 text-xs">
                      {ed.school}{ed.year ? ` | ${ed.year}` : ""}
                    </p>
                    {ed.details && <p>{ed.details}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* CUSTOM SECTIONS */}
            {customSections.map((sec, i) => (
              <section key={i} className="resume-section">
                <h3 className="text-xl font-semibold uppercase text-blue-700 border-b border-gray-300 pb-1 mb-3">
                  {sec?.heading ?? ""}
                </h3>
                <div className="text-sm text-gray-700">
                  {Array.isArray(sec?.content)
                    ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                    : sec?.content}
                </div>
              </section>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalEU;
