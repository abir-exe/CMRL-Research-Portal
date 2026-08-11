import { Link } from 'react-router-dom';
import { Atom } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 text-gray-600 dark:text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2 text-cmrl-blue-900 dark:text-cmrl-blue-100">
              <div className="p-1.5 rounded-lg bg-cmrl-blue-100 dark:bg-slate-800 text-cmrl-blue-600 dark:text-cmrl-blue-400">
                <Atom size={20} />
              </div>
              <span className="font-bold text-lg tracking-tight">CMRL</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Crystalline Material Research Lab. Exploring hydrogen storage, computational materials science, and DFT-based research.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-gray-100 mb-3 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-cmrl-blue-600 dark:hover:text-cmrl-blue-400">Home</Link></li>
              <li><Link to="/research" className="hover:text-cmrl-blue-600 dark:hover:text-cmrl-blue-400">Research</Link></li>
              <li><Link to="/about" className="hover:text-cmrl-blue-600 dark:hover:text-cmrl-blue-400">About Us</Link></li>
              <li><Link to="/people" className="hover:text-cmrl-blue-600 dark:hover:text-cmrl-blue-400">People</Link></li>
            </ul>
          </div>

          {/* Col 3: Research */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-gray-100 mb-3 text-xs uppercase tracking-wider">Research Output</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/publications" className="hover:text-cmrl-blue-600 dark:hover:text-cmrl-blue-400">Publications</Link></li>
              <li><Link to="/achievements" className="hover:text-cmrl-blue-600 dark:hover:text-cmrl-blue-400">Achievements</Link></li>
              <li><Link to="/contact" className="hover:text-cmrl-blue-600 dark:hover:text-cmrl-blue-400">Contact</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-gray-100 mb-3 text-xs uppercase tracking-wider">Location</h4>
            <address className="not-italic text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>Crystalline Material Research Lab</p>
              <p>Department of Physics / Materials Science</p>
              <p>University Research Complex</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-800 text-center text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Crystalline Material Research Lab (CMRL). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
