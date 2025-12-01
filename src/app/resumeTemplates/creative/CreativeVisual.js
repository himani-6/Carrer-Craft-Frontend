// src/app/resumeTemplates/creative/CreativeVisual.js
import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";

const CreativeVisual = ({ data }) => {
  const photoUrl = data?.photoUrl || "";
  const fullName = data?.fullName || "";
  const role = data?.role || "";

  const phone = data?.phone || "";
  const email = data?.email || "";
  const linkedin = data?.linkedin || "";
  const github = data?.github || "";
  const portfolio = data?.portfolio || "";

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experiences = Array.isArray(data?.experience) ? data.experience : [];
  const educations = Array.isArray(data?.education) ? data.education : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  const socialLinks = [
    linkedin && { icon: <Linkedin size={16} className="text-blue-600" />, url: linkedin },
    github && { icon: "💻", url: github },
    portfolio && { icon: "🌐", url: portfolio },
  ].filter(Boolean);

  return (
    <div className="resume-doc">
      <div className="resume-page w-[210mm] min-h-[297mm] bg-white p-8 leading-relaxed font-sans shadow overflow-hidden">

        {/* HEADER */}
        <section className="resume-section mb-10 border-b border-gray-200 pb-6">
          <header className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {photoUrl && (
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md">
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{fullName}</h1>
              <h2 className="text-lg text-blue-600 font-medium">{role}</h2>
            </div>
          </header>
        </section>

        {/* CONTACT */}
        <section className="resume-section flex flex-wrap gap-6 text-sm text-gray-700 mb-10">
          {phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-600" />
              <span className="break-all">{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              <span className="break-all">{email}</span>
            </div>
          )}
          {socialLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              {link.icon}
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-blue-700 break-all"
              >
                {link.url.replace(/^https?:\/\//, "")}
              </a>
            </div>
          ))}
        </section>

        {/* SKILLS */}
        {skills.length > 0 && (
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-200 pb-1 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3 text-sm">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm"
                >
                  {typeof s === "string" ? s : s?.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-200 pb-1 mb-4">
              Experience
            </h3>
            <div className="grid gap-5 text-sm">
              {experiences.map((exp, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">
                    {exp.title || ""}{exp.company ? ` — ${exp.company}` : ""}
                  </p>
                  {exp.duration && (
                    <p className="text-gray-500 text-xs mb-1">{exp.duration}</p>
                  )}

                  {exp.description && <p className="mb-1">{exp.description}</p>}

                  {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                    <ul className="list-disc ml-4 mt-1 space-y-1 text-gray-700">
                      {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {educations.length > 0 && (
          <section className="resume-section mb-10">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-200 pb-1 mb-4">
              Education
            </h3>
            <div className="space-y-3 text-sm">
              {educations.map((edu, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">
                    {edu.degree || ""}{edu.school ? ` — ${edu.school}` : ""}
                  </p>
                  {edu.year && (
                    <p className="text-gray-500 text-xs">{edu.year}</p>
                  )}

                  {Array.isArray(edu.bullets) && edu.bullets.length > 0 && (
                    <ul className="list-disc ml-4 mt-1 space-y-1 text-gray-700">
                      {edu.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 && (
          <section className="resume-section mb-10">
            {customSections.map((sec, i) => {
              const type = sec?.type || sec?.mode || "text";
              const content = sec?.content;

              return (
                <div key={i} className="mb-8">
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-blue-700 border-b border-gray-200 pb-1 mb-3">
                    {sec.heading || "Additional Info"}
                  </h3>

                  {type === "contact" && typeof content === "object" && !Array.isArray(content) ? (
                    <div className="text-sm text-gray-700 space-y-1">
                      {Object.entries(content).map(([k, v], idx) => (
                        v ? <p key={idx}>{v}</p> : null
                      ))}
                    </div>
                  ) : type === "bullets" && Array.isArray(content) ? (
                    <ul className="list-disc ml-4 space-y-1 text-sm text-gray-700">
                      {content.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
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

export default CreativeVisual;
