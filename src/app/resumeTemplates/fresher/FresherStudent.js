import React from "react";

const FresherStudent = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";
  const college = data?.college ?? "";

  // CONTACT (all 6 fields supported)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const address = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  // SUMMARY / OBJECTIVE
  const objective = data?.summary ?? data?.objective ?? "";

  // Experience (internships)
  const experiences = data?.experience ?? [];

  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const certifications = data?.certifications ?? [];
  const education = data?.education ?? [];

  // CUSTOM SECTIONS
  const customSections = data?.customSections ?? [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed font-sans text-gray-900 w-[210mm] min-h-[297mm]">

        {/* HEADER */}
        <header className="resume-section">
          <div className="text-center pb-6 border-b border-blue-300 mb-10">
            <h1 className="text-4xl font-bold text-gray-900">{fullName}</h1>
            <h2 className="text-lg font-medium text-blue-600">{role}</h2>

            {college && (
              <p className="text-sm text-gray-600 mt-1">{college}</p>
            )}

            <div className="text-xs text-gray-500 mt-3 space-y-1">
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

        {/* OBJECTIVE */}
        <section className="resume-section mb-8">
          <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            Objective
          </h3>
          <p className="text-sm text-gray-700">{objective}</p>
        </section>

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <section className="resume-section mb-8">
            <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Experience
            </h3>

            <div className="text-sm text-gray-700 space-y-4">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <p className="font-semibold text-gray-900">
                    {exp?.title ?? exp?.role ?? ""}
                    {exp?.company ? ` — ${exp.company}` : ""}
                  </p>

                  {exp?.duration && (
                    <p className="text-gray-500 text-xs">{exp.duration}</p>
                  )}

                  <p>{exp?.description ?? ""}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        <section className="resume-section mb-8">
          <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            Skills
          </h3>
          <div className="flex flex-wrap gap-3 text-sm">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition"
              >
                {typeof skill === "string" ? skill : skill?.name ?? ""}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="resume-section mb-8">
          <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            Projects
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
                    className="text-blue-600 hover:underline"
                  >
                    {" "}
                    (link)
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* CERTIFICATIONS */}
        <section className="resume-section mb-8">
          <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
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

        {/* EDUCATION */}
        <section className="resume-section mb-8">
          <div className="p-5 border border-blue-300 rounded-xl bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-800 uppercase tracking-wide border-b border-blue-300 pb-1 mb-3">
              Education
            </h3>

            <div className="text-sm text-gray-700">
              {education.map((e, i) => (
                <div key={i} className={i ? "mt-2" : ""}>
                  <p className="font-semibold">{e?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {e?.school ? `${e.school} | ${e?.year ?? ""}` : e?.year ?? ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <section key={i} className="resume-section mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-1 mb-3">
              {sec?.heading ?? ""}
            </h3>
            <div className="text-sm text-gray-700">
              {Array.isArray(sec?.content)
                ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                : sec?.content ?? ""}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default FresherStudent;

