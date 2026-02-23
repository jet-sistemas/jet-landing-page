import { AlertCircle } from "lucide-react";

export function ErrorStrapiPublications() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20 py-16 text-center">
      <AlertCircle className="size-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">
        Erro ao carregar as publicações. Por favor, recarregue a página para
        visualizar as publicações ou aguarde o serviço normalizar.
      </h3>
    </div>
  );
}
