import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { PublicLayout } from '@/components/layout/PublicLayout';

import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ResearchPage } from '@/pages/ResearchPage';
import { PeoplePage } from '@/pages/PeoplePage';
import { SupervisorProfilePage } from '@/pages/SupervisorProfilePage';
import { PublicationsPage } from '@/pages/PublicationsPage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { StudentDashboardPage } from '@/pages/StudentDashboardPage';
import { SupervisorDashboardPage } from '@/pages/SupervisorDashboardPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cmrl-theme">
      <ToastProvider>
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="research" element={<ResearchPage />} />
              <Route path="people" element={<PeoplePage />} />
              <Route path="people/dr-lokman-ali" element={<SupervisorProfilePage />} />
              <Route path="publications" element={<PublicationsPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              
              {/* Authenticated Member Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="notifications" element={<NotificationsPage />} />
              </Route>

              {/* Student Protected Dashboard */}
              <Route element={<ProtectedRoute allowedRoles={['STUDENT', 'SUPERVISOR', 'ADMIN']} />}>
                <Route path="dashboard" element={<StudentDashboardPage />} />
              </Route>

              {/* Supervisor Protected Dashboard */}
              <Route element={<ProtectedRoute allowedRoles={['SUPERVISOR', 'ADMIN']} />}>
                <Route path="supervisor" element={<SupervisorDashboardPage />} />
              </Route>

              {/* Admin Protected Control Center */}
              <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="admin" element={<AdminDashboardPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
