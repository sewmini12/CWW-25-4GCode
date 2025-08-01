# SkinCare AI - Simple Web Application

A simplified web application for skin disease detection using AI-powered image analysis.

## Features

- 📸 **Photo Upload & Analysis**: Upload skin condition photos for AI analysis
- 🔍 **Disease Detection**: Basic skin condition identification
- 💊 **Treatment Suggestions**: Simple treatment recommendations
- 🌐 **Web Interface**: Clean, responsive web interface

## Simple Structure

```
CWW-25-4GCode/
├── web/                      # Static web files (HTML, CSS, JS)
│   ├── index.html           # Main web page
│   ├── css/
│   ├── js/
│   └── assets/
├── ai-service/              # Python Flask API for AI
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── uploads/            # Upload folder
└── docs/                   # Documentation
```

## Quick Start

1. **Install Python dependencies:**
```bash
cd ai-service
pip install -r requirements.txt
```

2. **Start the AI service:**
```bash
cd ai-service
python app.py
```

3. **Open the web interface:**
   - Open `web/index.html` in your browser
   - Or serve it with a simple HTTP server:
   ```bash
   cd web
   python -m http.server 8000
   ```

4. **Access the application:**
   - Web Interface: http://localhost:8000
   - AI Service: http://localhost:5001

## Technology Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no complex frameworks)
- **Backend**: Python Flask (simple API)
- **AI**: Basic image processing and mock predictions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
