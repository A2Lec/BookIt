#!/bin/bash

# Script to setup BookIt locally (without Docker)

echo "🚀 Setting up BookIt..."

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
cp .env.example .env 2>/dev/null || true
echo "✓ Backend dependencies installed"

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend
npm install
echo "✓ Frontend dependencies installed"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start PostgreSQL (required for backend)"
echo "2. Run 'npm run dev' in the backend directory"
echo "3. Run 'npm run dev' in the frontend directory"
echo ""
echo "Or use Docker: docker compose up --build"
