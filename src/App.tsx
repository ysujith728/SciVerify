import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Header } from './components/Header';
import { ClaimInput } from './components/ClaimInput';
import { LoadingState } from './components/LoadingState';
import { ResultsView } from './components/ResultsView';
import { HistorySidebar } from './components/HistorySidebar';
import { TrustSection } from './components/TrustSection';
import { SciVerifyHeroLogo } from './components/SciVerifyHeroLogo';
import { generateVerification } from './services/mockVerification';
import type { VerificationResult } from './services/mockVerification';

type BootPhase = 
  | 'BOOT_CHAOS' 
  | 'BOOT_GLOW'
  | 'BOOT_EMIT'
  | 'BOOT_COLLAPSE'
  | 'BOOT_VERIFICATION' 
  | 'BOOT_REVEAL'
  | 'BOOT_MORPH' 
  | 'READY';

// Drifting canvas with self-organizing molecular/orbital physics
const BackgroundCanvas: React.FC<{ bootPhase: BootPhase; speedFactor?: number }> = ({ bootPhase, speedFactor = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const phaseStartRef = useRef<number>(Date.now());
  const prevPhaseRef = useRef<string>(bootPhase);

  // Track coordinates and trajectories
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    distance: number;
    speed: number;
    size: number;
    chainId: number;
  }>>([]);

  useEffect(() => {
    if (bootPhase !== prevPhaseRef.current) {
      phaseStartRef.current = Date.now();
      prevPhaseRef.current = bootPhase;
    }
  }, [bootPhase]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const numParticles = 30;
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: numParticles }).map((_, idx) => {
        const chainId = Math.floor(idx / 10);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          angle: Math.random() * Math.PI * 2,
          distance: 0,
          speed: Math.random() * 90 + 35,
          size: Math.random() * 1.5 + 0.8,
          chainId,
        };
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      particles.forEach((p) => {
        // Drift normally right from the start
        p.x += p.vx * speedFactor;
        p.y += p.vy * speedFactor;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.fill();
      });

      // Faint linkages
      ctx.beginPath();
      for (let i = 0; i < numParticles; i++) {
        const p1 = particles[i];
        if (i < numParticles - 1 && particles[i + 1].chainId === p1.chainId) {
          const p2 = particles[i + 1];
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const pi = particles[i];
          const pj = particles[j];

          if (pi.chainId !== pj.chainId) {
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.018 * speedFactor;
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
            }
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion, speedFactor]);

  if (shouldReduceMotion) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none block z-0" />;
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sciverify_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // signature dark mode by default
  });
  const [bootPhase, setBootPhase] = useState<BootPhase>(() => {
    const booted = sessionStorage.getItem('sciverify_booted');
    return booted ? 'READY' : 'BOOT_CHAOS';
  });
  const [isBooting, setIsBooting] = useState(() => {
    const booted = sessionStorage.getItem('sciverify_booted');
    return !booted;
  });
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [historyList, setHistoryList] = useState<VerificationResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('sciverify_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const shouldReduceMotion = useReducedMotion();

  // Fail-safe backup timer (Overlay dims and vanishes within 5.5s max under any condition)
  useEffect(() => {
    if (shouldReduceMotion) {
      setBootPhase('READY');
      setIsBooting(false);
      return;
    }

    const failsafe = setTimeout(() => {
      setBootPhase('READY');
      setIsBooting(false);
    }, 5500);

    return () => clearTimeout(failsafe);
  }, [shouldReduceMotion]);

  // Boot sequence timelines (0ms -> 3600ms morph -> 4200ms ready)
  useEffect(() => {
    if (shouldReduceMotion || bootPhase === 'READY') return;

    const t1 = setTimeout(() => setBootPhase('BOOT_MORPH'), 3600);
    const t2 = setTimeout(() => {
      sessionStorage.setItem('sciverify_booted', 'true');
      setBootPhase('READY');
      setIsBooting(false);
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [bootPhase, shouldReduceMotion]);

  // Load history cache on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sciverify_history');
      if (stored) {
        setHistoryList(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse history from localStorage', e);
    }
  }, []);

  const handleVerify = (newClaim: string) => {
    setClaim(newClaim);
    setBootPhase('READY');
    setIsBooting(false);
  };

  const handleLoadingComplete = () => {
    const freshResult = generateVerification(claim);
    setResult(freshResult);
    
    setHistoryList(prev => {
      const updated = [freshResult, ...prev.filter(item => item.claim !== freshResult.claim)].slice(0, 10);
      localStorage.setItem('sciverify_history', JSON.stringify(updated));
      return updated;
    });

    setBootPhase('READY');
    setIsBooting(false);
  };

  const handleReset = () => {
    setClaim('');
    setResult(null);
  };

  const handleSelectHistory = (selectedResult: VerificationResult) => {
    setClaim(selectedResult.claim);
    setResult(selectedResult);
  };

  const handleClearHistory = () => {
    setHistoryList([]);
    localStorage.removeItem('sciverify_history');
  };

  // Stagger entry configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-paper text-ink selection:bg-blue-500/25 selection:text-blue-100 font-sans transition-colors duration-300 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Drifting Background Coordinate Canvas (Loaded immediately) */}
      {claim === '' && (
        <BackgroundCanvas bootPhase={bootPhase} speedFactor={isInputActive ? 0.25 : 1} />
      )}

      {/* Grid Pattern overlay lines */}
      <div className="grid-perspective-container opacity-40">
        <div className="scientific-grid-3d opacity-100 scientific-grid-animate" />
      </div>
 
      {/* Full-screen boot overlay sequence */}
      {isBooting && (
        <div 
          className={`fixed inset-0 bg-[#030712]/90 flex flex-col items-center justify-center z-50 select-none overflow-hidden transition-all duration-600 ${
            bootPhase === 'BOOT_MORPH' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Faint 3D grid layout inside the boot overlay */}
          <div className="grid-perspective-container opacity-60">
            <div className="scientific-grid-3d opacity-100" />
          </div>
 
          {/* Redesigned SciVerify hero logo */}
          {bootPhase !== 'BOOT_MORPH' && bootPhase !== 'READY' && (
            <SciVerifyHeroLogo variant="boot" layoutId="main-logo-container" className="z-10" />
          )}
        </div>
      )}

      {/* Top Navbar Header (Logo morphs in during boot morph) */}
      {(bootPhase === 'BOOT_MORPH' || bootPhase === 'READY') && (
        <motion.div 
          variants={itemVariants} 
          className={`relative z-10 transition-opacity duration-500 ${
            isInputActive ? 'opacity-25' : 'opacity-100'
          }`}
        >
          <Header 
            onToggleHistory={() => setIsHistoryOpen(prev => !prev)} 
            historyCount={historyList.length} 
            theme={theme}
            onToggleTheme={toggleTheme}
            onLogoClick={handleReset}
          />
        </motion.div>
      )}

      {/* Main scientific viewport (Slides up after boot completes) */}
      <main 
        className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 transition-all duration-700 ${
          isBooting ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0'
        }`}
      >
        {claim === '' && !result ? (
          <div className="space-y-16">
            
            {/* Centered Hero Header */}
            <motion.div 
              variants={itemVariants} 
              className={`text-center space-y-4 max-w-2xl mx-auto transition-opacity duration-500 ${
                isInputActive ? 'opacity-15' : 'opacity-100'
              }`}
            >
              <h1 className="font-serif text-5xl font-extrabold tracking-tight text-ink md:text-6xl select-none">
                SciVerify
              </h1>
              <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-lg mx-auto">
                Verify scientific claims using evidence from peer-reviewed research.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ClaimInput onVerify={handleVerify} onFocusChange={setIsInputActive} />
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className={`transition-opacity duration-500 ${isInputActive ? 'opacity-10' : 'opacity-100'}`}
            >
              <TrustSection />
            </motion.div>
          </div>
        ) : claim !== '' && !result ? (
          <LoadingState claim={claim} onComplete={handleLoadingComplete} />
        ) : result ? (
          <ResultsView result={result} onReset={handleReset} />
        ) : null}
      </main>

      {/* Technical instrument footer */}
      <motion.footer 
        className={`w-full border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#05070c] py-8 mt-24 text-[10px] font-mono tracking-wider text-slate-500 relative z-10 transition-opacity duration-500 ${
          isBooting 
            ? 'opacity-0 pointer-events-none' 
            : isInputActive 
              ? 'opacity-10' 
              : 'opacity-100'
        }`}
        variants={itemVariants}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p>© {new Date().getFullYear()} SCIVERIFY CORE INFERENCE LAB • CS 23CSE471 PROJECT</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">PRIVACY_CODE</a>
            <a href="#" className="hover:text-slate-300 transition-colors">CORPUS_AGREEMENT</a>
            <a href="mailto:support@sciverify.edu" className="hover:text-slate-300 transition-colors">COMMUNICATIONS</a>
          </div>
        </div>
      </motion.footer>

      {/* Drawer for History ledger */}
      <HistorySidebar
        historyList={historyList}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelect={handleSelectHistory}
        onClear={handleClearHistory}
      />
    </motion.div>
  );
}

export default App;
