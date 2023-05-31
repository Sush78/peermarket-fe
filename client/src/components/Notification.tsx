import { useState, useContext } from "react";
import { NotificationContext } from '../context/NotificationContext';
import * as api from '../api/index'
import { Notification } from '../utils/constants/notification';

const Notifications = () => {
  const { notifications, markNotificationAsRead } = useContext(NotificationContext);
  const [expandedNotification, setExpandedNotification] = useState<any | null>(null);
  const handleToggleDetails = (_id: any) => {
    if (expandedNotification == _id) {
      setExpandedNotification(null);
    } else {
      setExpandedNotification(_id);
      markNotificationAsRead(_id);
      const updateNotification = async () => {
        const notificationUpdated = notifications.find((x) => x._id === _id && x.status === 'active') as Notification;
        if (notificationUpdated) {
          notificationUpdated.status = 'read';
          debugger
          await api.updateNotification(notificationUpdated);
        }
      };
      updateNotification();
    }
  };
 
  return (
    <div className="p-4 flex justify-center">
      <div className="w-80">
        <h1 className="text-2xl py-2 font-bold text-white text-center">Notifications</h1>
        {notifications.map((notification) => (
          <div key={notification.pool_id} className="p-4 mb-4 bg-white rounded shadow" style={{ maxWidth: '300px' }}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleToggleDetails(notification._id)}
            >
              <div className="flex-1 text-lg font-semibold overflow-hidden whitespace-wrap">{notification.notification_title}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-6 w-6 ${
                  expandedNotification === notification._id ? 'transform rotate-180' : ''
                }`}
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expandedNotification === notification._id && (
              <div className="p-4 bg-gray-200">
                <p className="text-gray-800 whitespace-wrap">{notification.notification_text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
