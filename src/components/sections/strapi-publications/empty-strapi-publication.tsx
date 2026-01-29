import { Newspaper } from "lucide-react";

export function EmptyStrapiPublications() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20 py-16 text-center">
      <Newspaper className="size-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">
        Em breve teremos novidades para compartilhar!
      </h3>
    </div>
  );
}
