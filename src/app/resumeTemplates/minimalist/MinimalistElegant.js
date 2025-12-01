import React from "react";

const MinimalistElegant = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";
  const email = data?.email || "";
  const phone = data?.phone || "";
  const linkedin = data?.linkedin || "";
  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const renderParagraphs = (text) => {
    if (!text) return null;
    if (Array.isArray(text)) return text.map((t, i) => <p key={i}>{t}</p>);
    return String(text).split("\n").map((t, i) => <p key={i}>{t}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-10 font-serif text-gray-900 leading-relaxed">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center pb-4 mb-6 border-b border-gray-300">
            <h1 className="text-4xl font-bold tracking-tight">{fullName}</h1>
            <h2 className="text-lg text-gray-600 italic">{role}</h2>

            <div className="mt-2 text-sm text-gray-500 flex flex-wrap justify-center gap-3">
              {email && <span>Email: {email}</span>}
              {email && phone && <span>•</span>}
              {phone && <span>Phone: {phone}</span>}
              {(email || phone) && linkedin && <span>•</span>}
              {linkedin && (
                <a
                  href={linkedin}
                  className="hover:text-gray-700 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {linkedin}
                </a>
              )}
            </div>
          </header>
        </div>

        {/* SUMMARY */}
        <div className="resume-section mb-8">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
            Summary
          </h3>
          <div className="text-sm text-gray-700 leading-relaxed">
            {renderParagraphs(summary)}
          </div>
        </div>

        {/* EXPERIENCE + EDUCATION GRID */}
        <div className="resume-section mb-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* EXPERIENCE */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-5 text-sm">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">
                      {exp?.title || ""}
                      {exp?.company ? ` — ${exp.company}` : ""}
                    </p>
                    {exp?.duration && (
                      <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                    )}
                    {exp?.description &&
                      (Array.isArray(exp.description)
                        ? exp.description.map((d, i) => <p key={i}>{d}</p>)
                        : <p>{exp.description}</p>)}
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
                Education
              </h3>
              <div className="space-y-5 text-sm">
                {education.map((ed, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">
                      {ed?.degree || ""}
                      {ed?.school ? ` — ${ed.school}` : ""}
                    </p>
                    {ed?.year && <p className="text-gray-500 text-xs">{ed.year}</p>}

                    {/* optional details */}
                    {ed?.details &&
                      (Array.isArray(ed.details)
                        ? ed.details.map((d, i) => <p key={i}>{d}</p>)
                        : <p>{ed.details}</p>)}
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
            Skills
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((sec, idx) => (
            <div key={idx} className="resume-section mt-6">
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
                {sec.heading || ""}
              </h3>

              <div className="text-sm text-gray-700 leading-relaxed">
                {Array.isArray(sec.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : sec.content || ""}
              </div>
            </div>
          ))}

      </div>
    </div>
  );
};

export default MinimalistElegant;
