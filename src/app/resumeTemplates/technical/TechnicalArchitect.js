import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Layers,
  Cloud,
  Shield,
  GraduationCap,
} from "lucide-react";

const TechnicalArchitect = ({ data }) => {
  const summary = data?.summary ?? "";
  const contactEmail = data?.email ?? "";
  const contactPhone = data?.phone ?? "";
  const contactAddress = data?.address ?? "";

  const customSections = data?.customSections ?? [];
  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];

  // ⭐ ONLY USER SKILLS (dynamic)
  const skills = Array.isArray(data?.skills) ? data.skills : [];

  const renderListContent = (src) => {
    if (!src) return null;

    if (Array.isArray(src))
      return (
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {src.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );

    if (typeof src === "string")
      return (
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>{src}</li>
        </ul>
      );

    return null;
  };

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 shadow">

        <div className="max-w-5xl mx-auto bg-gray-50 text-gray-800 font-sans shadow-lg rounded-2xl overflow-hidden p-10 leading-relaxed overflow-y-auto">

          {/* HEADER */}
          <header className="resume-section text-center mb-8 border-b-2 border-teal-500 pb-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {data?.fullName ?? ""}
            </h1>
            <h2 className="text-lg text-teal-600 font-medium">
              {data?.role ?? ""}
            </h2>
          </header>

          {/* CONTACT */}
          <section className="resume-section flex flex-wrap justify-center gap-6 text-sm text-gray-700 mb-10">
            {contactEmail && (
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-teal-600" />
                <span className="break-all">{contactEmail}</span>
              </div>
            )}

            {contactPhone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-teal-600" />
                <span>{contactPhone}</span>
              </div>
            )}

            {contactAddress && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-teal-600" />
                <span>{contactAddress}</span>
              </div>
            )}
          </section>

          {/* SUMMARY */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b border-gray-300 pb-1 mb-3">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {summary}
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b border-gray-300 pb-1 mb-5 flex items-center gap-2">
              <Briefcase className="text-teal-500" size={18} /> Experience
            </h3>

            <div className="space-y-6">
              {experiences.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-900">
                    {job?.title ?? ""}
                    {job?.company ? ` — ${job.company}` : ""}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {job?.duration ?? ""}
                  </p>

                  {job?.bullets
                    ? renderListContent(job.bullets)
                    : <p className="text-sm text-gray-700">{job?.description ?? ""}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b border-gray-300 pb-1 mb-4">
              Skills
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {skills.length > 0 ? (
                skills.map((s, i) => <li key={i}>{s}</li>)
              ) : (
                <li>Add skills from editor…</li>
              )}
            </ul>
          </section>

          {/* EDUCATION */}
          <section className="resume-section">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
              <GraduationCap className="text-teal-500" size={18} /> Education
            </h3>

            <div className="text-sm">
              {education.length > 0 ? (
                education.map((edu, i) => (
                  <div key={i} className={i ? "mt-3" : ""}>
                    <p className="font-semibold">
                      {edu?.degree ?? ""}
                      {edu?.school ? ` — ${edu.school}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs">{edu?.year ?? ""}</p>

                    {edu?.description && (
                      <p className="text-gray-700 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Add your education...</p>
              )}
            </div>
          </section>

          {/* CUSTOM SECTIONS */}
          {customSections.map((sec, i) => (
            <section key={i} className="resume-section mt-10">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-teal-600 border-b border-gray-300 pb-1 mb-3">
                {sec?.heading ?? ""}
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed">
                {Array.isArray(sec?.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : sec?.content}
              </div>
            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TechnicalArchitect;
