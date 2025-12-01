import React from "react";

const ModernElegant = ({ data }) => {
  // Contact fields
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
    address: data?.address || "",
  };

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const certifications = Array.isArray(data?.certifications)
    ? data.certifications
    : [];

  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const usedHeadings = ["skills", "certifications", "experience", "education", "projects"];

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">

        {/* HEADER */}
        <header className="resume-section text-center border-b border-gray-300 pb-5 mb-8">
          {/* FIXED DARK TEXT */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 !text-gray-900">
            {data?.fullName || ""}
          </h1>

          <h2 className="text-lg text-gray-700 font-medium !text-gray-700">
            {data?.role || ""}
          </h2>

          {/* CONTACT LINE */}
          <div className="mt-3 text-sm text-gray-700 mx-auto max-w-[85%] break-words">
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">

              {contact.email && <span>{contact.email}</span>}
              {contact.phone && <span>| {contact.phone}</span>}
              {contact.linkedin && (
                <span>
                  | <a href={contact.linkedin} className="hover:text-blue-600">{contact.linkedin}</a>
                </span>
              )}
              {contact.github && (
                <span>
                  | <a href={contact.github} className="hover:text-blue-600">{contact.github}</a>
                </span>
              )}
              {contact.portfolio && (
                <span>
                  | <a href={contact.portfolio} className="hover:text-blue-600">{contact.portfolio}</a>
                </span>
              )}
              {contact.address && <span>| {contact.address}</span>}
            </div>
          </div>
        </header>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* SKILLS */}
            <section className="resume-section bg-gray-100 p-4 rounded-md">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Skills</h3>
              <ul className="list-disc list-inside text-sm text-gray-800 leading-relaxed">
                {skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="resume-section bg-gray-100 p-4 rounded-md">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Certifications</h3>
              <ul className="list-disc list-inside text-sm text-gray-800 leading-relaxed">
                {certifications.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>

            {/* CUSTOM — LEFT SIDE */}
            {customSections
              .filter(sec => !usedHeadings.includes((sec?.heading || "").toLowerCase()))
              .map((sec, idx) => (
                <section key={idx} className="resume-section bg-gray-100 p-4 rounded-md break-words">
                  <h3 className="text-gray-900 text-lg font-semibold mb-2">
                    {sec?.heading || "New Section"}
                  </h3>
                  <div className="text-sm text-gray-800 leading-relaxed">
                    {Array.isArray(sec?.content)
                      ? sec.content.map((c, i2) => <p key={i2}>{c}</p>)
                      : (sec?.content || "")}
                  </div>
                </section>
              ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* SUMMARY */}
            <section className="resume-section bg-gray-100 p-4 rounded-md">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Summary</h3>
              <p className="text-sm text-gray-800">{data?.summary || ""}</p>
            </section>

            {/* EXPERIENCE */}
            <section className="resume-section bg-gray-100 p-4 rounded-md">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Experience</h3>
              <div className="text-sm text-gray-800 space-y-3">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">
                      {exp?.title || ""}{exp?.company ? ` – ${exp.company}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs">{exp?.duration || ""}</p>
                    {exp?.description && (
                      <p className="mt-1">
                        {Array.isArray(exp.description)
                          ? exp.description.join(" ")
                          : exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className="resume-section bg-gray-100 p-4 rounded-md">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Education</h3>
              <div className="text-sm text-gray-800">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold">{ed?.degree || ""}</p>
                    <p className="text-gray-500 text-xs">
                      {ed?.school ? `${ed.school} | ${ed.year || ""}` : ed?.year}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section className="resume-section bg-gray-100 p-4 rounded-md">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Projects</h3>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {projects.map((p, i) => (
                  <li key={i}>
                    <span className="font-semibold">{p?.title || ""}</span>
                    {p?.description && ` – ${p.description}`}
                    {p?.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 ml-1">
                        {p.link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernElegant;
