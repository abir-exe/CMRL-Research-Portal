import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UNIVERSITIES, DEPARTMENTS, normalizeBDMobile, validateUniversityRoll } from '@cmrl/shared';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { getFriendlyErrorMessage } from '@/lib/errorHandler';

interface GoogleRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const GoogleRegistrationModal: React.FC<GoogleRegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { firebaseUser, syncRegistration } = useAuth();
  const { showSuccess, showError } = useToast();

  const [fullName, setFullName] = useState(firebaseUser?.displayName || '');
  const [universityRoll, setUniversityRoll] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('Male');
  const [mobileNum, setMobileNum] = useState('');
  const [university, setUniversity] = useState<string>('Pabna University of Science and Technology');
  const [department, setDepartment] = useState<string>('Department of Physics');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !firebaseUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      const msg = 'Please enter your Full Name.';
      setErrorMsg(msg);
      showError(msg);
      return;
    }

    if (!validateUniversityRoll(universityRoll)) {
      const msg = 'University Roll must contain digits only.';
      setErrorMsg(msg);
      showError(msg);
      return;
    }

    if (!gender) {
      const msg = 'Please select your Gender.';
      setErrorMsg(msg);
      showError(msg);
      return;
    }

    const validMobile = normalizeBDMobile(mobileNum);
    if (!validMobile) {
      const msg = 'Please enter a valid Bangladeshi mobile number (10 digits starting with 013-019).';
      setErrorMsg(msg);
      showError(msg);
      return;
    }

    setLoading(true);
    try {
      await syncRegistration({
        fullName: fullName.trim(),
        universityRoll: universityRoll.trim(),
        gender,
        mobile: validMobile,
        university,
        department,
      });

      showSuccess('Google registration submitted! Account status is PENDING supervisor approval.');
      onSuccess();
    } catch (err: unknown) {
      const friendlyMsg = getFriendlyErrorMessage(err, 'Failed to complete registration. Please try again.');
      setErrorMsg(friendlyMsg);
      showError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <Card className="w-full max-w-lg shadow-2xl border-cmrl-blue-200 dark:border-slate-800 my-8">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto p-3 w-fit rounded-full bg-cmrl-blue-50 dark:bg-slate-900 text-cmrl-blue-600">
            <Sparkles size={28} />
          </div>
          <CardTitle className="text-xl font-bold">Complete Your CMRL Registration</CardTitle>
          <p className="text-xs text-gray-500">
            Google identity verified ({firebaseUser.email}). Please complete mandatory academic details.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google Avatar Preview & Name */}
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
              {firebaseUser.photoURL ? (
                <img src={firebaseUser.photoURL} alt="Google Avatar" className="w-10 h-10 rounded-full border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-cmrl-blue-100 dark:bg-slate-800 flex items-center justify-center font-bold text-cmrl-blue-600">
                  {firebaseUser.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <div className="text-xs space-y-0.5">
                <span className="font-semibold text-slate-900 dark:text-gray-100 block">
                  {firebaseUser.displayName || 'Google Account'}
                </span>
                <span className="text-gray-400 font-mono block">{firebaseUser.email}</span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Student Researcher"
              />
            </div>

            {/* University Roll & Gender Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  University Roll <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Digits only (e.g. 210601)"
                  value={universityRoll}
                  onChange={(e) => setUniversityRoll(e.target.value.replace(/\D/g, ''))}
                />
                <span className="text-[10px] text-gray-400 block mt-0.5">Stored as string identifier</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cmrl-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Mobile Number with BD Country Code */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-2 text-xs rounded-md bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 text-gray-600 dark:text-gray-300 font-mono font-semibold">
                  🇧🇩 +880
                </span>
                <Input
                  type="tel"
                  required
                  placeholder="1712345678"
                  value={mobileNum}
                  onChange={(e) => setMobileNum(e.target.value)}
                  className="flex-1"
                />
              </div>
              <span className="text-[10px] text-gray-400 block mt-0.5">Format: 013-019XXXXXXXX (10 digits)</span>
            </div>

            {/* University Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                University / Institute <span className="text-red-500">*</span>
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

            {/* Department Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
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

            <div className="pt-2 flex justify-end space-x-3">
              <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={loading}>
                <UserCheck className="mr-2 h-4 w-4" /> {loading ? 'Submitting...' : 'Complete & Submit Registration'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
