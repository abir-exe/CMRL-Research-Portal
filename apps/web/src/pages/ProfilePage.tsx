import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UserCheck, Shield, Award, Edit3, Save, LogOut } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export function ProfilePage() {
  const { mongoUser, token, logout, refreshUser } = useAuth();

  const [fullName, setFullName] = useState(mongoUser?.profile?.fullName || '');
  const [university, setUniversity] = useState(mongoUser?.profile?.university || '');
  const [department, setDepartment] = useState(mongoUser?.profile?.department || '');
  const [batch, setBatch] = useState(mongoUser?.profile?.batch || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!mongoUser) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await axios.patch(
        `${API_BASE_URL}/users/profile`,
        { fullName, university, department, batch },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Profile updated successfully.');
      await refreshUser();
    } catch (err: unknown) {
      console.error('Failed to update profile:', err);
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <Badge variant="success">● ACTIVE</Badge>;
      case 'PENDING': return <Badge variant="warning">● PENDING APPROVAL</Badge>;
      case 'SUSPENDED': return <Badge variant="danger">● SUSPENDED</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN': return <Badge variant="danger"><Shield size={12} className="mr-1 inline" /> ADMIN</Badge>;
      case 'SUPERVISOR': return <Badge variant="special"><UserCheck size={12} className="mr-1 inline" /> SUPERVISOR</Badge>;
      default: return <Badge variant="info">STUDENT</Badge>;
    }
  };

  return (
    <Section>
      <PageContainer className="max-w-4xl space-y-8">
        {/* Header Profile Card */}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-cmrl-blue-100 dark:bg-slate-800 flex items-center justify-center text-cmrl-blue-600 font-bold text-xl">
                {mongoUser.profile.fullName ? mongoUser.profile.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                  {mongoUser.profile.fullName || 'CMRL Researcher'}
                </h1>
                <p className="text-xs font-mono text-gray-500">{mongoUser.userId} • {mongoUser.profile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Identity & Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex flex-col justify-center items-center text-center space-y-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account Status</span>
            <div className="pt-1">{getStatusBadge(mongoUser.accountStatus)}</div>
            <p className="text-[10px] text-gray-400 mt-1">Managed via MongoDB</p>
          </Card>

          <Card className="p-4 flex flex-col justify-center items-center text-center space-y-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Authorization Role</span>
            <div className="pt-1">{getRoleBadge(mongoUser.role)}</div>
            <p className="text-[10px] text-gray-400 mt-1">Backed by Firebase Custom Claim</p>
          </Card>

          <Card className="p-4 flex flex-col justify-center items-center text-center space-y-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Student Rank</span>
            <div className="pt-1">
              <Badge variant="warning">
                <Award size={12} className="mr-1 inline" /> {mongoUser.rank}
              </Badge>
            </div>
            <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-1">Informational Only (Non-Auth)</p>
          </Card>
        </div>

        {/* Edit Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit3 size={18} className="text-cmrl-blue-600" />
              <span>Researcher Profile Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {message && (
              <div className="mb-4 p-3 rounded-md bg-cmrl-blue-50 dark:bg-slate-900 text-xs font-medium text-cmrl-blue-700 dark:text-cmrl-blue-300">
                {message}
              </div>
            )}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Researcher"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Primary)</label>
                  <Input value={mongoUser.profile.email} disabled className="bg-gray-100 dark:bg-slate-900 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">University / Institute</label>
                  <Input
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="University Research Complex"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                  <Input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Department of Physics"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Batch / Cohort</label>
                  <Input
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="2025/2026"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={saving}>
                  <Save className="mr-2 h-4 w-4" /> {saving ? 'Saving...' : 'Save Profile Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </PageContainer>
    </Section>
  );
}
