import React from "react";

const ModernMinimalist = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden font-sans text-gray-900">

        {/* HEADER — BASIC INFO ONLY */}
        <header className="resume-section border-b border-gray-300 pb-4 mb-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight">{data?.fullName || ""}</h1>
          <h2 className="text-lg text-gray-600 font-medium">{data?.role || ""}</h2>
        </header>

        {/* LEFT + RIGHT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-6 md:col-span-1 break-words">

            {/* CONTACT SECTION */}
            <section className="resume-section">
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Contact
              </h3>

              <ul className="text-sm space-y-2 break-words">
                {contact.email && (
                  <li>
                    Email:{" "}
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </li>
                )}

                {contact.phone && (
                  <li>
                    Phone:{" "}
                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                      {contact.phone}
                    </a>
                  </li>
                )}

                {contact.address && <li>Location: {contact.address}</li>}

                {contact.linkedin && (
                  <li>
                    <a
                      href={contact.linkedin}
                      className="text-blue-600 hover:underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.linkedin}
                    </a>
                  </li>
                )}

                {contact.github && (
                  <li>
                    <a
                      href={contact.github}
                      className="text-blue-600 hover:underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.github}
                    </a>
                  </li>
                )}

                {contact.portfolio && (
                  <li>
                    <a
                      href={contact.portfolio}
                      className="text-blue-600 hover:underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.portfolio}
                    </a>
                  </li>
                )}
              </ul>
            </section>

            {/* SKILLS */}
            <section className="resume-section">
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Skills
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 break-words">
                {skills.map((s, i) => (
                  <li key={i}>{typeof s === "string" ? s : s?.name}</li>
                ))}
              </ul>
            </section>

            {/* CUSTOM SECTIONS ON LEFT SIDE */}
            {customSections.map((sec, idx) => (
              <section key={idx} className="resume-section">
                <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                  {sec?.heading || "New Section"}
                </h3>

                <div className="text-sm leading-relaxed break-words">
                  {Array.isArray(sec?.content)
                    ? sec.content.map((c, i) => <p key={i}>{c}</p>)
                    : (sec?.content || "")}
                </div>
              </section>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-6">

            {/* SUMMARY */}
            <section className="resume-section">
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-sm leading-relaxed break-words">{data?.summary || ""}</p>
            </section>

            {/* EXPERIENCE */}
            <section className="resume-section">
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-4 text-sm">
                {experience.map((exp, i) => (
                  <div key={i} className="break-words">
                    <p className="font-semibold">
                      {exp?.title || ""}{exp?.company ? ` – ${exp.company}` : ""}
                    </p>

                    {exp?.duration && (
                      <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                    )}

                    {exp?.description && (
                      Array.isArray(exp.description) ? (
                        exp.description.map((d, j) => (
                          <p className="mt-1" key={j}>{d}</p>
                        ))
                      ) : (
                        <p className="mt-1">{exp.description}</p>
                      )
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className="resume-section">
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Education
              </h3>

              <div className="text-sm">
                {education.map((ed, i) => (
                  <div key={i} className={i === 0 ? "" : "mt-2 break-words"}>
                    <p className="font-semibold">{ed?.degree || ""}</p>
                    <p className="text-gray-500 text-xs">
                      {ed?.school ? `${ed.school} | ${ed?.year || ""}` : ed?.year}
                    </p>
                    {ed?.cgpa && <p className="text-sm">CGPA: {ed.cgpa}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section className="resume-section">
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Projects
              </h3>

              <div className="space-y-3 text-sm">
                {Array.isArray(data?.projects) &&
                  data.projects.map((p, i) => (
                    <div key={i} className="break-words">
                      <p className="font-medium">{p?.title || ""}</p>
                      <p>
                        {p?.description || ""}
                        {p?.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline ml-1"
                          >
                            {p.link}
                          </a>
                        )}
                      </p>
                    </div>
                  ))}
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ModernMinimalist;
