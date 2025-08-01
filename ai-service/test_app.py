from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'SkinCare AI Service (Simplified)',
        'timestamp': datetime.now().isoformat(),
        'message': 'Basic Flask app is working'
    })

@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        'message': 'AI Service is running successfully!',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    print("Starting SkinCare AI Service...")
    app.run(host='0.0.0.0', port=5001, debug=True)
