import { useState, useEffect, useCallback } from 'react';
import { useAuth, MongoUser, StudentRank } from '@/context/AuthContext';
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
import { UserCheck, Check, X, ShieldAlert, Award, RefreshCw, Users, Layers, BookOpen } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export function SupervisorDashboardPage() {
  const { token } = useAuth();
  const { showSuccess, showError } = useToast();
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'suspended'>('pending');
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Rank change modal state
  const [rankModalUser, setRankModalUser] = useState<MongoUser | null>(null);
  const [selectedRank, setSelectedRank] = useState<StudentRank>('NEWBIE');
  const [updatingRank, setUpdatingRank] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data?.success) {
        setUsers(response.data.data);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error?.message) {
        setErrorMsg(err.response.data.error.message);
      } else {
        setErrorMsg('Failed to fetch members list.');
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
      .get(`${API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (isMounted) {
          if (res.data?.success) setUsers(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          if (axios.isAxiosError(err) && err.response?.data?.error?.message) {
            setErrorMsg(err.response.data.error.message);
          } else {
            setErrorMsg('Failed to fetch members list.');
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
        const msg = `User ${userId} was successfully approved.`;
        setSuccessMsg(msg);
        showSuccess(msg);
        fetchUsers();
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
        fetchUsers();
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
        fetchUsers();
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
        fetchUsers();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, `Failed to reactivate ${userId}.`);
      setErrorMsg(friendly);
      showError(friendly);
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
        const msg = `Rank for ${rankModalUser.userId} changed to ${selectedRank}.`;
        setSuccessMsg(msg);
        showSuccess(msg);
        setRankModalUser(null);
        fetchUsers();
      }
    } catch (err: unknown) {
      const friendly = getFriendlyErrorMessage(err, 'Failed to update rank.');
      setErrorMsg(friendly);
      showError(friendly);
    } finally {
      setUpdatingRank(false);
    }
  };

  const pendingUsers = users.filter((u: MongoUser) => u.accountStatus === 'PENDING');
  const activeUsers = users.filter((u: MongoUser) => u.accountStatus === 'ACTIVE');
  const suspendedUsers = users.filter((u: MongoUser) => u.accountStatus === 'SUSPENDED');

  return (
    <Section>
      <PageContainer className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="special">
              <UserCheck size={12} className="mr-1 inline" /> SUPERVISOR REVIEW DASHBOARD
            </Badge>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100">
              Supervisor Member & Research Portal
            </h1>
            <p className="text-sm text-gray-500">
              Manage student registrations, member ranks, and operational research workflows.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh Workspace
          </Button>
        </div>

        {/* Operational Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center space-x-3">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Pending Approval</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100">{pendingUsers.length}</h3>
            </div>
          </Card>

          <Card className="p-4 flex items-center space-x-3">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Active Members</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100">{activeUsers.length}</h3>
            </div>
          </Card>

          <Card className="p-4 flex items-center space-x-3">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600">
              <Layers size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Research Projects</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100">[Placeholder]</h3>
            </div>
          </Card>

          <Card className="p-4 flex items-center space-x-3">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-cmrl-blue-600">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Publications</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100">[Placeholder]</h3>
            </div>
          </Card>
        </div>

        {/* Feedback Messages */}
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
          <ErrorState title="Supervisor Action Error" message={errorMsg} onRetry={fetchUsers} />
        )}

        {/* Member Management Tabs */}
        <Card>
          <CardHeader className="border-b border-gray-100 dark:border-slate-800 pb-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900 dark:hover:text-gray-100'
                }`}
              >
                Pending Registrations ({pendingUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'active'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900 dark:hover:text-gray-100'
                }`}
              >
                Active Members ({activeUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('suspended')}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'suspended'
                    ? 'bg-cmrl-blue-50 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400'
                    : 'text-gray-500 hover:text-slate-900 dark:hover:text-gray-100'
                }`}
              >
                Suspended ({suspendedUsers.length})
              </button>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {loading ? (
              <LoadingState message="Loading members..." size="lg" />
            ) : activeTab === 'pending' ? (
              pendingUsers.length === 0 ? (
                <EmptyState
                  title="No Pending Approvals"
                  description="There are currently no student registrations waiting for supervisor approval."
                  icon={<UserCheck size={32} />}
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name & Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers.map((u: MongoUser) => (
                      <TableRow key={u.userId}>
                        <TableCell className="font-mono text-xs text-gray-500">{u.userId}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-gray-100">{u.profile.fullName || 'Applicant'}</span>
                            <span className="text-xs text-gray-500 font-mono">{u.profile.email}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="info">{u.role}</Badge></TableCell>
                        <TableCell><Badge variant="warning">{u.rank}</Badge></TableCell>
                        <TableCell className="text-xs text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleApprove(u.userId)}>
                            <Check size={14} className="mr-1" /> Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleReject(u.userId)}>
                            <X size={14} className="mr-1" /> Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            ) : activeTab === 'active' ? (
              activeUsers.length === 0 ? (
                <EmptyState title="No Active Members" description="No active member records found." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name & Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Student Rank (Informational)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeUsers.map((u: MongoUser) => (
                      <TableRow key={u.userId}>
                        <TableCell className="font-mono text-xs text-gray-500">{u.userId}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-gray-100">{u.profile.fullName || 'Member'}</span>
                            <span className="text-xs text-gray-500 font-mono">{u.profile.email}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="info">{u.role}</Badge></TableCell>
                        <TableCell>
                          <Badge variant="warning"><Award size={12} className="mr-1 inline" /> {u.rank}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
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
                          {u.role === 'STUDENT' && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleSuspend(u.userId)}
                            >
                              <ShieldAlert size={14} className="mr-1" /> Suspend
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            ) : (
              suspendedUsers.length === 0 ? (
                <EmptyState title="No Suspended Accounts" description="No accounts are currently suspended." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name & Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suspendedUsers.map((u: MongoUser) => (
                      <TableRow key={u.userId}>
                        <TableCell className="font-mono text-xs text-gray-500">{u.userId}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-gray-100">{u.profile.fullName || 'Member'}</span>
                            <span className="text-xs text-gray-500 font-mono">{u.profile.email}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="info">{u.role}</Badge></TableCell>
                        <TableCell><Badge variant="danger">{u.accountStatus}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => handleReactivate(u.userId)}>
                            Reactivate Account
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            )}
          </CardContent>
        </Card>

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
                  <strong>Note:</strong> Rank changes are informational ONLY and do NOT grant authorization or change user roles.
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
