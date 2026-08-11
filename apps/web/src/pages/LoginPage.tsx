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
import { GoogleRegistrationModal } from '@/components/auth/GoogleRegistrationModal';
import { Atom, LogIn, Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const { login, loginWithGoogle, error: authError } = useAuth();
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      await login(email, password);
      showSuccess('Successfully signed in to CMRL Research Portal.');
      navigate('/dashboard');
    } catch (err: unknown) {
      const friendlyMsg = getFriendlyErrorMessage(err, 'Failed to sign in. Please verify your credentials.');
      setErrorMsg(friendlyMsg);
      showError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.isNewUser) {
        setShowGoogleModal(true);
      } else {
        showSuccess('Google sign-in successful.');
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const friendlyMsg = getFriendlyErrorMessage(err, 'Google sign-in failed.');
      setErrorMsg(friendlyMsg);
      showError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <PageContainer className="flex justify-center items-center py-12">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto p-3 w-fit rounded-full bg-cmrl-blue-50 dark:bg-slate-900 text-cmrl-blue-600">
              <Atom size={32} />
            </div>
            <CardTitle className="text-2xl font-bold">Portal Sign In</CardTitle>
            <p className="text-xs text-gray-500">Access CMRL research portal workspace</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {(errorMsg || authError) && (
              <ErrorState title="Sign In Error" message={errorMsg || authError || undefined} />
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <Input
                  type="email"
                  required
                  placeholder="researcher@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
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
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                <LogIn className="mr-2 h-4 w-4" /> {loading ? 'Signing in...' : 'Sign In with Email'}
              </Button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
              Sign In with Google
            </Button>
          </CardContent>

          <CardFooter className="justify-center border-t border-gray-100 dark:border-slate-800 pt-4">
            <p className="text-xs text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-cmrl-blue-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </PageContainer>

      {/* Google First-Time Registration Modal */}
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
