@echo off
echo.
echo =============================================
echo    SkinCare AI - Quick Test
echo =============================================
echo.

echo Testing AI Service...
echo.

echo 1. Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.7+ from python.org
    pause
    exit /b 1
)

echo.
echo 2. Testing AI service dependencies...
cd /d "%~dp0ai-service"
python -c "import flask; print('✓ Flask installed')"
if %errorlevel% neq 0 (
    echo ERROR: Flask not installed
    echo Installing Flask...
    pip install flask flask-cors pillow
)

python -c "from flask_cors import CORS; print('✓ Flask-CORS installed')"
python -c "from PIL import Image; print('✓ Pillow installed')"

echo.
echo 3. Testing AI service startup...
start "Test AI Service" cmd /k "python app.py"

echo.
echo 4. Waiting for service to start...
timeout /t 5 /nobreak >nul

echo.
echo 5. Testing health endpoint...
curl -s http://localhost:5001/health
if %errorlevel% neq 0 (
    echo.
    echo NOTE: curl not available, trying alternative...
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5001/health' -TimeoutSec 5; Write-Host 'AI Service is responding' } catch { Write-Host 'AI Service not responding' }"
)

echo.
echo =============================================
echo Test complete! 
echo.
echo If everything looks good, run start-simple.bat
echo to launch the full application.
echo =============================================
echo.
pause
