import React from 'react';
import { History, BookOpen, GraduationCap } from 'lucide-react';
import { SciVerifyHeroLogo } from './SciVerifyHeroLogo';

interface HeaderProps {
  onToggleHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onToggleHistory, historyCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand: Sharp & Clinical Monogram */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-cobalt select-none">
            <SciVerifyHeroLogo variant="navbar" layoutId="main-logo-container" className="text-cobalt" />
          </div>
          <div className="border-l border-white/10 pl-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-slate-300 tracking-wider">
                SYS_VER_2.4
              </span>
            </div>
            <p className="hidden sm:block text-[9px] text-slate-500 font-mono uppercase tracking-widest">Verify Smarter. Trust Science.</p>
          </div>
        </div>

        {/* Action Controls: Boxy & Minimal */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/akb/scifact"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-ink transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-cobalt" />
            SciFact.Corpus
          </a>
          
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500">
            <GraduationCap className="h-3.5 w-3.5" />
            NLP_24-25
          </div>

          <button
            onClick={onToggleHistory}
            className="relative flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-ink shadow-sm hover:bg-white/10 hover:border-white/20 transition-all active:translate-y-0.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cobalt rounded-none"
          >
            <History className="h-3.5 w-3.5 text-slate-400" />
            <span>History</span>
            {historyCount > 0 ? (
              <span className="ml-1 border-l border-white/10 pl-2 text-[10px] font-bold text-cobalt">
                [{historyCount}]
              </span>
            ) : (
              <span className="ml-1 border-l border-white/10 pl-2 text-[10px] text-slate-500">
                [0]
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
