import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications, NotificationItem } from '@/context/NotificationContext';
import { Bell, CheckCheck, ExternalLink, Info, CheckCircle2, AlertTriangle, ShieldAlert, UserPlus } from 'lucide-react';

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif: NotificationItem) => {
    if (!notif.read) {
      await markAsRead(notif._id);
    }
    setIsOpen(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ACCOUNT_APPROVED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'NEW_REGISTRATION':
        return <UserPlus className="w-4 h-4 text-cmrl-blue-500" />;
      case 'ACCOUNT_SUSPENDED':
      case 'ACCOUNT_REJECTED':
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'ANNOUNCEMENT':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold leading-none">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="p-3 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs text-slate-900 dark:text-gray-100">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-semibold text-cmrl-blue-600 dark:text-cmrl-blue-400 bg-cmrl-blue-50 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-gray-500 hover:text-cmrl-blue-600 flex items-center space-x-1"
              >
                <CheckCheck size={14} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800">
            {recentNotifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400 italic">No notifications yet.</div>
            ) : (
              recentNotifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 flex space-x-3 ${
                    !notif.read ? 'bg-cmrl-blue-50/40 dark:bg-slate-900/60' : ''
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">{getTypeIcon(notif.type)}</div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-gray-100 flex items-center">
                        {notif.title}
                        {!notif.read && (
                          <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-cmrl-blue-600 inline-block" />
                        )}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 text-center">
            <Link
              to="/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-cmrl-blue-600 dark:text-cmrl-blue-400 hover:underline flex items-center justify-center space-x-1 py-1"
            >
              <span>View all notifications</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
