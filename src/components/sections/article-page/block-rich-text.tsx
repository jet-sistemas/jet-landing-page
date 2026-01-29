"use client";

import ReactMarkdown from "react-markdown";

import { RichTextBlock } from "@/types/entities";
import { cn } from "@/lib/utils";

type BlockRichTextProps = {
  block: RichTextBlock;
};

export function BlockRichText({ block }: BlockRichTextProps) {
  if (!block.body) {
    return null;
  }

  return (
    <div className="my-8">
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-10 mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-8 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-serif text-lg sm:text-xl font-semibold text-foreground mt-4 mb-2">
              {children}
            </h4>
          ),

          // Paragraph
          p: ({ children }) => (
            <p className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-6">
              {children}
            </p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-foreground/90">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base sm:text-lg leading-relaxed">{children}</li>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 underline underline-offset-4 transition-colors"
            >
              {children}
            </a>
          ),

          // Strong & Emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/90">{children}</em>
          ),

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent/50 bg-accent/5 pl-6 py-4 my-6 italic text-foreground/80">
              {children}
            </blockquote>
          ),

          // Code
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-accent">
                  {children}
                </code>
              );
            }
            return (
              <code
                className={cn(
                  "block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto",
                  className
                )}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-muted rounded-lg overflow-x-auto my-6">
              {children}
            </pre>
          ),

          // Horizontal rule
          hr: () => <hr className="my-10 border-border/50" />,

          // Images (within markdown)
          img: ({ src, alt }) => (
            <span className="block my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || "Imagem"}
                className="rounded-lg max-w-full h-auto mx-auto"
              />
            </span>
          ),
        }}
      >
        {block.body}
      </ReactMarkdown>
    </div>
  );
}
