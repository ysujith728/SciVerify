import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SciVerifyHeroLogoProps {
  variant?: 'boot' | 'navbar';
  layoutId?: string;
  className?: string;
}

export const SciVerifyHeroLogo: React.FC<SciVerifyHeroLogoProps> = ({
  variant = 'boot',
  layoutId,
  className = '',
}) => {
  const [angle, setAngle] = useState(0);
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  // Orbit animation loop at 60 FPS (extremely slow and elegant)
  useEffect(() => {
    if (variant !== 'boot') return;

    const animate = (time: number) => {
      const elapsed = Date.now() - startTimeRef.current;
      if (lastTimeRef.current !== undefined) {
        const deltaTime = time - lastTimeRef.current;
        if (elapsed >= 700) {
          // Slowly accelerate and drift (speed factor is 0.000045)
          // Starts at 700ms and reaches full speed at 1800ms (1100ms duration)
          const easeFactor = Math.min(1, (elapsed - 700) / 1100);
          setAngle((prev) => (prev + deltaTime * 0.000045 * easeFactor) % (2 * Math.PI));
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [variant]);

  // SVG representation for compact verification icon (Navbar)
  const renderCompactIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className="h-7 w-7 fill-none select-none pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal container */}
      <path
        d="M50,12 L82,30.5 L82,69.5 L50,88 L18,69.5 L18,30.5 Z"
        stroke="rgba(59, 130, 246, 0.4)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Double Helix checkmark wave */}
      <path
        d="M32,32 C42,22 50,38 46,48 C42,58 50,70 60,60"
        stroke="#3B82F6" // Cobalt Blue
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38,48 L46,56 L68,34"
        stroke="#10B981" // Emerald Green
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Network node indicator */}
      <circle cx="68" cy="34" r="3.5" fill="#10B981" />
    </svg>
  );

  // Custom render methods for the 6 scientific elements (Redesigned 2x-2.5x larger, minimal vector style)
  const renderDocumentNode = (opacity: number) => (
    <motion.g 
      opacity={opacity}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Document page body */}
      <path
        d="M -8,-11 L 3,-11 L 9,-5 L 9,11 C 9,12 8,13 7,13 L -7,13 C -8,13 -9,12 -9,11 L -9,-9 C -9,-10 -8,-11 -7,-11 Z"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="1.8"
        fill="rgba(15, 23, 42, 0.95)"
        strokeLinejoin="round"
      />
      {/* Page fold */}
      <path d="M 3,-11 L 3,-5 L 9,-5" stroke="currentColor" strokeOpacity="0.9" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      {/* Simulated lines */}
      <line x1="-5" y1="-1" x2="5" y2="-1" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="-5" y1="3" x2="5" y2="3" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="-5" y1="7" x2="1" y2="7" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
    </motion.g>
  );

  const renderMoleculeNode = (opacity: number) => (
    <motion.g 
      opacity={opacity}
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
    >
      {/* Connection bonds */}
      <line x1="0" y1="0" x2="-8" y2="-8" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.8" />
      <line x1="0" y1="0" x2="9" y2="-3" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.8" />
      <line x1="0" y1="0" x2="-1" y2="9" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.8" />
      {/* Central atom */}
      <circle cx="0" cy="0" r="4" fill="#3B82F6" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1" />
      {/* Orbiting atoms */}
      <circle cx="-8" cy="-8" r="2.5" fill="#10B981" />
      <circle cx="9" cy="-3" r="2" fill="#3B82F6" />
      <circle cx="-1" cy="9" r="2.8" fill="#10B981" />
    </motion.g>
  );

  const renderVectorNode = (opacity: number) => (
    <motion.g 
      opacity={opacity}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Crosshair grid lines */}
      <line x1="-12" y1="0" x2="-5" y2="0" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="5" y1="0" x2="12" y2="0" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="0" y1="-12" x2="0" y2="-5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="0" y1="5" x2="0" y2="12" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      {/* Target scope rings */}
      <circle cx="0" cy="0" r="7" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.6" fill="none" />
      <circle cx="0" cy="0" r="2" fill="currentColor" />
    </motion.g>
  );

  const renderCitationNode = (opacity: number) => (
    <motion.g 
      opacity={opacity}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Brackets representing citation indexing */}
      <path d="M -7,-9 L -11,-9 L -11,9 L -7,9" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.8" fill="none" />
      <path d="M 7,-9 L 11,-9 L 11,9 L 7,9" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.8" fill="none" />
      {/* Citation page/badge inside brackets */}
      <path
        d="M -3,-6 L 1,-6 L 4,-3 L 4,6 L -3,6 Z"
        stroke="#FBBF24"
        strokeWidth="1.5"
        fill="rgba(15, 23, 42, 0.95)"
        strokeLinejoin="round"
      />
      <circle cx="0.5" cy="1.5" r="1.5" fill="#FBBF24" />
    </motion.g>
  );

  const renderConnectionNode = (opacity: number) => (
    <motion.g 
      opacity={opacity}
      animate={{ opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Graph vertices (connection lines) */}
      <line x1="-8" y1="5" x2="8" y2="5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.8" />
      <line x1="8" y1="5" x2="0" y2="-9" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.8" />
      <line x1="0" y1="-9" x2="-8" y2="5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.8" />
      {/* Vertices/Nodes */}
      <circle cx="-8" cy="5" r="3.2" fill="currentColor" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="8" cy="5" r="3.2" fill="currentColor" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <motion.circle 
        cx="0" 
        cy="-9" 
        r="3.2" 
        fill="#3B82F6" 
        animate={{ scale: [1, 1.15, 1] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
      />
    </motion.g>
  );

  const renderCheckNode = (opacity: number) => (
    <motion.g 
      opacity={opacity}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Hexagonal certification badge */}
      <path
        d="M 0,-11 L 9.5,-5.5 L 9.5,5.5 L 0,11 L -9.5,5.5 L -9.5,-5.5 Z"
        stroke="#10B981"
        strokeWidth="1.8"
        fill="rgba(16, 185, 129, 0.08)"
        strokeLinejoin="round"
      />
      {/* Double verify checkmark lines */}
      <path
        d="M -5,0 L -1.5,3.5 L 5,-3"
        stroke="#10B981"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </motion.g>
  );

  // Compute node parameters (X, Y projection tilted by 10 degrees, with depth scaling and opacity)
  const computeNodes = () => {
    const rx = 190;
    const ry = 65;
    const tilt = 10 * (Math.PI / 180); // 10 degrees in radians
    const cosPhi = Math.cos(tilt);
    const sinPhi = Math.sin(tilt);

    const nodesMetadata = [
      { id: 'doc', render: renderDocumentNode },
      { id: 'mol', render: renderMoleculeNode },
      { id: 'vec', render: renderVectorNode },
      { id: 'cit', render: renderCitationNode },
      { id: 'con', render: renderConnectionNode },
      { id: 'chk', render: renderCheckNode },
    ];

    return nodesMetadata.map((node, i) => {
      // Evenly distribute starting points
      const nodeAngle = angle + (i * 2 * Math.PI) / nodesMetadata.length;
      const xBase = rx * Math.cos(nodeAngle);
      const yBase = ry * Math.sin(nodeAngle);

      // Rotate coordinates around center (200, 200)
      const x = 200 + (xBase * cosPhi - yBase * sinPhi);
      const y = 200 + (xBase * sinPhi + yBase * cosPhi);

      // Z depth index: -1 is back, 1 is front
      const z = Math.sin(nodeAngle);
      const scale = 0.95 + 0.35 * z;
      const opacity = 0.2 + 0.8 * ((z + 1) / 2); // stronger fades in the back
      const isFront = z >= 0;

      return {
        ...node,
        x,
        y,
        scale,
        opacity,
        isFront,
      };
    });
  };

  // Compact Navbar State
  if (variant === 'navbar') {
    return (
      <motion.div
        layoutId={layoutId}
        className={`flex items-center gap-2 select-none cursor-default ${className}`}
      >
        <motion.div layoutId={`${layoutId}-icon-container`}>
          {renderCompactIcon()}
        </motion.div>
        <motion.span
          layoutId={`${layoutId}-wordmark`}
          className="font-bold text-ink font-sans text-xl tracking-tight"
        >
          SciVerify
        </motion.span>
      </motion.div>
    );
  }

  // Hero / Startup State (timed animations + slow orbit)
  const nodes = computeNodes();
  const backNodes = nodes.filter((n) => !n.isFront);
  const frontNodes = nodes.filter((n) => n.isFront);

  return (
    <motion.div
      layoutId={layoutId}
      className={`relative flex flex-col items-center justify-center select-none cursor-default ${className}`}
    >
      {/* Subtle Breathing Scale wrapper (always active) */}
      <motion.div
        className="relative flex flex-col items-center justify-center w-[85vw] h-[85vw] max-w-[600px] max-h-[600px] md:max-w-[650px] md:max-h-[650px] aspect-square"
        animate={{ scale: [1, 1.015, 1] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
      >
        {/* SVG Canvas for Orbit Paths, Pulse Waves, and Nodes */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full pointer-events-none fill-none text-slate-500 dark:text-slate-400"
        >
          {/* Tilted Ellipse Orbit Track (fades in at 700ms) */}
          <motion.ellipse
            cx="200"
            cy="200"
            rx="190"
            ry="65"
            transform="rotate(10, 200, 200)"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          />

          {/* Render Back Nodes (behind the wordmark) */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          >
            {backNodes.map((n) => (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y}) scale(${n.scale})`}
              >
                {n.render(n.opacity)}
              </g>
            ))}
          </motion.g>
        </svg>

        {/* Center Contents Stack: Pulse Waves and Wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Dual Verification Pulses at 1200ms and 2400ms */}
          <motion.div
            className="absolute rounded-full border border-emerald-500/25 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)] w-[58%] h-[58%]"
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{
              scale: [0.65, 1.55],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              delay: 1.2,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1], // easeOutExpo
            }}
          />

          <motion.div
            className="absolute rounded-full border border-blue-500/35 bg-blue-500/5 w-[38%] h-[38%]"
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{
              scale: [0.75, 1.4],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              delay: 2.4,
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Wordmark (Fades in at 100ms) */}
          <motion.span
            layoutId={`${layoutId}-wordmark`}
            className="font-bold text-ink font-sans text-7xl md:text-8xl tracking-tight z-10"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            SciVerify
          </motion.span>

          {/* Subtitle (Fades in at 400ms) */}
          <motion.span
            className="text-xs md:text-sm font-medium tracking-[0.25em] text-slate-400 mt-6 uppercase z-10 select-none text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          >
            Scientific Claim Verification
          </motion.span>

          {/* Tagline (Fades in at 500ms) */}
          <motion.span
            className="text-[9px] md:text-[10px] font-mono tracking-[0.35em] text-slate-500 dark:text-slate-400 mt-2.5 uppercase z-10 select-none text-center opacity-85"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          >
            Verify Smarter. Trust Science.
          </motion.span>
        </div>

        {/* SVG Canvas for Front Nodes (rendered on top of wordmark) */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full pointer-events-none fill-none z-20 text-slate-500 dark:text-slate-400"
        >
          {/* Render Front Nodes */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          >
            {frontNodes.map((n) => (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y}) scale(${n.scale})`}
              >
                {n.render(n.opacity)}
              </g>
            ))}
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};
