import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { Atom, UserPlus } from 'lucide-react';

export function RegisterPage() {
  const { register, loginWithGoogle, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      navigate('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Google sign-in failed.');
      }
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
            <CardTitle className="text-2xl font-bold">Register CMRL Account</CardTitle>
            <p className="text-xs text-gray-500">Account status defaults to PENDING until approved</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {(errorMsg || authError) && (
              <ErrorState title="Registration Error" message={errorMsg || authError || undefined} />
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <Input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                <UserPlus className="mr-2 h-4 w-4" /> {loading ? 'Registering...' : 'Register Account'}
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
    </Section>
  );
}
