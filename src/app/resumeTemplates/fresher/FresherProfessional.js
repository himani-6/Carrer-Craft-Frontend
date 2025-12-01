import React from "react";

const FresherProfessional = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";

  // CONTACT
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const location = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  const summary = data?.summary ?? "";
  const keySkills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const certifications = data?.certifications ?? [];
  const education = data?.education ?? [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed w-[210mm] min-h-[297mm] text-gray-900 font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="pb-6 border-b-2 border-blue-500 mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {fullName}
            </h1>

            <p className="text-lg font-medium text-blue-600">
              {role}
            </p>

            {/* CONTACT */}
            <div className="text-sm text-gray-600 mt-3 flex flex-col gap-1 items-center">
              {email && <p>Email: {email}</p>}
              {phone && <p>Phone: {phone}</p>}
              {location && <p>Location: {location}</p>}

              {linkedin && (
                <p>
                  LinkedIn:{" "}
                  <a href={linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                    {linkedin}
                  </a>
                </p>
              )}

              {github && (
                <p>
                  GitHub:{" "}
                  <a href={github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                    {github}
                  </a>
                </p>
              )}

              {portfolio && (
                <p>
                  Portfolio:{" "}
                  <a href={portfolio} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
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
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700">{summary}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Key Skills
            </h3>

            <ul className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              {keySkills.map((skill, i) => (
                <li key={i}>• {typeof skill === "string" ? skill : skill?.name ?? ""}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Projects
            </h3>

            <div className="space-y-6 text-sm">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 border border-gray-300 rounded-xl shadow-sm bg-gray-50">
                  <p className="font-bold text-gray-900">
                    {proj?.number ? `${proj.number}. ` : ""}{proj?.title ?? proj?.name ?? ""}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">{proj?.type ?? proj?.category ?? ""}</p>
                  <p className="leading-relaxed">{proj?.description ?? ""}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(proj?.stack ?? proj?.tags ?? []).map((tech, i2) => (
                      <span
                        key={i2}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CERTIFICATIONS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {certifications.map((c, i) => (
                <li key={i}>{typeof c === "string" ? c : c?.name ?? ""}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section className="text-sm text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Education
            </h3>

            {education.map((e, i) => (
              <div key={i}>
                <p className="font-semibold">{e?.degree ?? ""}</p>
                <p className="text-gray-500 text-xs">
                  {e?.school ? `${e.school} | ${e?.year ?? ""}` : e?.year ?? ""}
                </p>
                {e?.details ? <p className="text-sm mt-1">{e.details}</p> : null}
              </div>
            ))}
          </section>
        </div>

        {/* CUSTOM SECTIONS (Unlimited) */}
        {customSections.map((sec, i) => (
          <div className="resume-section" key={i}>
            <section className="mt-10">
              <h3 className="text-xl font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
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

export default FresherProfessional;
