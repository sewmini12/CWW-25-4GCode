from flask import Flask, request, jsonify
from flask_cors import CORS
# import tensorflow as tf  # Comment out for now - can cause installation issues
import numpy as np
from PIL import Image
import io
import base64
import logging
import os
from werkzeug.utils import secure_filename
# import cv2  # Comment out to avoid OpenCV issues
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Skin disease classes - you would replace this with your actual model classes
SKIN_CONDITIONS = {
    0: {
        "name": "Acne",
        "description": "A common skin condition characterized by clogged pores, blackheads, whiteheads, and pimples.",
        "symptoms": ["Blackheads", "Whiteheads", "Papules", "Pustules", "Cysts"],
        "treatments": [
            {
                "type": "medication",
                "name": "Topical Retinoids",
                "description": "Help unclog pores and reduce inflammation",
                "instructions": ["Apply once daily in the evening", "Use sunscreen during the day"]
            },
            {
                "type": "lifestyle",
                "name": "Gentle Cleansing",
                "description": "Regular cleansing with mild products",
                "instructions": ["Wash face twice daily", "Avoid harsh scrubbing", "Use non-comedogenic products"]
            }
        ],
        "severity": "mild",
        "contagious": False
    },
    1: {
        "name": "Eczema (Atopic Dermatitis)",
        "description": "A chronic inflammatory skin condition causing dry, itchy, and inflamed skin.",
        "symptoms": ["Dry skin", "Itching", "Red patches", "Scaling", "Cracking"],
        "treatments": [
            {
                "type": "medication",
                "name": "Moisturizers",
                "description": "Keep skin hydrated and reduce symptoms",
                "instructions": ["Apply immediately after bathing", "Use fragrance-free products", "Apply multiple times daily"]
            },
            {
                "type": "lifestyle",
                "name": "Trigger Avoidance",
                "description": "Identify and avoid personal triggers",
                "instructions": ["Use mild, fragrance-free soaps", "Avoid extreme temperatures", "Manage stress levels"]
            }
        ],
        "severity": "moderate",
        "contagious": False
    },
    2: {
        "name": "Psoriasis",
        "description": "An autoimmune condition causing rapid skin cell buildup, resulting in scaling and red patches.",
        "symptoms": ["Scaly patches", "Redness", "Itching", "Burning sensation", "Thick nails"],
        "treatments": [
            {
                "type": "medication",
                "name": "Topical Corticosteroids",
                "description": "Reduce inflammation and slow skin cell production",
                "instructions": ["Apply as directed by healthcare provider", "Do not use on face long-term", "Gradually reduce usage"]
            }
        ],
        "severity": "moderate",
        "contagious": False
    },
    3: {
        "name": "Melanoma",
        "description": "A serious form of skin cancer that develops in melanocytes (pigment-producing cells).",
        "symptoms": ["Asymmetrical moles", "Irregular borders", "Color variations", "Diameter > 6mm", "Evolving appearance"],
        "treatments": [
            {
                "type": "procedure",
                "name": "Immediate Medical Consultation",
                "description": "Urgent evaluation by a dermatologist or oncologist",
                "instructions": ["Schedule appointment immediately", "Document changes in mole appearance", "Avoid sun exposure"]
            }
        ],
        "severity": "severe",
        "contagious": False
    },
    4: {
        "name": "Rosacea",
        "description": "A chronic inflammatory skin condition primarily affecting the face, causing redness and visible blood vessels.",
        "symptoms": ["Facial redness", "Visible blood vessels", "Bumps and pimples", "Eye irritation", "Burning sensation"],
        "treatments": [
            {
                "type": "medication",
                "name": "Topical Antibiotics",
                "description": "Reduce inflammation and redness",
                "instructions": ["Apply as prescribed", "Use gentle skincare products", "Avoid known triggers"]
            },
            {
                "type": "lifestyle",
                "name": "Sun Protection",
                "description": "Protect skin from UV radiation",
                "instructions": ["Use broad-spectrum SPF 30+", "Wear wide-brimmed hats", "Avoid peak sun hours"]
            }
        ],
        "severity": "mild",
        "contagious": False
    }
}

