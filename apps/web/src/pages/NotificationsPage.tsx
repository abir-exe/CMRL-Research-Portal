import { useNotifications, NotificationItem } from '@/context/NotificationContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, CheckCircle2, UserPlus, ShieldAlert, AlertTriangle, Info, ArrowRight } from 'lucide-react';

export function NotificationsPage() {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ACCOUNT_APPROVED':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'NEW_REGISTRATION':
        return <UserPlus className="w-5 h-5 text-cmrl-blue-500" />;
      case 'ACCOUNT_SUSPENDED':
      case 'ACCOUNT_REJECTED':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'ANNOUNCEMENT':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <Section>
      <PageContainer className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="info">MEMBER NOTIFICATIONS</Badge>
              {unreadCount > 0 && (
                <Badge variant="warning">{unreadCount} UNREAD</Badge>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
              Notification History
            </h1>
            <p className="text-sm text-gray-500">
              View persistent laboratory announcements, account status updates, and operational notices.
            </p>
          </div>

          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" /> Mark All as Read
            </Button>
          )}
        </div>

        {/* Notification List Container */}
        <Card>
          <CardHeader className="border-b border-gray-100 dark:border-slate-800">
            <CardTitle className="text-base flex items-center space-x-2">
              <Bell size={18} className="text-cmrl-blue-600" />
              <span>All Notifications ({notifications.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <LoadingState message="Fetching notification history..." size="lg" />
            ) : notifications.length === 0 ? (
              <EmptyState
                title="No Notifications Yet"
                description="You currently have no persistent notifications or system announcements."
                icon={<Bell size={32} />}
              />
            ) : (
              <div className="space-y-4">
                {notifications.map((notif: NotificationItem) => (
                  <div
                    key={notif._id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      !notif.read
                        ? 'border-cmrl-blue-200 dark:border-slate-800 bg-cmrl-blue-50/40 dark:bg-slate-900/60 shadow-sm'
                        : 'border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 opacity-90'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 flex-shrink-0">{getTypeIcon(notif.type)}</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-gray-100">
                            {notif.title}
                          </h3>
                          {!notif.read ? (
                            <Badge variant="info" className="text-[10px] px-1.5 py-0">Unread</Badge>
                          ) : (
                            <Badge variant="default" className="text-[10px] px-1.5 py-0 bg-gray-100 dark:bg-slate-800 text-gray-500">Read</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-gray-400 font-mono block">
                          {new Date(notif.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      {notif.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!notif.read) markAsRead(notif._id);
                            navigate(notif.link!);
                          }}
                        >
                          View <ArrowRight size={14} className="ml-1" />
                        </Button>
                      )}
                      {!notif.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notif._id)}
                          className="text-xs text-gray-500 hover:text-slate-900"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </PageContainer>
    </Section>
  );
}
