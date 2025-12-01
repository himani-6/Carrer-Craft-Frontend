import React from "react";

const FresherTechStarter = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";

  // Contact fields
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const location = data?.address ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  const objective = data?.summary ?? data?.objective ?? "";

  const skills = data?.skills ?? [];

  const projects = data?.projects ?? [];

  // Replace course work with EXPERIENCE
  const experience = data?.experience ?? [];

  const education = data?.education ?? [];

  // Custom sections
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed w-[210mm] min-h-[297mm] text-gray-900 font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center pb-6 border-b-2 border-cyan-400 mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {fullName}
            </h1>
            <p className="text-lg font-medium text-cyan-600">{role}</p>

            {/* Contact info */}
            <div className="text-sm text-gray-600 mt-2 flex flex-col items-center gap-1">
              {email && <p>Email: {email}</p>}
              {phone && <p>Phone: {phone}</p>}
              {location && <p>Location: {location}</p>}

              {linkedin && (
                <p>
                  LinkedIn:{" "}
                  <a href={linkedin} target="_blank" rel="noreferrer"
                     className="text-cyan-600 hover:underline break-all">
                    {linkedin}
                  </a>
                </p>
              )}

              {github && (
                <p>
                  GitHub:{" "}
                  <a href={github} target="_blank" rel="noreferrer"
                     className="text-cyan-600 hover:underline break-all">
                    {github}
                  </a>
                </p>
              )}

              {portfolio && (
                <p>
                  Portfolio:{" "}
                  <a href={portfolio} target="_blank" rel="noreferrer"
                     className="text-cyan-600 hover:underline break-all">
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
            <h3 className="text-xl font-semibold text-cyan-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Objective
            </h3>
            <p className="text-sm text-gray-700">{objective}</p>
          </section>
        </div>

        {/* TECHNICAL SKILLS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-cyan-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Technical Skills
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="px-3 py-2 bg-cyan-50 text-cyan-700 rounded-lg shadow-sm hover:bg-cyan-100 transition text-center text-xs font-medium"
                >
                  {typeof skill === "string" ? skill : skill?.name ?? ""}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-cyan-700 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
              Academic Projects
            </h3>

            <div className="space-y-6 text-sm">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-cyan-200 bg-cyan-50 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-900">
                    {proj?.number ? `${proj.number}. ` : ""}{proj?.title}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">{proj?.type}</p>
                  <p>{proj?.description}</p>

                  {proj?.link && (
                    <a
                      href={proj.link}
                      className="text-cyan-700 text-xs font-medium hover:underline mt-2 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Link →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EXPERIENCE (New Section replacing Coursework) */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-cyan-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Experience
            </h3>

            <div className="text-sm text-gray-700 space-y-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <p className="font-semibold">{exp?.role ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {exp?.company ? `${exp.company} | ${exp?.duration ?? ""}` : exp?.duration ?? ""}
                  </p>
                  {exp?.details && <p className="text-sm mt-1">{exp.details}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section>
            <h3 className="text-xl font-semibold text-cyan-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Education
            </h3>

            <div className="text-sm text-gray-700 space-y-4">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="font-semibold">{e?.degree}</p>
                  <p className="text-gray-500 text-xs">
                    {e?.school ? `${e.school} | ${e?.year ?? ""}` : e?.year}
                  </p>
                  {e?.cgpa && (
                    <p className="mt-1 text-sm">
                      CGPA:{" "}
                      <span className="font-bold text-cyan-700">{e.cgpa}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <div className="resume-section" key={i}>
            <section className="mt-10">
              <h3 className="text-xl font-semibold text-cyan-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                {sec?.heading}
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

export default FresherTechStarter;
