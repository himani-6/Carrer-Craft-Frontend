import React from "react";

const ModernProfessional = ({ data }) => {
  // FULL CONTACT SET (All fields)
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const summary = data?.summary || "";

  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white text-gray-900 p-8 border border-gray-200 rounded-xl shadow-sm font-sans">

        {/* HEADER */}
        <header className="resume-section text-center border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-4xl font-bold tracking-tight break-words">
            {data?.fullName || ""}
          </h1>
          <h2 className="text-lg text-gray-600 font-medium break-words">
            {data?.role || ""}
          </h2>
        </header>

        {/* CONTACT SECTION */}
        <section className="resume-section mb-6">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 text-blue-700">
            Contact
          </h3>

          <ul className="text-sm space-y-1 break-words">
            {contact.email && (
              <li>
                Email:{" "}
                <a href={`mailto:${contact.email}`} className="text-blue-700 hover:underline">
                  {contact.email}
                </a>
              </li>
            )}

            {contact.phone && (
              <li>
                Phone:{" "}
                <a href={`tel:${contact.phone}`} className="text-blue-700 hover:underline">
                  {contact.phone}
                </a>
              </li>
            )}

            {contact.address && <li>Location: {contact.address}</li>}

            {contact.linkedin && (
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline break-all"
                >
                  {contact.linkedin}
                </a>
              </li>
            )}

            {contact.github && (
              <li>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline break-all"
                >
                  {contact.github}
                </a>
              </li>
            )}

            {contact.portfolio && (
              <li>
                <a
                  href={contact.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline break-all"
                >
                  {contact.portfolio}
                </a>
              </li>
            )}
          </ul>
        </section>

        {/* SUMMARY */}
        <section className="resume-section mb-6">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 text-blue-700">
            Summary
          </h3>
          <p className="text-sm leading-relaxed break-words">
            {summary}
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-section mb-6">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 text-blue-700">
            Experience
          </h3>

          <div className="space-y-4 text-sm break-words">
            {experience.map((exp, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {exp?.title || ""}
                  {exp?.company ? ` – ${exp.company}` : ""}
                </p>

                {exp?.duration && (
                  <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                )}

                {exp?.description ? (
                  Array.isArray(exp.description) ? (
                    exp.description.map((d, j) => <p key={j}>{d}</p>)
                  ) : (
                    <p>{exp.description}</p>
                  )
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="resume-section mb-6">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 text-blue-700">
            Education
          </h3>

          <div className="text-sm break-words">
            {education.map((ed, i) => (
              <div key={i} className={i > 0 ? "mt-2" : ""}>
                <p className="font-semibold">
                  {ed?.degree || ""}
                  {ed?.school ? ` – ${ed.school}` : ""}
                </p>

                {ed?.year && (
                  <p className="text-gray-500 text-xs">{ed.year}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="resume-section mb-6">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 text-blue-700">
            Skills
          </h3>

          <ul className="list-disc list-inside text-sm space-y-1 break-words">
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        {/* PROJECTS */}
        <section className="resume-section mb-2">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 text-blue-700">
            Projects
          </h3>

          <ul className="list-disc list-inside text-sm space-y-1 break-words">
            {projects.map((p, i) => (
              <li key={i}>
                {p.link ? (
                  <a
                    href={p.link}
                    className="font-semibold text-blue-700 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.title || ""}
                  </a>
                ) : (
                  <span className="font-semibold">{p.title || ""}</span>
                )}{" "}
                {p?.description ? `– ${p.description}` : ""}
              </li>
            ))}
          </ul>
        </section>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, idx) => (
          <section key={idx} className="resume-section mt-6 break-words">
            <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 text-blue-700">
              {sec?.heading || ""}
            </h3>

            <div className="text-sm leading-relaxed">
              {Array.isArray(sec?.content)
                ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                : sec?.content || ""}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default ModernProfessional;
