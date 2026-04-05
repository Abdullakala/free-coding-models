"use client";

import { useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import * as Icons from "lucide-react";
import { MODELS, PROVIDERS, TIERS, type Model, type TierKey } from "@/lib/models";
import { AGENTS, type Agent } from "@/lib/agents";
import { TierBadge } from "./tier-badge";

type TabKey = "models" | "agents" | "providers";

interface SelectorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  selectedModel: Model;
  onModelSelect: (model: Model) => void;
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
}

export function SelectorPanel({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  selectedModel,
  onModelSelect,
  selectedAgent,
  onAgentSelect,
}: SelectorPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<TierKey | "all">("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  const filteredModels = useMemo(() => {
    let result = [...MODELS];
    if (tierFilter !== "all") {
      result = result.filter((m) => m.tier === tierFilter);
    }
    if (providerFilter !== "all") {
      result = result.filter((m) => m.provider === providerFilter);
    }
    if (searchQuery) {
      result = result.filter((m) =>
        m.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result.sort((a, b) => b.score - a.score);
  }, [tierFilter, providerFilter, searchQuery]);

  if (!isOpen) return null;

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "models", label: "Models", count: MODELS.length },
    { key: "agents", label: "Agents", count: AGENTS.length },
    { key: "providers", label: "Providers", count: Object.keys(PROVIDERS).length },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[70vh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-2xl border border-border bg-card animate-slide-up"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <div className="flex gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                    activeTab === tab.key
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Models Tab */}
        {activeTab === "models" && (
          <>
            <div className="flex shrink-0 flex-wrap gap-1.5 px-5 py-3">
              <div className="flex min-w-40 flex-1 items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent py-2 text-xs text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as TierKey | "all")}
                className="cursor-pointer rounded-lg border border-border bg-secondary/50 px-2.5 py-2 text-[11px] text-muted-foreground outline-none"
              >
                <option value="all">All tiers</option>
                {Object.entries(TIERS).map(([key, info]) => (
                  <option key={key} value={key}>
                    {key} — {info.label}
                  </option>
                ))}
              </select>
              <select
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="cursor-pointer rounded-lg border border-border bg-secondary/50 px-2.5 py-2 text-[11px] text-muted-foreground outline-none"
              >
                <option value="all">All providers</option>
                {Object.entries(PROVIDERS).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.name} ({info.models})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-4">
              {filteredModels.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No models match filters
                </div>
              ) : (
                filteredModels.map((model, i) => {
                  const provider = PROVIDERS[model.provider];
                  const isActive = selectedModel.id === model.id;
                  const isGroq = model.provider === "groq";

                  return (
                    <button
                      key={model.id}
                      onClick={() => {
                        onModelSelect(model);
                        onClose();
                      }}
                      disabled={!isGroq}
                      className={`mb-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-primary/10"
                          : isGroq
                            ? "hover:bg-secondary/50"
                            : "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <span
                        className={`w-5 text-center font-mono text-[10px] font-bold ${
                          i < 3
                            ? ["text-yellow-400", "text-zinc-400", "text-orange-400"][i]
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {i < 3 ? ["1", "2", "3"][i] : i + 1}
                      </span>
                      <TierBadge tier={model.tier} />
                      <span
                        className="w-11 text-right font-mono text-xs font-bold"
                        style={{ color: TIERS[model.tier].color }}
                      >
                        {model.score}%
                      </span>
                      <span
                        className={`flex-1 truncate text-[13px] ${
                          isActive ? "font-semibold text-primary" : "font-medium text-foreground/90"
                        }`}
                      >
                        {model.label}
                        {isGroq && (
                          <span className="ml-1.5 rounded bg-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                            LIVE
                          </span>
                        )}
                      </span>
                      <span className="flex shrink-0 items-center gap-1">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: provider?.color || "#636366" }}
                        />
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {provider?.name}
                        </span>
                      </span>
                      <span className="w-9 text-right font-mono text-[10px] text-muted-foreground/50">
                        {model.context}
                      </span>
                      {isActive && <span className="text-sm text-primary">✓</span>}
                    </button>
                  );
                })
              )}
            </div>

            <div className="shrink-0 border-t border-border px-5 py-2 text-center font-mono text-[10px] text-muted-foreground/50">
              {filteredModels.length} models · sorted by SWE-bench · Groq models are live
            </div>
          </>
        )}

        {/* Agents Tab */}
        {activeTab === "agents" && (
          <div className="grid flex-1 grid-cols-2 gap-2 overflow-y-auto p-3">
            {AGENTS.map((agent) => {
              const isActive = selectedAgent?.id === agent.id;
              const IconComponent = Icons[agent.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

              return (
                <button
                  key={agent.id}
                  onClick={() => {
                    onAgentSelect(isActive ? null : agent);
                    if (!isActive) onClose();
                  }}
                  className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-primary/25 bg-primary/5"
                      : "border-border bg-secondary/30 hover:border-border/80 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {IconComponent && (
                      <IconComponent
                        className={`h-6 w-6 ${isActive ? "text-primary" : "text-foreground/70"}`}
                      />
                    )}
                    {isActive && (
                      <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        Active
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[13px] font-semibold ${
                      isActive ? "text-primary" : "text-foreground/90"
                    }`}
                  >
                    {agent.name}
                  </span>
                  <span className="text-[11px] leading-relaxed text-muted-foreground">
                    {agent.description}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Providers Tab */}
        {activeTab === "providers" && (
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-3 gap-1.5">
              {Object.entries(PROVIDERS).map(([key, provider]) => {
                const count = MODELS.filter((m) => m.provider === key).length;
                const isFiltered = providerFilter === key;
                const isGroq = key === "groq";

                return (
                  <button
                    key={key}
                    onClick={() => {
                      setProviderFilter(isFiltered ? "all" : key);
                      onTabChange("models");
                    }}
                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-left transition-all ${
                      isFiltered
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }`}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: provider.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-xs font-semibold ${
                          isFiltered ? "text-primary" : "text-foreground/90"
                        }`}
                      >
                        {provider.name}
                        {isGroq && (
                          <span className="ml-1 text-[9px] text-primary">(LIVE)</span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {count} models
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
