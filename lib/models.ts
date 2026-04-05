export type TierKey = "S+" | "S" | "A+" | "A" | "A-" | "B+" | "B" | "C";

export interface TierInfo {
  color: string;
  bg: string;
  label: string;
}

export const TIERS: Record<TierKey, TierInfo> = {
  "S+": { color: "#ff2d55", bg: "rgba(255,45,85,0.08)", label: "Elite ≥70%" },
  S: { color: "#ff9500", bg: "rgba(255,149,0,0.08)", label: "Excellent 60-70%" },
  "A+": { color: "#ffcc00", bg: "rgba(255,204,0,0.08)", label: "Great 50-60%" },
  A: { color: "#34c759", bg: "rgba(52,199,89,0.08)", label: "Good 40-50%" },
  "A-": { color: "#30d158", bg: "rgba(48,209,88,0.08)", label: "Decent 35-40%" },
  "B+": { color: "#5ac8fa", bg: "rgba(90,200,250,0.08)", label: "Average 30-35%" },
  B: { color: "#8e8e93", bg: "rgba(142,142,147,0.08)", label: "Below 20-30%" },
  C: { color: "#636366", bg: "rgba(99,99,102,0.08)", label: "Light <20%" },
};

export interface Provider {
  name: string;
  color: string;
  models: number;
}

export const PROVIDERS: Record<string, Provider> = {
  groq: { name: "Groq", color: "#f55036", models: 8 },
  nvidia: { name: "NVIDIA NIM", color: "#76b900", models: 47 },
  cerebras: { name: "Cerebras", color: "#00d4aa", models: 7 },
  sambanova: { name: "SambaNova", color: "#ff6b35", models: 12 },
  openrouter: { name: "OpenRouter", color: "#6366f1", models: 15 },
  huggingface: { name: "Hugging Face", color: "#ffd21e", models: 2 },
  deepinfra: { name: "DeepInfra", color: "#0ea5e9", models: 4 },
  fireworks: { name: "Fireworks AI", color: "#ff4500", models: 4 },
  hyperbolic: { name: "Hyperbolic", color: "#ec4899", models: 11 },
  scaleway: { name: "Scaleway", color: "#4f0599", models: 8 },
  googleai: { name: "Google AI", color: "#4285f4", models: 3 },
  siliconflow: { name: "SiliconFlow", color: "#00d1b2", models: 6 },
  together: { name: "Together AI", color: "#0066ff", models: 10 },
  cloudflare: { name: "Cloudflare AI", color: "#f38020", models: 11 },
  perplexity: { name: "Perplexity", color: "#20b2aa", models: 4 },
  qwen: { name: "DashScope", color: "#ff6a00", models: 8 },
  iflow: { name: "iFlow", color: "#7c3aed", models: 11 },
  zai: { name: "Z-AI (Zhipu)", color: "#00b894", models: 7 },
};

export interface Model {
  id: string;
  label: string;
  tier: TierKey;
  score: number;
  context: string;
  provider: string;
  apiId?: string;
}

// Groq models that work with the API
export const GROQ_MODELS: Model[] = [
  { id: "gr-gpt120", label: "GPT OSS 120B", tier: "S", score: 60.0, context: "128k", provider: "groq", apiId: "openai/gpt-oss-120b" },
  { id: "gr-q332", label: "Qwen3 32B", tier: "A+", score: 50.0, context: "131k", provider: "groq", apiId: "qwen/qwen3-32b" },
  { id: "gr-l4s", label: "Llama 4 Scout", tier: "A", score: 44.0, context: "131k", provider: "groq", apiId: "meta-llama/llama-4-scout-17b-16e-preview" },
  { id: "gr-l33", label: "Llama 3.3 70B", tier: "A-", score: 39.5, context: "128k", provider: "groq", apiId: "llama-3.3-70b-versatile" },
  { id: "gr-l31", label: "Llama 3.1 8B", tier: "B", score: 28.8, context: "128k", provider: "groq", apiId: "llama-3.1-8b-instant" },
];

