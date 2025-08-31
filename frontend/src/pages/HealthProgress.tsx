import React from 'react';

const mockProgress = [
  { id: 1, date: '2025-08-01', status: 'Initial diagnosis: Eczema', improvement: 'Started moisturizer' },
  { id: 2, date: '2025-08-10', status: 'Reduced redness', improvement: 'Added topical steroid' },
  { id: 3, date: '2025-08-20', status: 'Significant improvement', improvement: 'Continued treatment' },
];

const HealthProgress: React.FC = () => (
  <div className="max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-center">Health Progress</h1>
    <div className="space-y-6">
      {mockProgress.map(entry => (
        <div key={entry.id} className="card p-4 rounded-lg shadow-sm border-l-4 border-emerald-500">
          <div className="font-semibold text-lg mb-1">{entry.status}</div>
          <div className="text-gray-600">Date: {entry.date}</div>
          <div className="text-gray-500 text-sm">Improvement: {entry.improvement}</div>
        </div>
      ))}
    </div>
  </div>
);

export default HealthProgress;
