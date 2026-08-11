import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { useToast } from '@/context/ToastContext';
import { getFriendlyErrorMessage } from '@/lib/errorHandler';
import { UNIVERSITIES, DEPARTMENTS, normalizeBDMobile, validateUniversityRoll } from '@cmrl/shared';
import { GoogleRegistrationModal } from '@/components/auth/GoogleRegistrationModal';
import { Atom, UserPlus, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export function RegisterPage() {
  const { register, loginWithGoogle, error: authError } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [universityRoll, setUniversityRoll] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('Male');
  const [mobileNum, setMobileNum] = useState('');
  const [university, setUniversity] = useState<string>('Pabna University of Science and Technology');
  const [department, setDepartment] = useState<string>('Department of Physics');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // Password Policy Checker
  const isLengthValid = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordStrong = isLengthValid && hasUpper && hasLower && hasNumber && hasSpecial;

  const handleRegister = async (e: React.FormEvent) => {
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
      const msg = 'Please enter a valid Bangladeshi mobile number (+8801XXXXXXXXX).';
      setErrorMsg(msg);
      showError(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match. Please verify.';
      setErrorMsg(msg);
      showError(msg);
      return;
    }

    if (!isPasswordStrong) {
      const msg = 'Password does not meet security policy requirements (min 8 chars, uppercase, lowercase, number, special char).';
      setErrorMsg(msg);
      showError(msg);
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password, {
        fullName: fullName.trim(),
        universityRoll: universityRoll.trim(),
        gender,
        mobile: validMobile,
        university,
        department,
      });
      showSuccess('Registration submitted successfully! Account status is PENDING supervisor approval.');
      navigate('/dashboard');
    } catch (err: unknown) {
      const friendlyMsg = getFriendlyErrorMessage(err, 'Registration failed. Please try again.');
      setErrorMsg(friendlyMsg);
      showError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.isNewUser) {
        setShowGoogleModal(true);
      } else {
        showSuccess('Logged in successfully with Google!');
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const friendlyMsg = getFriendlyErrorMessage(err, 'Google registration failed.');
      setErrorMsg(friendlyMsg);
      showError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <PageContainer className="flex justify-center items-center py-12">
        <Card className="w-full max-w-xl shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto p-3 w-fit rounded-full bg-cmrl-blue-50 dark:bg-slate-900 text-cmrl-blue-600">
              <Atom size={32} />
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight">CMRL Researcher Registration</CardTitle>
            <p className="text-xs text-gray-500">Official Crystalline Material Research Lab Academic Portal</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {(errorMsg || authError) && (
              <ErrorState title="Registration Error" message={errorMsg || authError || undefined} />
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Dr. Student Researcher"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* University Roll & Gender */}
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

              {/* Mobile Number with Country Code */}
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
                <span className="text-[10px] text-gray-400 block mt-0.5">Normalized to +8801XXXXXXXXX</span>
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

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  required
                  placeholder="student@pust.ac.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password & Visibility */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Policy Indicator */}
                {password.length > 0 && (
                  <div className="mt-2 p-2 rounded bg-gray-50 dark:bg-slate-900 text-[11px] space-y-1 border border-gray-100 dark:border-slate-800">
                    <span className="font-semibold text-gray-600 dark:text-gray-400 block flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1 text-cmrl-blue-500" /> Password Strength Checklist:
                    </span>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <span className={isLengthValid ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                        {isLengthValid ? '✓' : '○'} Min 8 characters
                      </span>
                      <span className={hasUpper ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                        {hasUpper ? '✓' : '○'} Uppercase letter
                      </span>
                      <span className={hasLower ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                        {hasLower ? '✓' : '○'} Lowercase letter
                      </span>
                      <span className={hasNumber ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                        {hasNumber ? '✓' : '○'} Number
                      </span>
                      <span className={hasSpecial ? 'text-emerald-600 font-semibold font-col-span-2' : 'text-gray-400 font-col-span-2'}>
                        {hasSpecial ? '✓' : '○'} Special character (!@#$%^&*)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                <UserPlus className="mr-2 h-4 w-4" /> {loading ? 'Submitting Registration...' : 'Register Account'}
              </Button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleRegister} disabled={loading}>
              Register with Google
            </Button>
          </CardContent>

          <CardFooter className="justify-center border-t border-gray-100 dark:border-slate-800 pt-4">
            <p className="text-xs text-gray-500">
              Already registered?{' '}
              <Link to="/login" className="text-cmrl-blue-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </PageContainer>

      {/* Google Registration Completion Modal */}
      <GoogleRegistrationModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={() => {
          setShowGoogleModal(false);
          navigate('/dashboard');
        }}
      />
    </Section>
  );
}
