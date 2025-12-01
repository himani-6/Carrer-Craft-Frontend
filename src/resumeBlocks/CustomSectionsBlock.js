export default function CustomSectionBlock({ sections }) {
  if (!Array.isArray(sections) || !sections.length) return null;

  return (
    <>
      {sections.map((sec, i) => (
        <section key={sec.id} style={{ marginTop: "18px" }}>
          <h3 className="section-title">{sec.title}</h3>

          {sec.type === "text" ? (
            <p className="text-[12px] leading-tight">{sec.content}</p>
          ) : (
            <ul className="list-disc ml-4 text-[12px] leading-tight">
              {sec.content.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}
