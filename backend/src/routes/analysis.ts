import express from 'express';
import multer from 'multer';
import axios from 'axios';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!') as any, false);
    }
  }
});

// Upload and analyze image
router.post('/upload', upload.single('image'), async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    // Create FormData for AI service
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:5001';
    
    try {
      const response = await axios.post(`${aiServiceUrl}/analyze`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 30000, // 30 second timeout
      });

      // Return the AI service response
      res.json({
        success: true,
        data: response.data
      });

    } catch (aiError: any) {
      console.error('AI Service error:', aiError.message);
      res.status(503).json({
        success: false,
        message: 'AI service unavailable. Please try again later.'
      });
    }

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get analysis history
router.get('/history', async (req: any, res: any) => {
  try {
    // Implementation would go here
    res.json({ success: true, message: 'Analysis history endpoint' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
