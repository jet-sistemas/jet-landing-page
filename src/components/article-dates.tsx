import { cn, formatDate } from "@/lib/utils";
import { Article } from "@/types/entities";

type ArticleDatesProps = {
  article: Pick<Article, "createdAt" | "updatedAt">;
  variant?: "compact" | "full";
  size?: "sm" | "md";
  className?: string;
};

function wasUpdated(createdAt: string, updatedAt: string): boolean {
  return new Date(updatedAt).getTime() !== new Date(createdAt).getTime();
}

export function ArticleDates({
  article,
  variant = "compact",
  size = "md",
  className,
}: ArticleDatesProps) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const updated = wasUpdated(article.createdAt, article.updatedAt);

  if (variant === "compact") {
    if (updated) {
      return (
        <time
          dateTime={article.updatedAt}
          className={cn(textSize, className)}
          title={`Criado em ${formatDate(article.createdAt)}`}
        >
          Atualizado em {formatDate(article.updatedAt)}
        </time>
      );
    }

    return (
      <time dateTime={article.createdAt} className={cn(textSize, className)}>
        {formatDate(article.createdAt)}
      </time>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-0",
        textSize,
        className,
      )}
    >
      <time dateTime={article.createdAt}>
        Criado em {formatDate(article.createdAt)}
      </time>
      {updated && (
        <time
          dateTime={article.updatedAt}
          className="text-muted-foreground/80 before:mr-3 before:hidden before:sm:inline before:content-['·']"
        >
          Atualizado em {formatDate(article.updatedAt)}
        </time>
      )}
    </div>
  );
}
