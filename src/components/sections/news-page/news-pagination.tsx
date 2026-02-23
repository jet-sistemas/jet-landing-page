"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export function NewsPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading,
}: NewsPaginationProps) {
  if (totalPages <= 1) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Mostrando {totalItems} {totalItems === 1 ? "notícia" : "notícias"}
      </div>
    );
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      {/* Results info */}
      <p className="text-sm text-muted-foreground order-2 sm:order-1">
        Mostrando{" "}
        <span className="font-medium text-foreground">
          {startItem}-{endItem}
        </span>{" "}
        de <span className="font-medium text-foreground">{totalItems}</span>{" "}
        notícias
      </p>

      {/* Pagination controls */}
      <nav
        className="flex items-center gap-1 order-1 sm:order-2"
        aria-label="Paginação"
      >
        {/* First page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isLoading}
          className="hidden sm:inline-flex"
          aria-label="Primeira página"
        >
          <ChevronsLeft className="size-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          aria-label="Página anterior"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="icon"
                onClick={() => onPageChange(page)}
                disabled={isLoading}
                className={cn(
                  "h-9 w-9",
                  currentPage === page &&
                    "bg-accent text-accent-foreground hover:bg-accent/90"
                )}
                aria-label={`Página ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          aria-label="Próxima página"
        >
          <ChevronRight className="size-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          className="hidden sm:inline-flex"
          aria-label="Última página"
        >
          <ChevronsRight className="size-4" />
        </Button>
      </nav>
    </div>
  );
}
