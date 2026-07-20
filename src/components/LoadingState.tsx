import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface LoadingStateProps {
  claim: string;
  onComplete: () => void;
}

interface Step {
  id: number;
  label: string;
  subLabel: string;
  logs: string[];
}

export const LoadingState: React.FC<LoadingStateProps> = ({ claim, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const steps: Step[] = [
    {
      id: 1,
      label: "Reading Claim",
      subLabel: "NLU parser",
      logs: [
        "Loading text parser...",
        "Sanitizing hypothesis variables...",
        "Registered: '" + (claim.length > 30 ? claim.substring(0, 30) + "..." : claim) + "'",
        "String hash resolved."
      ]
    },
    {
      id: 2,
      label: "Generating Embedding",
      subLabel: "SPECTER2 Encoder",
      logs: [
        "Retrieving SPECTER2 transformer weights...",
        "Tokenizing text input sequence...",
        "Projecting tokens into 768-dimension space...",
        "Vector embedding successfully generated."
      ]
    },
    {
      id: 3,
      label: "Searching Scientific Literature",
      subLabel: "Vector Database Query",
      logs: [
        "Connecting to SciFact dense index...",
        "Executing cosine similarity search (k=50)...",
        "Retrieved candidate citation neighbors...",
        "Scanning target journal databases..."
      ]
    },
    {
      id: 4,
      label: "Ranking Evidence",
      subLabel: "Cross-Encoder Re-ranker",
      logs: [
        "Initializing Cross-Encoder attention weights...",
        "Scoring passage relevances against claim premise...",
        "Pruning low scoring abstracts (cutoff 0.65)...",
        "Top 2 candidate papers isolated."
      ]
    },
    {
      id: 5,
      label: "Running Scientific Inference",
      subLabel: "DeBERTa-v3 NLI Engine",
      logs: [
        "Executing logical alignment tensors...",
        "Evaluating entailment vs contradiction logits...",
        "Computing claim contradiction probabilities...",
        "NLI inference loop finished."
      ]
    },
    {
      id: 6,
      label: "Evaluating Confidence",
      subLabel: "Precision Calibration",
      logs: [
        "Retrieving calibration curves...",
        "Adjusting output distribution bias...",
        "Determining final evidence density...",
        "Confidence percentage locked."
      ]
    },
    {
      id: 7,
      label: "Generating Explanation",
      subLabel: "Grounded LLM Synthesizer",
      logs: [
        "Injecting reference constraints into generator...",
        "Synthesizing research paper summary explanation...",
        "Running verification check against hallucinations...",
        "Report summary compiled."
      ]
    },
    {
      id: 8,
      label: "Preparing Report",
      subLabel: "Data Formatter",
      logs: [
        "Compiling LaTeX-compliant records...",
        "Structuring bibliography records...",
        "Opening results rendering context...",
        "Pipeline completed successfully."
      ]
    }
  ];

  // Pipeline step transition: 900ms per step (Total ~7.2s)
  useEffect(() => {
    const stepDuration = shouldReduceMotion ? 150 : 900;
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(stepInterval);
          setTimeout(() => {
            onComplete();
          }, shouldReduceMotion ? 50 : 500);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(stepInterval);
  }, [shouldReduceMotion]);

  // Handle printing log statements sequentially for the active step
  useEffect(() => {
    setVisibleLogs([]);
    setLogIndex(0);
  }, [currentStep]);

  useEffect(() => {
    const currentStepLogs = steps[currentStep - 1]?.logs || [];
    if (logIndex < currentStepLogs.length) {
      const logDelay = shouldReduceMotion ? 20 : 150;
      const logTimer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, currentStepLogs[logIndex]]);
        setLogIndex((prev) => prev + 1);
      }, logDelay);
      return () => clearTimeout(logTimer);
    }
  }, [currentStep, logIndex, shouldReduceMotion]);

  // Canvas interactive Vector Embedding Space
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Generate random nodes representing citation papers
    const numParticles = 60;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      glow: boolean;
    }> = [];

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        glow: Math.random() > 0.8
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

      // Core cluster position (semantic coordinates)
      const targetX = width / 2;
      const targetY = height / 2;

      // Draw active stages feedback
      // Phase 3+ focuses particles, Phase 5+ connects active cluster
      const stage = currentStep;

      particles.forEach((p) => {
        if (shouldReduceMotion) {
          // static grid representation for reduced motion
          ctx.beginPath();
          ctx.arc(p.baseX, p.baseY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fill();
          return;
        }

        // Adjust forces based on current step
        if (stage >= 3) {
          // Particles pull toward vector embedding space neighborhood center
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Phase 3 & 4: Focus nodes into a local network
          if (dist > 80) {
            p.vx += (dx / dist) * 0.04;
            p.vy += (dy / dist) * 0.04;
          } else {
            // Orbit within active cluster
            p.vx += -vyFactor(p.x - targetX) * 0.01;
            p.vy += vyFactor(p.y - targetY) * 0.01;
          }
        } else {
          // Floating unstructured space
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const limit = stage >= 3 ? 1.5 : 0.6;
        if (speed > limit) {
          p.vx = (p.vx / speed) * limit;
          p.vy = (p.vy / speed) * limit;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders (if not clustered)
        if (stage < 3) {
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        // Render point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (stage >= 3 && Math.abs(p.x - targetX) < 100 && Math.abs(p.y - targetY) < 100) {
          // Active localized search cluster glows cobalt / blue
          ctx.fillStyle = p.glow ? '#60A5FA' : 'rgba(59, 130, 246, 0.6)';
          ctx.fill();
          if (p.glow) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#3B82F6';
          }
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fill();
        }
        ctx.shadowBlur = 0; // reset
      });

      // helper factor
      function vyFactor(val: number) {
        return val < 0 ? -1 : 1;
      }

      // Draw connections in vector space
      ctx.beginPath();
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = stage >= 5 ? 70 : stage >= 3 ? 50 : 40;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (stage >= 5 ? 0.25 : 0.1);
            ctx.strokeStyle = stage >= 5 ? `rgba(16, 185, 129, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
          }
        }
      }
      ctx.stroke();

      // Render query projection laser in stage 2
      if (stage === 2) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.lineWidth = 1;
        ctx.moveTo(targetX, 0);
        ctx.lineTo(targetX, height);
        ctx.stroke();
      }

      // Render search radar scope in stage 3 & 4
      if (stage === 3 || stage === 4) {
        ctx.beginPath();
        ctx.arc(targetX, targetY, 90, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentStep, shouldReduceMotion]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Restated assertion display */}
      <div className="instrument-card p-5 mb-6 border-slate-200 dark:border-white/5 bg-console/40 relative">
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
          Hypothesis Registered for Verification
        </span>
        <p className="font-serif text-sm font-semibold italic text-slate-700 dark:text-slate-200">
          "{claim}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Pipeline Steps (7 cols) */}
        <div className="lg:col-span-7 instrument-card p-6 border-slate-200 dark:border-white/5 bg-console/40 flex flex-col justify-between">
          <div>
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                  INFERENCE_PIPELINE_ACTIVE
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                PHASE [{currentStep}/8]
              </span>
            </div>

            {/* Stages Grid */}
            <div className="space-y-4">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div 
                    key={step.id} 
                    className={`relative flex items-center justify-between transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-[1.01]' : isCompleted ? 'opacity-65' : 'opacity-25'
                    }`}
                  >
                    {/* Circle & Details */}
                    <div className="flex items-center gap-3">
                      {/* Completion indicator */}
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center select-none font-mono">
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 success-glow" />
                        ) : isActive ? (
                          <div className="h-2 w-2 rounded-full bg-cobalt telemetry-glow animate-ping" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                        )}
                      </div>

                      <span className={`text-xs transition-colors font-medium ${
                        isActive ? 'text-cobalt font-bold' : 'text-slate-600 dark:text-slate-300'
                      }`}>
                        {step.label}
                      </span>
                    </div>

                    {/* Sub-label */}
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[8px] uppercase tracking-wider ${
                        isActive ? 'text-cobalt font-semibold' : 'text-slate-500'
                      }`}>
                        {step.subLabel}
                      </span>
                      
                      {/* Mini progress line for active step */}
                      <div className="w-16 h-1 bg-slate-200 dark:bg-white/5 overflow-hidden rounded">
                        {isActive && !shouldReduceMotion ? (
                          <motion.div
                            className="h-full bg-cobalt"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.9, ease: "linear" }}
                          />
                        ) : isCompleted ? (
                          <div className="h-full w-full bg-emerald-500" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 dark:border-white/5 pt-4 flex items-center gap-2 text-[9px] font-mono text-slate-500">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>DO NOT INTERRUPT PIPELINE THREADS • COMPILING VECTOR GRAPH</span>
          </div>
        </div>

        {/* Right Side: Virtual Vector Space Canvas + Live Logs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Vector Space Visualizer Card */}
          <div className="instrument-card border-slate-200 dark:border-white/5 bg-console/40 h-52 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-2 left-3 z-10 text-[8px] font-mono text-slate-500 select-none">
              [VECTOR_SPACE_PROJECTION_SPACE]
            </div>
            
            {/* Interactive Graph Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            <div className="absolute bottom-2 right-3 z-10 text-[7px] font-mono text-slate-500 text-right select-none">
              DIM: 768 • SIM_METRIC: COSINE
            </div>
          </div>

          {/* Telemetry Logs Card */}
          <div className="instrument-card border-slate-200 dark:border-white/5 bg-slate-950 p-4 flex-1 flex flex-col justify-between min-h-[140px] shadow-inner">
            <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-white/5 pb-2 mb-2 text-[8px] text-slate-500 font-bold uppercase tracking-wider">
              <Terminal className="h-3 w-3" />
              <span>telemetry stdout console</span>
            </div>
            
            <div className="font-mono text-[9px] leading-relaxed text-slate-400 space-y-1 overflow-hidden flex-1">
              {visibleLogs.length === 0 ? (
                <div className="text-slate-600 italic">[Waiting for compiler stream...]</div>
              ) : (
                <div className="space-y-0.5">
                  {visibleLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-1">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className={index === visibleLogs.length - 1 ? 'text-cobalt font-semibold' : 'text-slate-400'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  {logIndex < (steps[currentStep - 1]?.logs.length || 0) && (
                    <div className="flex items-center gap-0.5">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className="inline-block h-3 w-1.5 bg-cobalt animate-pulse" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
