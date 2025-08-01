@echo off
echo.
echo =============================================
echo    SkinCare AI - Simple Web Application
echo =============================================
echo.

echo Starting AI Service...
cd /d "%~dp0ai-service"
start "AI Service" cmd /k "python app.py"

echo.
echo Waiting for AI service to start...
timeout /t 3 /nobreak >nul

echo.
echo Opening Web Application...
cd /d "%~dp0web"

echo.
echo Starting simple HTTP server...
start "Web Server" cmd /k "python -m http.server 8000"

echo.
echo Waiting for web server to start...
timeout /t 2 /nobreak >nul

echo.
echo Opening browser...
start http://localhost:8000

echo.
echo =============================================
echo Services started:
echo - AI Service: http://localhost:5001
echo - Web App: http://localhost:8000
echo =============================================
echo.
echo Press any key to exit...
pause >nul
