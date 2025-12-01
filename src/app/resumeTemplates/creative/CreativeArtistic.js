// src/app/resumeTemplates/creative/CreativeArtistic.js
import React from "react";

const CreativeArtistic = ({ data }) => {
  const projects = data?.projects ?? [];
  const experiences = data?.experience ?? [];
  const skills = data?.skills ?? [];
  const summary = data?.summary ?? "";
  const fullName = data?.fullName ?? "";
  const role = data?.role ?? "";
  const photoUrl = data?.photoUrl ?? "";
  const customSections = data?.customSections ?? [];

  return (
    <div className="resume-doc">
      <div className="resume-page">
        {/* HEADER */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            {fullName}
          </h1>
          <h2 className="text-xl text-pink-500 font-medium">{role}</h2>
        </header>

        {/* ABOUT + PHOTO */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          {photoUrl ? (
            <div className="w-40 h-40 flex-shrink-0 rounded-full overflow-hidden shadow-md">
              <img
                src={photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          <div className="flex-1">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
              About Me
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-5">
            Featured Projects
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-3">
            {projects.map((p, i) => (
              <li key={i}>
                <span className="font-semibold text-gray-900">
                  {p?.title ?? ""}
                </span>{" "}
                {p?.description ?? ""}
                {p?.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline"
                  >
                    (link)
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
            Experience
          </h3>
          <div className="space-y-5 text-sm">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                <p className="font-semibold text-gray-900">
                  {exp?.title ?? ""}
                  {exp?.company ? ` — ${exp.company}` : ""}
                </p>
                <p className="text-gray-500 text-xs mb-1">
                  {exp?.duration ?? ""}
                </p>
                {exp?.description && (
                  <p className="mb-1">{exp.description}</p>
                )}
                {Array.isArray(exp?.bullets) && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h3>
          <ul className="flex flex-wrap gap-3 text-sm text-gray-700">
            {skills.map((s, i) => (
              <li
                key={i}
                className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200 transition"
              >
                {typeof s === "string" ? s : s?.name ?? ""}
              </li>
            ))}
          </ul>
        </section>

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 && (
          <section className="mt-6 space-y-6">
            {customSections.map((sec, idx) => {
              const type = sec?.type || sec?.mode || "text";
              const content = sec?.content;

              return (
                <div key={idx}>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-pink-600 border-b border-gray-200 pb-1 mb-3">
                    {sec.heading || "Additional Information"}
                  </h3>

                  {type === "contact" && typeof content === "object" ? (
                    <div className="text-sm text-gray-700 space-y-1">
                      {content.email && <p>{content.email}</p>}
                      {content.phone && <p>{content.phone}</p>}
                      {content.address && <p>{content.address}</p>}
                      {content.linkedin && (
                        <p>LinkedIn: {content.linkedin}</p>
                      )}
                      {content.github && <p>GitHub: {content.github}</p>}
                      {content.portfolio && (
                        <p>Portfolio: {content.portfolio}</p>
                      )}
                    </div>
                  ) : type === "bullets" && Array.isArray(content) ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                      {content.map((item, ii) => (
                        <li key={ii}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {typeof content === "string" ? content : ""}
                    </p>
                  )}
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeArtistic;