import React, { createContext, useState, useEffect } from 'react';
import * as api from '../api/index'
import { Notification } from '../utils/constants/notification';

interface NotificationContextProps {
  notifications: Notification[];
  markNotificationAsRead: (poolId: number) => void;
  activeNotifications: number;
}

export const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  markNotificationAsRead: () => {},
  activeNotifications: 0,
});

export const NotificationProvider: React.FC<{ children: React.ReactNode, notificationDetails: Notification[]  }> = ({ children, notificationDetails }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const playerAddress = 'test';
      const data = await api.fetchNotifications(playerAddress);
      const json = await data.json();
      const notificationData = json as Notification[];
      setNotifications(notificationData);
    };
  
    fetchData();
  }, []);
  
  const markNotificationAsRead = (_id: any) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id == _id
          ? { ...notification, status: 'read' }
          : notification
      )
    );
  };

  const activeNotifications = notifications.filter(
    (notification) => notification.status === 'active'
  ).length;

  return (
    <NotificationContext.Provider value={{ notifications, markNotificationAsRead, activeNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};