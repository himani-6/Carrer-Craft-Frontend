import React from "react";

const InternationalAsia = ({ data }) => {
  // BASIC INFO
  const fullName = data?.fullName ?? "Li Wei Tan";
  const role = data?.role ?? "Software Engineer";

  // PHOTO
  const photoUrl = data?.photoUrl ?? "";

  // CONTACT (6 fields)
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const linkedin = data?.linkedin ?? "";
  const location = data?.address ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";

  // MAIN SECTIONS
  const summary = data?.summary ?? "";

  const skills = data?.skills ?? [];

  const experiences = data?.experience ?? [];

  const education = data?.education ?? [];

  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white w-[210mm] min-h-[297mm] p-8 leading-relaxed font-sans text-gray-900">

        {/* HEADER */}
        <header className="resume-section flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-300 mb-10">
          
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{fullName}</h1>
            <p className="text-lg text-teal-600 font-medium">{role}</p>
          </div>

          {photoUrl ? (
            <div className="w-28 h-32 rounded-xl overflow-hidden bg-gray-200 shadow-md">
              <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : null}
        </header>

        {/* CONTACT INFO */}
        <section className="resume-section mb-8">
          <div className="text-sm text-gray-700 space-y-1">

            {email && <p>Email: {email}</p>}
            {phone && <p>Phone: {phone}</p>}
            {location && <p>Location: {location}</p>}

            {linkedin && (
              <p>
                LinkedIn:{" "}
                <a href={linkedin} className="text-teal-600 underline" target="_blank" rel="noreferrer">
                  {linkedin}
                </a>
              </p>
            )}

            {github && (
              <p>
                GitHub:{" "}
                <a href={github} className="text-teal-600 underline" target="_blank" rel="noreferrer">
                  {github}
                </a>
              </p>
            )}

            {portfolio && (
              <p>
                Portfolio:{" "}
                <a href={portfolio} className="text-teal-600 underline" target="_blank" rel="noreferrer">
                  {portfolio}
                </a>
              </p>
            )}

          </div>
        </section>

        {/* SUMMARY */}
        <section className="resume-section mb-8">
          <h3 className="text-xl font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            Summary
          </h3>
          <p className="text-sm text-gray-700">{summary}</p>
        </section>

        {/* SKILLS */}
        <section className="resume-section mb-10">
          <h3 className="text-xl font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
            Skills
          </h3>
          <ul className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
            {skills.map((s, i) => (
              <li key={i}>• {typeof s === "string" ? s : s?.name ?? ""}</li>
            ))}
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-section mb-10">
          <h3 className="text-xl font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
            Professional Experience
          </h3>
          <div className="space-y-6 text-sm">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                <p className="font-semibold text-gray-900">{exp.title} — {exp.company}</p>
                <p className="text-gray-500 text-xs">{exp.location} | {exp.duration}</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {(exp.bullets ?? []).map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="resume-section mb-10">
          <h3 className="text-xl font-semibold text-teal-700 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
            Education
          </h3>
          <div className="text-sm text-gray-700 space-y-4">
            {education.map((e, i) => (
              <div key={i}>
                <p className="font-semibold">{e.degree}</p>
                <p className="text-gray-500 text-xs">
                  {e.school}{e.year ? ` | ${e.year}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <section key={i} className="resume-section mb-8">
            <h3 className="text-xl font-semibold uppercase text-teal-700 border-b border-gray-300 pb-1 mb-3">
              {sec?.heading ?? ""}
            </h3>
            <div className="text-sm text-gray-700 leading-relaxed">
              {Array.isArray(sec?.content)
                ? sec.content.map((line, j) => <p key={j}>{line}</p>)
                : sec?.content}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default InternationalAsia;
