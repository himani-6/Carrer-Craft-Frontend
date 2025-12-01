import React from "react";
import { Brain, Code, Database, Award, Briefcase, GraduationCap } from "lucide-react";

const TechnicalAI = ({ data }) => {
  const skills = data?.skills ?? [];
  const experiences = data?.experience ?? [];
  const projects = data?.projects ?? [];
  const education = data?.education ?? [];
  const certifications = data?.certifications ?? [];
  const customSections = data?.customSections ?? []; // ✅ ADDED
  const summary = data?.summary ?? "";

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 font-sans shadow-lg rounded-2xl overflow-hidden p-10 leading-relaxed overflow-y-auto">

        {/* HEADER */}
        <header className="text-center border-b-2 border-violet-500 pb-5 mb-10">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Brain size={32} className="text-violet-500" />
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {data?.fullName ?? ""}
            </h1>
          </div>
          <h2 className="text-lg text-violet-600 font-medium">
            {data?.role ?? ""}
          </h2>
        </header>

        {/* SUMMARY */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-300 pb-1 mb-3">
            Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {summary}
          </p>
        </section>

        {/* SKILLS */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-300 pb-1 mb-5 flex items-center gap-2">
            <Code size={18} className="text-violet-500" /> Technical Skills
          </h3>

          {/* 🔥 Removed the progress circle — converted to normal skill chips */}
          <div className="flex flex-wrap gap-3 text-sm">
            {skills.map((skill, index) => {
              const name = typeof skill === "string" ? skill : skill?.name ?? "";
              return (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-violet-100 text-violet-700 border border-violet-300 rounded-full"
                >
                  {name}
                </span>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-300 pb-1 mb-4 flex items-center gap-2">
            <Briefcase size={18} className="text-violet-500" /> Experience
          </h3>

          <div className="space-y-5 text-sm">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-gray-900">
                  {exp?.title ?? ""}{exp?.company ? ` — ${exp.company}` : ""}
                </p>
                <p className="text-gray-500 text-xs mb-1">{exp?.duration ?? ""}</p>

                {Array.isArray(exp?.bullets) ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{exp?.description ?? ""}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-300 pb-1 mb-4 flex items-center gap-2">
            <Database size={18} className="text-violet-500" /> Research / Projects
          </h3>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            {projects.map((proj, i) => (
              <li key={i}>
                <span className="font-semibold text-gray-900">
                  {proj?.title ?? proj?.name ?? ""}
                  {proj?.link ? ":" : ""}
                </span>{" "}
                {proj?.description ?? ""}
                {proj?.link ? (
                  <>
                    {" "}
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 hover:underline"
                    >
                      (link)
                    </a>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {/* EDUCATION */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <GraduationCap size={18} className="text-violet-500" /> Education
          </h3>

          <div className="text-sm">
            {education.map((edu, i) => (
              <div key={i} className={i ? "mt-2" : ""}>
                <p className="font-semibold">
                  {edu?.degree ?? ""}{edu?.school ? ` — ${edu.school}` : ""}
                </p>
                <p className="text-gray-500 text-xs">{edu?.year ?? ""}</p>
                {edu?.description ? (
                  <p className="text-gray-700 mt-1">{edu.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <Award size={18} className="text-violet-500" /> Certifications
          </h3>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            {certifications.length > 0
              ? certifications.map((c, i) => <li key={i}>{c}</li>)
              : null}
          </ul>
        </section>

        {/* ✅ CUSTOM SECTIONS ADDED (finally visible in editor + resume) */}
        {customSections.map((sec, i) => (
          <section key={i} className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-violet-600 border-b border-gray-300 pb-1 mb-3">
              {sec?.heading ?? ""}
            </h3>

            <div className="text-sm text-gray-700 leading-relaxed">
              {Array.isArray(sec?.content)
                ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                : sec?.content ?? ""}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default TechnicalAI;
