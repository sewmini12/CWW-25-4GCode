import React from 'react';

const mockAlerts = [
  { id: 1, title: 'Eczema Outbreak', location: 'Colombo', date: '2025-08-24', severity: 'High' },
  { id: 2, title: 'Psoriasis Cases Rising', location: 'Kandy', date: '2025-08-23', severity: 'Medium' },
  { id: 3, title: 'Contact Dermatitis Alert', location: 'Galle', date: '2025-08-22', severity: 'Low' },
];

const OutbreakAlerts: React.FC = () => (
  <div className="max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-center">Outbreak Alerts</h1>
    <div className="space-y-6">
      {mockAlerts.map(alert => (
        <div key={alert.id} className="card p-4 border-l-8 rounded-lg shadow-sm" style={{ borderColor: alert.severity === 'High' ? '#FF7043' : alert.severity === 'Medium' ? '#64B5F6' : '#009688' }}>
          <div className="font-semibold text-lg mb-1">{alert.title}</div>
          <div className="text-gray-600">Location: {alert.location}</div>
          <div className="text-gray-500 text-sm">Date: {alert.date}</div>
          <div className="mt-2 font-medium" style={{ color: alert.severity === 'High' ? '#FF7043' : alert.severity === 'Medium' ? '#64B5F6' : '#009688' }}>
            Severity: {alert.severity}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OutbreakAlerts;
