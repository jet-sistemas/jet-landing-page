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

export type Category = {
  createdAt: string;
  description: string | null;
  documentId: string;
  id: number;
  name: string;
  publishedAt?: string;
  slug: string;
  updatedAt: string;
};

// Autor de artigos do Strapi
export type Author = {
  id: number;
  documentId: string;
  name: string;
  email?: string;
  avatar?: Image;
  createdAt: string;
  updatedAt: string;
};

export type Image = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Formats = {
  thumbnail: Format;
  large: Format;
  medium: Format;
  small: Format;
};

export type Format = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

// Blocks do Article (Dynamic Zone do Strapi)
export type MediaBlock = {
  __component: "shared.media";
  id: number;
  file: Image;
};

export type QuoteBlock = {
  __component: "shared.quote";
  id: number;
  title: string;
  body: string;
};

export type RichTextBlock = {
  __component: "shared.rich-text";
  id: number;
  body: string; // Markdown
};

export type SliderBlock = {
  __component: "shared.slider";
  id: number;
  files: Image[];
};

export type ArticleBlock =
  | MediaBlock
  | QuoteBlock
  | RichTextBlock
  | SliderBlock;
