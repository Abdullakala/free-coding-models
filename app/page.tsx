"use client";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Plus, MoreHorizontal } from "lucide-react";
import { Logo } from "@/components/icons";
import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";
import { SelectorPanel } from "@/components/selector-panel";
import { TierBadge } from "@/components/tier-badge";
import { DEFAULT_MODEL, PROVIDERS, type Model } from "@/lib/models";
import { type Agent } from "@/lib/agents";
import * as Icons from "lucide-react";

const RECENT_PROJECTS = [
  { name: "AI Code Agent Studio", time: "7h ago", id: "1" },
  { name: "E-commerce Dashboard", time: "2d ago", id: "2" },
  { name: "Portfolio Landing Page", time: "5d ago", id: "3" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(DEFAULT_MODEL);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorTab, setSelectorTab] = useState<"models" | "agents" | "providers">("models");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const { messages, input, setInput, handleSubmit, isLoading, setMessages } = useChat({
    body: {
      model: selectedModel,
      agent: selectedAgent,
    },
  });

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const inChat = messages.length > 0;

  const openModelSelector = () => {
    setSelectorTab("models");
    setSelectorOpen(true);
  };

  const openAgentSelector = () => {
    setSelectorTab("agents");
    setSelectorOpen(true);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  const onSend = () => {
    if (input.trim() && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-x-hidden overflow-y-auto">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className={`absolute -left-[10%] -top-[15%] h-[600px] w-[600px] transition-opacity duration-[1.5s] ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(99,246,86,0.06) 0%, transparent 65%)",
            filter: "blur(80px)",
            transitionDelay: "0.3s",
          }}
        />
        <div
          className={`absolute -bottom-[15%] -right-[10%] h-[600px] w-[600px] transition-opacity duration-[1.5s] ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(12,226,209,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
            transitionDelay: "0.5s",
          }}
        />
        <div
          className="absolute left-1/2 top-[45%] h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.012) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Top Bar */}
      <div
        className={`fixed right-4 top-4 z-50 flex items-center gap-2.5 transition-all duration-500 ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: "0.8s" }}
      >
        {inChat && (
          <button
            onClick={handleNewChat}
            className="flex h-[38px] items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3.5 text-[13px] font-medium text-muted-foreground backdrop-blur-xl transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            New chat
          </button>
        )}
        <button className="h-[38px] rounded-xl border border-border bg-secondary/50 px-3.5 text-[13px] font-semibold text-foreground backdrop-blur-xl transition-colors hover:bg-secondary">
          Sign in
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 flex w-full max-w-[720px] flex-col items-center px-5 ${
          inChat
            ? "flex-1 justify-end overflow-hidden pb-0"
            : "justify-center gap-10 pb-[60px] pt-5"
        }`}
      >
        {/* Logo (landing only) */}
        {!inChat && (
          <div
            className={`transition-all duration-600 ${
              mounted ? "scale-100 opacity-100" : "scale-[0.93] opacity-0"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <Logo className="h-11 w-11 text-primary" />
          </div>
        )}

        {/* Chat Messages */}
        {inChat && (
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            selectedModel={selectedModel}
            selectedAgent={selectedAgent}
          />
        )}

        {/* Active Model/Agent Indicator */}
        {(selectedAgent || selectedModel) && (
          <div
            className={`flex w-full shrink-0 flex-wrap items-center gap-1.5 transition-opacity duration-400 ${
              inChat ? "py-1" : "pb-1.5"
            } ${mounted ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "0.5s" }}
          >
            {selectedAgent && (
              <button
                onClick={() => setSelectedAgent(null)}
                className="flex items-center gap-1 rounded-lg border border-primary/15 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {(() => {
                  const IconComponent = Icons[selectedAgent.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                  return IconComponent ? <IconComponent className="h-3 w-3" /> : null;
                })()}
                {selectedAgent.name}
                <span className="ml-0.5 text-primary/40">×</span>
              </button>
            )}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/30 px-2 py-0.5">
              <TierBadge tier={selectedModel.tier} small />
              <span className="font-mono text-[11px] text-muted-foreground">
                {selectedModel.label}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: PROVIDERS[selectedModel.provider]?.color || "#636366" }}
              />
              <span className="text-[10px] text-muted-foreground/70">
                {PROVIDERS[selectedModel.provider]?.name}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground/50">
                · {selectedModel.context} · SWE {selectedModel.score}%
              </span>
            </div>
          </div>
        )}

        {/* Input */}
        <div
          className={`w-full shrink-0 transition-all duration-600 ${
            inChat ? "pb-3 pt-1" : ""
          } ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={onSend}
            isLoading={isLoading}
            selectedModel={selectedModel}
            selectedAgent={selectedAgent}
            onOpenModelSelector={openModelSelector}
            onOpenAgentSelector={openAgentSelector}
          />
          {!inChat && (
            <p
              className={`mt-3 text-center text-[11px] tracking-wide text-muted-foreground/35 transition-opacity duration-600 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "0.9s" }}
            >
              174+ free coding models · 23 providers · 8 agents · powered by free-coding-models
            </p>
          )}
        </div>

        {/* Recent Projects (landing only) */}
        {!inChat && (
          <div
            className={`flex w-full flex-col gap-3.5 transition-all duration-600 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <p className="px-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
              Recent projects
            </p>
            <div className="flex flex-col gap-0.5">
              {RECENT_PROJECTS.map((project, i) => (
                <div
                  key={project.id}
                  className={`transition-all ${mounted ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                  style={{ transitionDelay: `${0.7 + i * 0.08}s` }}
                >
                  <div
                    className="group relative flex items-center"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={`flex flex-1 items-center gap-3 rounded-lg px-3.5 py-2.5 pr-9 transition-colors ${
                        hoveredProject === project.id ? "bg-secondary/30" : ""
                      }`}
                    >
                      <span
                        className={`flex-1 truncate text-[13px] font-medium transition-colors ${
                          hoveredProject === project.id
                            ? "text-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {project.name}
                      </span>
                      <span
                        className={`shrink-0 text-[11px] transition-colors ${
                          hoveredProject === project.id
                            ? "text-muted-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {project.time}
                      </span>
                    </a>
                    <button
                      className={`absolute right-2 top-1/2 flex h-[26px] w-[26px] -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-secondary hover:text-foreground ${
                        hoveredProject === project.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className={`z-10 flex shrink-0 items-center justify-center gap-4 px-6 py-3.5 text-xs text-muted-foreground/60 ${
          inChat ? "" : "fixed bottom-0 left-0 right-0"
        }`}
      >
        <span>© 2026 AI Agents Chat</span>
        <span className="text-border">|</span>
        <a href="#" className="transition-colors hover:text-muted-foreground">
          Privacy
        </a>
        <span className="text-border">|</span>
        <a href="#" className="transition-colors hover:text-muted-foreground">
          Terms
        </a>
      </div>

      {/* Selector Panel */}
      <SelectorPanel
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        activeTab={selectorTab}
        onTabChange={setSelectorTab}
        selectedModel={selectedModel}
        onModelSelect={setSelectedModel}
        selectedAgent={selectedAgent}
        onAgentSelect={setSelectedAgent}
      />
    </div>
  );
}
