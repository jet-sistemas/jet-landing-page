import { Award, Crown, Medal } from "lucide-react";

import type { SponsorTier } from "@/types/entities";

export type SponsorsTierSkeletonConfig = {
  tier: SponsorTier;
  count: number;
  gap: string;
  label: string;
  icon: typeof Crown;
  titleClassName: string;
  iconClassName: string;
};

export const SPONSORS_TIER_SKELETON_CONFIG: SponsorsTierSkeletonConfig[] = [
  {
    tier: "gold",
    count: 2,
    gap: "gap-6",
    label: "Tier Ouro",
    icon: Crown,
    titleClassName: "text-jet-gold",
    iconClassName: "text-jet-gold",
  },
  {
    tier: "silver",
    count: 3,
    gap: "gap-6",
    label: "Tier Prata",
    icon: Medal,
    titleClassName: "text-muted-foreground",
    iconClassName: "text-muted-foreground",
  },
  {
    tier: "bronze",
    count: 4,
    gap: "gap-4",
    label: "Tier Bronze",
    icon: Award,
    titleClassName: "text-jet-bronze",
    iconClassName: "text-jet-bronze",
  },
];

export const SPONSORS_TIERS_LAYOUT_CLASS = "mt-16 space-y-12";
