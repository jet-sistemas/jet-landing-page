import { LucideIcon } from "lucide-react";

// Benefícios para Associados
export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Patrocinadores mockados
export type SponsorTier = "gold" | "silver" | "bronze";

export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  tier: SponsorTier;
  website?: string;
};

// Publicações mockadas (simulando Strapi)
export type Publication = {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  slug: string;
  category: string;
};
