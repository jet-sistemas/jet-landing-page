"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Newspaper } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  fetchArticles,
  fetchCategories,
  SortOrder,
  StrapiArticle,
} from "@/lib/strapi";
import { Category } from "@/types/entities";

import { NewsFilters } from "./news-filters";
import { NewsGrid } from "./news-grid";
import { NewsPagination } from "./news-pagination";
import { FeaturedArticle } from "./featured-article";
import {
  GoldSponsorsSidebar,
  GoldSponsorsCompact,
} from "./gold-sponsors-sidebar";

const ITEMS_PER_PAGE = 9;

export function NewsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [articles, setArticles] = useState<StrapiArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Get filters from URL
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("categoria") || null;
  const sortOrder = (searchParams.get("ordem") as SortOrder) || "recent";
  const pageFromUrl = parseInt(searchParams.get("pagina") || "1", 10);

  // Determine if any filter is active
  const hasActiveFilters = Boolean(
    searchQuery || selectedCategory || sortOrder !== "recent" || currentPage > 1
  );

  // Featured article is the first one when no filters are active
  const featuredArticle =
    !hasActiveFilters && articles.length > 0 ? articles[0] : null;

  // Articles to display in grid (excluding featured if shown)
  const gridArticles = featuredArticle ? articles.slice(1) : articles;

  // Sync URL page with state
  useEffect(() => {
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, [pageFromUrl]);

  // Update URL with filters
  const updateUrl = useCallback(
    (params: {
      q?: string;
      categoria?: string | null;
      ordem?: SortOrder;
      pagina?: number;
    }) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (params.q !== undefined) {
        if (params.q) {
          newParams.set("q", params.q);
        } else {
          newParams.delete("q");
        }
      }

      if (params.categoria !== undefined) {
        if (params.categoria) {
          newParams.set("categoria", params.categoria);
        } else {
          newParams.delete("categoria");
        }
      }

      if (params.ordem !== undefined) {
        if (params.ordem && params.ordem !== "recent") {
          newParams.set("ordem", params.ordem);
        } else {
          newParams.delete("ordem");
        }
      }

      if (params.pagina !== undefined) {
        if (params.pagina > 1) {
          newParams.set("pagina", params.pagina.toString());
        } else {
          newParams.delete("pagina");
        }
      }

      const queryString = newParams.toString();
      router.push(queryString ? `/noticias?${queryString}` : "/noticias", {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  // Load categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const result = await fetchCategories();
        if (result.data) {
          setCategories(result.data);
        }
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    }

    loadCategories();
  }, []);

  // Load articles when filters change
  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchArticles({
          page: currentPage,
          pageSize: ITEMS_PER_PAGE,
          search: searchQuery || undefined,
          categorySlug: selectedCategory || undefined,
          sortOrder: sortOrder,
        });

        if (result.data) {
          setArticles(result.data);

          if (result.meta.pagination) {
            setTotalPages(result.meta.pagination.pageCount);
            setTotalItems(result.meta.pagination.total);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar artigos:", err);
        setError("Erro ao carregar as notícias. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  }, [currentPage, searchQuery, selectedCategory, sortOrder]);

  // Handlers
  const handleSearchChange = useCallback(
    (query: string) => {
      updateUrl({ q: query, pagina: 1 });
    },
    [updateUrl]
  );

  const handleCategoryChange = useCallback(
    (categorySlug: string | null) => {
      updateUrl({ categoria: categorySlug, pagina: 1 });
    },
    [updateUrl]
  );

  const handleSortOrderChange = useCallback(
    (order: SortOrder) => {
      updateUrl({ ordem: order, pagina: 1 });
    },
    [updateUrl]
  );

  const handleClearFilters = useCallback(() => {
    router.push("/noticias", { scroll: false });
  }, [router]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrl({ pagina: page });
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateUrl]
  );

  return (
    <section className="relative overflow-hidden py-12 lg:py-16 not-dark:bg-muted/80">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 size-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Page Header */}
        <div className="mb-10">
          <Badge className="mb-4">
            <Newspaper className="mr-1 size-3" />
            Central de Notícias
          </Badge>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Todas as <span className="gradient-primary-text">Notícias</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Acompanhe as últimas novidades, eventos e histórias da nossa
            comunidade esportiva. Use os filtros para encontrar o que procura.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-xl border border-muted bg-card p-6 backdrop-blur-sm">
          <NewsFilters
            categories={categories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortOrder={sortOrder}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onSortOrderChange={handleSortOrderChange}
            onClearFilters={handleClearFilters}
            isLoading={isLoading}
          />
        </div>

        {/* Featured Article - only when no filters active */}
        {featuredArticle && !isLoading && (
          <div className="mb-10">
            <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
            {error}
          </div>
        )}

        {/* Main Content with Sidebar */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Articles Grid - Main Content */}
          <div className="flex-1 min-w-0">
            <NewsGrid articles={gridArticles} isLoading={isLoading} />

            {/* Pagination */}
            {!isLoading && !error && articles.length > 0 && (
              <div className="border-t border-border/50 pt-8 mt-10">
                <NewsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:w-72 lg:shrink-0">
            <div className="sticky top-28">
              <GoldSponsorsSidebar />
            </div>
          </div>
        </div>

        {/* Gold Sponsors - Mobile/Tablet */}
        <div className="mt-12 lg:hidden">
          <GoldSponsorsCompact />
        </div>
      </div>
    </section>
  );
}
