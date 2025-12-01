import React from "react";

const InternationalCanada = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";

  // CONTACT FIELDS (all 6)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const location = data?.address ?? data?.location ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  const summary = data?.summary ?? "";
  const skills = data?.skills ?? [];
  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];
  const projects = data?.projects ?? [];
  const certifications = data?.certifications ?? [];

  // Volunteer as separate official section
  const volunteer = data?.volunteer ?? [];

  // Unlimited Custom Sections
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed w-[210mm] min-h-[297mm] text-gray-900 font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="pb-4 border-b border-gray-300 mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {fullName}
            </h1>
            <p className="text-lg text-blue-700 font-medium">{role}</p>
          </header>
        </div>

        {/* CONTACT */}
        <div className="resume-section">
          <section className="mb-8 text-sm text-gray-700 space-y-1">

            {email && <p>Email: {email}</p>}
            {phone && <p>Phone: {phone}</p>}
            {location && <p>Location: {location}</p>}

            {linkedin && (
              <p>
                LinkedIn:{" "}
                <a href={linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                  {linkedin}
                </a>
              </p>
            )}

            {github && (
              <p>
                GitHub:{" "}
                <a href={github} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                  {github}
                </a>
              </p>
            )}

            {portfolio && (
              <p>
                Portfolio:{" "}
                <a href={portfolio} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                  {portfolio}
                </a>
              </p>
            )}

          </section>
        </div>

        {/* SUMMARY */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Technical & Soft Skills
            </h3>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              {skills.map((s, i) => (
                <p key={i}>• {typeof s === "string" ? s : s?.name ?? ""}</p>
              ))}
            </div>
          </section>
        </div>

        {/* WORK EXPERIENCE */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Work Experience
            </h3>

            <div className="text-sm space-y-5">
              {experiences.map((exp, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-gray-900">
                    {exp?.title ?? ""}{exp?.company ? ` — ${exp.company}` : ""}
                  </p>

                  <p className="text-gray-500 text-xs">
                    {exp?.location ? `${exp.location} | ${exp?.duration ?? ""}` : exp?.duration ?? ""}
                  </p>

                  {/* Description or bullet points */}
                  {Array.isArray(exp?.bullets) ? (
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  ) : (
                    exp?.description && (
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>{exp.description}</li>
                      </ul>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
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
            <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
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
                      {" "}(link)
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
            <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {certifications.map((c, i) => (
                <li key={i}>
                  {typeof c === "string" ? c : c?.name ?? ""}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* VOLUNTEER EXPERIENCE */}
        {Array.isArray(volunteer) && volunteer.length > 0 && (
          <div className="resume-section">
            <section className="mb-8">
              <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Volunteer Experience
              </h3>

              <div className="text-sm text-gray-700 space-y-2">
                {volunteer.map((v, i) => (
                  <div key={i}>
                    {typeof v === "string" ? (
                      <p>{v}</p>
                    ) : (
                      <>
                        <p className="font-semibold">{v?.title ?? v?.role ?? ""}</p>
                        <p className="text-gray-500 text-xs">
                          {v?.location ?? ""}{v?.duration ? ` | ${v.duration}` : ""}
                        </p>
                        {v?.details && (
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>{v.details}</li>
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <div className="resume-section" key={i}>
            <section className="mb-8 mt-8">
              <h3 className="text-xl font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
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

export default InternationalCanada;
