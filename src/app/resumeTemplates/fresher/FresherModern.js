import React from "react";

const FresherModern = ({ data }) => {
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";
  const summary = data?.summary ?? "";
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const education = data?.education ?? [];

  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const findSectionByRegex = (regex) =>
    customSections.find((s) => (s?.heading || "").toLowerCase().match(regex));

  const achievementsEntry =
    findSectionByRegex(/achiev|award|honor|recognition/i) ?? null;

  const achievements =
    (achievementsEntry && achievementsEntry.content) ??
    (Array.isArray(data?.achievements)
      ? data.achievements
      : data?.achievements
      ? [data.achievements]
      : []);

  const certificationsEntry =
    findSectionByRegex(/certif|certificate|certifications?/i) ?? null;

  const certifications =
    (certificationsEntry && certificationsEntry.content) ??
    (Array.isArray(data?.certifications)
      ? data.certifications
      : data?.certifications
      ? [data.certifications]
      : []);

  const experiences = Array.isArray(data?.experience)
    ? data.experience
    : Array.isArray(data?.internships)
    ? data.internships
    : [];

  const renderContent = (content) => {
    if (!content) return null;
    if (Array.isArray(content)) return content.map((c, i) => <p key={i}>{c}</p>);
    return String(content)
      .split("\n")
      .map((line, i) => <p key={i}>{line}</p>);
  };

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white p-8 leading-relaxed font-sans text-gray-900 w-[210mm] min-h-[297mm]">

        {/* HEADER */}
        <div className="resume-section">
          <header className="pb-6 border-b-2 border-gray-300 mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {fullName}
            </h1>
            <p className="text-lg font-medium text-gray-700 mt-1">{role}</p>
          </header>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="resume-section">
            <section className="mb-8">
              <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            </section>
          </div>
        )}

        {/* SKILLS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
              Skills
            </h3>

            <div className="flex flex-wrap gap-3 text-sm">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full shadow-sm text-xs font-medium hover:bg-gray-100 transition"
                >
                  {typeof skill === "string" ? skill : skill?.name ?? ""}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* PROJECTS */}
        <div className="resume-section">
          <section className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Projects
            </h3>

            <div className="space-y-5 text-sm">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-gray-300 rounded-xl shadow-sm"
                >
                  <p className="font-semibold text-gray-900">
                    {proj?.title ?? proj?.name ?? ""}
                  </p>

                  {(proj?.type || proj?.category) && (
                    <p className="text-xs text-gray-500 mb-2">
                      {proj?.type ?? proj?.category}
                    </p>
                  )}

                  <p>{proj?.description ?? ""}</p>

                  {(proj?.tags || proj?.stack || proj?.defaultTags) && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(proj?.tags ??
                        proj?.stack ??
                        proj?.defaultTags ??
                        []
                      ).map((tag, t) => (
                        <span
                          key={t}
                          className="px-2 py-1 text-xs bg-gray-200 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <div className="resume-section">
            <section className="mb-8">
              <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                Experience
              </h3>

              <div className="space-y-4 text-sm">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <p className="font-semibold">
                      {exp?.title ?? exp?.role ?? ""}
                      {exp?.company ? ` — ${exp.company}` : ""}
                    </p>

                    {exp?.duration && (
                      <p className="text-xs text-gray-500 mb-1">
                        {exp.duration}
                      </p>
                    )}

                    {renderContent(exp?.description ?? exp?.bullets)}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="resume-section">
            <section className="mb-8">
              <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                Education
              </h3>

              <div className="text-sm space-y-3">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold">{edu?.degree ?? ""}</p>

                    <p className="text-gray-500 text-xs">
                      {edu?.school
                        ? `${edu.school} | ${edu?.year ?? ""}`
                        : edu?.year ?? ""}
                    </p>

                    {(edu?.cgpa || edu?.percentage) && (
                      <p className="text-sm font-medium">
                        {edu?.cgpa && (
                          <>
                            CGPA:{" "}
                            <span className="font-bold text-gray-900">
                              {edu.cgpa}
                            </span>
                          </>
                        )}
                        {edu?.cgpa && edu?.percentage ? " | " : ""}
                        {edu?.percentage && (
                          <>
                            Percentage:{" "}
                            <span className="font-bold text-gray-900">
                              {edu.percentage}
                            </span>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ACHIEVEMENTS */}
        {achievements &&
          (Array.isArray(achievements)
            ? achievements.length > 0
            : achievements) && (
            <div className="resume-section">
              <section className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                  Achievements
                </h3>

                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                  {Array.isArray(achievements)
                    ? achievements.map((a, i) => <li key={i}>{a}</li>)
                    : <li>{achievements}</li>}
                </ul>
              </section>
            </div>
          )}

        {/* CERTIFICATIONS */}
        {certifications &&
          (Array.isArray(certifications)
            ? certifications.length > 0
            : certifications) && (
            <div className="resume-section">
              <section className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                  Certifications
                </h3>

                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                  {Array.isArray(certifications)
                    ? certifications.map((c, i) => <li key={i}>{c}</li>)
                    : <li>{certifications}</li>}
                </ul>
              </section>
            </div>
          )}

        {/* ⭐⭐⭐ CUSTOM SECTIONS — ALWAYS LAST */}
        {customSections.length > 0 &&
          customSections.map((sec, idx) => (
            <div key={idx} className="resume-section mb-8">
              <section>
                <h3 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                  {sec.heading}
                </h3>

                <div className="text-sm text-gray-700 leading-relaxed">
                  {Array.isArray(sec.content)
                    ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                    : sec.content}
                </div>
              </section>
            </div>
          ))}

      </div>
    </div>
  );
};

export default FresherModern;
