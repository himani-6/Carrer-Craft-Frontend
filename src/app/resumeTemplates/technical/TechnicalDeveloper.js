import React from "react";

const TechnicalDeveloper = ({ data }) => {
  const projects = data?.projects ?? [];
  const skills = data?.skills ?? [];
  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];
  const customSections = data?.customSections ?? [];

  // Contact
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const linkedin = data?.linkedin ?? "";
  const github = data?.github ?? "";
  const portfolio = data?.portfolio ?? "";
  const location = data?.location ?? "";

  // Helper to render multi-line text safely and keep wrapping
  const wrap = (text) => {
    if (!text) return null;
    if (Array.isArray(text)) return text.map((t, i) => <p key={i}>{t}</p>);
    return String(text).split("\n").map((t, i) => <p key={i}>{t}</p>);
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">
      <div className="max-w-5xl mx-auto bg-[#0d0d0d] text-gray-300 font-mono shadow-lg rounded-2xl overflow-hidden leading-relaxed overflow-y-auto">

        {/* HEADER */}
        <header className="bg-[#111827] border-b border-gray-700 p-8 text-center">
          <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">
            {data?.fullName ?? ""}
          </h1>
          <h2 className="text-lg text-gray-400 font-medium mt-2">
            {data?.role ?? ""}
          </h2>

          {/* CONTACT INFO — all fields shown, wrap long links */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400 break-words">
            {email ? (
              <a href={`mailto:${email}`} className="hover:underline">
                Email: {email}
              </a>
            ) : null}

            {phone ? <span>• Phone: {phone}</span> : null}

            {linkedin ? (
              <a href={linkedin} className="hover:underline break-all" target="_blank" rel="noreferrer">
                LinkedIn: {linkedin}
              </a>
            ) : null}

            {github ? (
              <a href={github} className="hover:underline break-all" target="_blank" rel="noreferrer">
                GitHub: {github}
              </a>
            ) : null}

            {portfolio ? (
              <a href={portfolio} className="hover:underline break-all" target="_blank" rel="noreferrer">
                Portfolio: {portfolio}
              </a>
            ) : null}

            {location ? <span>• {location}</span> : null}
          </div>
        </header>

        <div className="p-10 space-y-10">

          {/* SUMMARY */}
          <section>
            <h3 className="text-xl font-semibold text-cyan-400 border-b border-gray-700 pb-1 mb-3 uppercase tracking-wide">
              Summary
            </h3>
            <div className="text-sm text-gray-400 leading-relaxed break-words">
              {wrap(data?.summary)}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h3 className="text-xl font-semibold text-cyan-400 border-b border-gray-700 pb-1 mb-5 uppercase tracking-wide">
              Experience
            </h3>
            <div className="relative border-l-2 border-cyan-500 pl-6 space-y-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[10px] top-2 w-4 h-4 bg-cyan-500 rounded-full border-2 border-[#0d0d0d]" />
                  <p className="font-semibold text-gray-100">
                    {exp?.title ?? ""} {exp?.company ? `— ${exp.company}` : ""}
                  </p>
                  {exp?.duration && (
                    <p className="text-xs text-gray-500 mb-1">{exp.duration}</p>
                  )}
                  <div className="text-sm text-gray-400 break-words">
                    {wrap(exp?.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <h3 className="text-xl font-semibold text-cyan-400 border-b border-gray-700 pb-1 mb-5 uppercase tracking-wide">
              Projects
            </h3>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#111827] border border-gray-800 p-5 rounded-lg shadow-md"
                >
                  <p className="font-semibold text-gray-100">
                    {project?.name ?? ""}
                  </p>
                  <p className="text-xs text-gray-500 mb-2 break-words">
                    {project?.description ?? ""}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(project?.stack ?? []).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h3 className="text-xl font-semibold text-cyan-400 border-b border-gray-700 pb-1 mb-3 uppercase tracking-wide">
              Education
            </h3>
            <div className="text-sm space-y-4">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-gray-100">
                    {edu?.degree ?? ""} {edu?.school ? `— ${edu.school}` : ""}
                  </p>
                  <p className="text-xs text-gray-500">{edu?.year ?? ""}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section>
            <h3 className="text-xl font-semibold text-cyan-400 border-b border-gray-700 pb-1 mb-4 uppercase tracking-wide">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-[#1f2937] text-cyan-400 border border-cyan-600/40 rounded-full"
                >
                  {typeof skill === "string" ? skill : skill?.name ?? ""}
                </span>
              ))}
            </div>
          </section>

          {/* CUSTOM SECTIONS — placed at the end */}
          {customSections.map((sec, i) => (
            <section key={i} className="mt-10">
              <h3 className="text-xl font-semibold text-cyan-400 border-b border-gray-700 pb-1 mb-4 uppercase tracking-wide">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-gray-400 break-words">
                {wrap(sec?.content)}
              </div>
            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TechnicalDeveloper;
