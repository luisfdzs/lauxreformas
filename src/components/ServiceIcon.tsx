import { Bath, BrickWall, CookingPot, House, Layers, PaintRoller } from "lucide-react";
import type { Service } from "@/content/services";

const icons = {
  integral: BrickWall,
  bath: Bath,
  kitchen: CookingPot,
  drywall: Layers,
  paint: PaintRoller,
  roof: House,
} as const;

export default function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} strokeWidth={1.25} aria-hidden="true" />;
}
