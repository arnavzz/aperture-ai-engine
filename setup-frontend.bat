@echo off
echo 🚀 Setting up Aperture AI Frontend...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Navigate to frontend directory
cd frontend

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    echo VITE_API_BASE_URL=http://localhost:8000 > .env
    echo ✅ .env file created
)

echo.
echo 🎉 Frontend setup complete!
echo.
echo To start the development server:
echo   cd frontend
echo   npm run dev
echo.
echo The application will be available at: http://localhost:3000
echo.
echo To build for production:
echo   npm run build
echo.
echo To run with Docker:
echo   docker-compose up frontend
echo.
pause 