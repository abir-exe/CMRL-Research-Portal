import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PublicLayout } from '@/components/layout/PublicLayout';

import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ResearchPage } from '@/pages/ResearchPage';
import { PeoplePage } from '@/pages/PeoplePage';
import { PublicationsPage } from '@/pages/PublicationsPage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cmrl-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="people" element={<PeoplePage />} />
            <Route path="publications" element={<PublicationsPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
