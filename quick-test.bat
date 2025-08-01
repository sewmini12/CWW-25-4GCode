@echo off
echo =============================================
echo    Quick Test - SkinCare AI
echo =============================================
echo.

echo 1. Testing Python...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python not found
    pause
    exit /b 1
)

echo.
echo 2. Testing dependencies...
cd /d "%~dp0ai-service"
python -c "import flask; print('✓ Flask available')"
python -c "from flask_cors import CORS; print('✓ Flask-CORS available')"
python -c "from PIL import Image; print('✓ Pillow available')"

echo.
echo 3. Opening test page...
start "" "%~dp0simple-test.html"

echo.
echo 4. Starting AI service...
echo This window will start the AI service.
echo Open another terminal to start the web server if needed.
echo.
python app.py
