import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../api/index'
import { Notification } from '../utils/constants/notification';
import { PoolContext } from "../context/PoolContext";
interface NotificationContextProps {
  notifications: Notification[];
  markNotificationAsRead: (poolId: number) => void;
  activeNotifications: number;
  currentAccount: string;
}

export const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  markNotificationAsRead: () => {},
  activeNotifications: 0,
  currentAccount: ''
});

export const NotificationProvider: React.FC<{ children: React.ReactNode, notificationDetails: Notification[]  }> = ({ children, notificationDetails }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { connectWallet, currentAccount, placeBet } = useContext(PoolContext);
  useEffect(() => {
    debugger;
    const fetchData = async () => {
      const playerAddress = currentAccount;
      const data = await api.fetchNotifications(playerAddress);
      const json = await data.json();
      const notificationData = json as Notification[];
      setNotifications(notificationData);
    };
  
    fetchData();
  }, [currentAccount]);
  
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
    <NotificationContext.Provider value={{ notifications, markNotificationAsRead, activeNotifications, currentAccount }}>
      {children}
    </NotificationContext.Provider>
  );
};