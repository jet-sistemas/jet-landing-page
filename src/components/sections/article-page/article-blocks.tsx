"use client";

import {
  ArticleBlock,
  MediaBlock,
  QuoteBlock,
  RichTextBlock,
  SliderBlock,
} from "@/types/entities";

import { BlockMedia } from "./block-media";
import { BlockQuote } from "./block-quote";
import { BlockRichText } from "./block-rich-text";
import { BlockSlider } from "./block-slider";

type ArticleBlocksProps = {
  blocks: ArticleBlock[];
};

function isMediaBlock(block: ArticleBlock): block is MediaBlock {
  return block.__component === "shared.media";
}

function isQuoteBlock(block: ArticleBlock): block is QuoteBlock {
  return block.__component === "shared.quote";
}

function isRichTextBlock(block: ArticleBlock): block is RichTextBlock {
  return block.__component === "shared.rich-text";
}

function isSliderBlock(block: ArticleBlock): block is SliderBlock {
  return block.__component === "shared.slider";
}

function renderBlock(block: ArticleBlock) {
  if (isMediaBlock(block)) {
    return (
      <BlockMedia key={block.__component + "-" + block.id} block={block} />
    );
  }

  if (isQuoteBlock(block)) {
    return (
      <BlockQuote key={block.__component + "-" + block.id} block={block} />
    );
  }

  if (isRichTextBlock(block)) {
    return (
      <BlockRichText key={block.__component + "-" + block.id} block={block} />
    );
  }

  if (isSliderBlock(block)) {
    return (
      <BlockSlider key={block.__component + "-" + block.id} block={block} />
    );
  }

  // Unknown block type - render nothing
  console.warn("Unknown block type:", (block as ArticleBlock).__component);
  return null;
}

export function ArticleBlocks({ blocks }: ArticleBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div id="article-content">
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
}
