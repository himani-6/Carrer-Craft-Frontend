import React from "react";

const ModernCreative = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const skills = Array.isArray(data?.skills) ? data.skills : [];

  const languages =
    (data?.customSections || [])
      .find((s) => (s?.heading || "").toLowerCase() === "languages")?.content ||
    data?.languages ||
    [];

  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const renderDesc = (desc) => {
    if (!desc) return null;
    if (Array.isArray(desc)) return desc.map((d, i) => <p key={i}>{d}</p>);
    return desc
      .split("\n")
      .map((d, i) => <p key={i}>{d}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white shadow overflow-hidden border border-gray-200 rounded-2xl font-sans">

        {/* HEADER */}
        <header className="resume-section bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8">
          <h1 className="text-4xl font-bold tracking-tight break-words">
            {data?.fullName || ""}
          </h1>
          <p className="text-lg font-medium">{data?.role || ""}</p>
        </header>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 text-gray-800">

          {/* LEFT SIDE */}
          <div className="space-y-8 md:col-span-1 break-words">

            {/* CONTACT */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-3">
                Contact Info
              </h3>
              <ul className="text-sm space-y-2 break-words">
                {contact.email && <li>Email: {contact.email}</li>}
                {contact.phone && <li>Phone: {contact.phone}</li>}
                {contact.address && <li>Location: {contact.address}</li>}

                {contact.linkedin && (
                  <li>
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline break-all"
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
                      className="text-blue-600 hover:underline break-all"
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
                      className="text-blue-600 hover:underline break-all"
                    >
                      {contact.portfolio}
                    </a>
                  </li>
                )}
              </ul>
            </section>

            {/* SKILLS */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold border-b-2 border-purple-400 pb-1 mb-3">
                Skills
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 break-words">
                {skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            {/* LANGUAGES */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold border-b-2 border-pink-400 pb-1 mb-3">
                Languages
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 break-words">
                {languages.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </section>

            {/* CUSTOM SECTIONS (ON LEFT SIDE ONLY) */}
            {customSections
              .filter(
                (sec) =>
                  ![
                    "skills",
                    "contact info",
                    "languages",
                    "summary",
                    "experience",
                    "education",
                    "projects",
                  ].includes((sec?.heading || "").toLowerCase())
              )
              .map((sec, idx) => (
                <section key={idx} className="resume-section">
                  <h3 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-3">
                    {sec?.heading || ""}
                  </h3>
                  <div className="text-sm leading-relaxed break-words">
                    {Array.isArray(sec?.content)
                      ? sec.content.map((c, i) => <p key={i}>{c}</p>)
                      : sec?.content || ""}
                  </div>
                </section>
              ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-8 break-words">

            {/* SUMMARY */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-sm leading-relaxed">{summary}</p>
            </section>

            {/* EXPERIENCE */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold border-b-2 border-purple-400 pb-1 mb-3">
                Experience
              </h3>

              <div className="space-y-4 text-sm">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow break-words"
                  >
                    <p className="font-semibold">
                      {exp?.title || ""} {exp?.company ? `– ${exp.company}` : ""}
                    </p>

                    {exp?.duration && (
                      <p className="text-gray-500 text-xs">
                        {exp.duration}
                        {exp?.location ? ` | ${exp.location}` : ""}
                      </p>
                    )}

                    {renderDesc(exp?.description)}
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold border-b-2 border-pink-400 pb-1 mb-3">
                Education
              </h3>

              <div className="text-sm space-y-2 break-words">
                {education.map((ed, i) => (
                  <div key={i}>
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

            {/* PROJECTS */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-3">
                Projects
              </h3>

              <ul className="list-disc list-inside text-sm space-y-2 break-words">
                {projects.map((p, i) => (
                  <li key={i}>
                    {p?.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-blue-600 hover:underline break-words"
                      >
                        {p.title || ""}
                      </a>
                    ) : (
                      <span className="font-semibold">{p.title || ""}</span>
                    )}
                    {p?.description ? `: ${p.description}` : ""}
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCreative;
