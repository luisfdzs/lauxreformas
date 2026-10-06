import LogoMark from "./LogoMark";

/** Monograma LR + "LAUX / REFORMAS". Pensado para fondos oscuros por defecto. */
export default function Logo({
  tone = "light",
  size = "md",
}: {
  tone?: "light" | "dark";
  size?: "sm" | "md";
}) {
  const text = tone === "light" ? "text-white" : "text-ink";
  const mark = tone === "light" ? "#f4f1ec" : "#2a3036";
  const big = size === "md";
  return (
    <span className="inline-flex items-center gap-3" aria-label="LAUX Reformas">
      <LogoMark color={mark} className={big ? "h-10 w-auto" : "h-7 w-auto"} />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span
          className={`${text} font-medium ${big ? "text-[1.7rem] tracking-[0.2em]" : "text-lg tracking-[0.18em]"}`}
        >
          LAUX
        </span>
        <span
          className={`text-gold font-medium ${big ? "mt-1 text-[0.6rem] tracking-[0.55em]" : "mt-0.5 text-[0.45rem] tracking-[0.5em]"}`}
        >
          REFORMAS
        </span>
      </span>
    </span>
  );
}
