import React from "react";

const MinimalistModern = ({ data }) => {
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
      <div className="resume-page bg-white p-10 text-gray-800 font-sans leading-relaxed">

        {/* HEADER */}
        <div className="resume-section">
          <header className="border-b border-gray-300 pb-4 mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {data?.fullName || ""}
            </h1>
            <h2 className="text-lg text-gray-500 font-medium">
              {data?.role || ""}
            </h2>
          </header>
        </div>

        {/* CONTACT */}
        <div className="resume-section mb-8">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Contact
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {contact.email && <li>Email: {contact.email}</li>}
            {contact.phone && <li>Phone: {contact.phone}</li>}
            {contact.address && <li>Location: {contact.address}</li>}
            {contact.linkedin && (
              <li>
                <a href={contact.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                  {contact.linkedin}
                </a>
              </li>
            )}
            {contact.github && (
              <li>
                <a href={contact.github} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                  {contact.github}
                </a>
              </li>
            )}
            {contact.portfolio && (
              <li>
                <a href={contact.portfolio} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                  {contact.portfolio}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* SUMMARY */}
        <div className="resume-section mb-8">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>

        {/* EXPERIENCE */}
        <div className="resume-section mb-8">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Experience
          </h3>
          <div className="space-y-5 text-sm">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <p className="font-semibold text-gray-900">
                  {exp?.title || ""}{exp?.company ? ` — ${exp.company}` : ""}
                </p>
                {exp?.duration && (
                  <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                )}
                {exp?.description && renderDescription(exp.description)}
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="resume-section mb-8">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Education
          </h3>
          <div className="text-sm">
            {education.map((ed, i) => (
              <div key={i}>
                <p className="font-semibold text-gray-900">
                  {ed?.degree || ""}{ed?.school ? ` — ${ed.school}` : ""}
                </p>
                {ed?.year && <p className="text-gray-500 text-xs">{ed.year}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="resume-section mb-8">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
            <ul className="list-disc list-inside space-y-1">
              {skillsCol1.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <ul className="list-disc list-inside space-y-1">
              {skillsCol2.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Projects
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            {projects.map((p, i) => (
              <li key={i}>
                <span className="font-semibold text-gray-900">{p?.title || ""}</span>{" "}
                {p?.description || ""}
              </li>
            ))}
          </ul>
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, idx) => (
          <div key={idx} className="resume-section mt-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
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

export default MinimalistModern;
