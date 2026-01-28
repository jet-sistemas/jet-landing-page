import { StrapiResponse } from "@/lib/strapi";
import {
  Article,
  ArticleBlock,
  Author,
  Category,
  MediaBlock,
  QuoteBlock,
  RichTextBlock,
  SliderBlock,
} from "@/types/entities";

export enum ContentTypeEnum {
  ARTICLES = "artigos",
  AUTHORS = "autores",
  CATEGORIES = "categorias",
  USERS = "usuarios",
}

export enum ArticleEntityEnum {
  COVER = "cover",
  CATEGORY = "categoria",
  AUTHOR = "autor",
  BLOCKS = "blocos",
}

export enum ArticleBlockTypeEnum {
  MEDIA = "compartilhado.midia",
  QUOTE = "compartilhado.citacao",
  RICH_TEXT = "compartilhado.texto-rico",
  SLIDER = "compartilhado.carrossel",
}

type Categoria = {
  createdAt: string;
  descricao: string | null;
  documentId: string;
  id: number;
  nome: string;
  publishedAt?: string;
  slug: string;
  updatedAt: string;
};

export type Format = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

export type Formats = {
  thumbnail: Format;
  large: Format;
  medium: Format;
  small: Format;
};

type Image = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Autor = {
  id: number;
  documentId: string;
  nome: string;
  email: string;
  avatar?: Image;
  createdAt: string;
  updatedAt: string;
};

type BlocoMidia = {
  __component: ArticleBlockTypeEnum.MEDIA;
  id: number;
  arquivo: Image;
};

type BlocoCitacao = {
  __component: ArticleBlockTypeEnum.QUOTE;
  id: number;
  titulo: string;
  corpo: string;
};

type BlocoTextoRico = {
  __component: ArticleBlockTypeEnum.RICH_TEXT;
  id: number;
  corpo: string;
};

type BlocoCarrossel = {
  __component: ArticleBlockTypeEnum.SLIDER;
  id: number;
  arquivos: Image[];
};

type BlocoArtigo = BlocoMidia | BlocoCitacao | BlocoTextoRico | BlocoCarrossel;

type Artigo = {
  id: number;
  documentId: string;
  titulo: string;
  descricao?: string;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  categoria?: Categoria;
  cover?: Image;
  autor?: Autor;
  blocos?: BlocoArtigo[];
};

export class StrapiMapper {
  private static mapCategory(category: Categoria): Category {
    return {
      ...category,
      name: category.nome,
      slug: category.slug,
      description: category.descricao,
    };
  }

  private static mapAuthor(author: Autor): Author {
    return {
      ...author,
      name: author.nome,
      email: author.email,
    };
  }

  private static mapBlocks(blocks: BlocoArtigo[]): ArticleBlock[] {
    return blocks.map((block) => {
      switch (block.__component) {
        case ArticleBlockTypeEnum.MEDIA:
          return {
            __component: "shared.media",
            id: block.id,
            file: block.arquivo,
          } as MediaBlock;

        case ArticleBlockTypeEnum.QUOTE:
          return {
            __component: "shared.quote",
            id: block.id,
            title: block.titulo,
            body: block.corpo,
          } as QuoteBlock;

        case ArticleBlockTypeEnum.RICH_TEXT:
          return {
            __component: "shared.rich-text",
            id: block.id,
            body: block.corpo,
          } as RichTextBlock;

        case ArticleBlockTypeEnum.SLIDER:
          return {
            __component: "shared.slider",
            id: block.id,
            files: block.arquivos,
          } as SliderBlock;
      }
    });
  }

  static toArticleDomain(data: Artigo[]): Article[] {
    return data.map((item) => {
      return {
        id: item.id,
        documentId: item.documentId,
        title: item.titulo,
        description: item.descricao,
        slug: item.slug,
        publishedAt: item.publishedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        category: item.categoria ? this.mapCategory(item.categoria) : undefined,
        cover: item?.cover,
        author: item.autor ? this.mapAuthor(item.autor) : undefined,
        blocks: item?.blocos ? this.mapBlocks(item.blocos) : undefined,
      };
    });
  }

  static toAuthorDomain(data: Autor[]): Author[] {
    return data.map((item) => this.mapAuthor(item));
  }

  static toCategoryDomain(data: Categoria[]): Category[] {
    return data.map((item) => this.mapCategory(item));
  }

  static toAnyDomain<T>(
    contentType: ContentTypeEnum,
    strapiResponse: StrapiResponse<unknown>,
  ): StrapiResponse<T> {
    switch (contentType) {
      case ContentTypeEnum.ARTICLES:
        return {
          ...strapiResponse,
          data: this.toArticleDomain(strapiResponse.data as Artigo[]) as T[],
        } satisfies StrapiResponse<T>;

      case ContentTypeEnum.AUTHORS:
        return {
          ...strapiResponse,
          data: this.toAuthorDomain(strapiResponse.data as Autor[]) as T[],
        } satisfies StrapiResponse<T>;

      case ContentTypeEnum.CATEGORIES:
        return {
          ...strapiResponse,
          data: this.toCategoryDomain(
            strapiResponse.data as Categoria[],
          ) as T[],
        } satisfies StrapiResponse<T>;

      default:
        throw new Error(`Content type ${contentType} not supported`);
    }
  }
}
