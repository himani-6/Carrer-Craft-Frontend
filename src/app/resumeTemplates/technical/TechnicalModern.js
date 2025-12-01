import React from "react";
import { SiReact, SiNodedotjs, SiPython, SiMysql } from "react-icons/si";

const TechnicalModern = ({ data }) => {
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experiences = Array.isArray(data?.experience) ? data.experience : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow">
        <header className="resume-section border-b border-gray-200 bg-gray-50 p-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {data?.fullName ?? ""}
          </h1>
          <h2 className="text-lg text-blue-600 font-medium">
            {data?.role ?? ""}
          </h2>

          {/* CONTACT INFO UNDER BASIC INFO */}
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-gray-600 break-words whitespace-normal">
            {data?.email && <span>Email: {data.email}</span>}
            {data?.email && data?.phone && <span>•</span>}
            {data?.phone && <span>Phone: {data.phone}</span>}
            {(data?.email || data?.phone) && data?.linkedin && <span>•</span>}
            {data?.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline break-all"
              >
                {data.linkedin}
              </a>
            )}
          </div>

          {/* ICONS */}
          <div className="flex justify-center mt-4 gap-5 text-blue-500 text-2xl">
            <SiReact title="React" />
            <SiNodedotjs title="Node.js" />
            <SiPython title="Python" />
            <SiMysql title="MySQL" />
          </div>
        </header>

        <div className="flex flex-col md:flex-row">
          {/* LEFT SIDEBAR */}
          <aside className="resume-section w-full md:w-1/3 border-r border-gray-200 bg-gray-50 p-8 space-y-10">
            {/* ABOUT */}
            <section>
              <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-1 mb-3">
                About
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed break-words whitespace-normal">
                {data?.summary ?? ""}
              </p>
            </section>

            {/* SKILLS (NO PROGRESS BARS) */}
            <section>
              <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-1 mb-3">
                Skills
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {skills.map((s, i) => (
                  <li key={i}>{typeof s === "string" ? s : s?.name ?? ""}</li>
                ))}
              </ul>
            </section>

            {/* CUSTOM SECTIONS – placed ONLY at LEFT SIDE bottom */}
            {customSections.map((sec, i) => (
              <section key={i}>
                <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-1 mb-3">
                  {sec?.heading ?? ""}
                </h3>
                <div className="text-sm text-gray-700 leading-relaxed break-words whitespace-normal">
                  {Array.isArray(sec?.content)
                    ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                    : sec?.content ?? ""}
                </div>
              </section>
            ))}
          </aside>

          {/* RIGHT MAIN AREA */}
          <main className="w-full md:w-2/3 p-10 space-y-10">
            {/* EXPERIENCE */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-5 text-sm">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title ?? ""}{" "}
                      {exp?.company ? `— ${exp.company}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs mb-1">
                      {exp?.duration ?? ""}
                    </p>
                    <p className="leading-relaxed whitespace-pre-line">
                      {exp?.description ?? ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-1 mb-3">
                Projects
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                {projects.map((proj, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-900">
                      {proj?.title ?? ""}
                      {proj?.link ? ":" : ""}
                    </span>{" "}
                    {proj?.description ?? ""}
                    {proj?.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        (link)
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* EDUCATION */}
            <section className="resume-section">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-1 mb-3">
                Education
              </h3>
              <div className="text-sm space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">
                      {edu?.degree ?? ""} {edu?.school ? `— ${edu.school}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs">{edu?.year ?? ""}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TechnicalModern;
