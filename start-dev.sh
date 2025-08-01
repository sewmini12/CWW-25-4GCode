#!/bin/bash

echo "🚀 Starting SkinCare AI Development Environment..."
echo ""

# Start AI Service in background
echo "📡 Starting AI Service on port 5001..."
cd ai-service
python app.py &
AI_PID=$!
cd ..

# Start Backend in background  
echo "🔧 Starting Backend API on port 5000..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Start Frontend (this will be the main process)
echo "🎨 Starting Frontend on port 3000..."
cd frontend
npm start

# When frontend stops, kill other processes
echo "Stopping all services..."
kill $AI_PID $BACKEND_PID 2>/dev/null
echo "All services stopped."
