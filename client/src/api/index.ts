import { bedEndPoint } from "../utils/constants/generic"
import { Notification } from '../utils/constants/notification';

export const fetchCategories = () => fetch(bedEndPoint)

export const fetchTopPools = () => fetch(`${bedEndPoint}pools/get-top-pools`)

export const fetchPoolById = (id: string) => fetch(`${bedEndPoint}pools/get-pool/${id}`)

export const fetchNotifications = (playerAddress: string) => fetch(`${bedEndPoint}notification/getNotifications/${playerAddress}`)

export const updateNotifications = (notification: Notification) => {
    return fetch(`${bedEndPoint}notification/updateNotification/${notification._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });
  };

  export const addNotifications = (notification: Notification) => {
    return fetch(`${bedEndPoint}notification/addNotification/${notification._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });
  };

