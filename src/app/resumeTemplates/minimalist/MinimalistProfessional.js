import React from "react";

const MinimalistProfessional = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";
  const email = data?.email || "";
  const phone = data?.phone || "";
  const linkedin = data?.linkedin || "";
  const summary = data?.summary || "";

  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const renderDescription = (desc) => {
    if (!desc) return null;
    if (Array.isArray(desc)) return desc.map((d, i) => <p key={i}>{d}</p>);
    return String(desc)
      .split("\n")
      .map((d, i) => <p key={i}>{d}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-10 text-gray-800 font-sans leading-relaxed">

        {/* HEADER */}
        <div className="resume-section">
          <header className="border-b border-gray-200 pb-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
              <h2 className="text-md text-gray-600 font-medium">{role}</h2>
            </div>

            <div className="text-sm text-gray-500 mt-2 md:mt-0 flex flex-wrap gap-3">
              {email && <span>Email: {email}</span>}
              {email && phone && <span>•</span>}
              {phone && <span>Phone: {phone}</span>}
              {(email || phone) && linkedin && <span>•</span>}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {linkedin}
                </a>
              )}
            </div>
          </header>
        </div>

        {/* SUMMARY */}
        <div className="resume-section">
          <section className="mb-6">
            <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
              Summary
            </h3>
            <p className="text-sm text-gray-700">{summary}</p>
          </section>
        </div>

        {/* EXPERIENCE */}
        <div className="resume-section">
          <section className="mb-6">
            <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
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
                    <p className="text-gray-500 text-xs mb-1">
                      {exp.duration}
                    </p>
                  )}
                  {renderDescription(exp?.description)}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EDUCATION */}
        <div className="resume-section">
          <section className="mb-6">
            <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
              Education
            </h3>

            <div className="text-sm text-gray-700">
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
          </section>
        </div>

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-6">
            <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
              Skills
            </h3>

            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <div key={i} className="resume-section mt-6">
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide border-b border-gray-200 pb-1 mb-3">
                {sec?.heading || "Custom Section"}
              </h3>

              <div className="text-sm text-gray-700">
                {Array.isArray(sec?.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : sec?.content || ""}
              </div>
            </section>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MinimalistProfessional;
