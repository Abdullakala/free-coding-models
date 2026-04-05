"use client";

import { useRef, useEffect } from "react";
import { Paperclip, Mic, ChevronDown, ArrowUp, Bot } from "lucide-react";
import { LogoSmall } from "./icons";
import { TierBadge } from "./tier-badge";
import type { Model } from "@/lib/models";
import type { Agent } from "@/lib/agents";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  selectedModel: Model;
  selectedAgent: Agent | null;
  onOpenModelSelector: () => void;
  onOpenAgentSelector: () => void;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
  selectedModel,
  selectedAgent,
  onOpenModelSelector,
  onOpenAgentSelector,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const canSend = value.trim() && !isLoading;

  return (
    <div className="relative">
      {/* Gradient border */}
      <div
        className="rounded-[20px] p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,246,86,0.25), rgba(12,226,209,0.25), rgba(99,246,86,0.12))",
          boxShadow:
            "0 0 40px rgba(99,246,86,0.06), 0 0 80px rgba(12,226,209,0.04), 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="rounded-[19px] bg-card/95 backdrop-blur-xl">
          <textarea
            ref={textareaRef}
            placeholder="Ask anything..."
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="block w-full resize-none bg-transparent px-[18px] pb-2.5 pt-[18px] text-[15px] leading-relaxed text-foreground outline-none"
            style={{ minHeight: 56, maxHeight: 200 }}
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-2">
            <div className="flex items-center gap-0.5">
              {/* Attach button */}
              <button
                aria-label="Attach file"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Paperclip className="h-[17px] w-[17px]" />
              </button>

              {/* Mic button */}
              <button
                aria-label="Voice input"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Mic className="h-[17px] w-[17px]" />
              </button>

              <div className="mx-1.5 h-4 w-px shrink-0 bg-border" />

              {/* Agent selector */}
              <button
                onClick={onOpenAgentSelector}
                className={`flex h-[34px] items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors ${
                  selectedAgent
                    ? "bg-primary/5 text-primary hover:bg-primary/10"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Bot className="h-[15px] w-[15px]" />
                {selectedAgent ? selectedAgent.name : "Agent"}
              </button>

              <div className="mx-1 h-4 w-px shrink-0 bg-border" />

              {/* Model selector */}
              <button
                onClick={onOpenModelSelector}
                className="flex h-[34px] items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogoSmall className="text-primary" />
                <span className="max-w-[130px] truncate">{selectedModel.label}</span>
                <TierBadge tier={selectedModel.tier} small />
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            {/* Send button */}
            <button
              aria-label="Send message"
              disabled={!canSend}
              onClick={onSend}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${
                canSend
                  ? "bg-foreground text-background shadow-[0_0_20px_rgba(99,246,86,0.15)] hover:scale-105 active:scale-95"
                  : "bg-foreground/15 text-foreground/30"
              }`}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
