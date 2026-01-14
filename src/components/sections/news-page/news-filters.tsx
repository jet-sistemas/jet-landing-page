"use client";

import { Search, X, Tag } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/entities";
import { cn } from "@/lib/utils";

type NewsFiltersProps = {
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (categorySlug: string | null) => void;
  isLoading?: boolean;
};

export function NewsFilters({
  categories,
  selectedCategory,
  searchQuery,
  onSearchChange,
  onCategoryChange,
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
    onSearchChange("");
    onCategoryChange(null);
  }, [onSearchChange, onCategoryChange]);

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar notícias por título..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 pr-10 h-12 bg-card border-border/50 focus:border-accent"
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
              "cursor-pointer transition-all hover:scale-105",
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
                "cursor-pointer transition-all hover:scale-105",
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
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
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
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-3 mr-1" />
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
