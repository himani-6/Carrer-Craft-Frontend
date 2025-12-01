import React from "react";

const FresherCreative = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";
  const objective = data?.summary ?? data?.objective ?? "";

  // Dynamic sections
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed font-sans text-gray-900 w-[210mm] min-h-[297mm]">

        {/* HEADER */}
        <div className="resume-section">
          <header className="flex items-center gap-5 border-b border-gray-300 pb-6 mb-10">
            <div className="w-2 bg-pink-300 rounded-full h-20"></div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                {fullName}
              </h1>
              <p className="text-lg text-pink-500 font-medium">
                {role}
              </p>
            </div>
          </header>
        </div>

        {/* OBJECTIVE */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-bold text-pink-600 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Objective
            </h3>
            <p className="text-sm text-gray-700">{objective}</p>
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-bold text-pink-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
              Skills
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {skills.map((s, i) => (
                <li key={i}>{typeof s === "string" ? s : s?.name ?? ""}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-bold text-pink-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
              Projects
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-3">
              {projects.map((p, i) => (
                <li key={i}>
                  <span className="font-semibold">{p?.title ?? ""}:</span>{" "}
                  {p?.description ?? ""}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* EXPERIENCE */}
        <div className="resume-section">
          <section className="mb-10">
            <h3 className="text-xl font-bold text-pink-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
              Experience
            </h3>

            <div className="text-sm text-gray-700 space-y-3">
              {experience.map((exp, i) => (
                <div key={i}>
                  <p className="font-semibold">
                    {exp?.title ?? ""} {exp?.company ? `— ${exp.company}` : ""}
                  </p>
                  <p className="text-xs text-gray-500">{exp?.duration ?? ""}</p>
                  <p>{exp?.description ?? ""}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section>
            <h3 className="text-xl font-bold text-pink-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
              Education
            </h3>

            <div className="text-sm text-gray-700 space-y-2">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="font-semibold">{e?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {e?.school ? `${e.school} | ${e.year}` : e?.year ?? ""}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CUSTOM SECTIONS — ALWAYS LAST */}
        {customSections.map((sec, i) => (
          <div className="resume-section" key={i}>
            <section className="mb-8">
              <h3 className="text-xl font-bold text-pink-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-gray-700 space-y-1">
                {Array.isArray(sec?.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : sec?.content}
              </div>
            </section>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FresherCreative;