// All models for display
export const MODELS: Model[] = [
  // NVIDIA NIM S+ tier
  { id: "nim-m25", label: "MiniMax M2.5", tier: "S+", score: 80.2, context: "200k", provider: "nvidia" },
  { id: "nim-glm5", label: "GLM 5", tier: "S+", score: 77.8, context: "128k", provider: "nvidia" },
  { id: "nim-k25", label: "Kimi K2.5", tier: "S+", score: 76.8, context: "128k", provider: "nvidia" },
  { id: "nim-s35f", label: "Step 3.5 Flash", tier: "S+", score: 74.4, context: "256k", provider: "nvidia" },
  { id: "nim-dsv32", label: "DeepSeek V3.2", tier: "S+", score: 73.1, context: "128k", provider: "nvidia" },
  { id: "nim-dev2", label: "Devstral 2 123B", tier: "S+", score: 72.2, context: "256k", provider: "nvidia" },
  { id: "nim-q3c", label: "Qwen3 Coder 480B", tier: "S+", score: 70.6, context: "256k", provider: "nvidia" },
  { id: "nim-q3235", label: "Qwen3 235B", tier: "S+", score: 70.0, context: "128k", provider: "nvidia" },
  // Groq models
  ...GROQ_MODELS,
  // Cerebras
  { id: "cb-g47", label: "GLM 4.7", tier: "S+", score: 73.8, context: "200k", provider: "cerebras" },
  { id: "cb-q235", label: "Qwen3 235B", tier: "S+", score: 70.0, context: "128k", provider: "cerebras" },
  { id: "cb-gpt120", label: "GPT OSS 120B", tier: "S", score: 60.0, context: "128k", provider: "cerebras" },
  // SambaNova
  { id: "sn-dsv32", label: "DeepSeek V3.2", tier: "S+", score: 73.1, context: "8k", provider: "sambanova" },
  { id: "sn-m25", label: "MiniMax M2.5", tier: "S+", score: 74.0, context: "160k", provider: "sambanova" },
  { id: "sn-gpt120", label: "GPT OSS 120B", tier: "S", score: 60.0, context: "128k", provider: "sambanova" },
  // OpenRouter
  { id: "or-s35f", label: "Step 3.5 Flash", tier: "S+", score: 74.4, context: "256k", provider: "openrouter" },
  { id: "or-m25", label: "MiniMax M2.5", tier: "S+", score: 74.0, context: "197k", provider: "openrouter" },
  { id: "or-q3c", label: "Qwen3 Coder 480B", tier: "S+", score: 70.6, context: "262k", provider: "openrouter" },
  { id: "or-gpt120", label: "GPT OSS 120B", tier: "S", score: 60.0, context: "131k", provider: "openrouter" },
  // Hyperbolic
  { id: "hy-q3c", label: "Qwen3 Coder 480B", tier: "S+", score: 70.6, context: "256k", provider: "hyperbolic" },
  { id: "hy-q235", label: "Qwen3 235B", tier: "S+", score: 70.0, context: "128k", provider: "hyperbolic" },
  // Together AI
  { id: "to-m25", label: "MiniMax M2.5", tier: "S+", score: 80.2, context: "200k", provider: "together" },
  { id: "to-glm5", label: "GLM-5", tier: "S+", score: 77.8, context: "128k", provider: "together" },
  { id: "to-k25", label: "Kimi K2.5", tier: "S+", score: 76.8, context: "128k", provider: "together" },
  // SiliconFlow
  { id: "sf-dsv32", label: "DeepSeek V3.2", tier: "S+", score: 73.1, context: "128k", provider: "siliconflow" },
  { id: "sf-q3c", label: "Qwen3 Coder 480B", tier: "S+", score: 70.6, context: "256k", provider: "siliconflow" },
  // Z-AI
  { id: "za-glm5", label: "GLM-5", tier: "S+", score: 77.8, context: "128k", provider: "zai" },
  { id: "za-g45", label: "GLM-4.5", tier: "S+", score: 75.0, context: "128k", provider: "zai" },
  { id: "za-g47", label: "GLM-4.7", tier: "S+", score: 73.8, context: "200k", provider: "zai" },
  // Scaleway
  { id: "sc-dev2", label: "Devstral 2 123B", tier: "S+", score: 72.2, context: "256k", provider: "scaleway" },
  { id: "sc-q235", label: "Qwen3 235B", tier: "S+", score: 70.0, context: "128k", provider: "scaleway" },
  // Fireworks
  { id: "fw-q235", label: "Qwen3 235B", tier: "S+", score: 70.0, context: "128k", provider: "fireworks" },
  { id: "fw-dsv3", label: "DeepSeek V3", tier: "S", score: 62.0, context: "128k", provider: "fireworks" },
  // DeepInfra
  { id: "di-q235", label: "Qwen3 235B", tier: "S+", score: 70.0, context: "128k", provider: "deepinfra" },
  { id: "di-dsv3", label: "DeepSeek V3 0324", tier: "S", score: 62.0, context: "128k", provider: "deepinfra" },
  // Cloudflare
  { id: "cf-k25", label: "Kimi K2.5", tier: "S+", score: 76.8, context: "256k", provider: "cloudflare" },
  { id: "cf-gpt120", label: "GPT OSS 120B", tier: "S", score: 60.0, context: "128k", provider: "cloudflare" },
].sort((a, b) => b.score - a.score);

export const DEFAULT_MODEL = GROQ_MODELS[0];
