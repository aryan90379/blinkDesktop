import React, { useEffect } from 'react';

const NotificationHandler: React.FC = () => {
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const randomMessage = "Take a break and give your eyes some rest!";
      new Notification("👁️ Blinkbuddy Reminder", { body: randomMessage });
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default NotificationHandler;
