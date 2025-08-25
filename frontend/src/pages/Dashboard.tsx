import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockProfile = {
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
  avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=009688&color=fff',
};

const mockSearches = [
  { id: 1, query: 'Eczema', date: '2025-08-20', result: 'Detected' },
  { id: 2, query: 'Psoriasis', date: '2025-08-18', result: 'Not Detected' },
  { id: 3, query: 'Contact Dermatitis', date: '2025-08-15', result: 'Detected' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const mockRecentAnalysis = [
    {
      id: 101,
      date: '2025-08-20',
      condition: 'Eczema',
      result: 'Detected',
      image: 'https://via.placeholder.com/60x60?text=Eczema',
    },
    {
      id: 102,
      date: '2025-08-18',
      condition: 'Psoriasis',
      result: 'Not Detected',
      image: 'https://via.placeholder.com/60x60?text=Psoriasis',
    },
    {
      id: 103,
      date: '2025-08-15',
      condition: 'Contact Dermatitis',
      result: 'Detected',
      image: 'https://via.placeholder.com/60x60?text=Contact',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <div className="flex items-center mb-8 gap-6">
        <img src={mockProfile.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-teal-500" />
        <div>
          <div className="text-xl font-semibold">{mockProfile.name}</div>
          <div className="text-gray-600">{mockProfile.email}</div>
        </div>
      </div>

      {/* Recent Analysis Section */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Analysis</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRecentAnalysis.map(analysis => (
            <div key={analysis.id} className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50 hover:shadow cursor-pointer" onClick={() => navigate('/analysis')}> 
              <img src={analysis.image} alt={analysis.condition} className="w-16 h-16 rounded" />
              <div>
                <div className="font-semibold">{analysis.condition}</div>
                <div className="text-gray-600 text-sm">{analysis.date}</div>
                <div className="text-sm">Result: <span className={analysis.result === 'Detected' ? 'text-green-600' : 'text-red-600'}>{analysis.result}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Outbreak Alerts</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-sm text-orange-700">Eczema Outbreak - Colombo (High)</li>
            <li className="text-sm text-blue-700">Psoriasis Cases Rising - Kandy (Medium)</li>
            <li className="text-sm text-teal-700">Contact Dermatitis Alert - Galle (Low)</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Health Progress</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-sm text-gray-700">2025-08-01: Initial diagnosis: Eczema (Started moisturizer)</li>
            <li className="text-sm text-gray-700">2025-08-10: Reduced redness (Added topical steroid)</li>
            <li className="text-sm text-gray-700">2025-08-20: Significant improvement (Continued treatment)</li>
          </ul>
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">Past Searches</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3">Query</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Result</th>
            </tr>
          </thead>
          <tbody>
            {mockSearches.map(search => (
              <tr key={search.id} className="border-b">
                <td className="py-2 px-3">{search.query}</td>
                <td className="py-2 px-3">{search.date}</td>
                <td className="py-2 px-3">{search.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
