#!/bin/bash

# AI Agents Chat System - Development Server Setup
# This script checks and starts the development server

echo "🚀 AI Agents Chat System - Development Server Setup"
echo "=================================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local from template..."
    cp .env.example .env.local 2>/dev/null || echo "# Add GROQ_API_KEY here" > .env.local
    echo "📝 .env.local created. Add your GROQ_API_KEY to enable live models."
    echo ""
fi

# Start dev server
echo "✨ Starting development server..."
echo "🌐 Open http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
