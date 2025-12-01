import React from "react";

const ModernTech = ({ data }) => {
  // CONTACT FIELDS (ALL ENABLED)
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
    address: data?.address || "",
  };

  // BASIC SECTIONS
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const summary =
    data?.summary ||
    "Passionate Full Stack Developer with hands-on experience building scalable applications.";

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden font-sans text-gray-800">

        {/* HEADER */}
        <header className="resume-section text-center border-b border-gray-300 pb-6 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {data?.fullName || ""}
          </h1>

          <h2 className="text-lg text-blue-600 font-medium">
            {data?.role || ""}
          </h2>

          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-700 break-words">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>| {contact.phone}</span>}
            {contact.address && <span>| {contact.address}</span>}

            {contact.linkedin && (
              <span>
                |{" "}
                <a href={contact.linkedin} className="hover:text-blue-600" target="_blank" rel="noreferrer">
                  {contact.linkedin}
                </a>
              </span>
            )}

            {contact.github && (
              <span>
                |{" "}
                <a href={contact.github} className="hover:text-blue-600" target="_blank" rel="noreferrer">
                  {contact.github}
                </a>
              </span>
            )}

            {contact.portfolio && (
              <span>
                |{" "}
                <a href={contact.portfolio} className="hover:text-blue-600" target="_blank" rel="noreferrer">
                  {contact.portfolio}
                </a>
              </span>
            )}
          </div>
        </header>

        {/* SUMMARY */}
        <section className="resume-section mb-8">
          <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">
            Summary
          </h3>
          <p className="text-sm leading-relaxed text-gray-700">
            {summary}
          </p>
        </section>

        {/* SKILLS — NORMAL LIST, NO PROGRESS BAR */}
        <section className="resume-section mb-8">
          <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2 text-sm text-gray-800">
            {skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 rounded-full font-medium"
              >
                {typeof s === "string" ? s : s?.name}
              </span>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-section mb-8">
          <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">
            Experience
          </h3>

          <div className="text-sm leading-relaxed space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <p className="font-semibold text-gray-900">
                  {exp?.title || ""}{exp?.company ? ` – ${exp.company}` : ""}
                </p>
                <p className="text-gray-500 text-xs">{exp?.duration || ""}</p>

                {exp?.description && (
                  <ul className="list-disc list-inside text-gray-700 mt-1">
                    {(Array.isArray(exp.description)
                      ? exp.description
                      : exp.description.split("\n"))
                      .filter(Boolean)
                      .map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="resume-section mb-8">
          <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">
            Education
          </h3>

          <div className="text-sm leading-relaxed space-y-3">
            {education.map((ed, i) => (
              <div key={i}>
                <p className="font-semibold text-gray-900">{ed?.degree || ""}</p>
                <p className="text-gray-600 text-xs">
                  {ed?.school ? `${ed.school} | ${ed.year || ""}` : ed?.year}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="resume-section mb-8">
          <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">
            Projects
          </h3>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            {projects.map((p, i) => (
              <li key={i}>
                <span className="font-medium text-gray-900">
                  {p?.title || ""}
                </span>

                {p?.description && ` – ${p.description}`}

                {p?.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 ml-1"
                  >
                    {p.link}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, idx) => (
          <section key={idx} className="resume-section mt-8">
            <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">
              {sec?.heading || "New Section"}
            </h3>

            <div className="text-sm text-gray-700 leading-relaxed">
              {Array.isArray(sec?.content)
                ? sec.content.map((c, i) => <p key={i}>{c}</p>)
                : sec?.content || ""}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default ModernTech;
