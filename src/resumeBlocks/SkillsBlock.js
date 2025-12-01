export default function SkillsBlock({ skills }) {
  if (!Array.isArray(skills) || !skills.length) return null;

  return (
    <section style={{ marginTop: "18px" }}>
      <h3 className="section-title">SKILLS</h3>
      <div className="flex flex-wrap gap-2 text-[11px]">
        {skills.map((s, i) => (
          <span 
            key={i} 
            className="px-2 py-1 bg-gray-200 rounded text-gray-800"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
