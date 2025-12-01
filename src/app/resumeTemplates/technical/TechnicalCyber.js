import React from "react";
import {
  Shield,
  Terminal,
  Cpu,
  Lock,
  Code,
  GraduationCap,
  Briefcase
} from "lucide-react";

const TechnicalCyber = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";
  const summary = data?.summary ?? "";
  const experiences = data?.experience ?? [];
  const projects = data?.projects ?? [];
  const education = data?.education ?? [];

  // ⭐ DYNAMIC SKILLS
  const skills = Array.isArray(data?.skills) ? data.skills : [];

  // ⭐ CUSTOM SECTIONS
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow">

        <div className="max-w-5xl mx-auto bg-black text-green-400 font-mono shadow-lg rounded-2xl overflow-hidden p-10 leading-relaxed overflow-y-auto">

          {/* HEADER */}
          <header className="resume-section text-center mb-10">
            <h1 className="text-5xl font-extrabold tracking-widest text-green-400 drop-shadow-[0_0_12px_#00FF88] animate-pulse">
              {fullName}
            </h1>
            <h2 className="text-lg text-green-300 mt-2 tracking-wider">{role}</h2>
            <div className="mt-4 mx-auto w-32 h-1 bg-green-500 rounded-full shadow-[0_0_10px_#00FF88]" />
          </header>

          {/* SUMMARY */}
          <section className="resume-section mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-green-400 border-b border-green-600 pb-1 mb-3 uppercase tracking-wide">
              <Terminal size={18} className="text-green-500" /> Profile
            </h3>
            <p className="text-sm text-green-200 leading-relaxed">{summary}</p>
          </section>

          {/* EXPERIENCE */}
          <section className="resume-section mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-green-400 border-b border-green-600 pb-1 mb-4 uppercase tracking-wide">
              <Briefcase size={18} className="text-green-500" /> Experience
            </h3>

            <div className="space-y-6 text-sm">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0a] p-5 rounded-xl border border-green-700 hover:shadow-[0_0_15px_#00FF88] transition"
                >
                  <p className="font-semibold text-green-300">
                    {exp?.title ?? ""} {exp?.company ? `— ${exp.company}` : ""}
                  </p>
                  <p className="text-xs text-green-500 mb-2">
                    {exp?.duration ?? ""}
                  </p>

                  {Array.isArray(exp?.bullets) ? (
                    <ul className="list-disc list-inside text-green-200 space-y-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-200">{exp?.description ?? ""}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section className="resume-section mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-green-400 border-b border-green-600 pb-1 mb-4 uppercase tracking-wide">
              <Cpu size={18} className="text-green-500" /> Skills
            </h3>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs border border-green-500 rounded-full bg-[#0a0a0a] hover:bg-green-900/40 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-green-300 text-sm">Add skills from editor…</p>
            )}
          </section>

          {/* PROJECTS */}
          <section className="resume-section mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-green-400 border-b border-green-600 pb-1 mb-4 uppercase tracking-wide">
              <Shield size={18} className="text-green-500" /> Projects
            </h3>

            <ul className="list-disc list-inside text-sm text-green-200 space-y-2">
              {projects.map((p, i) => (
                <li key={i}>
                  <span className="text-green-300 font-semibold">
                    {p?.title ?? p?.name ?? ""}
                  </span>{" "}
                  {p?.description ?? ""}
                  {p?.link && (
                    <>
                      {" "}
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 underline"
                      >
                        (link)
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* EDUCATION */}
          <section className="resume-section">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-green-400 border-b border-green-600 pb-1 mb-4 uppercase tracking-wide">
              <GraduationCap size={18} className="text-green-500" /> Education
            </h3>

            <div className="text-sm">
              {education.map((edu, i) => (
                <div key={i}>
                  <p className="font-semibold text-green-300">
                    {edu?.degree ?? ""} {edu?.school ? `— ${edu.school}` : ""}
                  </p>
                  <p className="text-green-500 text-xs">{edu?.year ?? ""}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CUSTOM SECTIONS */}
          {customSections.map((sec, i) => (
            <section key={i} className="resume-section mt-10">
              <h3 className="text-xl font-semibold uppercase tracking-wide text-green-400 border-b border-green-600 pb-1 mb-4">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-green-200">
                {Array.isArray(sec?.content)
                  ? sec.content.map((line, j) => <p key={j}>{line}</p>)
                  : sec?.content}
              </div>
            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TechnicalCyber;

