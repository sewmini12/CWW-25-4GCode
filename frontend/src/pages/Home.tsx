import React from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, ShieldCheckIcon, BellIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered Skin Disease Detection
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Upload a photo of your skin condition and get instant AI-powered analysis, 
          treatment suggestions, and stay informed about disease outbreaks in your area.
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="btn-primary text-lg px-8 py-3"
          >
            Get Started
          </Link>
          <Link
            to="/analysis"
            className="btn-secondary text-lg px-8 py-3"
          >
            Try Demo
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Skin Health Solution
          </h2>
          <p className="text-lg text-gray-600">
            Advanced AI technology meets healthcare expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CameraIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Photo Analysis</h3>
            <p className="text-gray-600">
              Upload skin condition photos for instant AI-powered analysis using advanced machine learning models.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accurate Diagnosis</h3>
            <p className="text-gray-600">
              Get reliable skin condition identification with confidence scores and detailed explanations.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Outbreak Alerts</h3>
            <p className="text-gray-600">
              Stay informed about disease outbreaks in your area with real-time notifications and prevention tips.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Treatment Tracking</h3>
            <p className="text-gray-600">
              Track your treatment progress and maintain a comprehensive health history.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Simple, fast, and accurate skin condition analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Photo</h3>
            <p className="text-gray-600">
              Take a clear photo of your skin condition or upload an existing image from your device.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Our advanced AI models analyze your image and identify potential skin conditions with high accuracy.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-gray-600">
              Receive detailed analysis results with treatment suggestions and when to consult a healthcare professional.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Skin Health Journey Today
        </h2>
        <p className="text-xl mb-8">
          Join thousands of users who trust our AI-powered skin analysis
        </p>
        <Link
          to="/signup"
          className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
