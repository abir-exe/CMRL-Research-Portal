import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, Layers, Bell, User, ArrowRight, CheckCircle2, AlertCircle, Edit3 } from 'lucide-react';
import axios from 'axios';

interface NotificationItem {
  _id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export function StudentDashboardPage() {
  const { mongoUser, token } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data?.success) {
            setNotifications(res.data.data);
          }
        })
        .catch(() => {});
    }
  }, [token]);

  if (!mongoUser) return null;

  // Calculate Profile Completion
  const profileFields = [
    mongoUser.profile?.fullName,
    mongoUser.profile?.email,
    mongoUser.profile?.university,
    mongoUser.profile?.department,
    mongoUser.profile?.universityRoll,
    mongoUser.profile?.mobile,
    mongoUser.profile?.gender,
    mongoUser.profile?.photoUrl,
    mongoUser.researchProfile?.bio,
    mongoUser.researchProfile?.researchInterests?.length,
  ];

  const completedCount = profileFields.filter(Boolean).length;
  const completionPercentage = Math.round((completedCount / profileFields.length) * 100);

  return (
    <Section>
      <PageContainer className="space-y-8">
        {/* Welcome Hero Banner */}
        <div className="rounded-xl border border-cmrl-blue-200 dark:border-slate-800 bg-gradient-to-r from-cmrl-blue-50/80 to-white dark:from-slate-900 dark:to-slate-950 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="info">STUDENT WORKSPACE</Badge>
                <Badge variant="warning">
                  <Award size={12} className="mr-1 inline" /> Rank: {mongoUser.rank}
                </Badge>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
                Welcome, {mongoUser.profile.fullName || 'Student Researcher'}!
              </h1>
              <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
                {mongoUser.userId} • {mongoUser.profile.department || 'Department of Physics'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> View Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Link to="/research" className="flex items-center">
                  Explore Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Non-intrusive Profile Completion Prompt */}
        {completionPercentage < 100 && (
          <div className="rounded-xl p-4 bg-amber-50/80 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400">
                <AlertCircle size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-gray-100">
                  Profile is {completionPercentage}% Complete
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete your academic details, mobile number, and research bio to get the most out of the CMRL portal.
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-amber-300 dark:border-slate-700 hover:bg-amber-100/50">
              <Link to="/profile" className="flex items-center">
                <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Complete Profile
              </Link>
            </Button>
          </div>
        )}

        {/* Dashboard Metric & Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Account Standing</CardTitle>
              <CheckCircle2 size={20} className="text-semantic-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-1">
                {mongoUser.accountStatus}
              </div>
              <p className="text-xs text-gray-500">Verified CMRL Student Researcher</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Assigned Supervisor</CardTitle>
              <GraduationCap size={20} className="text-cmrl-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-slate-900 dark:text-gray-100 mb-1">
                [Placeholder Lab Supervisor]
              </div>
              <p className="text-xs text-gray-500">DFT Hydrides & Materials Group</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Research Project</CardTitle>
              <Layers size={20} className="text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold text-slate-900 dark:text-gray-100 mb-1">
                [Placeholder Project: Perovskite Hydrides Phase Stability]
              </div>
              <p className="text-xs text-gray-500">Status: IN_PROGRESS</p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout: Research Profile & Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <User size={18} className="text-cmrl-blue-600" />
                  <span>Research Interests & Bio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {mongoUser.researchProfile?.researchInterests && mongoUser.researchProfile.researchInterests.length > 0 ? (
                      mongoUser.researchProfile.researchInterests.map((interest, idx) => (
                        <Badge key={idx} variant="info">{interest}</Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">No interests specified yet. Update your profile.</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bio</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {mongoUser.researchProfile?.bio || 'No bio provided yet.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Research & Publications Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="hover:border-cmrl-blue-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <BookOpen size={16} className="text-cmrl-blue-600" />
                    <span>Publications Library</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-gray-500 space-y-2">
                  <p>Browse published papers and research preprints from CMRL.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link to="/publications" className="w-full text-center">View Publications</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:border-cmrl-blue-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Award size={16} className="text-amber-500" />
                    <span>Lab Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-gray-500 space-y-2">
                  <p>Explore recent research grants, awards, and milestones.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link to="/achievements" className="w-full text-center">View Achievements</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Notifications Feed */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Bell size={18} className="text-cmrl-blue-600" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No new notifications.</p>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif._id} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900 dark:text-gray-100">{notif.title}</span>
                        <span className="text-[10px] text-gray-400">{new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{notif.message}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
