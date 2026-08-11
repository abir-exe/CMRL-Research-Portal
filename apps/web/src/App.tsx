
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="absolute top-4 right-4 p-2 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cmrl-theme">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <ThemeToggle />
        <h1 className="text-4xl font-bold text-cmrl-blue-900 dark:text-cmrl-blue-100 mb-4">CMRL Research Portal</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Phase 1 Design System.</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
