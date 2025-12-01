import React from "react";

const MinimalistOnePage = ({ data }) => {
  const name = data?.fullName || "";
  const role = data?.role || "";
  const email = data?.email || "";
  const phone = data?.phone || "";
  const linkedin = data?.linkedin || "";
  const summary = data?.summary || "";

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const mid = Math.ceil(skills.length / 2);
  const skillsCol1 = skills.slice(0, mid);
  const skillsCol2 = skills.slice(mid);

  const renderDescription = (desc) => {
    if (!desc) return null;
    if (Array.isArray(desc)) return desc.map((d, i) => <p key={i}>{d}</p>);
    return desc.split("\n").map((d, i) => <p key={i}>{d.trim()}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-10 font-sans text-gray-800 leading-relaxed">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
            <h2 className="text-lg text-gray-600 font-medium">{role}</h2>

            <div className="mt-2 text-sm text-gray-500 flex flex-wrap justify-center gap-3">
              {email && <span>Email: {email}</span>}
              {email && phone && <span>•</span>}
              {phone && <span>Phone: {phone}</span>}
              {(email || phone) && linkedin && <span>•</span>}
              {linkedin && (
                <a
                  href={linkedin}
                  className="text-teal-600 hover:underline"
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
        <div className="resume-section mb-6">
          <h3 className="text-base font-semibold text-teal-700 uppercase tracking-wide mb-2">
            Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>

        {/* SKILLS */}
        <div className="resume-section mb-6">
          <h3 className="text-base font-semibold text-teal-700 uppercase tracking-wide mb-2">
            Skills
          </h3>

          <div className="grid grid-cols-2 text-sm text-gray-700 gap-y-1">
            <ul className="list-disc list-inside">
              {skillsCol1.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <ul className="list-disc list-inside">
              {skillsCol2.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="resume-section mb-6">
          <h3 className="text-base font-semibold text-teal-700 uppercase tracking-wide mb-2">
            Experience
          </h3>

          <div className="text-sm space-y-4">
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
        </div>

        {/* EDUCATION */}
        <div className="resume-section mb-6">
          <h3 className="text-base font-semibold text-teal-700 uppercase tracking-wide mb-2">
            Education
          </h3>

          <div className="text-sm text-gray-700">
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
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((sec, index) => (
            <div key={index} className="resume-section mb-6">
              <h3 className="text-base font-semibold text-teal-700 uppercase tracking-wide mb-2">
                {sec?.heading || "Additional Information"}
              </h3>

              <div className="text-sm text-gray-700 leading-relaxed">
                {Array.isArray(sec.content)
                  ? sec.content.map((c, i) => <p key={i}>{c}</p>)
                  : sec.content || ""}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MinimalistOnePage;

