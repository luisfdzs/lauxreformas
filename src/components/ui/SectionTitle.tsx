export default function SectionTitle({
  eyebrow,
  title,
  align = "center",
  dark = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Tag
        className={`text-2xl font-semibold tracking-tight sm:text-3xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </Tag>
    </div>
  );
}
