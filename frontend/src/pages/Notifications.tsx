
import React, { useState } from 'react';
import styles from './Notifications.module.css';

interface Alert {
  id: number;
  title: string;
  location: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
}

const alerts: Alert[] = [
  {
    id: 1,
    title: 'Eczema Outbreak',
    location: 'Colombo, Sri Lanka',
    date: '2025-08-24',
    severity: 'high',
  },
  {
    id: 2,
    title: 'Psoriasis Cases Rising',
    location: 'Kandy, Sri Lanka',
    date: '2025-08-23',
    severity: 'medium',
  },
  {
    id: 3,
    title: 'Contact Dermatitis Alert',
    location: 'Galle, Sri Lanka',
    date: '2025-08-22',
    severity: 'low',
  },
];

const Notifications: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  return (
    <div className={styles['notifications-bg']}>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className={`text-3xl font-bold mb-8 text-center ${styles['notifications-title']}`}>Notifications & Outbreak Alerts</h1>
        {/* Map View Placeholder */}
        <div className="mb-8">
          <div className={styles['map-placeholder']}>
            🗺️ Map view coming soon (Google Maps API)
          </div>
        </div>
        {/* Notification Toggle */}
        <div className="flex items-center mb-8 justify-end">
          <label className={styles['toggle-label']} htmlFor="notifications-toggle">Enable Notifications</label>
          <input
            id="notifications-toggle"
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="form-checkbox h-6 w-6 text-teal-600"
            title="Enable notifications"
          />
        </div>
        {/* List of Active Alerts */}
        <div>
          <h2 className={`text-xl font-semibold mb-4 ${styles['alert-title']}`}>Active Outbreak Alerts</h2>
          <ul className={styles['alert-list']}>
            {alerts.map(alert => (
              <li
                key={alert.id}
                className={
                  `${styles['alert-item']} ` +
                  (alert.severity === 'high'
                    ? styles['alert-border-high']
                    : alert.severity === 'medium'
                    ? styles['alert-border-medium']
                    : styles['alert-border-low'])
                }
              >
                <div className={styles['alert-main']}>{alert.title}</div>
                <div className={styles['alert-location']}>{alert.location}</div>
                <div className={styles['alert-time']}>Date: {alert.date}</div>
                <div className={`${styles['alert-severity']} ${alert.severity === 'high' ? styles['alert-severity-high'] : alert.severity === 'medium' ? styles['alert-severity-medium'] : styles['alert-severity-low']}`}>
                  Severity: {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
