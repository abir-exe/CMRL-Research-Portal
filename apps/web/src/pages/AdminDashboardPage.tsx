import { useState, useEffect, useCallback } from 'react';
import { useAuth, MongoUser, UserRole, StudentRank } from '@/context/AuthContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { useToast } from '@/context/ToastContext';
import { getFriendlyErrorMessage } from '@/lib/errorHandler';
import { Shield, UserCheck, Check, X, ShieldAlert, Award, RefreshCw, Users, Activity, FileText, Settings } from 'lucide-react';
import axios from 'axios';

interface SystemOverviewData {
  totalUsers: number;
  studentsCount: number;
  supervisorsCount: number;
  adminsCount: number;
  pendingCount: number;
  suspendedCount: number;
  recentLogs: Array<{
    _id: string;
    actorUserId: string;
    actorRole: string;
    action: string;
    targetUserId?: string;
    createdAt: string;
  }>;
}

interface AuditLogItem {
  _id: string;
  actorUserId: string;
  actorRole: string;
  action: string;
  targetUserId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export function AdminDashboardPage() {
  const { token } = useAuth();
  const { showSuccess, showError } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'members' | 'audit' | 'system'>('overview');
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [systemOverview, setSystemOverview] = useState<SystemOverviewData | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Role management modal state (ADMIN ONLY)
  const [roleModalUser, setRoleModalUser] = useState<MongoUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [updatingRole, setUpdatingRole] = useState(false);

  // Rank change modal state
  const [rankModalUser, setRankModalUser] = useState<MongoUser | null>(null);
  const [selectedRank, setSelectedRank] = useState<StudentRank>('NEWBIE');
  const [updatingRank, setUpdatingRank] = useState(false);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const [usersRes, overviewRes, auditRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/admin/system/overview`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/admin/audit-logs`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (usersRes.data?.success) setUsers(usersRes.data.data);
      if (overviewRes.data?.success) setSystemOverview(overviewRes.data.data);
      if (auditRes.data?.success) setAuditLogs(auditRes.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error?.message) {
        setErrorMsg(err.response.data.error.message);
      } else {
        setErrorMsg('Failed to load administrator control center.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    if (!token) {
      queueMicrotask(() => {
        if (isMounted) setLoading(false);
      });
      return;
    }
    axios
      .all([
        axios.get(`${API_BASE_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/admin/system/overview`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/admin/audit-logs`, { headers: { Authorization: `Bearer ${token}` } }),
      ])
      .then(
        axios.spread((usersRes, overviewRes, auditRes) => {
          if (isMounted) {
            if (usersRes.data?.success) setUsers(usersRes.data.data);
            if (overviewRes.data?.success) setSystemOverview(overviewRes.data.data);
            if (auditRes.data?.success) setAuditLogs(auditRes.data.data);
            setLoading(false);
          }
        })
      )
      .catch((err) => {
        if (isMounted) {
          if (axios.isAxiosError(err) && err.response?.data?.error?.message) {
            setErrorMsg(err.response.data.error.message);
          } else {
            setErrorMsg('Failed to load administrator control center.');
          }
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleApprove = async (userId: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/users/${userId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        const msg = `User ${userId} was successfully approved and activated.`;
        setSuccessMsg(msg);
        showSuccess(msg);
        fetchAdminData();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, `Failed to approve ${userId}.`);
      setErrorMsg(friendly);
      showError(friendly);
    }
  };

  const handleReject = async (userId: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/users/${userId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        const msg = `User ${userId} registration was rejected.`;
        setSuccessMsg(msg);
        showSuccess(msg);
        fetchAdminData();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, `Failed to reject ${userId}.`);
      setErrorMsg(friendly);
      showError(friendly);
    }
  };

  const handleSuspend = async (userId: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/users/${userId}/suspend`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        const msg = `User ${userId} was suspended.`;
        setSuccessMsg(msg);
        showSuccess(msg);
        fetchAdminData();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, `Failed to suspend ${userId}.`);
      setErrorMsg(friendly);
      showError(friendly);
    }
  };

  const handleReactivate = async (userId: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/users/${userId}/reactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        const msg = `User ${userId} was reactivated.`;
        setSuccessMsg(msg);
        showSuccess(msg);
        fetchAdminData();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, `Failed to reactivate ${userId}.`);
      setErrorMsg(friendly);
      showError(friendly);
    }
  };

  const handleSaveRole = async () => {
    if (!roleModalUser) return;
    setUpdatingRole(true);
    setErrorMsg(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/users/${roleModalUser.userId}/role`,
        { role: selectedRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        const msg = `Role for ${roleModalUser.userId} updated to ${selectedRole} (Synced with Firebase custom claims).`;
        setSuccessMsg(msg);
        showSuccess(msg);
        setRoleModalUser(null);
        fetchAdminData();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, 'Failed to update user role.');
      setErrorMsg(friendly);
      showError(friendly);
    } finally {
      setUpdatingRole(false);
    }
  };

  const handleSaveRank = async () => {
    if (!rankModalUser) return;
    setUpdatingRank(true);
    setErrorMsg(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/users/${rankModalUser.userId}/rank`,
        { rank: selectedRank },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        const msg = `Rank for ${rankModalUser.userId} updated to ${selectedRank}.`;
        setSuccessMsg(msg);
        showSuccess(msg);
        setRankModalUser(null);
        fetchAdminData();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, 'Failed to update rank.');
      setErrorMsg(friendly);
      showError(friendly);
    } finally {
      setUpdatingRank(false);
    }
  };

