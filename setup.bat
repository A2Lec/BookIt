@echo off
REM Script to setup BookIt locally (without Docker)

echo.
echo 🚀 Setting up BookIt...
echo.

REM Backend setup
echo 📦 Setting up Backend...
cd backend
call npm install
if not exist .env copy .env.example .env 2>nul
echo ✓ Backend dependencies installed
echo.

REM Frontend setup
echo 📦 Setting up Frontend...
cd ..\frontend
call npm install
echo ✓ Frontend dependencies installed
echo.

echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Start PostgreSQL ^(required for backend^)
echo 2. Run 'npm run dev' in the backend directory
echo 3. Run 'npm run dev' in the frontend directory
echo.
echo Or use Docker: docker compose up --build
echo.
pause
