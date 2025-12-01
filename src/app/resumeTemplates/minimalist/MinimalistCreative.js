import React from "react";

const MinimalistCreative = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const tools = Array.isArray(data?.tools) ? data.tools : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];

  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const fullName = data?.fullName || "";
  const role = data?.role || "";
  const summary = data?.summary || "";

  const renderText = (text) => {
    if (!text) return null;
    if (Array.isArray(text)) return text.map((t, i) => <p key={i}>{t}</p>);
    return String(text).split("\n").map((t, i) => <p key={i}>{t}</p>);
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">
      <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans shadow-sm rounded-xl overflow-hidden leading-relaxed overflow-y-auto">

        <div className="flex flex-col md:flex-row">

          {/* LEFT SIDEBAR */}
          <aside className="w-full md:w-1/3 bg-gray-50 p-6 space-y-8">

            {/* CONTACT */}
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                Contact
              </h3>
              <ul className="text-sm space-y-2 break-words whitespace-normal">
                {contact.email && <li className="break-words">Email: {contact.email}</li>}
                {contact.phone && <li className="break-words">Phone: {contact.phone}</li>}
                {contact.address && <li className="break-words">Location: {contact.address}</li>}

                {contact.linkedin && (
                  <li className="break-words">
                    <a
                      href={contact.linkedin}
                      className="text-teal-600 hover:underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.linkedin}
                    </a>
                  </li>
                )}

                {contact.github && (
                  <li className="break-words">
                    <a
                      href={contact.github}
                      className="text-teal-600 hover:underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.github}
                    </a>
                  </li>
                )}

                {contact.portfolio && (
                  <li className="break-words">
                    <a
                      href={contact.portfolio}
                      className="text-teal-600 hover:underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.portfolio}
                    </a>
                  </li>
                )}
              </ul>
            </section>

            {/* SKILLS */}
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                Skills
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </section>

            {/* TOOLS */}
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                Tools
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {tools.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* CUSTOM SECTIONS ON SIDEBAR */}
            {customSections
              .filter((sec) => sec?.side === "left") // Your choice if needed
              .map((sec, i) => (
                <section key={i}>
                  <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                    {sec?.heading || "New Section"}
                  </h3>

                  <div className="text-sm text-gray-700 space-y-1 break-words whitespace-normal">
                    {Array.isArray(sec?.content)
                      ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                      : sec?.content}
                  </div>
                </section>
              ))}
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <main className="w-full md:w-2/3 p-8 space-y-8">

            {/* HEADER */}
            <header className="border-b border-gray-200 pb-3 mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {fullName}
              </h1>
              <p className="text-lg text-teal-700 font-medium">{role}</p>
            </header>

            {/* SUMMARY */}
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                Summary
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed">
                {renderText(summary)}
              </div>
            </section>

            {/* EXPERIENCE */}
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-4 text-sm">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title || ""}{exp?.company ? ` — ${exp.company}` : ""}
                    </p>
                    {exp?.duration && (
                      <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                    )}
                    {renderText(exp?.description)}
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                Education
              </h3>
              <div className="text-sm text-gray-700">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold">
                      {ed?.degree || ""}{ed?.school ? ` — ${ed.school}` : ""}
                    </p>
                    {ed?.year && <p className="text-gray-500 text-xs">{ed.year}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section>
              <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                Projects
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                {projects.map((p, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-900">
                      {p?.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {p.title}
                        </a>
                      ) : (
                        p?.title
                      )}
                    </span>{" "}
                    {p?.description}
                  </li>
                ))}
              </ul>
            </section>

            {/* CUSTOM SECTIONS ON THE RIGHT SIDE */}
            {customSections
              .filter((sec) => !sec?.side || sec?.side === "right")
              .map((sec, i) => (
                <section key={i}>
                  <h3 className="text-base font-semibold uppercase tracking-wide text-teal-700 border-b border-gray-200 pb-1 mb-3">
                    {sec?.heading || "New Section"}
                  </h3>

                  <div className="text-sm text-gray-700 space-y-1">
                    {Array.isArray(sec?.content)
                      ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                      : sec?.content}
                  </div>
                </section>
              ))}
          </main>

        </div>
      </div>
    </div>
  );
};

export default MinimalistCreative;
