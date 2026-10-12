import { Bath, BrickWall, CookingPot, Grid2x2, House, Layers, PaintRoller, Wrench, Zap } from "lucide-react";
import type { Service } from "@/content/services";

const icons = {
  integral: BrickWall,
  bath: Bath,
  kitchen: CookingPot,
  drywall: Layers,
  paint: PaintRoller,
  roof: House,
  plumbing: Wrench,
  electrical: Zap,
  windows: Grid2x2,
} as const;

export default function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} strokeWidth={1.25} aria-hidden="true" />;
}
