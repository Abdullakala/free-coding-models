"use client";

import { useRef, useEffect } from "react";
import type { Message } from "ai";
import { LogoMessage } from "./icons";
import { TierBadge } from "./tier-badge";
import { MessageContent } from "./message-content";
import { PROVIDERS, type Model } from "@/lib/models";
import type { Agent } from "@/lib/agents";
import * as Icons from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  selectedModel: Model;
  selectedAgent: Agent | null;
}

export function ChatMessages({
  messages,
  isLoading,
  selectedModel,
  selectedAgent,
}: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const provider = PROVIDERS[selectedModel.provider];

  return (
    <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-5 pb-4 pt-20">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 animate-fade-in ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <LogoMessage className="text-primary" />
            </div>
          )}
          <div
            className={`max-w-[85%] whitespace-pre-wrap break-words text-sm leading-relaxed ${
              message.role === "user"
                ? "max-w-[75%] rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-foreground/90"
                : "text-foreground/80"
            }`}
          >
            {message.role === "assistant" && (
              <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                <TierBadge tier={selectedModel.tier} small />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {selectedModel.label}
                </span>
                <span className="text-[9px] text-border">·</span>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: provider?.color || "#636366" }}
                >
                  {provider?.name}
                </span>
                {selectedAgent && (
                  <>
                    <span className="text-[9px] text-border">·</span>
                    <span className="flex items-center gap-1 text-[10px] text-primary">
                      {(() => {
                        const IconComponent = Icons[selectedAgent.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                        return IconComponent ? (
                          <IconComponent className="h-3 w-3" />
                        ) : null;
                      })()}
                      {selectedAgent.name}
                    </span>
                  </>
                )}
              </div>
            )}
            <MessageContent content={message.content} />
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      {isLoading && messages[messages.length - 1]?.role === "user" && (
        <div className="flex gap-3 animate-fade-in">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <LogoMessage className="text-primary" />
          </div>
          <div className="flex items-center gap-1.5 py-3.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[7px] w-[7px] rounded-full bg-primary animate-dot-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Streaming cursor */}
      {isLoading && messages[messages.length - 1]?.role === "assistant" && (
        <span className="ml-0.5 inline-block h-4 w-[5px] rounded-sm bg-primary align-text-bottom animate-blink" />
      )}

      <div ref={endRef} />
    </div>
  );
}
