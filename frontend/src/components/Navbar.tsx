import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-xl font-bold text-emerald-600">
            SkinCare AI
          </NavLink>
          <div className="flex space-x-4">
            <NavLink to="/analysis" className={({isActive}) => isActive ? "text-emerald-600 font-semibold" : "text-gray-600 hover:text-emerald-600"}>
              Analyze
            </NavLink>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "text-emerald-600 font-semibold" : "text-gray-600 hover:text-emerald-600"}>
              Dashboard
            </NavLink>
            <NavLink to="/notifications" className={({isActive}) => isActive ? "text-emerald-600 font-semibold" : "text-gray-600 hover:text-emerald-600"}>
              Notifications
            </NavLink>
            <NavLink to="/login" className="btn-primary">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
