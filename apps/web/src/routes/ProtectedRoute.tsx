import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';
import { LoadingState } from '@/components/ui/LoadingState';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, ShieldAlert, LogOut } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  requireActiveAccount?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  requireActiveAccount = true,
}) => {
  const { firebaseUser, mongoUser, loading, logout } = useAuth();

  if (loading) {
    return (
      <Section>
        <PageContainer className="flex justify-center items-center py-20">
          <LoadingState message="Verifying CMRL authentication context..." size="lg" />
        </PageContainer>
      </Section>
    );
  }

  if (!firebaseUser || !mongoUser) {
    return <Navigate to="/login" replace />;
  }

  // Account status verification
  if (requireActiveAccount && mongoUser.accountStatus === 'PENDING') {
    return (
      <Section>
        <PageContainer className="flex justify-center items-center py-12">
          <Card className="max-w-lg w-full text-center p-6 border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader className="items-center">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 mb-2">
                <Clock size={36} />
              </div>
              <Badge variant="warning">PENDING APPROVAL</Badge>
              <CardTitle className="text-xl font-bold mt-2">Registration Pending Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Your account (<span className="font-mono text-slate-900 dark:text-gray-100">{mongoUser.profile.email}</span>) has been created successfully.
              </p>
              <p>
                As required by CMRL research security policies, your registration is currently under review by the Lab Supervisor or Administrator before active material access is granted.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </PageContainer>
      </Section>
    );
  }

  if (requireActiveAccount && mongoUser.accountStatus === 'REJECTED') {
    return (
      <Section>
        <PageContainer className="flex justify-center items-center py-12">
          <Card className="max-w-lg w-full text-center p-6 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader className="items-center">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50 text-semantic-danger mb-2">
                <ShieldAlert size={36} />
              </div>
              <Badge variant="danger">REGISTRATION NOT APPROVED</Badge>
              <CardTitle className="text-xl font-bold mt-2">Registration Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Your registration for the CMRL research portal was not approved at this time.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </PageContainer>
      </Section>
    );
  }

  if (requireActiveAccount && (mongoUser.accountStatus === 'SUSPENDED' || mongoUser.accountStatus === 'INACTIVE')) {
    return (
      <Section>
        <PageContainer className="flex justify-center items-center py-12">
          <Card className="max-w-lg w-full text-center p-6 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader className="items-center">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50 text-semantic-danger mb-2">
                <ShieldAlert size={36} />
              </div>
              <Badge variant="danger">ACCOUNT {mongoUser.accountStatus}</Badge>
              <CardTitle className="text-xl font-bold mt-2">Access Restricted</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Your CMRL research portal account status is currently <span className="font-semibold">{mongoUser.accountStatus}</span>. Please contact your laboratory supervisor or administrator.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </PageContainer>
      </Section>
    );
  }

  // Role verification
  if (allowedRoles && !allowedRoles.includes(mongoUser.role)) {
    return (
      <Section>
        <PageContainer className="flex justify-center items-center py-12">
          <Card className="max-w-lg w-full text-center p-6">
            <CardHeader className="items-center">
              <ShieldAlert size={36} className="text-semantic-danger mb-2" />
              <Badge variant="danger">FORBIDDEN ROLE</Badge>
              <CardTitle className="text-xl font-bold mt-2">Insufficient Permissions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-300">
              Your role (<span className="font-semibold">{mongoUser.role}</span>) does not have authorization to view this section.
            </CardContent>
          </Card>
        </PageContainer>
      </Section>
    );
  }

  return <Outlet />;
};
