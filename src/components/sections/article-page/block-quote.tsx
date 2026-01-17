"use client";

import { Quote } from "lucide-react";

import { QuoteBlock } from "@/types/entities";

type BlockQuoteProps = {
  block: QuoteBlock;
};

export function BlockQuote({ block }: BlockQuoteProps) {
  return (
    <blockquote className="my-10 relative">
      {/* Decorative quote icon */}
      <div className="absolute -top-4 -left-2 sm:-left-6">
        <Quote className="size-10 sm:size-12 text-accent/20 rotate-180" />
      </div>

      <div className="relative rounded-xl border-l-4 border-accent bg-accent/5 p-6 sm:p-8 pl-8 sm:pl-12">
        {/* Title */}
        {block.title && (
          <p className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-relaxed mb-4">
            {block.title}
          </p>
        )}

        {/* Body */}
        {block.body && (
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed italic">
            {block.body}
          </p>
        )}
      </div>

      {/* Decorative quote icon */}
      <div className="absolute -bottom-4 -right-2 sm:-right-6">
        <Quote className="size-10 sm:size-12 text-accent/20" />
      </div>
    </blockquote>
  );
}
