@echo off
echo =============================================
echo    Starting SkinCare AI Service
echo =============================================
echo.

cd /d "%~dp0ai-service"

echo Installing/updating dependencies...
python -m pip install -r requirements.txt

echo.
echo Starting AI service on port 5001...
echo Press Ctrl+C to stop the service
echo.

python app.py

pause
