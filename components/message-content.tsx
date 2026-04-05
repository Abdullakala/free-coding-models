"use client";

import { memo } from "react";

interface MessageContentProps {
  content: string;
}

export const MessageContent = memo(function MessageContent({
  content,
}: MessageContentProps) {
  // Parse markdown-like content
  const parts = content.split(/(```[\s\S]*?```|\*\*.*?\*\*|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, i) => {
        // Code blocks
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3).replace(/^[a-z]*\n/, "");
          return (
            <pre
              key={i}
              className="my-2.5 overflow-x-auto rounded-lg border border-border/50 bg-card/50 p-4"
            >
              <code className="font-mono text-[12.5px] leading-relaxed text-foreground/90">
                {code}
              </code>
            </pre>
          );
        }
        // Bold text
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Inline code
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
});
