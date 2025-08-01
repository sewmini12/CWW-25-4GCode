@echo off
echo =============================================
echo    SkinCare AI - Troubleshooting Guide
echo =============================================
echo.

echo Step 1: Checking Python installation...
echo.

:: Try different Python commands
python --version 2>nul
if %errorlevel% equ 0 (
    echo ✓ Python found using 'python' command
    set PYTHON_CMD=python
    goto :found_python
)

py --version 2>nul
if %errorlevel% equ 0 (
    echo ✓ Python found using 'py' command
    set PYTHON_CMD=py
    goto :found_python
)

python3 --version 2>nul
if %errorlevel% equ 0 (
    echo ✓ Python found using 'python3' command
    set PYTHON_CMD=python3
    goto :found_python
)

echo ❌ Python not found!
echo.
echo SOLUTION: Please install Python 3.7+ from https://python.org
echo Make sure to check "Add Python to PATH" during installation
echo.
pause
exit /b 1

:found_python
echo.
echo Step 2: Installing dependencies...
cd /d "%~dp0ai-service"
%PYTHON_CMD% -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo.
    echo ❌ Failed to install dependencies
    echo SOLUTION: Try running as administrator
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully!
echo.

echo Step 3: Testing AI service...
start "AI Service Test" cmd /k "%PYTHON_CMD% app.py"

echo.
echo Step 4: Testing web server...
cd /d "%~dp0web"
start "Web Server Test" cmd /k "%PYTHON_CMD% -m http.server 8000"

echo.
echo =============================================
echo If both windows opened successfully:
echo - AI Service: http://localhost:5001
echo - Web App: http://localhost:8000
echo.
echo Open http://localhost:8000 in your browser
echo =============================================
echo.
pause
