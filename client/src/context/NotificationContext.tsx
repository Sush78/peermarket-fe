import React, { createContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import {
  getNotification,
  addNotification,
  updateNotification,
} from "../redux/slices/notification";
import * as api from '../api/index'
import { Notification } from '../utils/constants/notification';

interface NotificationContextProps {
  notifications: Notification[];
  markNotificationAsRead: (poolId: number) => void;
  activeNotifications: number;
}

// const initialNotifications: Notification[] = [
//   {
//     _id: 1,
//     pool_id: 1,
//     notification_text: 'Notification 1',
//     status: 'active',
//     player_address: '0x4F8d449ac145779b566855D02C9A37c4e96153c6',
//     notification_title: 'Testing Notification 1'
//   },
//   {
//     _id: 2,
//     pool_id: 2,
//     notification_text: 'Notification 2',
//     status: 'active',
//     player_address: '0x4F8d449ac145779b566855D02C9A37c4e96153c6',
//     notification_title: 'Testing Notification 2'
//   },
//   {
//     _id: 3,
//     pool_id: 3,
//     notification_text: 'Notification 3',
//     status: 'active',
//     player_address: '0x4F8d449ac145779b566855D02C9A37c4e96153c6',
//     notification_title: 'Testing Notification 3'
//   },
// ];

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