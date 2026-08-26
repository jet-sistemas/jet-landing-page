"use client";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SponsorsErrorProps = {
  className?: string;
};

export function SponsorsError({ className }: SponsorsErrorProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center",
        className,
      )}
    >
      <AlertCircle className="size-10 text-destructive" aria-hidden />
      <p className="max-w-md text-muted-foreground">
        Não foi possível carregar os patrocinadores. Verifique sua conexão ou
        tente novamente em instantes.
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={() => window.location.reload()}
      >
        Tentar novamente
      </Button>
    </div>
  );
}
