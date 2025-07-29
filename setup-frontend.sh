#!/bin/bash

# Aperture AI Frontend Setup Script

echo "🚀 Setting up Aperture AI Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
VITE_API_BASE_URL=http://localhost:8000
EOF
    echo "✅ .env file created"
fi

# Check if backend is running
echo "🔍 Checking backend availability..."
if curl -s http://localhost:8000/api > /dev/null 2>&1; then
    echo "✅ Backend is running"
else
    echo "⚠️  Backend is not running. Please start the backend first."
    echo "   You can start it with: docker-compose up backend"
fi

echo ""
echo "🎉 Frontend setup complete!"
echo ""
echo "To start the development server:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "The application will be available at: http://localhost:3000"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "To run with Docker:"
echo "  docker-compose up frontend" 