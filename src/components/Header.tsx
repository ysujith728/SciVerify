import React from 'react';
import { History, BookOpen, GraduationCap, Sun, Moon } from 'lucide-react';
import { SciVerifyHeroLogo } from './SciVerifyHeroLogo';

interface HeaderProps {
  onToggleHistory: () => void;
  historyCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleHistory, historyCount, theme, onToggleTheme, onLogoClick }) => {
  const isDarkMode = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/5 bg-paper/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand: Sharp & Clinical Monogram */}
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group select-none"
        >
          <div className="flex items-center text-cobalt select-none transition-transform group-hover:scale-[1.02]">
            <SciVerifyHeroLogo variant="navbar" layoutId="main-logo-container" className="text-cobalt" />
          </div>
          <div className="border-l border-slate-200 dark:border-white/10 pl-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-slate-600 dark:text-slate-300 tracking-wider group-hover:border-cobalt/35 transition-colors">
                SYS_VER_2.4
              </span>
            </div>
            <p className="hidden sm:block text-[9px] text-slate-500 font-mono uppercase tracking-widest group-hover:text-slate-400 dark:group-hover:text-slate-300 transition-colors">Verify Smarter. Trust Science.</p>
          </div>
        </button>

        {/* Action Controls: Boxy & Minimal */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://github.com/akb/scifact"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-ink transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-cobalt" />
            SciFact.Corpus
          </a>
          
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500">
            <GraduationCap className="h-3.5 w-3.5" />
            NLP_24-25
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-ink hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-cobalt rounded-lg"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* History Drawer Trigger */}
          <button
            onClick={onToggleHistory}
            className="relative flex items-center gap-2 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-slate-700 dark:text-ink shadow-sm hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all active:translate-y-0.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cobalt rounded-none"
          >
            <History className="h-3.5 w-3.5 text-slate-400" />
            <span>History</span>
            {historyCount > 0 ? (
              <span className="ml-1 border-l border-slate-200 dark:border-white/10 pl-2 text-[10px] font-bold text-cobalt">
                [{historyCount}]
              </span>
            ) : (
              <span className="ml-1 border-l border-slate-200 dark:border-white/10 pl-2 text-[10px] text-slate-500">
                [0]
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