  const pendingUsers = users.filter((u) => u.accountStatus === 'PENDING');

  return (
    <Section>
      <PageContainer className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="danger">
              <Shield size={12} className="mr-1 inline" /> ADMINISTRATOR & CREATOR CONTROL CENTER
            </Badge>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
              CMRL System Administration
            </h1>
            <p className="text-sm text-gray-500">
              Manage system permissions, user roles, supervisor accounts, and audit history.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAdminData} disabled={loading}>
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh Admin Data
          </Button>
        </div>

        {/* System Metric Cards */}
        {systemOverview && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <Card className="p-3 text-center space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Total Users</span>
              <p className="text-xl font-bold">{systemOverview.totalUsers}</p>
            </Card>
            <Card className="p-3 text-center space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Students</span>
              <p className="text-xl font-bold text-cmrl-blue-600">{systemOverview.studentsCount}</p>
            </Card>
            <Card className="p-3 text-center space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Supervisors</span>
              <p className="text-xl font-bold text-purple-600">{systemOverview.supervisorsCount}</p>
            </Card>
            <Card className="p-3 text-center space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Admins</span>
              <p className="text-xl font-bold text-red-600">{systemOverview.adminsCount}</p>
            </Card>
            <Card className="p-3 text-center space-y-1">
              <span className="text-[10px] text-amber-600 uppercase font-semibold">Pending</span>
              <p className="text-xl font-bold text-amber-600">{systemOverview.pendingCount}</p>
            </Card>
            <Card className="p-3 text-center space-y-1">
              <span className="text-[10px] text-red-600 uppercase font-semibold">Suspended</span>
              <p className="text-xl font-bold text-red-600">{systemOverview.suspendedCount}</p>
            </Card>
          </div>
        )}

        {/* Success Banner */}
        {successMsg && (
          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-sm font-medium flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Check size={18} />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-xs hover:underline">Dismiss</button>
          </div>
        )}

        {errorMsg && (
          <ErrorState title="Admin System Error" message={errorMsg} onRetry={fetchAdminData} />
        )}

        {/* Tabs */}
        <Card>
          <CardHeader className="border-b border-gray-100 dark:border-slate-800 pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900'
                }`}
              >
                Pending Approvals ({pendingUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'members'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900'
                }`}
              >
                All Users & Roles ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'audit'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900'
                }`}
              >
                Audit Logs ({auditLogs.length})
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'system'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900'
                }`}
              >
                Security & System
              </button>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {loading ? (
              <LoadingState message="Loading administrator portal..." size="lg" />
            ) : activeTab === 'overview' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-semibold text-sm mb-3 flex items-center space-x-2">
                      <Activity size={16} className="text-cmrl-blue-600" />
                      <span>Recent Administrative Actions</span>
                    </h3>
                    <div className="space-y-2">
                      {systemOverview?.recentLogs && systemOverview.recentLogs.length > 0 ? (
                        systemOverview.recentLogs.map((log) => (
                          <div key={log._id} className="p-2 rounded bg-gray-50 dark:bg-slate-900 text-xs flex justify-between">
                            <div>
                              <span className="font-bold text-slate-800 dark:text-gray-200">{log.action}</span>
                              <span className="text-gray-400 ml-2">by {log.actorUserId}</span>
                            </div>
                            <span className="text-[10px] text-gray-400">{new Date(log.createdAt).toLocaleTimeString()}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 italic">No recent administrative logs.</p>
                      )}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold text-sm mb-3 flex items-center space-x-2">
                      <Users size={16} className="text-purple-600" />
                      <span>Quick Admin Actions</span>
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setActiveTab('pending')}>
                        <UserCheck size={14} className="mr-2 text-amber-500" /> Review Pending Registrations ({pendingUsers.length})
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setActiveTab('members')}>
                        <Shield size={14} className="mr-2 text-purple-500" /> Manage User Roles & Permissions
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setActiveTab('audit')}>
                        <FileText size={14} className="mr-2 text-blue-500" /> View System Audit Trail
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            ) : activeTab === 'pending' ? (
              pendingUsers.length === 0 ? (
                <EmptyState title="No Pending Registrations" description="All registrations have been processed." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name & Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers.map((u) => (
                      <TableRow key={u.userId}>
                        <TableCell className="font-mono text-xs text-gray-500">{u.userId}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold">{u.profile.fullName || 'Applicant'}</span>
                            <span className="text-xs text-gray-500 font-mono">{u.profile.email}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="info">{u.role}</Badge></TableCell>
                        <TableCell><Badge variant="warning">{u.rank}</Badge></TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleApprove(u.userId)}>
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleReject(u.userId)}>
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            ) : activeTab === 'members' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name & Email</TableHead>
                    <TableHead>Authorization Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Informational Rank</TableHead>
                    <TableHead className="text-right">Admin Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.userId}>
                      <TableCell className="font-mono text-xs text-gray-500">{u.userId}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-gray-100">{u.profile.fullName || 'User'}</span>
                          <span className="text-xs text-gray-500 font-mono">{u.profile.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.role === 'ADMIN' ? 'danger' : u.role === 'SUPERVISOR' ? 'special' : 'info'}>
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.accountStatus === 'ACTIVE' ? 'success' : u.accountStatus === 'PENDING' ? 'warning' : 'danger'}>
                          {u.accountStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="warning"><Award size={12} className="mr-1 inline" /> {u.rank}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setRoleModalUser(u);
                            setSelectedRole(u.role);
                          }}
                        >
                          <Shield size={14} className="mr-1" /> Change Role
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setRankModalUser(u);
                            setSelectedRank(u.rank);
                          }}
                        >
                          <Award size={14} className="mr-1" /> Change Rank
                        </Button>
                        {u.accountStatus === 'ACTIVE' ? (
                          <Button variant="destructive" size="sm" onClick={() => handleSuspend(u.userId)}>
                            <ShieldAlert size={14} />
                          </Button>
                        ) : u.accountStatus === 'SUSPENDED' ? (
                          <Button variant="outline" size="sm" onClick={() => handleReactivate(u.userId)}>
                            Reactivate
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : activeTab === 'audit' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actor User ID</TableHead>
                    <TableHead>Actor Role</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Target User ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log._id}>
                      <TableCell className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-xs">{log.actorUserId}</TableCell>
                      <TableCell><Badge variant="info">{log.actorRole}</Badge></TableCell>
                      <TableCell className="font-bold text-xs">{log.action}</TableCell>
                      <TableCell className="font-mono text-xs text-gray-500">{log.targetUserId || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-bold text-base mb-2 flex items-center space-x-2">
                    <Settings size={18} className="text-cmrl-blue-600" />
                    <span>Security & Custom Claims Architecture</span>
                  </h3>
                  <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    <p>● <strong>Firebase Custom Claims:</strong> Strictly isolated to <code>{`{ role: "STUDENT" | "SUPERVISOR" | "ADMIN" }`}</code>.</p>
                    <p>● <strong>MongoDB Authority:</strong> MongoDB remains authoritative for <code>role</code>, <code>accountStatus</code>, and <code>rank</code>.</p>
                    <p>● <strong>Student Rank Isolation:</strong> Ranks are informational designations and <strong>never</strong> grant authorization.</p>
                  </div>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Change Role Modal (ADMIN ONLY) */}
        {roleModalUser && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
            <Card className="max-w-md w-full bg-white dark:bg-slate-950 p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-lg flex items-center space-x-2">
                  <Shield size={18} className="text-red-600" />
                  <span>Change Authorization Role</span>
                </h3>
                <button onClick={() => setRoleModalUser(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <p className="text-xs text-gray-500">
                  Modifying authorization role for <span className="font-semibold text-slate-800 dark:text-gray-200">{roleModalUser.userId}</span>.
                </p>
                <div className="p-3 rounded bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 text-xs">
                  <strong>Warning:</strong> Role changes grant or restrict system permissions and will immediately synchronize with Firebase Custom Claims.
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">New Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="SUPERVISOR">SUPERVISOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setRoleModalUser(null)}>Cancel</Button>
                <Button size="sm" onClick={handleSaveRole} disabled={updatingRole}>
                  {updatingRole ? 'Updating Claims...' : 'Save Role & Sync Claims'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Change Rank Modal */}
        {rankModalUser && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
            <Card className="max-w-md w-full bg-white dark:bg-slate-950 p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-lg flex items-center space-x-2">
                  <Award size={18} className="text-amber-500" />
                  <span>Change Student Rank</span>
                </h3>
                <button onClick={() => setRankModalUser(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <p className="text-xs text-gray-500">
                  Select new informational rank for <span className="font-semibold text-slate-800 dark:text-gray-200">{rankModalUser.userId}</span>.
                </p>
                <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-xs">
                  <strong>Note:</strong> Rank changes are informational ONLY and do NOT grant authorization.
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Rank Value</label>
                  <select
                    value={selectedRank}
                    onChange={(e) => setSelectedRank(e.target.value as StudentRank)}
                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                  >
                    <option value="NEWBIE">NEWBIE</option>
                    <option value="MEMBER">MEMBER</option>
                    <option value="SENIOR_MEMBER">SENIOR_MEMBER</option>
                    <option value="CREATOR">CREATOR</option>
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="ADVANCED">ADVANCED</option>
                    <option value="EXPERT">EXPERT</option>
                    <option value="LEGEND">LEGEND</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setRankModalUser(null)}>Cancel</Button>
                <Button size="sm" onClick={handleSaveRank} disabled={updatingRank}>
                  {updatingRank ? 'Saving...' : 'Update Rank'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </PageContainer>
    </Section>
  );
}
