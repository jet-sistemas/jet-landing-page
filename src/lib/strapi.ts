/* eslint-disable @typescript-eslint/no-explicit-any */

import { Image } from "@/types/entities";

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
  title: string;
  description?: string;
  slug?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  cover?: Image;
  [key: string]: any; // Permite campos adicionais
};

export type ContentType = "articles" | "author" | "category" | "user";

export type StrapiArticle = Article;

/**
 * Busca artigos do Strapi usando a estrutura padrão
 * @param contentType - Nome do Content Type (ex: 'articles', 'posts')
 * @param options - Opções de busca
 */
export async function fetchStrapiContent(
  contentType: ContentType,
  options: {
    populate?: string | string[];
    sort?: string | string[];
    pagination?: {
      page?: number;
      pageSize?: number;
      limit?: number;
      start?: number;
    };
    filters?: Record<string, any>;
  } = {}
): Promise<StrapiResponse<StrapiArticle>> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = new URL(`${strapiUrl}/api/${contentType}`);

  // Populate
  if (options.populate) {
    if (Array.isArray(options.populate)) {
      options.populate.forEach((field) => {
        url.searchParams.append("populate", field);
      });
    } else {
      url.searchParams.append("populate", options.populate);
    }
  }
  // else {
  //   // Populate padrão: todos os campos
  //   url.searchParams.append("populate", "*");
  // }

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

  // Filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      url.searchParams.append(`filters[${key}]`, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 }, // Revalida a cada 1min
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${contentType}: ${response.statusText}`);
  }

  const data: StrapiResponse<StrapiArticle> = await response.json();
  return data;
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
