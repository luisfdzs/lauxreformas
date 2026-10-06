type Props = {
  /** Colour of the dark strokes (L, roof, R, window). */
  color?: string;
  /** Colour of the accent panel. */
  accent?: string;
  className?: string;
  title?: string;
};

/**
 * Monograma "LR" de LAUX Reformas: la L forma el tejado de una casa con ventana
 * y un panel dorado hace de puerta entre las dos letras.
 */
export default function LogoMark({
  color = "currentColor",
  accent = "var(--color-gold)",
  className,
  title,
}: Props) {
  return (
    <svg
      viewBox="260 160 1000 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <g fill={color}>
        <polygon points="276,174 430,287 430,800 276,920" />
        <polygon points="276,900 601,900 601,947 276,947" />
        <polygon points="276,918 731,634 1057,947 993,947 730,688 397,900 276,947" />
        <path d="M753 279H965C1100 279 1190 370 1190 490C1190 580 1140 655 1058 688L1248 947H1138L895 627H965C1040 627 1097 570 1097 490C1097 415 1040 361 965 361H753Z" />
        <rect x="661" y="806" width="49" height="49" />
        <rect x="721" y="806" width="49" height="49" />
        <rect x="661" y="866" width="49" height="49" />
        <rect x="721" y="866" width="49" height="49" />
      </g>
      <polygon fill={accent} points="571,397 726,279 726,606 571,700" />
    </svg>
  );
}
