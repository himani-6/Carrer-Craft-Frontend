import React from "react";

const MinimalistCompact = ({ data }) => {
  const fullName = data?.fullName || "";
  const role = data?.role || "";
  const email = data?.email || "";
  const phone = data?.phone || "";
  const linkedin = data?.linkedin || "";
  const github = data?.github || "";
  const portfolio = data?.portfolio || "";
  const summary = data?.summary || "";
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const contactItems = [
    email ? { label: `Email: ${email}`, href: `mailto:${email}` } : null,
    phone ? { label: `Phone: ${phone}`, href: `tel:${phone}` } : null,
    linkedin ? { label: linkedin, href: linkedin } : null,
    github ? { label: github, href: github } : null,
    portfolio ? { label: portfolio, href: portfolio } : null,
  ].filter(Boolean);

  const renderDesc = (desc) => {
    if (!desc) return null;
    if (Array.isArray(desc)) return desc.map((d, i) => <p key={i}>{d}</p>);
    return String(desc).split("\n").map((d, i) => <p key={i}>{d}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-800 p-10 leading-relaxed font-sans">

        {/* HEADER */}
        <header className="resume-section mb-4">
          <h1 className="text-3xl font-bold">{fullName}</h1>
          <h2 className="text-md text-gray-600">{role}</h2>

          <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-3">
            {contactItems.map((item, i) => (
              <React.Fragment key={i}>
                <a href={item.href} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {item.label}
                </a>
                {i < contactItems.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* SUMMARY */}
        <section className="resume-section mb-6">
          <h3 className="section-title">Summary</h3>
          <p className="section-text">{summary}</p>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-section mb-6">
          <h3 className="section-title">Experience</h3>
          <div className="space-y-3 text-sm">
            {experience.map((exp, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {exp?.title || ""}{exp?.company ? ` — ${exp.company}` : ""}
                </p>
                {exp?.duration && <p className="text-xs text-gray-500">{exp.duration}</p>}
                {renderDesc(exp?.description)}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="resume-section mb-6">
          <h3 className="section-title">Education</h3>
          <div className="text-sm space-y-2">
            {education.map((ed, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {ed?.degree || ""}{ed?.school ? ` — ${ed.school}` : ""}
                </p>
                {ed?.year && <p className="text-xs text-gray-500">{ed.year}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="resume-section mb-6">
          <h3 className="section-title">Skills</h3>
          <ul className="grid grid-cols-2 gap-y-1 text-sm list-disc list-inside">
            {skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section className="resume-section mb-6">
            <h3 className="section-title">Projects</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {projects.map((p, i) => (
                <li key={i}>
                  <span className="font-semibold">{p?.title || ""}</span>
                  {p?.description ? ` — ${p.description}` : ""}
                  {p?.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {" "}{p.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.map((sec, i) => (
          <section key={i} className="resume-section mb-6">
            <h3 className="section-title">{sec?.heading || ""}</h3>
            <div className="text-sm">
              {Array.isArray(sec?.content)
                ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                : sec?.content}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default MinimalistCompact;
