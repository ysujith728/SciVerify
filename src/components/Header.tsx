import React, { useState } from 'react';
import { History, Sun, Moon, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SciVerifyHeroLogo } from './SciVerifyHeroLogo';

interface HeaderProps {
  onToggleHistory: () => void;
  historyCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogoClick?: () => void;
  currentUser: { name: string; email: string; institution: string } | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleHistory,
  historyCount,
  theme,
  onToggleTheme,
  onLogoClick,
  currentUser,
  onOpenLogin,
  onOpenSignup,
  onLogout,
}) => {
  const isDarkMode = theme === 'dark';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-paper/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand: Left side contains ONLY [Logo] SciVerify */}
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-3 p-0 m-0 border-0 bg-transparent text-left focus:outline-none cursor-pointer group select-none"
        >
          <div className="flex items-center text-cobalt select-none transition-transform group-hover:scale-[1.02]">
            <SciVerifyHeroLogo variant="navbar" layoutId="main-logo-container" className="text-cobalt" />
          </div>
        </button>

        {/* Action Controls: Right side contains only useful controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Theme Toggle Button (Always Visible) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-ink hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-cobalt rounded-lg"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* History Drawer Trigger (Always Visible) */}
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

          {/* Conditional Controls based on Authentication Status */}
          {currentUser === null ? (
            /* Logged Out Controls */
            <div className="flex items-center gap-4 select-none font-mono text-xs">
              <button
                onClick={onOpenLogin}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-ink cursor-pointer focus:outline-none transition-colors uppercase tracking-widest"
              >
                Log In
              </button>
              <button
                onClick={onOpenSignup}
                className="border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1.5 font-bold text-slate-700 dark:text-ink shadow-sm hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-cobalt rounded-none uppercase tracking-widest"
              >
                Sign Up
              </button>
            </div>
          ) : (
            /* Logged In Controls */
            <>
              {/* Optional Notification Bell (Highly Premium Aesthetic) */}
              <button
                onClick={() => alert('No active network alerts.')}
                className="flex items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-1.5 text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-ink hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-cobalt rounded-lg"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>

              {/* User Profile Avatar with dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center h-7 w-7 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-[10px] font-mono uppercase font-bold text-cobalt hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
                  title={currentUser.name}
                >
                  {currentUser.name.substring(0, 2)}
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      {/* Overlay backdrop click catcher */}
                      <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
                      
                      {/* Dropdown Panel */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-52 instrument-card p-4 bg-paper border border-slate-200 dark:border-white/10 z-40 shadow-xl flex flex-col gap-2.5 font-mono text-[9px] select-none"
                      >
                        {/* User Credentials details */}
                        <div className="border-b border-slate-200 dark:border-white/10 pb-2.5">
                          <div className="font-bold text-ink text-[10px] truncate">{currentUser.name}</div>
                          <div className="text-slate-500 truncate mt-0.5">{currentUser.email}</div>
                          <div className="inline-flex mt-2 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 text-[8px] text-slate-500 max-w-full truncate rounded-none">
                            {currentUser.institution}
                          </div>
                        </div>

                        {/* Navigation options */}
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            alert(`Institution profile for Dr. ${currentUser.name} is active.`);
                          }}
                          className="w-full text-left py-1 hover:text-cobalt text-slate-700 dark:text-ink cursor-pointer focus:outline-none uppercase tracking-wider font-bold transition-colors"
                        >
                          Profile
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            alert('Auth preferences, keyrings, and workspace settings active.');
                          }}
                          className="w-full text-left py-1 hover:text-cobalt text-slate-700 dark:text-ink cursor-pointer focus:outline-none uppercase tracking-wider font-bold transition-colors border-b border-slate-200 dark:border-white/10 pb-2"
                        >
                          Settings
                        </button>

                        {/* Sign Out command */}
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full text-left py-1 hover:text-red-500 text-slate-700 dark:text-ink cursor-pointer focus:outline-none uppercase tracking-wider font-bold transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

        </div>
      </div>
    </header>
  );
};
