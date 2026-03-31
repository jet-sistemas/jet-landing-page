"use client";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SponsorsError() {
  return (
    <div className="mt-16 flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center">
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
