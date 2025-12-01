import React from "react";

const FresherCampus = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";
  const batch = data?.batch ?? "";

  // CONTACT — FULL SUPPORT
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const address = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  const objective = data?.summary ?? data?.objective ?? "";
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed font-sans text-gray-900 w-[210mm] min-h-[297mm]">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center pb-6 border-b border-teal-300 mb-10">
            <h1 className="text-4xl font-bold text-gray-900">{fullName}</h1>
            <h2 className="text-lg text-teal-600 font-medium">{role}</h2>
            <p className="text-sm text-gray-600 mt-1">{batch}</p>

            {/* PROPER DYNAMIC CONTACT SECTION */}
            <div className="text-xs text-gray-500 mt-3 flex flex-col gap-1">
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
                    className="text-teal-600 hover:underline break-all"
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
                    className="text-teal-600 hover:underline break-all"
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
                    className="text-teal-600 hover:underline break-all"
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
            <h3 className="text-lg font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Objective
            </h3>
            <p className="text-sm text-gray-700">{objective}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Skills
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="px-3 py-2 bg-teal-50 text-teal-700 rounded-lg shadow-sm text-center text-xs font-medium"
                >
                  {typeof skill === "string" ? skill : skill?.name ?? ""}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Academic Projects
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
                      rel="noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      (link)
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* EXPERIENCE */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Training / Internships
            </h3>

            <div className="text-sm text-gray-700 space-y-4">
              {experience.map((it, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-gray-900">
                    {it?.title ?? it?.role ?? ""}
                    {it?.company ? ` — ${it.company}` : ""}
                  </p>
                  <p className="text-gray-500 text-xs">{it?.duration ?? ""}</p>
                  <p className="mt-1">{it?.description ?? ""}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION — MUST COME BEFORE CUSTOM SECTIONS */}
        <div className="resume-section">
          <section className="p-5 border border-teal-300 rounded-xl bg-teal-50">
            <h3 className="text-lg font-semibold text-teal-800 uppercase tracking-wide border-b border-teal-300 pb-1 mb-3">
              Education
            </h3>

            <div className="text-sm text-gray-700 space-y-3">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="font-semibold">{e?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {e?.school ? `${e.school} | ${e?.year ?? ""}` : e?.year ?? ""}
                  </p>

                  {(e?.cgpa || e?.percentage) && (
                    <p className="text-sm font-medium">
                      {e?.cgpa && <>CGPA: <span className="font-bold">{e.cgpa}</span></>}
                      {e?.cgpa && e?.percentage ? " | " : ""}
                      {e?.percentage && <>Percentage: <span className="font-bold">{e.percentage}</span></>}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CUSTOM SECTIONS — ALWAYS LAST */}
        {customSections.map((sec, idx) => (
          <div className="resume-section" key={idx}>
            <section className="mt-10">
              <h3 className="text-lg font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-gray-700">
                {Array.isArray(sec?.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : sec?.content ?? ""}
              </div>
            </section>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FresherCampus;
