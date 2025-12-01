import React from "react";

const MinimalistClassic = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
    address: data?.address || "",
  };

  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const mid = Math.ceil(skills.length / 2);
  const skillsCol1 = skills.slice(0, mid);
  const skillsCol2 = skills.slice(mid);

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-10 text-gray-900 leading-relaxed font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="text-center border-b border-gray-300 pb-4 mb-6">
            <h1 className="text-4xl font-bold tracking-tight">
              {data?.fullName || ""}
            </h1>
            <h2 className="text-lg text-gray-600 font-medium">
              {data?.role || ""}
            </h2>

            <div className="mt-2 flex justify-center flex-wrap gap-3 text-sm text-gray-600">
              {contact.email && <span>Email: {contact.email}</span>}
              {contact.phone && <span>• Phone: {contact.phone}</span>}
              {contact.address && <span>• {contact.address}</span>}
              {contact.linkedin && (
                <span>
                  •{" "}
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 underline"
                  >
                    {contact.linkedin}
                  </a>
                </span>
              )}
              {contact.github && (
                <span>
                  •{" "}
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 underline"
                  >
                    {contact.github}
                  </a>
                </span>
              )}
              {contact.portfolio && (
                <span>
                  •{" "}
                  <a
                    href={contact.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 underline"
                  >
                    {contact.portfolio}
                  </a>
                </span>
              )}
            </div>
          </header>
        </div>

        {/* SUMMARY */}
        <div className="resume-section mb-8">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            Summary
          </h3>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>

        {/* EXPERIENCE */}
        <div className="resume-section mb-8">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
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
                {Array.isArray(exp.description)
                  ? exp.description.map((d, i) => <p key={i}>{d}</p>)
                  : exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="resume-section mb-8">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            Education
          </h3>
          <div className="text-sm">
            {education.map((ed, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {ed?.degree || ""}
                  {ed?.school ? ` — ${ed.school}` : ""}
                </p>
                {ed?.year && (
                  <p className="text-gray-500 text-xs">{ed.year}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="resume-section mb-8">
          <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            Skills
          </h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <ul className="list-disc list-inside space-y-1">
              {skillsCol1.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <ul className="list-disc list-inside space-y-1">
              {skillsCol2.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, idx) => (
          <div key={idx} className="resume-section mt-8">
            <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              {sec?.heading || ""}
            </h3>
            <div className="text-sm leading-relaxed">
              {Array.isArray(sec?.content)
                ? sec.content.map((c, i) => <p key={i}>{c}</p>)
                : sec?.content || ""}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MinimalistClassic;
