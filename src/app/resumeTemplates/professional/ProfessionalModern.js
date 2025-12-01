import React from "react";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

const ProfessionalModern = ({ data }) => {
  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    address: data?.address || "",
  };

  const summary = data?.summary || "";
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const customSections = Array.isArray(data?.customSections) ? data.customSections : [];

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-0 overflow-hidden">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 flex flex-col md:flex-row font-[Poppins] min-h-[297mm]">

        {/* LEFT SIDEBAR */}
        <aside className="bg-teal-700 text-white md:w-1/5 px-6 py-10 flex flex-col space-y-8 break-words whitespace-normal w-full min-w-0">

          {/* NAME */}
          <div className="w-full break-words">
            <h1 className="text-2xl font-bold leading-tight w-full break-words">
              {data?.fullName || ""}
            </h1>
            <h2 className="text-xs uppercase text-teal-100 mt-2 w-full break-words">
              {data?.role || ""}
            </h2>
          </div>

          {/* CONTACT */}
          <div className="text-xs space-y-3 w-full break-all">
            {contact.email && (
              <p className="flex items-center gap-2">
                <Mail size={13} /> <span className="break-all">{contact.email}</span>
              </p>
            )}
            {contact.phone && (
              <p className="flex items-center gap-2">
                <Phone size={13} /> <span className="break-all">{contact.phone}</span>
              </p>
            )}
            {contact.linkedin && (
              <p className="flex items-center gap-2 break-all">
                <Linkedin size={13} />
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white break-all"
                >
                  {contact.linkedin}
                </a>
              </p>
            )}
            {contact.github && (
              <p className="flex items-center gap-2 break-all">
                <Github size={13} />
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white break-all"
                >
                  {contact.github}
                </a>
              </p>
            )}
            {contact.address && (
              <p className="flex items-center gap-2 break-words">
                <MapPin size={13} /> {contact.address}
              </p>
            )}
          </div>

          {/* SKILLS */}
          <section className="w-full">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-teal-100 border-b border-teal-400 pb-1 mb-2">
              Skills
            </h3>
            <ul className="text-xs space-y-1 break-all">
              {skills.map((s, i) => (
                <li key={i} className="break-words">{s}</li>
              ))}
            </ul>
          </section>

          {/* CUSTOM SECTIONS (LEFT) */}
          {customSections.map((sec, i) => (
            <section key={i} className="w-full break-words">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-teal-100 border-b border-teal-400 pb-1 mb-2">
                {sec.heading}
              </h3>
              <div className="text-xs break-words whitespace-normal">
                {Array.isArray(sec.content)
                  ? sec.content.map((c, j) => <p key={j}>{c}</p>)
                  : <p>{sec.content}</p>}
              </div>
            </section>
          ))}

        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="md:w-4/5 w-full px-10 py-10 space-y-10 break-words whitespace-normal w-full">

          {/* SUMMARY */}
          <section>
            <h3 className="text-lg font-medium text-teal-700 border-b border-gray-300 pb-1 mb-3">
              Professional Summary
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 break-words">
              {summary}
            </p>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h3 className="text-lg font-medium text-teal-700 border-b border-gray-300 pb-1 mb-3">
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900 break-words">
                    {exp?.title || ""}{exp?.company ? ` — ${exp.company}` : ""}
                  </h4>
                  <p className="text-xs text-gray-600 break-words">
                    {exp?.duration || ""}{exp?.location ? ` | ${exp.location}` : ""}
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-700 mt-1 space-y-1 break-words">
                    {Array.isArray(exp?.description)
                      ? exp.description.map((d, i) => <li key={i}>{d}</li>)
                      : exp?.description
                      ? exp.description.split("\n").map((d, i) => <li key={i}>{d.trim()}</li>)
                      : null}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h3 className="text-lg font-medium text-teal-700 border-b border-gray-300 pb-1 mb-3">
              Education
            </h3>
            {education.map((ed, i) => (
              <div key={i} className="break-words">
                <h4 className="font-semibold text-gray-900">{ed.degree}</h4>
                <p className="text-xs text-gray-600 break-words">
                  {ed.school}{ed.year ? ` — ${ed.year}` : ""}
                </p>
              </div>
            ))}
          </section>

          {/* PROJECTS */}
          <section>
            <h3 className="text-lg font-medium text-teal-700 border-b border-gray-300 pb-1 mb-3">
              Projects
            </h3>
            <div className="space-y-4">
              {projects.map((p, idx) => (
                <div key={idx} className="break-words">
                  <h4 className="font-semibold text-gray-900">{p.title}</h4>
                  <p className="text-xs text-gray-700 break-words">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default ProfessionalModern;
