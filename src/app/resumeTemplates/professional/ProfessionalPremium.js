// src/app/resumeTemplates/professional/ProfessionalPremium.js
import React from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Star,
  Folder,
  Award,
} from "lucide-react";

const ProfessionalPremium = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    location: data?.address || data?.location || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    portfolio: data?.portfolio || "",
  };

  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const skillsArr = Array.isArray(data?.skills) ? data.skills : [];
  const customSections = Array.isArray(data?.customSections)
    ? data.customSections
    : [];

  const mid = Math.ceil(skillsArr.length / 2);
  const skillsCol1 = skillsArr.slice(0, mid);
  const skillsCol2 = skillsArr.slice(mid);

  const getCustomList = (match) => {
    const sec = customSections.find((s) =>
      (s?.heading || "").toLowerCase().includes(match.toLowerCase())
    );
    if (!sec) return [];
    const content = sec.content;
    if (Array.isArray(content)) return content;
    if (typeof content === "string")
      return content.split("\n").map((c) => c.trim()).filter(Boolean);
    return [];
  };

  const certifications = Array.isArray(data?.certifications)
    ? data.certifications
    : getCustomList("certif");

  const achievements = Array.isArray(data?.achievements)
    ? data.achievements
    : getCustomList("achiev");

  const combinedHighlights = [...certifications, ...achievements];

  const extraCustomSections = customSections.filter((s) => {
    const h = (s?.heading || "").toLowerCase();
    return !h.includes("certification") && !h.includes("achievement");
  });

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 text-gray-800 font-[Poppins] leading-relaxed">

        {/* HEADER */}
        <div className="resume-section">
          <header className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {data?.fullName || ""}
              </h1>
              <h2 className="text-lg text-gray-600 mt-1">{data?.role || ""}</h2>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 flex flex-col items-center sm:items-end gap-1 break-words max-w-full sm:max-w-[60%]">
              {contact.email && (
                <p className="flex items-center gap-1">
                  <Mail size={14} /> {contact.email}
                </p>
              )}
              {contact.phone && (
                <p className="flex items-center gap-1">
                  <Phone size={14} /> {contact.phone}
                </p>
              )}
              {contact.location && (
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Location:</span>
                  {contact.location}
                </p>
              )}
              {contact.linkedin && (
                <p className="flex items-center gap-1">
                  <Linkedin size={14} />
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">{contact.linkedin}</a>
                </p>
              )}
              {contact.github && (
                <p className="flex items-center gap-1">
                  <Github size={14} />
                  <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">{contact.github}</a>
                </p>
              )}
              {contact.portfolio && (
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Portfolio:</span>
                  <a href={contact.portfolio} target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">{contact.portfolio}</a>
                </p>
              )}
            </div>
          </header>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="resume-section">
            <section className="bg-blue-50 rounded-xl shadow-sm p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700 mb-2">
                <Star size={18} /> Summary
              </h3>
              <p className="text-sm leading-relaxed break-words">{summary}</p>
            </section>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div className="resume-section">
            <section className="bg-green-50 rounded-xl shadow-sm p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700 mb-3">
                <Briefcase size={18} /> Experience
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900">
                      {exp?.title || ""}{exp?.company ? ` — ${exp.company}` : ""}
                    </p>
                    {(exp?.duration || exp?.location) && (
                      <p className="text-gray-600 text-xs">
                        {exp?.duration || ""}
                        {exp?.duration && exp?.location ? " | " : ""}
                        {exp?.location || ""}
                      </p>
                    )}

                    {exp?.description && (
                      Array.isArray(exp.description) ? (
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      ) : (
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {exp.description.split("\n").map((d, i) =>
                            d.trim() ? <li key={i}>{d.trim()}</li> : null
                          )}
                        </ul>
                      )
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
            <section className="bg-yellow-50 rounded-xl shadow-sm p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-yellow-700 mb-2">
                <GraduationCap size={18} /> Education
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {education.map((ed, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-900">{ed?.degree || ""}</p>
                    {(ed?.school || ed?.year) && (
                      <p className="text-gray-600 text-xs">
                        {ed?.school || ""}
                        {ed?.school && ed?.year ? " — " : ""}
                        {ed?.year || ""}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SKILLS */}
        {skillsArr.length > 0 && (
          <div className="resume-section">
            <section className="bg-pink-50 rounded-xl shadow-sm p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-pink-700 mb-3">
                <Star size={18} /> Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <ul className="space-y-1 list-disc list-inside">
                  {skillsCol1.map((s, i) => (
                    <li key={i}>{typeof s === "string" ? s : s?.name || ""}</li>
                  ))}
                </ul>
                <ul className="space-y-1 list-disc list-inside">
                  {skillsCol2.map((s, i) => (
                    <li key={i}>{typeof s === "string" ? s : s?.name || ""}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="resume-section">
            <section className="bg-purple-50 rounded-xl shadow-sm p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-700 mb-3">
                <Folder size={18} /> Projects
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                {projects.map((p, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-900">{p?.title || ""}</p>
                    {p?.description && !Array.isArray(p.description) && (
                      <p className="mt-1">
                        {p.description}{p?.link ? " " : ""}
                        {p?.link && (
                          <a href={p.link} target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">{p.link}</a>
                        )}
                      </p>
                    )}
                    {Array.isArray(p.description) && (
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {p.description.map((d, j) => <li key={j}>{d}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CERTIFICATIONS + ACHIEVEMENTS */}
        {combinedHighlights.length > 0 && (
          <div className="resume-section">
            <section className="bg-teal-50 rounded-xl shadow-sm p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-teal-700 mb-3">
                <Award size={18} /> Certifications & Achievements
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {combinedHighlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* OTHER CUSTOM */}
        {extraCustomSections.length > 0 && (
          <div className="resume-section">
            <div className="space-y-4">
              {extraCustomSections.map((sec, idx) => (
                <section
                  key={idx}
                  className="rounded-xl shadow-sm p-6 bg-white border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {sec?.heading || "Additional Information"}
                  </h3>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {Array.isArray(sec?.content) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {sec.content.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    ) : (
                      <p>{sec?.content || ""}</p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfessionalPremium;

