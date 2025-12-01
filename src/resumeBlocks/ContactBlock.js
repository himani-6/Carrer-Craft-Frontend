export default function ContactBlock({ contact }) {
  if (!contact) return null;

  const items = [
    { label: "Email", value: contact.email },
    { label: "Phone", value: contact.phone },
    { label: "Location", value: contact.location },
    { label: "LinkedIn", value: contact.linkedin },
    { label: "GitHub", value: contact.github },
    { label: "Website", value: contact.website }
  ].filter(i => i.value);

  if (!items.length) return null;

  return (
    <section style={{ marginTop: "12px" }}>
      <h3 className="section-title">CONTACT</h3>
      <ul className="list-none space-y-1 text-[12px] leading-tight">
        {items.map((item, idx) => (
          <li key={idx}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
