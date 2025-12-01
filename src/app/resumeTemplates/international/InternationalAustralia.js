import React from "react";

const InternationalAustralia = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? ""; // Job title added

  // CONTACT FIELDS (all 6)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const location = data?.address ?? data?.location ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  // MAIN SECTIONS
  const summary = data?.summary ?? "";
  const skills = data?.skills ?? [];

  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];
  const certifications = data?.certifications ?? [];

  // CUSTOM SECTIONS (after certifications)
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 leading-relaxed text-gray-900 font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="pb-6 border-b border-gray-300 mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {fullName}
            </h1>

            {role && (
              <p className="text-lg text-blue-700 font-medium mt-1">{role}</p>
            )}

            {/* CONTACT INFO */}
            <div className="text-sm text-gray-700 mt-3 flex flex-col gap-1">

              {email && <p>Email: {email}</p>}
              {phone && <p>Phone: {phone}</p>}
              {location && <p>Location: {location}</p>}

              {linkedin && (
                <p>
                  LinkedIn:{" "}
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {linkedin}
                  </a>
                </p>
              )}

              {github && (
                <p>
                  GitHub:{" "}
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {github}
                  </a>
                </p>
              )}

              {portfolio && (
                <p>
                  Portfolio:{" "}
                  <a
                    href={portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {portfolio}
                  </a>
                </p>
              )}

            </div>
          </header>
        </div>

        {/* SUMMARY */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700">{summary}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Key Capabilities
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
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide pb-1 mb-4 border-b border-gray-300">
              Employment History
            </h3>

            <div className="space-y-6 text-sm">
              {experiences.map((exp, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-gray-900">
                    {exp?.title ?? ""} — {exp?.company ?? ""}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {exp?.location ?? ""} | {exp?.duration ?? ""}
                  </p>

                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {(exp?.bullets ?? []).map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Education
            </h3>

            <div className="text-sm text-gray-700 space-y-4">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="font-semibold">{e?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {e?.school ?? ""} | {e?.year ?? ""}
                  </p>
                  {e?.details && <p>{e.details}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CERTIFICATIONS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide pb-1 mb-3 border-b border-gray-300">
              Certifications
            </h3>

            <ul className="text-sm text-gray-700 space-y-2">
              {certifications.map((c, i) => (
                <li key={i}>{typeof c === "string" ? c : c?.name ?? ""}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <div className="resume-section" key={i}>
            <section className="mt-8">
              <h3 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
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

export default InternationalAustralia;
