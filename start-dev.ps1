# PowerShell script to start SkinCare AI services
Write-Host "🚀 Starting SkinCare AI Development Environment..." -ForegroundColor Green
Write-Host ""

# Start AI Service
Write-Host "📡 Starting AI Service..." -ForegroundColor Yellow
Start-Process -FilePath "python" -ArgumentList "app.py" -WorkingDirectory "ai-service"

# Wait a moment
Start-Sleep -Seconds 2

# Start Backend
Write-Host "🔧 Starting Backend API..." -ForegroundColor Yellow  
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "backend"

# Wait a moment
Start-Sleep -Seconds 2

# Start Frontend
Write-Host "🎨 Starting Frontend..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory "frontend"

Write-Host ""
Write-Host "✅ All services are starting!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Cyan  
Write-Host "📡 AI Service: http://localhost:5001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