class SkinDiseaseClassifier:
    def __init__(self):
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load the trained model - replace with actual model loading"""
        try:
            # For demonstration purposes, we'll create a mock model
            # In production, you would load your actual trained model:
            # self.model = tf.keras.models.load_model('path/to/your/model.h5')
            
            # Mock model for demonstration
            logger.info("Model loaded successfully (mock model)")
            self.model = "mock_model"  # Replace with actual model
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            self.model = None
    
    def preprocess_image(self, image):
        """Preprocess image for model prediction"""
        try:
            # Resize image to model input size (adjust as needed)
            img_size = (224, 224)  # Common size for many models
            
            # Convert PIL image to numpy array
            img_array = np.array(image)
            
            # Resize using PIL instead of cv2 to avoid potential issues
            resized_image = image.resize(img_size, Image.Resampling.LANCZOS)
            img_array = np.array(resized_image)
            
            # Normalize pixel values
            img_normalized = img_array.astype('float32') / 255.0
            
            # Add batch dimension
            img_batch = np.expand_dims(img_normalized, axis=0)
            
            return img_batch
        except Exception as e:
            logger.error(f"Error preprocessing image: {str(e)}")
            return None
    
    def predict(self, image):
        """Make prediction on preprocessed image"""
        try:
            if self.model is None:
                # Mock prediction for demonstration
                # In production, this would be: predictions = self.model.predict(preprocessed_image)
                mock_predictions = np.random.rand(5)  # 5 classes
                mock_predictions = mock_predictions / np.sum(mock_predictions)  # Normalize to sum to 1
                
                # Get top prediction
                predicted_class = np.argmax(mock_predictions)
                confidence = float(mock_predictions[predicted_class])
                
                return predicted_class, confidence, mock_predictions
            
            # Actual model prediction would go here
            # preprocessed_image = self.preprocess_image(image)
            # predictions = self.model.predict(preprocessed_image)
            # predicted_class = np.argmax(predictions[0])
            # confidence = float(predictions[0][predicted_class])
            # return predicted_class, confidence, predictions[0]
            
        except Exception as e:
            logger.error(f"Error making prediction: {str(e)}")
            return None, None, None

# Initialize classifier
classifier = SkinDiseaseClassifier()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'SkinCare AI Service',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': classifier.model is not None
    })

@app.route('/analyze', methods=['POST'])
def analyze_image():
    """Analyze uploaded image for skin conditions"""
    try:
        # Check if image is in request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: png, jpg, jpeg, gif, webp'}), 400
        
        # Read and process image
        image_data = file.read()
        
        # Check file size
        if len(image_data) > MAX_FILE_SIZE:
            return jsonify({'error': 'File too large. Maximum size: 16MB'}), 400
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Make prediction
        predicted_class, confidence, all_predictions = classifier.predict(image)
        
        if predicted_class is None:
            return jsonify({'error': 'Failed to analyze image'}), 500
        
        # Get condition information
        condition = SKIN_CONDITIONS.get(predicted_class, {
            "name": "Unknown Condition",
            "description": "Unable to identify condition",
            "symptoms": [],
            "treatments": [],
            "severity": "unknown",
            "contagious": False
        })
        
        # Generate recommended actions based on severity
        recommended_actions = []
        if condition.get("severity") == "severe":
            recommended_actions = [
                "Seek immediate medical attention",
                "Schedule urgent dermatologist appointment",
                "Document any changes in condition",
                "Avoid self-treatment"
            ]
        elif condition.get("severity") == "moderate":
            recommended_actions = [
                "Consult with a dermatologist",
                "Monitor symptoms closely",
                "Follow proper skincare routine",
                "Avoid known triggers"
            ]
        else:
            recommended_actions = [
                "Monitor condition for changes",
                "Maintain good skincare hygiene",
                "Consider over-the-counter treatments",
                "Consult healthcare provider if condition worsens"
            ]
        
        # Prepare response
        result = {
            'success': True,
            'predictions': [{
                'condition': condition,
                'confidence': confidence,
                'recommendedActions': recommended_actions
            }],
            'confidence': confidence,
            'status': 'completed',
            'timestamp': datetime.now().isoformat()
        }
        
        logger.info(f"Analysis completed - Condition: {condition['name']}, Confidence: {confidence:.2f}")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error analyzing image: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/conditions', methods=['GET'])
def get_conditions():
    """Get list of all supported skin conditions"""
    try:
        conditions = [
            {
                'id': idx,
                'name': condition['name'],
                'description': condition['description'],
                'severity': condition['severity'],
                'contagious': condition['contagious']
            }
            for idx, condition in SKIN_CONDITIONS.items()
        ]
        
        return jsonify({
            'success': True,
            'conditions': conditions,
            'total': len(conditions)
        })
        
    except Exception as e:
        logger.error(f"Error getting conditions: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
