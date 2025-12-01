import React from "react";

const InternationalUSA = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";

  // Contact fields (all 6)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const address = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  const summary = data?.summary ?? "";

  const skills = data?.skills ?? [];

  const experiences = data?.experience ?? [];

  const education = data?.education ?? [];

  const projects = data?.projects ?? [];

  const certifications = data?.certifications ?? [];

  // Custom Sections
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed w-[210mm] min-h-[297mm] text-gray-900 font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="pb-4 border-b border-gray-300 mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {fullName}
            </h1>
            <p className="text-lg font-medium text-gray-700">{role}</p>
          </header>
        </div>

        {/* CONTACT SECTION */}
        <div className="resume-section">
          <section className="mb-8">
            <p className="text-sm text-gray-700 space-y-1 flex flex-col">

              {email && <span>Email: {email}</span>}
              {phone && <span>Phone: {phone}</span>}
              {address && <span>Location: {address}</span>}

              {linkedin && (
                <span>
                  LinkedIn:{" "}
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {linkedin}
                  </a>
                </span>
              )}

              {github && (
                <span>
                  GitHub:{" "}
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {github}
                  </a>
                </span>
              )}

              {portfolio && (
                <span>
                  Portfolio:{" "}
                  <a
                    href={portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {portfolio}
                  </a>
                </span>
              )}

            </p>
          </section>
        </div>

        {/* SUMMARY */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Summary
            </h3>
            <p className="text-sm text-gray-700">{summary}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Key Skills
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              {skills.map((s, i) => (
                <li key={i}>• {typeof s === "string" ? s : s?.name ?? ""}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* EXPERIENCE */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide pb-1 mb-4 border-b border-gray-300">
              Experience
            </h3>

            <div className="space-y-6 text-sm">
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
                  ) : (
                    <p className="mt-1">{exp?.description ?? ""}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Education
            </h3>

            <div className="text-sm text-gray-700 space-y-3">
              {education.map((ed, i) => (
                <div key={i}>
                  <p className="font-semibold">{ed?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {ed?.school ? `${ed.school} | ${ed?.year ?? ""}` : ed?.year ?? ""}
                  </p>
                  {ed?.details && <p className="text-sm">{ed.details}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide pb-1 mb-4 border-b border-gray-300">
              Projects
            </h3>

            <ul className="list-disc list-inside text-sm space-y-3 text-gray-700">
              {projects.map((p, i) => (
                <li key={i}>
                  <span className="font-semibold">{p?.title ?? p?.name ?? ""}:</span>{" "}
                  {p?.description ?? ""}
                  {p?.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {" "}
                      (link)
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* CERTIFICATIONS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Certifications
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {certifications.map((c, i) => (
                <li key={i}>{typeof c === "string" ? c : c?.name ?? ""}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <div className="resume-section" key={i}>
            <section className="mt-10">
              <h3 className="text-xl font-semibold uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
                {sec?.heading ?? ""}
              </h3>

              <div className="text-sm text-gray-700">
                {Array.isArray(sec?.content)
                  ? sec.content.map((line, j) => <p key={j}>{line}</p>)
                  : sec?.content}
              </div>
            </section>
          </div>
        ))}

      </div>
    </div>
  );
};

export default InternationalUSA;
