@echo off
npx concurrently "cd ai-service && python app.py" "cd backend && npm run dev" "cd frontend && npm start" --names "AI,Backend,Frontend" --prefix-colors "yellow,green,blue"
