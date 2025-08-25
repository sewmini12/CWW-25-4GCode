import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-emerald-600">
            SkinCare AI
          </Link>
          <div className="flex space-x-4">
            <Link to="/analysis" className="text-gray-600 hover:text-emerald-600">
              Analyze
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600">
              Dashboard
            </Link>
            <Link to="/notifications" className="text-gray-600 hover:text-emerald-600">
              Notifications
            </Link>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
