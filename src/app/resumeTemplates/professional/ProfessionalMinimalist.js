import React from "react";

const ProfessionalMinimalist = ({ data }) => {
  const contact = {
    phone: data?.phone || "",
    email: data?.email || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];
  const languages = Array.isArray(data?.languages) ? data.languages : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">
        <div className="max-w-5xl mx-auto bg-white text-black font-[Inter] p-10 rounded-2xl shadow-md">

          {/* Header */}
          <header className="text-center mb-6 border-b border-gray-300 pb-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {data?.fullName || ""}
            </h1>
            <h2 className="text-lg text-gray-600 mt-1">
              {data?.role || ""}
            </h2>
          </header>

          <div className="flex flex-col md:flex-row gap-8 mt-6">

            {/* LEFT SIDE */}
            <aside className="md:w-1/3 space-y-6">

              {/* CONTACT */}
              <section>
                <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">
                  Contact
                </h3>
                <ul className="text-sm space-y-1">
                  {contact.phone && <li>📞 {contact.phone}</li>}
                  {contact.email && <li>✉ {contact.email}</li>}
                  {contact.linkedin && (
                    <li>
                      💼 <a href={contact.linkedin} className="hover:text-blue-600 break-all">
                        {contact.linkedin.replace(/^https?:\/\//, "")}
                      </a>
                    </li>
                  )}
                  {contact.github && (
                    <li>
                      🧑‍💻 <a href={contact.github} className="hover:text-blue-600 break-all">
                        {contact.github.replace(/^https?:\/\//, "")}
                      </a>
                    </li>
                  )}
                  {contact.portfolio && (
                    <li>
                      🔗 <a href={contact.portfolio} className="hover:text-blue-600 break-all">
                        {contact.portfolio.replace(/^https?:\/\//, "")}
                      </a>
                    </li>
                  )}
                </ul>
              </section>

              {/* SKILLS */}
              {skills.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">
                    Skills
                  </h3>
                  <ul className="text-sm space-y-1">
                    {skills.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </section>
              )}

              {/* LANGUAGES */}
              {languages.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">
                    Languages
                  </h3>
                  <ul className="text-sm space-y-1">
                    {languages.map((l, i) => <li key={i}>{l}</li>)}
                  </ul>
                </section>
              )}

              {/* CUSTOM SECTIONS LEFT SIDE */}
              {customSections.length > 0 && customSections.map((sec, i) => (
                <section key={i}>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">
                    {sec?.heading || "New Section"}
                  </h3>
                  {Array.isArray(sec?.content) ? (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {sec.content.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm">{sec?.content || ""}</p>
                  )}
                </section>
              ))}

            </aside>

            {/* RIGHT SIDE */}
            <main className="md:w-2/3 space-y-8">

              {/* SUMMARY */}
              {data?.summary && (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-3">
                    Summary
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-800">
                    {data.summary}
                  </p>
                </section>
              )}

              {/* EXPERIENCE */}
              {experience.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-3">
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {experience.map((exp, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-gray-900">
                          {exp?.title || ""}{exp?.company ? ` — ${exp.company}` : ""}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {exp?.duration}
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                          {Array.isArray(exp?.description)
                            ? exp.description.map((d, i) => <li key={i}>{d}</li>)
                            : exp?.description && <li>{exp.description}</li>}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PROJECTS */}
              {projects.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-3">
                    Projects
                  </h3>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    {projects.map((p, i) => (
                      <li key={i}>
                        <span className="font-semibold">{p?.title}</span>
                        {p?.description && ` — ${p.description}`}
                        {p?.link && (
                          <> (
                            <a href={p.link} className="text-blue-600 hover:underline">
                              link
                            </a>)
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* EDUCATION */}
              {education.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-3">
                    Education
                  </h3>
                  <div className="space-y-3">
                    {education.map((ed, i) => (
                      <div key={i}>
                        <h4 className="font-semibold">
                          {ed.degree || ""}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {ed.school || ""}{ed.year ? ` — ${ed.year}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </main>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMinimalist;
