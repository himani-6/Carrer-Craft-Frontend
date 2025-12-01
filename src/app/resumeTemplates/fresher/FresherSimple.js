import React from "react";

const FresherSimple = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";

  // CONTACT FIELDS
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const address = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  const summary = data?.summary ?? "";
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const certifications = data?.certifications ?? [];
  const education = data?.education ?? [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed font-sans text-gray-900 w-[210mm] min-h-[297mm]">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center pb-6 border-b border-gray-300 mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {fullName}
            </h1>
            <h2 className="text-lg text-gray-600 font-medium">{role}</h2>

            {/* CONTACT */}
            <div className="text-sm text-gray-500 mt-3 flex flex-col gap-1">
              {email && <p>Email: {email}</p>}
              {phone && <p>Phone: {phone}</p>}
              {address && <p>Location: {address}</p>}
              {linkedin && (
                <p>
                  LinkedIn:{" "}
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
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
                    className="text-blue-600 hover:underline break-all"
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
                    className="text-blue-600 hover:underline break-all"
                  >
                    {portfolio}
                  </a>
                </p>
              )}
            </div>
          </header>
        </div>

        {/* OBJECTIVE */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-300 pb-1 mb-3">
              Objective
            </h3>
            <p className="text-sm text-gray-700">{summary}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-300 pb-1 mb-4">
              Skills
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {skills.map((s, i) => (
                <li key={i}>{typeof s === "string" ? s : s?.name ?? ""}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-300 pb-1 mb-4">
              Projects
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-3">
              {projects.map((p, i) => (
                <li key={i}>
                  <span className="font-semibold">{p?.title ?? p?.name ?? ""}</span>{" "}
                  {p?.description ?? ""}
                  {p?.link && (
                    <>
                      {" "}
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:underline"
                      >
                        (link)
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* CERTIFICATIONS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-300 pb-1 mb-4">
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
          <section className="p-5 border border-gray-300 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-800 border-b border-gray-400 pb-1 mb-3">
              Education
            </h3>
            <div className="text-sm text-gray-700">
              {education.map((e, i) => (
                <div key={i} className={i ? "mt-3" : ""}>
                  <p className="font-semibold">{e?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs mb-2">
                    {e?.school ? `${e.school} | ${e?.year ?? ""}` : e?.year ?? ""}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CUSTOM SECTIONS (UNLIMITED) */}
        {customSections.map((sec, i) => (
          <div className="resume-section" key={i}>
            <section className="mt-10">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-300 pb-1 mb-3">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed">
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

export default FresherSimple;
