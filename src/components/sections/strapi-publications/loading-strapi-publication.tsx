import { Loader2 } from "lucide-react";

export function LoadingStrapiPublications() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20 py-16 text-center">
      <Loader2 className="size-12 animate-spin text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">
        Carregando publicações...
      </h3>
    </div>
  );
}
