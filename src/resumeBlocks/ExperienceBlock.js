export default function ExperienceBlock({ items }) {
  if (!Array.isArray(items) || !items.length) return null;

  return (
    <section style={{ marginTop: "18px" }}>
      <h3 className="section-title">EXPERIENCE</h3>
      <div className="space-y-3 text-[12px] leading-tight">
        {items.map((exp, i) => (
          <div key={i}>
            <p><strong>{exp.role}</strong> — {exp.company}</p>
            <p className="text-[10px] opacity-70">
              {exp.from} {exp.to ? `– ${exp.to}` : ""}
            </p>
            <ul className="list-disc ml-4">
              {exp.bullets?.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
