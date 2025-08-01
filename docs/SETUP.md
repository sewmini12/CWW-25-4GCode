# SkinCare AI - Development Setup

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB
- Git

## Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/sewmini12/CWW-25-4GCode.git
cd CWW-25-4GCode
```

2. **Install all dependencies:**
```bash
npm run install:all
```

3. **Set up environment variables:**
```bash
# Copy example files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the files with your actual values
```

4. **Start all services:**
```bash
npm run dev
```

This will start:
- Frontend React app on http://localhost:3000
- Backend API on http://localhost:5000
- AI service on http://localhost:5001

## Project Structure

```
CWW-25-4GCode/
├── frontend/                     # React.js frontend
│   ├── public/                   # Static files
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Utility functions
│   │   ├── App.tsx              # Main app component
│   │   └── index.tsx            # Entry point
│   ├── package.json
│   └── tailwind.config.js       # Tailwind CSS configuration
│
├── backend/                      # Node.js backend API
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/          # Express middleware
│   │   ├── models/              # MongoDB models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Utility functions
│   │   └── server.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── ai-service/                   # Python AI/ML service
│   ├── models/                  # Pre-trained models
│   ├── utils/                   # Image processing utilities
│   ├── app.py                   # Flask application
│   └── requirements.txt         # Python dependencies
│
├── shared/                       # Shared utilities and types
├── docs/                        # Documentation
├── deployment/                  # Deployment configurations
└── README.md
```

## Features

### 🔐 User Authentication
- User registration and login
- JWT-based authentication
- Email verification
- Password reset functionality

### 📸 Image Analysis
- Drag-and-drop image upload
- Real-time image preprocessing
- AI-powered skin condition detection
- Confidence scoring and multiple predictions

### 🏥 Disease Detection
- Support for multiple skin conditions:
  - Acne
  - Eczema (Atopic Dermatitis)
  - Psoriasis
  - Melanoma (with urgent care recommendations)
  - Rosacea
- Treatment recommendations
- Severity assessment

### 🚨 Outbreak Notifications
- Real-time disease outbreak alerts
- Location-based notifications
- Prevention tips and guidance
- Email and push notifications

### 📊 Health Tracking
- Analysis history
- Treatment progress tracking
- Personal health dashboard
- Export health data

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset

### Analysis
- `POST /api/analysis/upload` - Upload and analyze image
- `GET /api/analysis/history` - Get user's analysis history
- `GET /api/analysis/:id` - Get specific analysis result

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications/mark-read` - Mark notifications as read
- `GET /api/outbreaks` - Get outbreak alerts

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/preferences` - Update notification preferences

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/skincare-ai
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
AI_SERVICE_URL=http://localhost:5001
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AI_SERVICE_URL=http://localhost:5001
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Development Commands

```bash
# Install dependencies for all services
npm run install:all

# Start development servers
npm run dev

# Start individual services
npm run dev:frontend    # React app
npm run dev:backend     # Node.js API
npm run dev:ai         # Python AI service

# Build for production
npm run build

# Run tests
npm test
```

## Deployment

The application can be deployed using various methods:

1. **Docker** (recommended)
2. **Traditional hosting** (VPS, cloud providers)
3. **Serverless** (Vercel, Netlify for frontend)

See the `/deployment` folder for specific deployment configurations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Email: support@skincare-ai.com
- Documentation: [docs/](docs/)

## Disclaimer

This application is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
