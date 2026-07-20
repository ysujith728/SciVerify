import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Trash2, History, ChevronRight } from 'lucide-react';
import type { VerificationResult, Verdict } from '../services/mockVerification';

interface HistorySidebarProps {
  historyList: VerificationResult[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: VerificationResult) => void;
  onClear: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  historyList,
  isOpen,
  onClose,
  onSelect,
  onClear
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getVerdictDisplay = (v: Verdict) => {
    if (v === 'SUPPORT') return 'SUPPORTED';
    if (v === 'CONTRADICT') return 'CONTRADICTED';
    return 'NOT ENOUGH EVIDENCE';
  };

  const getVerdictStyles = (v: Verdict) => {
    switch (v) {
      case 'SUPPORT':
        return 'border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/5';
      case 'CONTRADICT':
        return 'border-rose-500/30 text-rose-700 dark:text-rose-400 bg-rose-500/5';
      case 'NOT ENOUGH INFO':
      default:
        return 'border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-500/5';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#030712]/80 cursor-pointer backdrop-blur-sm"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white/95 dark:bg-[#0b0f19]/95 border-l border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-white/5 px-6 bg-slate-100 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-slate-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                  [SYSTEM_VERIFICATION_HISTORY]
                </h3>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-ink hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer rounded-lg focus:outline-none"
                title="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* List Contents */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {historyList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 border border-dashed border-slate-200 dark:border-white/5 rounded-xl">
                  <div className="flex h-10 w-10 items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-400 mb-3 rounded-lg">
                    <History className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">No Registry Items</h4>
                  <p className="mt-2 text-[10px] font-sans text-slate-550 dark:text-slate-500 max-w-[200px] leading-relaxed">
                    Submitted hypotheses will register in this ledger cache.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {historyList.map((item) => {
                      const badgeClass = getVerdictStyles(item.verdict);
                      return (
                        <motion.div
                          key={item.claim}
                          initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <button
                            onClick={() => {
                              onSelect(item);
                              onClose();
                            }}
                            className="w-full text-left border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 p-4 rounded-xl hover:border-cobalt/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer group flex items-start justify-between gap-3 focus:outline-none focus:ring-1 focus:ring-cobalt"
                          >
                            <div className="flex-1 min-w-0 space-y-2.5">
                              <p className="font-serif text-xs font-semibold text-slate-650 dark:text-slate-300 line-clamp-2 leading-relaxed group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                                "{item.claim}"
                              </p>
                              <div className="flex items-center gap-3">
                                <motion.span 
                                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
                                  animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                  className={`inline-flex border px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider ${badgeClass}`}
                                >
                                  {getVerdictDisplay(item.verdict)}
                                </motion.span>
                                <span className="font-mono text-[9px] text-slate-500">
                                  REF: {item.timestamp}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cobalt group-hover:translate-x-0.5 transition-all self-center mt-0.5" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Clear History Panel */}
            {historyList.length > 0 && (
              <div className="border-t border-slate-200 dark:border-white/5 p-6 bg-slate-100 dark:bg-white/5">
                <button
                  onClick={onClear}
                  className="flex w-full items-center justify-center gap-2 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-rose-500/10 hover:border-rose-500/30 px-4 py-2.5 text-xs font-mono uppercase tracking-widest text-slate-550 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all cursor-pointer focus:outline-none"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>[Purge Registry Logs]</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
