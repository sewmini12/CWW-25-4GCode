import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Recent Analysis</h3>
          <p className="text-gray-600">View your latest skin condition analyses</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Outbreak Alerts</h3>
          <p className="text-gray-600">Check disease outbreak notifications in your area</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Health Progress</h3>
          <p className="text-gray-600">Track your skin health improvement over time</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
