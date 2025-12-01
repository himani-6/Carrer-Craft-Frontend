import React from "react";
import { Briefcase, Code, Award, GraduationCap, FolderGit2 } from "lucide-react";

const TechnicalInnovator = ({ data }) => {
  const experiences = data?.experience ?? [];
  const projects = data?.projects ?? [];
  const education = data?.education ?? [];
  const customSections = data?.customSections ?? [];

  // Achievements entry detection (from customSections or data.achievements)
  const certificationsEntry =
    customSections.find((c) =>
      (c?.heading || "").toLowerCase().includes("achievement")
    ) || null;

  const certificationsList = certificationsEntry
    ? Array.isArray(certificationsEntry.content)
      ? certificationsEntry.content
      : typeof certificationsEntry.content === "string"
      ? certificationsEntry.content.split("\n").filter(Boolean)
      : []
    : Array.isArray(data?.certifications)
    ? data.certifications
    : data?.certifdications
    ? [data.certifications]
    : [];

  // Contact line (all contact fields supported)
  const contactParts = [
    data?.email ? `Email: ${data.email}` : null,
    data?.phone ? `Phone: ${data.phone}` : null,
    data?.address ? `${data.address}` : null,
    data?.linkedin ? (data.linkedinText ? data.linkedinText : data.linkedin.replace(/^https?:\/\//, "")) : null,
    data?.github ? (data.githubText ? data.githubText : data.github.replace(/^https?:\/\//, "")) : null,
    data?.portfolio ? (data.portfolioText ? data.portfolioText : data.portfolio.replace(/^https?:\/\//, "")) : null,
  ].filter(Boolean);

  const contactLine = contactParts.length > 0 ? (
    <div className="mt-3 text-sm text-gray-300 break-words">
      {contactParts.map((part, idx) => (
        <span key={idx}>
          {part}
          {idx < contactParts.length - 1 ? " • " : ""}
        </span>
      ))}
    </div>
  ) : null;

  // helper to render custom section content
  const renderSectionContent = (content) => {
    if (!content) return null;
    if (Array.isArray(content)) return content.map((c, i) => <p key={i}>{c}</p>);
    return String(content)
      .split("\n")
      .map((line, i) => line.trim())
      .filter(Boolean)
      .map((line, i) => <p key={i}>{line}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 overflow-hidden">
        <div className="max-w-5xl mx-auto bg-[#0a1128] text-gray-100 font-sans shadow-2xl rounded-2xl overflow-hidden leading-relaxed p-10 overflow-y-auto">
          {/* HEADER */}
          <header className="resume-section text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-wide text-cyan-400 drop-shadow-md">
              {data?.fullName ?? ""}
            </h1>
            <h2 className="text-lg text-violet-400 font-medium">
              {data?.role ?? ""}
            </h2>

            {/* small decorative bar */}
            <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full animate-pulse"></div>

            {/* contact line - supports many fields, wraps when long */}
            {contactLine}
          </header>

          {/* PROFILE SUMMARY */}
          <section className="resume-section mb-10">
            <h3 className="text-xl font-semibold uppercase tracking-wide text-cyan-400 border-b border-cyan-700 pb-1 mb-4 flex items-center gap-2">
              <Code className="text-violet-400" size={20} /> Profile Summary
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed break-words">
              {data?.summary ?? ""}
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="resume-section mb-10">
            <h3 className="text-xl font-semibold uppercase tracking-wide text-cyan-400 border-b border-cyan-700 pb-1 mb-4 flex items-center gap-2">
              <Briefcase className="text-violet-400" size={20} /> Experience
            </h3>

            <div className="space-y-6 text-sm">
              {experiences.length > 0
                ? experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0f1a3d] p-5 rounded-xl border border-cyan-700 hover:border-violet-500 hover:shadow-[0_0_10px_#7c3aed60] transition"
                    >
                      <p className="font-semibold text-gray-100">
                        {exp?.title ?? ""}
                        {exp?.company ? ` — ${exp.company}` : ""}
                      </p>
                      {exp?.duration ? <p className="text-xs text-gray-400 mb-1">{exp.duration}</p> : null}
                      {exp?.description ? <p className="text-gray-300">{exp.description}</p> : null}
                      {Array.isArray(exp?.bullets) && exp.bullets.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-1">
                          {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))
                : null}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="resume-section mb-10">
            <h3 className="text-xl font-semibold uppercase tracking-wide text-cyan-400 border-b border-cyan-700 pb-1 mb-4 flex items-center gap-2">
              <FolderGit2 className="text-violet-400" size={20} /> Projects
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-[#0f1a3d] p-5 rounded-xl border border-cyan-700 hover:border-violet-500 hover:shadow-[0_0_10px_#22d3ee60] transition"
                >
                  <p className="font-semibold text-gray-100 mb-1">
                    {project?.title ?? project?.name ?? ""}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    {project?.stack
                      ? Array.isArray(project.stack)
                        ? project.stack.join(" | ")
                        : project.stack
                      : project?.descriptionShort ?? ""}
                  </p>
                  {project?.description ? <p className="text-gray-300">{project.description}</p> : null}
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="resume-section mb-10">
            <h3 className="text-xl font-semibold uppercase tracking-wide text-cyan-400 border-b border-cyan-700 pb-1 mb-4 flex items-center gap-2">
              <GraduationCap className="text-violet-400" size={20} /> Education
            </h3>

            <div className="bg-[#0f1a3d] p-5 rounded-xl border border-cyan-700 hover:border-violet-500 transition text-sm">
              {education.length > 0 ? (
                education.map((edu, i) => (
                  <div key={i} className={i ? "mt-3" : ""}>
                    <p className="font-semibold text-gray-100">
                      {edu?.degree ?? ""}
                      {edu?.school ? ` — ${edu.school}` : ""}
                    </p>
                    {edu?.year ? <p className="text-xs text-gray-400 mb-1">{edu.year}</p> : null}
                    {edu?.description ? <p className="mt-1 text-gray-300">{edu.description}</p> : null}
                  </div>
                ))
              ) : (
                <>
                  <p className="font-semibold text-gray-100">{data?.educationTextTitle ?? ""}</p>
                  <p className="text-xs text-gray-400">{data?.educationTextSub ?? ""}</p>
                  <p className="mt-1 text-gray-300">{data?.educationTextDesc ?? ""}</p>
                </>
              )}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section className="resume-section mb-10">
            <h3 className="text-xl font-semibold uppercase tracking-wide text-cyan-400 border-b border-cyan-700 pb-1 mb-4 flex items-center gap-2">
              <Award className="text-violet-400" size={20} /> Achievements
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
              {certificationsList.length > 0
                ? certificationsList.map((a, i) => <li key={i} dangerouslySetInnerHTML={{ __html: a }} />)
                : data?.certificationsText
                ? <li dangerouslySetInnerHTML={{ __html: data.certificationsText }} />
                : null}
            </ul>
          </section>

          {/* REMAINING CUSTOM SECTIONS (not achievements) */}
          {customSections
            .filter((s) => !(s?.heading || "").toLowerCase().includes("achievement"))
            .map((sec, i) => (
              <section key={i} className="resume-section mb-8">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-cyan-400 border-b border-cyan-700 pb-1 mb-3">
                  {sec?.heading || "Additional"}
                </h3>
                <div className="text-sm text-gray-300">
                  {renderSectionContent(sec?.content)}
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalInnovator;
