import React from "react";

const MinimalistSidebar = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const languages = Array.isArray(data?.languages) ? data.languages : [];

  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];

  // Custom sections go to LEFT SIDEBAR
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const renderDescription = (desc) => {
    if (!desc) return null;
    if (Array.isArray(desc)) return desc.map((d, i) => <p key={i}>{d}</p>);
    return String(desc)
      .split("\n")
      .map((d, i) => <p key={i}>{d.trim()}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white w-[210mm] min-h-[297mm] p-8 leading-relaxed font-sans text-gray-900">

        <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed shadow-sm rounded-xl overflow-hidden">

          <div className="flex flex-col md:flex-row">

            {/* LEFT SIDEBAR */}
            <aside className="w-full md:w-1/3 bg-gray-50 p-6 space-y-8 resume-section">

              {/* CONTACT */}
              <section>
                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                  Contact
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  {contact.email && <li>Email: {contact.email}</li>}
                  {contact.phone && <li>Phone: {contact.phone}</li>}
                  {contact.address && <li>Location: {contact.address}</li>}

                  {contact.linkedin && (
                    <li>
                      <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-gray-600 hover:underline">
                        {contact.linkedin}
                      </a>
                    </li>
                  )}

                  {contact.github && (
                    <li>
                      <a href={contact.github} target="_blank" rel="noreferrer" className="text-gray-600 hover:underline">
                        {contact.github}
                      </a>
                    </li>
                  )}

                  {contact.portfolio && (
                    <li>
                      <a href={contact.portfolio} target="_blank" rel="noreferrer" className="text-gray-600 hover:underline">
                        {contact.portfolio}
                      </a>
                    </li>
                  )}
                </ul>
              </section>

              {/* SKILLS */}
              <section>
                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                  Skills
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>

              {/* LANGUAGES */}
              <section>
                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                  Languages
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {languages.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>

              {/* CUSTOM SECTIONS */}
              {customSections.map((sec, idx) => (
                <section key={idx}>
                  <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                    {sec?.heading || "New Section"}
                  </h3>

                  <div className="text-sm text-gray-700 space-y-1">
                    {Array.isArray(sec?.content)
                      ? sec.content.map((c, i) => <p key={i}>{c}</p>)
                      : sec?.content || ""}
                  </div>
                </section>
              ))}

            </aside>

            {/* RIGHT MAIN AREA */}
            <main className="w-full md:w-2/3 p-8 space-y-8 resume-section">

              {/* HEADER */}
              <header className="mb-4 border-b border-gray-200 pb-3">
                <h1 className="text-3xl font-bold tracking-tight">{data?.fullName || ""}</h1>
                <p className="text-lg text-gray-600 font-medium">{data?.role || ""}</p>
              </header>

              {/* SUMMARY */}
              <section>
                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                  Summary
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{data?.summary || ""}</p>
              </section>

              {/* EXPERIENCE */}
              <section>
                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                  Experience
                </h3>

                <div className="space-y-4 text-sm">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <p className="font-semibold text-gray-900">
                        {exp?.title || ""}
                        {exp?.company ? ` — ${exp.company}` : ""}
                      </p>
                      {exp?.duration && (
                        <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                      )}
                      {renderDescription(exp?.description)}
                    </div>
                  ))}
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                  Education
                </h3>

                <div className="text-sm">
                  {education.map((ed, i) => (
                    <div key={i}>
                      <p className="font-semibold">
                        {ed?.degree || ""}
                        {ed?.school ? ` — ${ed.school}` : ""}
                      </p>
                      {ed?.year && <p className="text-gray-500 text-xs">{ed.year}</p>}
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECTS */}
              <section>
                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
                  Projects
                </h3>

                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                  {projects.map((p, i) => (
                    <li key={i}>
                      <span className="font-semibold text-gray-900">
                        {p?.link ? (
                          <a href={p.link} target="_blank" rel="noreferrer" className="hover:underline">
                            {p.title || ""}
                          </a>
                        ) : (
                          p.title || ""
                        )}
                      </span>{" "}
                      {p?.description || ""}
                    </li>
                  ))}
                </ul>
              </section>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalistSidebar;
