import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { getFriendlyErrorMessage } from '@/lib/errorHandler';
import axios from 'axios';

export interface NotificationItem {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, firebaseUser } = useAuth();
  const { showError } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotifications = useCallback(async () => {
    if (!token) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data?.success) {
        const items: NotificationItem[] = response.data.data;
        setNotifications(items);
        setUnreadCount(items.filter((n) => !n.read).length);
      }
    } catch {
      // Silent error during background fetch to avoid spamming user
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    if (!firebaseUser || !token) {
      queueMicrotask(() => {
        if (isMounted) {
          setNotifications([]);
          setUnreadCount(0);
        }
      });
      return;
    }

    axios
      .get(`${API_BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (isMounted && res.data?.success) {
          const items: NotificationItem[] = res.data.data;
          setNotifications(items);
          setUnreadCount(items.filter((n) => !n.read).length);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [firebaseUser, token]);

  const markAsRead = async (id: string) => {
    if (!token) return;
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      await axios.patch(
        `${API_BASE_URL}/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err: unknown) {
      showError(getFriendlyErrorMessage(err, 'Unable to mark notification as read. Please try again.'));
      // Rollback on failure
      fetchNotifications();
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);

      await axios.patch(
        `${API_BASE_URL}/notifications/read-all`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err: unknown) {
      showError(getFriendlyErrorMessage(err, 'Unable to mark all notifications as read. Please try again.'));
      fetchNotifications();
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        refreshNotifications: fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
