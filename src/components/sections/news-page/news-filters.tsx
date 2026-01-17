"use client";

import { Search, X, Tag, ArrowUpDown, Clock, History } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/entities";
import { SortOrder } from "@/lib/strapi";
import { cn } from "@/lib/utils";

type NewsFiltersProps = {
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  sortOrder: SortOrder;
  onSearchChange: (query: string) => void;
  onCategoryChange: (categorySlug: string | null) => void;
  onSortOrderChange: (order: SortOrder) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
};

export function NewsFilters({
  categories,
  selectedCategory,
  searchQuery,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onSortOrderChange,
  onClearFilters,
  isLoading,
}: NewsFiltersProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchQuery) {
        onSearchChange(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, searchQuery, onSearchChange]);

  // Sync external search query with input
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleClearFilters = useCallback(() => {
    setInputValue("");
    onClearFilters();
  }, [onClearFilters]);

  const hasActiveFilters =
    searchQuery || selectedCategory || sortOrder !== "recent";

  return (
    <div className="space-y-6">
      {/* Search and Sort Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar notícias por título..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10 pr-10 h-12 bg-card border-muted focus:border-accent"
            disabled={isLoading}
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue("");
                onSearchChange("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Sort Order Toggle */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <ArrowUpDown className="size-4" />
            Ordenar:
          </span>
          <div className="flex rounded-lg border border-border/50 bg-card overflow-hidden">
            <button
              type="button"
              onClick={() => onSortOrderChange("recent")}
              disabled={isLoading}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm transition-colors",
                sortOrder === "recent"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-primary dark:text-white hover:text-foreground hover:bg-muted"
              )}
            >
              <Clock className="size-3.5" />
              <span className="hidden xs:inline">Mais recentes</span>
              <span className="xs:hidden">Recentes</span>
            </button>
            <button
              type="button"
              onClick={() => onSortOrderChange("oldest")}
              disabled={isLoading}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm transition-colors border-l border-muted",
                sortOrder === "oldest"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-primary dark:text-white hover:text-foreground hover:bg-muted"
              )}
            >
              <History className="size-3.5" />
              <span className="hidden xs:inline">Mais antigas</span>
              <span className="xs:hidden">Antigas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tag className="size-4" />
          <span>Categorias</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all py-1 px-2 hover:scale-115",
              selectedCategory === null
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/10"
            )}
            onClick={() => onCategoryChange(null)}
          >
            Todas
          </Badge>

          {categories.map((category) => (
            <Badge
              key={category.documentId}
              variant={
                selectedCategory === category.slug ? "default" : "outline"
              }
              className={cn(
                "cursor-pointer transition-all hover:scale-115",
                selectedCategory === category.slug
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/10"
              )}
              onClick={() => onCategoryChange(category.slug)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active filters indicator */}
      {hasActiveFilters && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-border/50">
          <span className="text-sm text-muted-foreground">
            Filtros ativos:
            {searchQuery && (
              <span className="ml-2 font-medium text-foreground">
                &quot;{searchQuery}&quot;
              </span>
            )}
            {selectedCategory && (
              <span className="ml-2 font-medium text-accent">
                {categories.find((c) => c.slug === selectedCategory)?.name}
              </span>
            )}
            {selectedCategory && sortOrder === "oldest" && (
              <span className="mx-1 text-muted-foreground">·</span>
            )}
            {sortOrder === "oldest" && (
              <span className="font-medium text-primary dark:text-white">
                Mais antigas primeiro
              </span>
            )}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground self-start sm:self-auto"
          >
            <X className="size-3 mr-1" />
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
