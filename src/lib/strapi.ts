/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArticleBlock, Author, Category, Image } from "@/types/entities";

/**
 * Estrutura padrão de resposta da API do Strapi v4
 */
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  message?: string;
}

/**
 * Estrutura padrão de um item de dados do Strapi
 */
export type Article = {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  slug?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  cover?: Image;
  author?: Author;
  blocks?: ArticleBlock[];
};

export type SortOrder = "recent" | "oldest";

export type ContentType = "articles" | "author" | "categories" | "user";

/**
 * Operadores de filtro do Strapi
 */
export type StrapiFilterOperator =
  | "$eq"
  | "$eqi"
  | "$ne"
  | "$nei"
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$in"
  | "$notIn"
  | "$contains"
  | "$notContains"
  | "$containsi"
  | "$notContainsi"
  | "$null"
  | "$notNull"
  | "$between"
  | "$startsWith"
  | "$startsWithi"
  | "$endsWith"
  | "$endsWithi";

export type StrapiFilter = {
  field: string;
  operator: StrapiFilterOperator;
  value: any;
};

export type StrapiArticle = Article;

export type FetchStrapiOptions = {
  populate?: string | string[];
  /** Campos que precisam de deep populate (ex: "blocks" -> populate[blocks][populate]=*) */
  rawPopulate?: [string, string][];
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    limit?: number;
    start?: number;
  };
  filters?: StrapiFilter[];
};

/**
 * Busca conteúdo do Strapi usando a estrutura padrão
 * @param contentType - Nome do Content Type (ex: 'articles', 'categories')
 * @param options - Opções de busca
 */
export async function fetchStrapiContent<T = StrapiArticle>(
  contentType: ContentType,
  options: FetchStrapiOptions = {}
): Promise<StrapiResponse<T>> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = new URL(`${strapiUrl}/api/${contentType}`);

  // Populate simples
  if (options.populate) {
    if (Array.isArray(options.populate)) {
      options.populate.forEach((field) => {
        url.searchParams.append("populate", field);
      });
    } else {
      url.searchParams.append("populate", options.populate);
    }
  }

  if (options.rawPopulate) {
    options.rawPopulate.forEach(([query, value]) => {
      url.searchParams.append(query, value);
    });
  }

  // Sort
  if (options.sort) {
    if (Array.isArray(options.sort)) {
      options.sort.forEach((sort) => {
        url.searchParams.append("sort", sort);
      });
    } else {
      url.searchParams.append("sort", options.sort);
    }
  } else {
    // Sort padrão: por data de publicação (mais recente primeiro)
    url.searchParams.append("sort", "publishedAt:desc");
  }

  // Pagination
  if (options.pagination) {
    if (options.pagination.limit) {
      url.searchParams.append(
        "pagination[limit]",
        options.pagination.limit.toString()
      );
    }
    if (options.pagination.page) {
      url.searchParams.append(
        "pagination[page]",
        options.pagination.page.toString()
      );
    }
    if (options.pagination.pageSize) {
      url.searchParams.append(
        "pagination[pageSize]",
        options.pagination.pageSize.toString()
      );
    }
    if (options.pagination.start) {
      url.searchParams.append(
        "pagination[start]",
        options.pagination.start.toString()
      );
    }
  }

  // Advanced Filters com operadores Strapi
  if (options.filters && options.filters.length > 0) {
    options.filters.forEach((filter) => {
      url.searchParams.append(
        `filters[${filter.field}][${filter.operator}]`,
        String(filter.value)
      );
    });
  }

  const response = await fetch(url.toString(), {
    // next: { revalidate: 60 }, // Revalida a cada 1min
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${contentType}: ${response.statusText}`);
  }

  const data: StrapiResponse<T> = await response.json();
  return data;
}

/**
 * Busca artigos do Strapi com opções de filtro para busca, categoria e ordenação
 */
export async function fetchArticles(
  options: {
    page?: number;
    pageSize?: number;
    search?: string;
    categorySlug?: string;
    sortOrder?: SortOrder;
  } = {}
): Promise<StrapiResponse<StrapiArticle>> {
  const filters: StrapiFilter[] = [];

  if (options.search) {
    filters.push({
      field: "title",
      operator: "$containsi",
      value: options.search,
    });
  }

  if (options.categorySlug) {
    filters.push({
      field: "category][slug",
      operator: "$eq",
      value: options.categorySlug,
    });
  }

  // Determina a ordenação
  const sort =
    options.sortOrder === "oldest" ? "publishedAt:asc" : "publishedAt:desc";

  return fetchStrapiContent<StrapiArticle>("articles", {
    populate: ["cover", "category", "author", "author.avatar"],
    sort,
    pagination: {
      page: options.page || 1,
      pageSize: options.pageSize || 9,
    },
    filters,
  });
}

/**
 * Busca todas as categorias do Strapi
 */
export async function fetchCategories(): Promise<StrapiResponse<Category>> {
  return fetchStrapiContent<Category>("categories", {
    sort: "name:asc",
    pagination: {
      pageSize: 100,
    },
  });
}

/**
 * Helper para construir URL de imagens do Strapi
 */
export function getStrapiImageUrl(url?: string): string | null {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!url) return null;

  // Se a URL já é absoluta, retorna como está
  if (url.startsWith("http")) return url;

  // Caso contrário, adiciona a URL base do Strapi
  return `${strapiUrl}${url}`;
}

/**
 * Busca um artigo pelo slug com populate profundo para blocks
 */
export async function fetchArticleBySlug(
  slug: string
): Promise<Article | null> {
  const response = await fetchStrapiContent<StrapiArticle>("articles", {
    rawPopulate: [
      ["populate[category][populate]","*"],
      ["populate[cover][populate]","*"],
      ["populate[author][populate]","avatar"],
      ["populate[blocks][on][shared.media][populate]","file"],
      ["populate[blocks][on][shared.quote][populate]","*"],
      ["populate[blocks][on][shared.rich-text][populate]","*"],
      ["populate[blocks][on][shared.slider][populate]","files"],
    ],
    filters: [{ field: "slug", operator: "$eq", value: slug }],
  });

  return response.data?.[0] || null;
}

/**
 * Busca artigos relacionados (mesma categoria, excluindo o atual)
 */
export async function fetchRelatedArticles(
  categorySlug: string,
  excludeSlug: string,
  limit: number = 4
): Promise<Article[]> {
  const filters: StrapiFilter[] = [
    { field: "category][slug", operator: "$eq", value: categorySlug },
    { field: "slug", operator: "$ne", value: excludeSlug },
  ];

  const result = await fetchStrapiContent<Article>("articles", {
    populate: ["cover", "category", "author"],
    filters,
    pagination: { limit },
  });

  return result.data || [];
}

/**
 * Busca artigos mais recentes (para seção de "mais notícias")
 */
export async function fetchLatestArticles(
  excludeSlug?: string,
  limit: number = 4
): Promise<Article[]> {
  const filters: StrapiFilter[] = [];

  if (excludeSlug) {
    filters.push({ field: "slug", operator: "$ne", value: excludeSlug });
  }

  const result = await fetchStrapiContent<Article>("articles", {
    populate: ["cover", "category", "author"],
    filters,
    pagination: { limit },
    sort: "publishedAt:desc",
  });

  return result.data || [];
}
