import React from "react";

const ProfessionalCorporate = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const summary = data?.summary || "";
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const certificationsData =
    Array.isArray(data?.certifications) ? data.certifications :
    typeof data?.certifications === "string"
      ? data.certifications.split("\n").map((c) => c.trim()).filter(Boolean)
      : [];

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">
      <div className="bg-[#0a2540] text-white p-6 flex flex-wrap justify-between gap-4">
        
        {/* LEFT (NAME + ROLE) */}
        <div className="flex-1 min-w-[200px] break-words">
          <h1 className="text-3xl font-bold leading-tight">{data?.fullName || ""}</h1>
          <p className="text-lg text-gray-200">{data?.role || ""}</p>
        </div>

        {/* RIGHT (CONTACT INFO) */}
        <div className="text-sm text-gray-200 min-w-[200px] text-right break-words space-y-1">
          {contact.email && <p>Email: {contact.email}</p>}
          {contact.phone && <p>Phone: {contact.phone}</p>}
          {contact.linkedin && <p>LinkedIn: {contact.linkedin}</p>}
          {contact.github && <p>GitHub: {contact.github}</p>}
          {contact.portfolio && <p>Portfolio: {contact.portfolio}</p>}
        </div>
      </div>

      <div className="p-6 space-y-6 text-gray-800 overflow-y-auto">

        {/* Profile Summary */}
        <section>
          <h2 className="uppercase text-blue-600 font-semibold border-b border-gray-300 pb-1 mb-2">
            Profile Summary
          </h2>
          <p className="text-sm leading-relaxed break-words">{summary}</p>
        </section>

        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT SIDE */}
          <div className="md:w-1/3 space-y-6 break-words">

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="uppercase text-blue-600 font-semibold border-b border-gray-300 pb-1 mb-2">
                  Skills
                </h2>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  {skills.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </section>
            )}

            {/* Certifications */}
            {certificationsData.length > 0 && (
              <section>
                <h2 className="uppercase text-blue-600 font-semibold border-b border-gray-300 pb-1 mb-2">
                  Certifications
                </h2>
                <ul className="text-sm space-y-1 list-disc list-inside break-words">
                  {certificationsData.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </section>
            )}

            {/* Custom Sections */}
            {customSections.length > 0 &&
              customSections.map((sec, idx) => (
                <section key={idx}>
                  <h2 className="uppercase text-blue-600 font-semibold border-b border-gray-300 pb-1 mb-2">
                    {sec.heading}
                  </h2>
                  <p className="text-sm leading-relaxed break-words">
                    {Array.isArray(sec?.content)
                      ? sec.content.map((line, i) => <span key={i} className="block">{line}</span>)
                      : sec?.content}
                  </p>
                </section>
              ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="md:w-2/3 space-y-6 break-words">

            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="uppercase text-blue-600 font-semibold border-b border-gray-300 pb-1 mb-2">
                  Experience
                </h2>
                <div className="text-sm space-y-3">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold">
                        {exp?.title || ""} {exp?.company ? ` – ${exp.company}` : ""}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {exp?.duration || ""}{exp?.location ? ` | ${exp.location}` : ""}
                      </p>
                      {exp?.description && (
                        <ul className="mt-1 list-disc list-inside text-sm space-y-1">
                          {(Array.isArray(exp.description)
                            ? exp.description
                            : exp.description.split("\n"))
                            .map((d, i) => <li key={i}>{d.trim()}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="uppercase text-blue-600 font-semibold border-b border-gray-300 pb-1 mb-2">
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((ed, i) => (
                    <div key={i}>
                      <h3 className="font-semibold">{ed?.degree || ""}</h3>
                      <p className="text-gray-500 text-xs">
                        {ed?.school || ""}{ed?.year ? ` | ${ed.year}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="uppercase text-blue-600 font-semibold border-b border-gray-300 pb-1 mb-2">
                  Projects
                </h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {projects.map((p, i) => (
                    <li key={i}>
                      <span className="font-semibold">{p?.title || ""}</span>
                      {p?.description ? ` – ${p.description}` : ""}
                      {p?.link ? (
                        <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          {" "}({p.link})
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCorporate;
