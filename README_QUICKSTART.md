# 🤖 AI Agents Chat System

Advanced chat interface with specialized AI agents powered by free coding models.

## ⚡ Quick Start

### Prerequisites
- **Node.js 18+**
- **npm/pnpm/yarn**

### Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Add your Groq API key (optional for live models)
# Copy .env.example to .env.local and add your GROQ_API_KEY

# 3. Start development server
npm run dev
```

**Open browser:** [http://localhost:3000](http://localhost:3000)

## 🎯 Features

### 🤖 8 Specialized Agents
- **Code Generator** - Create production-ready code
- **Debugger** - Find and fix bugs
- **Code Reviewer** - Review code quality & security
- **Architect** - Design system architecture  
- **Test Writer** - Generate comprehensive tests
- **Documentation** - Write technical docs
- **Security Audit** - Identify vulnerabilities
- **Refactorer** - Optimize & improve code

### 📊 40+ AI Models
- Filter by tier (S+, S, A+, A, A-, B+, B, C)
- Search by provider (Groq, NVIDIA, Together, etc.)
- Live performance metrics & SWE-bench scores
- Groq models available with streaming

### 🎨 Beautiful UI
- Dark/Light mode support
- Responsive design
- Smooth animations
- Real-time streaming responses
- Message history with syntax highlighting

## 📝 Project Structure

```
app/
├── page.tsx              # Main chat interface
├── layout.tsx            # Root layout
├── globals.css           # Global styles
└── api/chat/route.ts     # Chat API endpoint

components/
├── chat-input.tsx        # Message input with controls
├── chat-messages.tsx     # Message display
├── selector-panel.tsx    # Model & Agent selector
├── tier-badge.tsx        # Model tier indicator
└── message-content.tsx   # Markdown parser

lib/
├── models.ts             # 40+ AI models catalog
├── agents.ts             # 8 agent definitions
└── utils.ts              # Utility functions
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
# Required for streaming responses with live models
GROQ_API_KEY=your_api_key_here
```

Get your Groq API key from: https://console.groq.com/keys

## 🚀 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## 📚 Built With

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **AI SDK 6** - LLM integration (Groq)
- **Lucide React** - Icons
- **Vercel Sandbox** - Development environment

## 📄 License

MIT - Open source

---

**Need help?** Check the console logs for debugging or contact support.
