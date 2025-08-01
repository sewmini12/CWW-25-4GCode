@echo off
title SkinCare AI - Development Environment
color 0A
echo.
echo ===============================================
echo    SkinCare AI - Development Environment
echo ===============================================
echo.

echo [1/3] Starting AI Service (Python Flask)...
start "AI Service - Port 5001" cmd /c "cd /d %~dp0ai-service && python app.py"
timeout /t 2 > nul

echo [2/3] Starting Backend API (Node.js)...  
start "Backend API - Port 5000" cmd /c "cd /d %~dp0backend && npm run dev"
timeout /t 2 > nul

echo [3/3] Starting Frontend (React)...
start "Frontend - Port 3000" cmd /c "cd /d %~dp0frontend && npm start"

echo.
echo ===============================================
echo    All services are starting!
echo ===============================================
echo.
echo Services will be available at:
echo   Frontend:   http://localhost:3000
echo   Backend:    http://localhost:5000  
echo   AI Service: http://localhost:5001
echo.
echo Check the opened terminal windows for status.
echo Press any key to exit this launcher...
pause > nul
