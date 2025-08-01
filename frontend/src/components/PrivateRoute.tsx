import React from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // In a real app, you would check authentication here
  // For now, we'll just render the children
  return <>{children}</>;
};

export default PrivateRoute;
