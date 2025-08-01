@echo off
echo Starting SkinCare AI Development Servers...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd /d d:\web\CWW-25-4GCode\backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend" cmd /k "cd /d d:\web\CWW-25-4GCode\frontend && npm start"

timeout /t 3 /nobreak > nul

echo Starting AI Service...
start "AI Service" cmd /k "cd /d d:\web\CWW-25-4GCode\ai-service && python app.py"

echo.
echo All services are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo AI Service: http://localhost:5001
echo.
pause
