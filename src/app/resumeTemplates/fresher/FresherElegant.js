import React from "react";

const FresherElegant = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const contactEmail = data?.email ?? "";
  const contactPhone = data?.phone ?? "";
  const contactCity = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  const objective = data?.summary ?? "";
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const education = data?.education ?? [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed font-sans text-gray-900 w-[210mm] min-h-[297mm]">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center pb-6 border-b border-purple-300 mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {fullName}
            </h1>

            <p className="text-sm text-gray-600 mt-2">
              {(contactEmail || contactPhone || contactCity || linkedin || github || portfolio) && (
                <>
                  {contactEmail && <>Email: {contactEmail}</>}
                  {(contactEmail && contactPhone) && " | "}
                  {contactPhone && <>Phone: {contactPhone}</>}
                  {(contactEmail || contactPhone) && contactCity ? " | " : ""}
                  {contactCity && <>City: {contactCity}</>}

                  {(contactCity && linkedin) && " | "}
                  {linkedin && (
                    <>
                      LinkedIn:{" "}
                      <a href={linkedin} className="text-purple-600 underline break-all" target="_blank" rel="noreferrer">
                        {linkedin}
                      </a>
                    </>
                  )}

                  {(linkedin && github) && " | "}
                  {github && (
                    <>
                      GitHub:{" "}
                      <a href={github} className="text-purple-600 underline break-all" target="_blank" rel="noreferrer">
                        {github}
                      </a>
                    </>
                  )}

                  {(github && portfolio) && " | "}
                  {portfolio && (
                    <>
                      Portfolio:{" "}
                      <a href={portfolio} className="text-purple-600 underline break-all" target="_blank" rel="noreferrer">
                        {portfolio}
                      </a>
                    </>
                  )}
                </>
              )}
            </p>
          </header>
        </div>

        {/* OBJECTIVE */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Objective
            </h3>
            <p className="text-sm text-gray-700">{objective}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-purple-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Skills
            </h3>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              {skills.map((s, i) => (
                <p key={i}>• {typeof s === "string" ? s : s?.name ?? ""}</p>
              ))}
            </div>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-purple-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Projects
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="p-4 border border-purple-200 rounded-xl shadow-sm hover:shadow-md transition bg-purple-50"
                >
                  <p className="font-semibold text-gray-900">
                    {p?.title ?? p?.name ?? ""}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {Array.isArray(p?.stack)
                      ? p.stack.join(" • ")
                      : p?.stack ?? ""}
                  </p>
                  <p className="text-sm">{p?.description ?? ""}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section>
            <h3 className="text-xl font-semibold text-purple-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Education
            </h3>

            <div className="text-sm text-gray-700 space-y-4">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="font-semibold">{e?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {e?.school ? `${e.school} | ${e?.year ?? ""}` : e?.year ?? ""}
                  </p>
                  {e?.details && <p className="text-sm mt-1">{e.details}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CUSTOM SECTIONS */}
        <div className="resume-section">
          {customSections.map((sec, idx) => (
            <section key={idx} className="mb-8">
              <h3 className="text-xl font-semibold text-purple-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-gray-700 space-y-1">
                {Array.isArray(sec?.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : sec?.content}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FresherElegant;
