import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UNIVERSITIES, DEPARTMENTS, normalizeBDMobile, validateUniversityRoll } from '@cmrl/shared';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { getFriendlyErrorMessage } from '@/lib/errorHandler';
import {
  UserCheck,
  Shield,
  Award,
  Edit3,
  Save,
  LogOut,
  Lock,
  Camera,
  RotateCcw,
  CheckCircle2,
  Key,
  ShieldCheck,
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export function ProfilePage() {
  const { firebaseUser, mongoUser, token, logout, refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();

  // Profile Form States
  const [fullName, setFullName] = useState(mongoUser?.profile?.fullName || '');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>((mongoUser?.profile?.gender as 'Male' | 'Female') || '');
  const [mobileNum, setMobileNum] = useState(mongoUser?.profile?.mobile || '');
  const [university, setUniversity] = useState(mongoUser?.profile?.university || 'Pabna University of Science and Technology');
  const [department, setDepartment] = useState(mongoUser?.profile?.department || 'Department of Physics');
  const [universityRoll, setUniversityRoll] = useState(mongoUser?.profile?.universityRoll || '');
  const [batch, setBatch] = useState(mongoUser?.profile?.batch || '');
  const [photoUrl, setPhotoUrl] = useState(mongoUser?.profile?.photoUrl || '');
  const [savingProfile, setSavingProfile] = useState(false);

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  if (!mongoUser) return null;

  const isGoogleUser = firebaseUser?.providerData.some((p) => p.providerId === 'google.com');
  const isRollLocked = mongoUser.accountStatus === 'ACTIVE';

  // Calculate Profile Completion Percentage
  const calculateProfileCompletion = () => {
    const fields = [
      { name: 'Full Name', value: mongoUser.profile?.fullName },
      { name: 'Email', value: mongoUser.profile?.email },
      { name: 'University', value: mongoUser.profile?.university },
      { name: 'Department', value: mongoUser.profile?.department },
      { name: 'University Roll', value: mongoUser.profile?.universityRoll },
      { name: 'Mobile Number', value: mongoUser.profile?.mobile },
      { name: 'Gender', value: mongoUser.profile?.gender },
      { name: 'Profile Photo', value: mongoUser.profile?.photoUrl },
      { name: 'Research Bio', value: mongoUser.researchProfile?.bio },
      { name: 'Research Interests', value: mongoUser.researchProfile?.researchInterests?.length },
    ];

    const completed = fields.filter((f) => Boolean(f.value)).length;
    const percentage = Math.round((completed / fields.length) * 100);
    const missing = fields.filter((f) => !f.value).map((f) => f.name);

    return { percentage, missing };
  };

  const { percentage: completionPercentage, missing: missingFields } = calculateProfileCompletion();

  // Save Profile Changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    let normalizedMobile = '';
    if (mobileNum) {
      const valid = normalizeBDMobile(mobileNum);
      if (!valid) {
        showError('Please enter a valid Bangladeshi mobile number (+8801XXXXXXXXX).');
        setSavingProfile(false);
        return;
      }
      normalizedMobile = valid;
    }

    if (universityRoll && !validateUniversityRoll(universityRoll)) {
      showError('University Roll must contain digits only.');
      setSavingProfile(false);
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/users/profile`,
        {
          fullName: fullName.trim(),
          gender,
          mobile: normalizedMobile,
          university,
          department,
          universityRoll: isRollLocked ? undefined : universityRoll.trim(),
          batch: batch.trim(),
          photoUrl: photoUrl.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showSuccess('Profile updated successfully.');
      await refreshUser();
    } catch (err: unknown) {
      const msg = getFriendlyErrorMessage(err, 'Failed to update profile.');
      showError(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  // Profile Image Upload / Reset
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showError('Image size exceeds 2MB limit. Please select a smaller image.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showError('Invalid file format. Please select an image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result);
        showSuccess('New avatar image loaded. Click "Save Profile Changes" to apply.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetGooglePhoto = () => {
    if (mongoUser.profile?.googlePhotoUrl) {
      setPhotoUrl(mongoUser.profile.googlePhotoUrl);
      showSuccess('Avatar reset to Google Profile Photo. Click "Save Profile Changes" to apply.');
    }
  };

  // Password Update for Email/Password Users
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseUser || !firebaseUser.email) return;

    if (newPassword !== confirmNewPassword) {
      showError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      showError('New password must be at least 8 characters long.');
      return;
    }

    setUpdatingPassword(true);
    try {
      // Re-authenticate user first
      const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);

      // Update password
      await updatePassword(firebaseUser, newPassword);
      showSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: unknown) {
      const msg = getFriendlyErrorMessage(err, 'Failed to update password. Please check your current password.');
      showError(msg);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">● ACTIVE</Badge>;
      case 'PENDING':
        return <Badge variant="warning">● PENDING APPROVAL</Badge>;
      case 'SUSPENDED':
        return <Badge variant="danger">● SUSPENDED</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge variant="danger">
            <Shield size={12} className="mr-1 inline" /> ADMIN
          </Badge>
        );
      case 'SUPERVISOR':
        return (
          <Badge variant="special">
            <UserCheck size={12} className="mr-1 inline" /> SUPERVISOR
          </Badge>
        );
      default:
        return <Badge variant="info">STUDENT</Badge>;
    }
  };

  return (
    <Section>
      <PageContainer className="max-w-4xl space-y-8">
        {/* Header Profile Card */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-cmrl-blue-50/40 to-white dark:from-slate-900/60 dark:to-slate-950 p-6">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                {photoUrl || mongoUser.profile.photoUrl ? (
                  <img
                    src={photoUrl || mongoUser.profile.photoUrl}
                    alt="Profile Avatar"
                    className="w-16 h-16 rounded-full object-cover border-2 border-cmrl-blue-400 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-cmrl-blue-100 dark:bg-slate-800 flex items-center justify-center text-cmrl-blue-600 font-bold text-xl border-2 border-cmrl-blue-300">
                    {mongoUser.profile.fullName ? mongoUser.profile.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
                    {mongoUser.profile.fullName || 'CMRL Researcher'}
                  </h1>
                  {getStatusBadge(mongoUser.accountStatus)}
                </div>
                <p className="text-xs font-mono text-gray-500">
                  {mongoUser.userId} • {mongoUser.profile.email}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {mongoUser.profile.department || 'Department of Physics'} • {mongoUser.profile.university || 'Pabna University of Science and Technology'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </div>
          </CardHeader>

          {/* Profile Completion Bar */}
          <div className="p-4 bg-gray-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-gray-700 dark:text-gray-300 flex items-center">
                  <CheckCircle2 size={14} className="mr-1 text-cmrl-blue-600" /> Profile Completion: {completionPercentage}%
                </span>
                <span className="text-gray-500">{10 - missingFields.length} of 10 items</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cmrl-blue-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            {missingFields.length > 0 && (
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium sm:text-right">
                Missing: {missingFields.slice(0, 3).join(', ')}{missingFields.length > 3 ? '...' : ''}
              </span>
            )}
          </div>
        </Card>

        {/* Identity & Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex flex-col justify-center items-center text-center space-y-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account Standing</span>
            <div className="pt-1">{getStatusBadge(mongoUser.accountStatus)}</div>
            <p className="text-[10px] text-gray-400 mt-1">Authoritative MongoDB Record</p>
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
            <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-1">Informational Only</p>
          </Card>
        </div>

        {/* Main Editable Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <Edit3 size={18} className="text-cmrl-blue-600" />
              <span>Researcher Academic & Personal Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Profile Avatar Upload / Preview */}
              <div className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Avatar" className="w-14 h-14 rounded-full object-cover border" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-cmrl-blue-100 dark:bg-slate-800 flex items-center justify-center font-bold text-cmrl-blue-600">
                      {fullName.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-gray-100">Profile Picture</h3>
                    <p className="text-[11px] text-gray-400">Upload a custom image (max 2MB) or link image URL.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-gray-300 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-950 text-gray-700 dark:text-gray-200 hover:bg-gray-50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-cmrl-blue-600" /> Upload Photo
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
                  </label>

                  {mongoUser.profile?.googlePhotoUrl && (
                    <Button type="button" variant="outline" size="sm" onClick={handleResetGooglePhoto}>
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset to Google
                    </Button>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-1">
                  1. Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dr. Researcher" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address (Primary)
                    </label>
                    <Input
                      value={mongoUser.profile.email}
                      disabled
                      className="bg-gray-100 dark:bg-slate-900 cursor-not-allowed text-gray-500"
                    />
                    <span className="text-[10px] text-gray-400 block mt-0.5">Linked to Firebase Identity</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                    <select
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cmrl-blue-500"
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Number (BD)
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-2 text-xs rounded-md bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 text-gray-600 dark:text-gray-300 font-mono font-semibold">
                        🇧🇩 +880
                      </span>
                      <Input
                        value={mobileNum}
                        onChange={(e) => setMobileNum(e.target.value)}
                        placeholder="1712345678"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-1">
                  2. Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      University / Institute
                    </label>
                    <select
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cmrl-blue-500"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    >
                      {UNIVERSITIES.map((univ) => (
                        <option key={univ} value={univ}>
                          {univ}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <select
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cmrl-blue-500"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
                      <span>University Roll</span>
                      {isRollLocked && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center">
                          <Lock size={10} className="mr-0.5" /> Locked for Active Members
                        </span>
                      )}
                    </label>
                    <Input
                      value={universityRoll}
                      onChange={(e) => setUniversityRoll(e.target.value.replace(/\D/g, ''))}
                      placeholder="Digits only (e.g. 210601)"
                      disabled={isRollLocked}
                      className={isRollLocked ? 'bg-gray-100 dark:bg-slate-900 cursor-not-allowed text-gray-500' : ''}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Batch / Cohort</label>
                    <Input value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="2025/2026" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={savingProfile}>
                  <Save className="mr-2 h-4 w-4" /> {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security & Password Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <Key size={18} className="text-cmrl-blue-600" />
              <span>Security & Password Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isGoogleUser ? (
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 flex items-start space-x-3 text-xs text-blue-900 dark:text-blue-200">
                <ShieldCheck className="w-5 h-5 text-cmrl-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">Google Authentication Active</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    This CMRL account uses Google Sign-In identity authentication. Password management and account security controls are managed directly through your Google account.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                  <Input
                    type="password"
                    required
                    placeholder="•••••••• (min 8 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={updatingPassword} size="sm">
                  <Key className="mr-2 h-4 w-4" /> {updatingPassword ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </PageContainer>
    </Section>
  );
}
