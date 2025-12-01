import React from "react";

const InternationalGermany = ({ data }) => {
  const photoUrl = data?.photoUrl ?? "";

  const fullName = data?.fullName ?? "";
  const title = data?.role ?? "";

  // PERSONAL INFO (only required 6 fields)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const location = data?.address ?? data?.location ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  // LEFT COLUMN FIELDS
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const certificates = data?.certifications ?? [];

  // RIGHT COLUMN FIELDS
  const summary = data?.summary ?? "";
  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];

  // CUSTOM SECTIONS (right side bottom)
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 font-sans text-gray-900 leading-relaxed">

        {/* HEADER */}
        <div className="resume-section">
          <header className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-300 mb-8">

            {/* PHOTO */}
            {photoUrl ? (
              <div className="w-32 h-40 rounded-md overflow-hidden shadow-md bg-gray-200">
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : null}

            {/* BASIC INFO */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{fullName}</h1>
              <p className="text-lg text-gray-700 font-medium mt-1">{title}</p>
            </div>

          </header>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT COLUMN */}
          <div className="md:col-span-1 space-y-10">

            {/* PERSONAL INFORMATION */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Personal Information
              </h3>

              <ul className="text-sm text-gray-700 space-y-1">
                {email && <li><strong>Email:</strong> {email}</li>}
                {phone && <li><strong>Phone:</strong> {phone}</li>}
                {location && <li><strong>Location:</strong> {location}</li>}

                {linkedin && (
                  <li>
                    <strong>LinkedIn:</strong>{" "}
                    <a href={linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                      {linkedin}
                    </a>
                  </li>
                )}

                {github && (
                  <li>
                    <strong>GitHub:</strong>{" "}
                    <a href={github} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                      {github}
                    </a>
                  </li>
                )}

                {portfolio && (
                  <li>
                    <strong>Portfolio:</strong>{" "}
                    <a href={portfolio} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                      {portfolio}
                    </a>
                  </li>
                )}
              </ul>
            </section>

            {/* SKILLS */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
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
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Languages
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {languages.map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Certificates
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {certificates.map((c, i) => (
                  <li key={i}>• {typeof c === "string" ? c : c?.name ?? ""}</li>
                ))}
              </ul>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 space-y-10">

            {/* SUMMARY */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
                Professional Summary
              </h3>
              <p className="text-sm text-gray-700">{summary}</p>
            </section>

            {/* EXPERIENCE */}
            <section className="resume-section">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-4">
                Work Experience
              </h3>

              <div className="text-sm space-y-6">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title ?? ""} — {exp?.company ?? ""}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {exp?.location ?? ""} | {exp?.duration ?? ""}
                    </p>

                    {Array.isArray(exp?.bullets) ? (
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                      </ul>
                    ) : (
                      exp?.description && (
                        <ul className="list-disc list-inside">
                          <li>{exp.description}</li>
                        </ul>
                      )
                    )}
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
                      {ed?.school ?? ""} | {ed?.year ?? ""}
                    </p>
                    {ed?.grade && (
                      <p className="text-sm">Grade: <span className="font-bold">{ed.grade}</span></p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* CUSTOM SECTIONS */}
            {customSections.map((sec, i) => (
              <section key={i} className="resume-section mt-8">
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

export default InternationalGermany;
