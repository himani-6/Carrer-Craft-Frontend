import React from "react";

const ModernBold = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
    address: data?.address || "",
  };

  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const renderDescription = (desc) => {
    if (!desc) return null;
    if (Array.isArray(desc)) {
      return (
        <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
          {desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
        {String(desc)
          .split("\n")
          .map((d) => d.trim())
          .filter(Boolean)
          .map((d, i2) => (
            <li key={i2}>{d}</li>
          ))}
      </ul>
    );
  };

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 leading-relaxed font-sans shadow overflow-hidden">

        {/* HEADER */}
        <header className="resume-section text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {data?.fullName || ""}
          </h1>
          <p className="text-xl text-teal-600 font-medium mt-1">
            {data?.role || ""}
          </p>

          {/* Contact Line */}
          <div className="text-sm text-gray-600 mt-3 flex flex-wrap gap-3 justify-center break-all">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.address && <span>{contact.address}</span>}
            {contact.linkedin && <span>{contact.linkedin}</span>}
            {contact.github && <span>{contact.github}</span>}
            {contact.portfolio && <span>{contact.portfolio}</span>}
          </div>
        </header>

        {/* SUMMARY */}
        {data?.summary && (
          <section className="resume-section mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-4 border-teal-500 inline-block pb-1 mb-2 uppercase">
              Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed break-words">
              {data.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-4 border-teal-500 inline-block pb-1 mb-2 uppercase">
              Experience
            </h2>

            {experience.map((exp, idx) => (
              <div key={idx} className={idx === 0 ? "" : "mt-4"}>
                <h3 className="text-gray-900 font-semibold">
                  {exp?.title || ""}
                  {exp?.company ? ` — ${exp.company}` : ""}
                </h3>
                <p className="text-gray-600 text-sm italic">{exp?.duration || ""}</p>
                {renderDescription(exp?.description)}
              </div>
            ))}
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-4 border-teal-500 inline-block pb-1 mb-2 uppercase">
              Education
            </h2>

            {education.map((ed, i) => (
              <div key={i} className={i === 0 ? "" : "mt-2"}>
                <p className="text-gray-900 font-semibold">{ed?.degree || ""}</p>
                <p className="text-gray-600 text-sm italic">
                  {ed?.school ? `${ed.school} — ${ed?.year || ""}` : ed?.year}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-4 border-teal-500 inline-block pb-1 mb-2 uppercase">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2 text-sm text-gray-800 mt-1">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-teal-100 rounded-full font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-4 border-teal-500 inline-block pb-1 mb-2 uppercase">
              Projects
            </h2>

            {projects.map((p, i) => (
              <div key={i} className={i === 0 ? "" : "mt-3"}>
                <h3 className="text-gray-900 font-semibold">{p?.title || ""}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {p?.description || ""}
                  {p?.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      {" "}
                      {p.link}
                    </a>
                  )}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((sec, idx) => (
            <section key={idx} className="resume-section mt-6">
              <h2 className="text-lg font-bold text-gray-900 border-b-4 border-teal-500 inline-block pb-1 mb-2 uppercase">
                {sec?.heading || ""}
              </h2>

              <div className="text-gray-700 text-sm leading-relaxed break-words">
                {Array.isArray(sec?.content)
                  ? sec.content.map((c, i) => <p key={i}>{c}</p>)
                  : sec?.content}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default ModernBold;
