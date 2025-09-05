import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { AnalysisResult } from '../types';

const Analysis: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setUploadedImage(previewUrl);
      
      // Start analysis
      analyzeImage(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const analyzeImage = async (file: File) => {
    setAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      // Dummy result data
      setResult({
        id: 'dummy-analysis-1',
        userId: 'user-1',
        imageUrl: uploadedImage || '',
        confidence: 0.92,
        status: 'completed',
        createdAt: new Date().toISOString(),
        predictions: [
          {
            confidence: 0.92,
            condition: {
              id: 'eczema',
              name: 'Eczema',
              description: 'A common skin condition causing redness and itching.',
              symptoms: ['Redness', 'Itching', 'Dry skin'],
              severity: 'mild',
              contagious: false,
              treatments: [
                {
                  id: '1',
                  name: 'Moisturizer',
                  description: 'Apply twice daily to affected area.',
                  type: 'medication',
                  instructions: ['Use after bathing', 'Apply before bed']
                },
                {
                  id: '2',
                  name: 'Topical Steroid',
                  description: 'Use as prescribed by your doctor.',
                  type: 'medication',
                  instructions: ['Apply a thin layer to affected area']
                }
              ],
            },
            recommendedActions: [
              'Keep skin moisturized',
              'Avoid harsh soaps',
              'Consult a dermatologist if symptoms persist'
            ],
          }
        ]
      });
      toast.success('Analysis completed successfully!');
      setAnalyzing(false);
    }, 1500);
  };

  const resetAnalysis = () => {
    setResult(null);
    setUploadedImage(null);
    setAnalyzing(false);
  };



  return (
    
    
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Skin Condition Analysis
        </h1>
        <p className="text-lg text-gray-600">
          Upload a clear photo of your skin condition for AI-powered analysis
        </p>
      </div>

      <div className="instruction-wrapper">
        <div className="instruction-box flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
      <img
        src="/assets/wrong1.png"
        alt="Example of a correct skin photo"
        className=" object-cover rounded-lg border"
      />

      <img
        src="/assets/right1.png"
        alt="Example of a correct skin photo"
        className=" object-cover rounded-lg border"
      />
      <ul className="text-left text-gray-700 space-y-2">
        <li> ● Use good lighting (natural daylight is best)</li>
        <li> ● Focus on the affected skin area</li>
        <li> ● Avoid blurry or dark images</li>
        <li> ● Remove makeup or creams before taking the photo</li>
        <li> ● Only one skin area per photo</li>
      </ul>
      </div>
      
      </div>

      

      

      {!uploadedImage && (
        <div className="card mb-8">
          <div
            {...getRootProps()}
            className={`upload-area cursor-pointer ${isDragActive ? 'dragover' : ''}`}
          >
            <input {...getInputProps()} />
            <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg text-emerald-600">Drop the image here...</p>
            ) : (
              <>
                <p className="text-lg text-gray-600 mb-2">
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPEG, PNG, WebP (max 5MB)
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {uploadedImage && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Uploaded Image</h3>
            <img
              src={uploadedImage}
              alt="Uploaded skin condition"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <button
              onClick={resetAnalysis}
              className="btn-secondary w-full"
              disabled={analyzing}
            >
              Upload Different Image
            </button>
          </div>

          {/* Analysis Results */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
            
            {analyzing && (
              <div className="text-center py-8">
                <CloudArrowUpIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
                <p className="text-lg text-gray-600">Analyzing your image...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            )}

            {result && !analyzing && (
              <div className="space-y-6">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Primary Prediction
                  </h4>
                  <p className="text-emerald-700 text-lg">
                    {result.predictions[0]?.condition.name}
                  </p>
                  <p className="text-sm text-emerald-600 mt-1">
                    Confidence: {(result.predictions[0]?.confidence * 100).toFixed(1)}%
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Description</h4>
                  <p className="text-gray-700">
                    {result.predictions[0]?.condition.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Recommended Actions</h4>
                  <ul className="space-y-2">
                    {result.predictions[0]?.recommendedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {result.predictions[0]?.condition.treatments.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Possible Treatments</h4>
                    <div className="space-y-3">
                      {result.predictions[0].condition.treatments.map((treatment, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <h5 className="font-medium text-gray-900">{treatment.name}</h5>
                          <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Important Notice
                  </h4>
                  <p className="text-sm text-yellow-700">
                    This analysis is for informational purposes only and should not replace professional medical advice. 
                    Please consult with a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
