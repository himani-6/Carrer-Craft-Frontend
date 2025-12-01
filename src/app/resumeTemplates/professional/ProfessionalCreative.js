import React from "react";
import { Briefcase, Award, Code, BookOpen, Globe } from "lucide-react";

const ProfessionalCreative = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
    address: data?.address || "",
  };

  const summaryText = data?.summary || "";
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const languages = Array.isArray(data?.languages) ? data.languages : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const education = Array.isArray(data?.education) ? data.education : [];

  // Certifications renamed as Achievements in preview
  const achievements =
    Array.isArray(data?.certifications) ? data.certifications : [];

  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 shadow overflow-hidden">
      <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-8 text-center">
        <h1 className="text-3xl font-bold break-words">{data?.fullName || ""}</h1>
        <p className="text-lg text-gray-100 break-words">{data?.role || ""}</p>

        <div className="mt-2 text-sm space-y-1 break-words">
          {contact.email && <p>Email: {contact.email}</p>}
          {contact.phone && <p>Phone: {contact.phone}</p>}
          {contact.linkedin && <p>LinkedIn: {contact.linkedin}</p>}
          {contact.github && <p>GitHub: {contact.github}</p>}
          {contact.portfolio && <p>Portfolio: {contact.portfolio}</p>}
          {contact.address && <p>Location: {contact.address}</p>}
        </div>
      </div>

      <div className="p-6 space-y-8 text-gray-800">
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT SIDE */}
          <aside className="md:w-1/3 space-y-6">
            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="bg-white shadow-md rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-purple-600 font-semibold mb-2">
                  <Code size={18} />
                  <h2>Skills</h2>
                </div>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {skills.map((s, idx) => (
                    <li key={idx}>{typeof s === "string" ? s : s?.name}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <section className="bg-white shadow-md rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-purple-600 font-semibold mb-2">
                  <Globe size={18} />
                  <h2>Languages</h2>
                </div>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {languages.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* CUSTOM SECTIONS ON LEFT */}
            {customSections.length > 0 &&
              customSections.map((sec, i) => (
                <section key={i} className="bg-white shadow-md rounded-2xl p-4 break-words">
                  <h2 className="text-purple-600 font-semibold mb-2">
                    {sec.heading || ""}
                  </h2>
                  <p className="text-sm leading-relaxed">
                    {Array.isArray(sec.content)
                      ? sec.content.join(", ")
                      : sec.content}
                  </p>
                </section>
              ))}
          </aside>

          {/* RIGHT SIDE */}
          <main className="md:w-2/3 space-y-6">
            {/* SUMMARY */}
            <section className="bg-white shadow-md rounded-2xl p-4 break-words">
              <div className="flex items-center space-x-2 text-purple-600 font-semibold mb-2">
                <BookOpen size={18} />
                <h2>Summary</h2>
              </div>
              <p className="text-sm leading-relaxed">{summaryText}</p>
            </section>

            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section className="bg-white shadow-md rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-purple-600 font-semibold mb-2">
                  <Briefcase size={18} />
                  <h2>Experience</h2>
                </div>
                <div className="text-sm space-y-3">
                  {experience.map((exp, i) => (
                    <div key={i}>
                      <h3 className="font-semibold">
                        {exp?.title || ""}{" "}
                        {exp?.company ? `– ${exp.company}` : ""}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {exp?.duration || ""}{" "}
                        {exp?.location ? `| ${exp.location}` : ""}
                      </p>
                      {exp?.description && (
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {(Array.isArray(exp.description)
                            ? exp.description
                            : exp.description.split("\n")
                          ).map((d, j) => (
                            <li key={j}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <section className="bg-white shadow-md rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-purple-600 font-semibold mb-2">
                  <Code size={18} />
                  <h2>Projects</h2>
                </div>
                <ul className="text-sm list-disc list-inside mt-1 space-y-1">
                  {projects.map((p, i) => (
                    <li key={i}>
                      <span className="font-semibold">{p?.title || ""}</span>
                      {p?.description ? ` – ${p.description}` : ""}
                      {p?.link && (
                        <a href={p.link} target="_blank" className="text-purple-600 ml-1">
                          {p.link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="bg-white shadow-md rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-purple-600 font-semibold mb-2">
                  <BookOpen size={18} />
                  <h2>Education</h2>
                </div>
                <div className="text-sm space-y-2">
                  {education.map((ed, i) => (
                    <div key={i}>
                      <h3 className="font-semibold">{ed?.degree || ""}</h3>
                      <p className="text-gray-500 text-xs">
                        {ed?.school || ""} {ed?.year ? `| ${ed.year}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACHIEVEMENTS (coming from certifications) */}
            {achievements.length > 0 && (
              <section className="bg-white shadow-md rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-purple-600 font-semibold mb-2">
                  <Award size={18} />
                  <h2>Achievements</h2>
                </div>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCreative;
