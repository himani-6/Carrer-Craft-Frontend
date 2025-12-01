// src/app/resumeTemplates/professional/ProfessionalCompact.js
import React from "react";

const ProfessionalCompact = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
    address: data?.address || "",
  };

  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const mid = Math.ceil(skills.length / 2);
  const skillsCol1 = skills.slice(0, mid);
  const skillsCol2 = skills.slice(mid);

  const renderCustom = (sec, i) => (
    <div className="resume-section" key={i}>
      <section>
        <h2 className="text-xl font-semibold border-b pb-1 mb-2">
          {sec?.heading || "Custom Section"}
        </h2>
        {Array.isArray(sec?.content) ? (
          <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700 space-y-1 break-words">
            {sec.content.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-gray-700 break-words">
            {sec?.content || ""}
          </p>
        )}
      </section>
    </div>
  );

  return (
    <div className="resume-doc">
      <div className="resume-page bg-white text-gray-900 w-[210mm] min-h-[297mm] p-10 leading-relaxed font-sans">

        {/* HEADER */}
        <div className="resume-section">
          <header className="border-b pb-4 text-center mb-6">
            <h1 className="text-3xl font-bold break-words">
              {data?.fullName || ""}
            </h1>
            <p className="text-lg text-gray-600 break-words">{data?.role || ""}</p>

            <div className="mt-3 text-sm text-gray-600 flex flex-wrap justify-center gap-4 break-words">
              {contact.email && <span>Email: {contact.email}</span>}
              {contact.phone && <span>Phone: {contact.phone}</span>}
              {contact.address && <span>Location: {contact.address}</span>}
              {contact.linkedin && <span>LinkedIn: {contact.linkedin}</span>}
              {contact.github && <span>GitHub: {contact.github}</span>}
              {contact.portfolio && <span>Portfolio: {contact.portfolio}</span>}
            </div>
          </header>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Summary</h2>
              <p className="text-sm leading-relaxed text-gray-700 break-words">
                {summary}
              </p>
            </section>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold">
                      {exp?.title || ""}{exp?.company ? ` | ${exp.company}` : ""}
                    </h3>
                    <p className="text-sm text-gray-500 break-words">
                      {exp?.duration || ""}
                      {exp?.location ? ` | ${exp.location}` : ""}
                    </p>

                    {exp?.description && (
                      <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1 break-words">
                        {(Array.isArray(exp.description)
                          ? exp.description
                          : exp.description.split("\n").map((d) => d.trim()))
                          .map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
              <div className="text-sm text-gray-700 space-y-3 break-words">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold">{ed?.degree || ""}</p>
                    <p>{ed?.school || ""}{ed?.year ? `, ${ed.year}` : ""}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 break-words">
                <ul className="list-disc list-inside space-y-1">
                  {skillsCol1.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  {skillsCol2.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="resume-section">
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Projects</h2>
              <div className="text-sm space-y-3 text-gray-700 break-words">
                {projects.map((p, i) => (
                  <div key={i}>
                    <p className="font-semibold">{p?.title || ""}</p>
                    <p>
                      {p?.description || ""}
                      {p?.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {" "}{p.link}
                        </a>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 && customSections.map(renderCustom)}

      </div>
    </div>
  );
};

export default ProfessionalCompact;
