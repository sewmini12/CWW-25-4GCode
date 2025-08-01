# 🚨 SkinCare AI Troubleshooting Guide

## Quick Fix Options:

### **Option 1: Automated Fix (Recommended)**
```cmd
fix-and-run.bat
```
This script will automatically detect Python and start both services.

### **Option 2: Simple Test**
Double-click `simple-test.html` to open a basic version that works without a web server.

### **Option 3: Manual Steps**

## Common Issues & Solutions:

### ❌ **"Python is not recognized"**
**Problem:** Python not installed or not in PATH

**Solutions:**
1. Install Python from https://python.org (version 3.7+)
2. ✅ **IMPORTANT:** Check "Add Python to PATH" during installation
3. Restart your command prompt after installation
4. Try these commands in order:
   ```cmd
   python --version
   py --version  
   python3 --version
   ```

### ❌ **"pip is not recognized"**
**Solution:**
```cmd
python -m pip install -r requirements.txt
```

### ❌ **Dependencies installation fails**
**Solutions:**
1. Run command prompt as Administrator
2. Update pip first:
   ```cmd
   python -m pip install --upgrade pip
   ```
3. Install dependencies:
   ```cmd
   cd ai-service
   python -m pip install -r requirements.txt
   ```

### ❌ **AI Service won't start**
**Manual start:**
```cmd
cd ai-service
python app.py
```
Should show: `Running on http://127.0.0.1:5001`

### ❌ **Web server issues**
**Alternative methods:**

**Method 1: Python HTTP server**
```cmd
cd web
python -m http.server 8000
```

**Method 2: Direct file access**
Just double-click `simple-test.html` - no server needed!

### ❌ **Browser shows "Can't connect"**
**Check:**
1. AI service running on port 5001
2. Web server running on port 8000
3. Try: http://localhost:8000 or http://127.0.0.1:8000

### ❌ **CORS errors in browser**
**This means:**
- AI service is running ✅
- Web interface is working ✅  
- They just can't communicate

**Solution:** Make sure both services are running on localhost (not different IPs)

## 🎯 **Step-by-Step Manual Start:**

1. **Start AI Service:**
   ```cmd
   cd d:\web\CWW-25-4GCode\ai-service
   python app.py
   ```
   Wait for: "Running on http://127.0.0.1:5001"

2. **Start Web Interface:**
   ```cmd
   cd d:\web\CWW-25-4GCode\web  
   python -m http.server 8000
   ```
   Wait for: "Serving HTTP on 0.0.0.0 port 8000"

3. **Open Browser:**
   - Go to: http://localhost:8000
   - Upload a skin image
   - Get AI analysis results!

## 🔧 **Still Not Working?**

Try the simple test file:
1. Double-click `simple-test.html`
2. This works without any web server
3. Still need AI service running for analysis

## 📞 **Need Help?**

If you're still having issues, tell me:
1. What error message you see
2. What happens when you run `python --version`
3. What happens when you run `fix-and-run.bat`

The application should work once Python is properly installed! 🚀
