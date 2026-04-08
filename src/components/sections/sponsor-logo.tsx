"use client";

import { Building2 } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type SponsorLogoProps = {
  src: string | null;
  alt: string;
  tierColorClass: string;
};

export function SponsorLogo({ src, alt, tierColorClass }: SponsorLogoProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return <Building2 className={cn("size-12", tierColorClass)} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- logos com hosts variados (API)
    <img
      src={src}
      alt={alt}
      className="max-h-full max-w-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}
