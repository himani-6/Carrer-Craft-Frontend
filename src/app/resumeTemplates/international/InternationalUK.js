import React from "react";

const InternationalUK = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";

  // CONTACT FIELDS (all 6)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const location = data?.address ?? data?.location ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  // LEFT SIDE
  const personalProfile = data?.summary ?? "";
  const coreSkills = data?.skills ?? [];
  const languages = data?.languages ?? [];

  // RIGHT SIDE
  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];
  const certifications = data?.certifications ?? [];

  // Custom Sections (added to RIGHT SIDE)
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 leading-relaxed text-gray-900 font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="pb-6 border-b border-gray-300 mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">{fullName}</h1>
            <p className="text-lg text-gray-700 font-medium">{role}</p>

            <div className="text-sm text-gray-600 mt-1 flex flex-col gap-1">

              {email && <span>Email: {email}</span>}
              {phone && <span>Phone: {phone}</span>}
              {location && <span>Location: {location}</span>}

              {linkedin && (
                <span>
                  LinkedIn:{" "}
                  <a href={linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                    {linkedin}
                  </a>
                </span>
              )}

              {github && (
                <span>
                  GitHub:{" "}
                  <a href={github} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                    {github}
                  </a>
                </span>
              )}

              {portfolio && (
                <span>
                  Portfolio:{" "}
                  <a href={portfolio} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                    {portfolio}
                  </a>
                </span>
              )}

            </div>
          </header>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-10">

            {/* PERSONAL PROFILE */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Personal Profile
              </h3>
              <p className="text-sm text-gray-700">{personalProfile}</p>
            </section>

            {/* SKILLS */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Core Skills
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {coreSkills.map((s, i) => (
                  <li key={i}>• {typeof s === "string" ? s : s?.name ?? ""}</li>
                ))}
              </ul>
            </section>

            
            {/* LANGUAGES (replacing Additional Info section) */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Languages
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {languages.map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-10">

            {/* EXPERIENCE */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-4">
                Employment History
              </h3>

              <div className="text-sm space-y-6">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title ?? ""}{exp?.company ? ` — ${exp.company}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {exp?.location ? `${exp.location} | ${exp?.duration ?? ""}` : exp?.duration ?? ""}
                    </p>

                    {Array.isArray(exp?.bullets) ? (
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                      </ul>
                    ) : exp?.description ? (
                      <p className="mt-1">{exp.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-4">
                Education
              </h3>

              <div className="text-sm text-gray-700 space-y-4">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold">{ed?.degree ?? ""}</p>
                    <p className="text-gray-500 text-xs">
                      {ed?.school ? `${ed.school} | ${ed?.year ?? ""}` : ed?.year ?? ""}
                    </p>
                    {ed?.details && <p className="text-sm">Grade: <span className="font-bold">{ed.details}</span></p>}
                  </div>
                ))}
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Certifications
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                {certifications.map((c, i) => (
                  <li key={i}>{typeof c === "string" ? c : c?.name ?? ""}</li>
                ))}
              </ul>
            </section>

            {/* CUSTOM SECTIONS (right side bottom only) */}
            {customSections.map((sec, i) => (
              <section key={i} className="resume-section mt-10">
                <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                  {sec?.heading ?? ""}
                </h3>
                <div className="text-sm text-gray-700">
                  {Array.isArray(sec?.content)
                    ? sec.content.map((line, j) => <p key={j}>{line}</p>)
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

export default InternationalUK;
