import React from "react";

const TechnicalEngineer = ({ data }) => {
  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];
  const customSections = data?.customSections ?? [];

  // Contact Info
  const contactLine = (
    <>
      {data?.email ? <span>Email: {data.email}</span> : null}
      {data?.email && data?.phone ? " • " : null}

      {data?.phone ? <span>Phone: {data.phone}</span> : null}
      {(data?.phone || data?.email) && data?.linkedin ? " • " : null}

      {data?.linkedin ? (
        <a
          href={data.linkedin}
          className="text-orange-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.linkedin.replace(/^https?:\/\//, "")}
        </a>
      ) : null}
    </>
  );

  // Convert bullets / strings to list
  const renderListContent = (content) => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside text-gray-700">
          {content.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    }

    return (
      <ul className="list-disc list-inside text-gray-700">
        <li>{content}</li>
      </ul>
    );
  };

  return (
    <div className="resume-doc">
      <div className="resume-page p-8 bg-white">
        <div className="max-w-5xl mx-auto bg-white text-gray-900 font-sans shadow-md rounded-2xl p-10 leading-relaxed">

          {/* HEADER */}
          <header className="resume-section border-b-2 border-orange-500 pb-4 mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {data?.fullName ?? ""}
            </h1>
            <h2 className="text-lg text-orange-600 font-medium">
              {data?.role ?? ""}
            </h2>
            <div className="mt-2 text-sm text-gray-700">
              {contactLine}
            </div>
          </header>

          {/* OBJECTIVE */}
          <section className="resume-section mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-orange-600 border-b border-gray-300 pb-1 mb-3">
              Objective
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data?.summary ?? ""}
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="resume-section mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-orange-600 border-b border-gray-300 pb-1 mb-5">
              Experience
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-900">
                    {exp?.title ?? ""}{exp?.company ? ` — ${exp.company}` : ""}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {exp?.duration ?? ""}
                  </p>
                  <p className="text-sm text-gray-700">
                    {exp?.description ?? ""}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TECHNICAL SKILLS (dynamic from custom sections) */}
          <section className="resume-section mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-orange-600 border-b border-gray-300 pb-1 mb-4">
              Technical Skills
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customSections
                .filter((sec) =>
                  ["operating", "network", "automation", "cloud"].some((key) =>
                    (sec?.heading || "").toLowerCase().includes(key)
                  )
                )
                .map((sec, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900 mb-1">
                      {sec.heading}
                    </p>
                    {renderListContent(sec.content)}
                  </div>
                ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="resume-section mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-orange-600 border-b border-gray-300 pb-1 mb-3">
              Education
            </h3>
            <div className="text-sm">
              {education.map((edu, i) => (
                <div key={i}>
                  <p className="font-semibold">{edu?.degree ?? ""}</p>
                  <p className="text-gray-500 text-xs">
                    {edu?.school ? `${edu.school} | ${edu?.year ?? ""}` : edu?.year ?? ""}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS (dynamic from custom sections) */}
          <section className="resume-section mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-orange-600 border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {customSections
                .filter((s) =>
                  (s?.heading || "").toLowerCase().includes("certification")
                )
                .flatMap((sec) =>
                  Array.isArray(sec.content)
                    ? sec.content
                    : [sec.content]
                )
                .map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
            </ul>
          </section>

          {/* Remaining Custom Sections */}
          {customSections
            .filter(
              (sec) =>
                !["operating", "network", "automation", "cloud", "certification"].some((k) =>
                  (sec?.heading || "").toLowerCase().includes(k)
                )
            )
            .map((sec, idx) => (
              <section key={idx} className="resume-section mb-6">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-orange-600 border-b border-gray-300 pb-1 mb-3">
                  {sec.heading}
                </h3>
                <div className="text-sm text-gray-700">
                  {Array.isArray(sec.content)
                    ? sec.content.map((line, i) => <p key={i}>{line}</p>)
                    : sec.content}
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalEngineer;
