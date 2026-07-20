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
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
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

  // Custom render methods for the 6 scientific elements
  const renderDocumentNode = (opacity: number) => (
    <g opacity={opacity}>
      <path
        d="M -5,-7 L 1,-7 L 5,-3 L 5,7 L -5,7 Z"
        stroke="rgba(255, 255, 255, 0.85)"
        strokeWidth="1.2"
        fill="rgba(15, 23, 42, 0.9)"
        strokeLinejoin="round"
      />
      <path d="M 1,-7 L 1,-3 L 5,-3" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" fill="none" />
      <line x1="-2.5" y1="-1" x2="2.5" y2="-1" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
      <line x1="-2.5" y1="2" x2="2.5" y2="2" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
    </g>
  );

  const renderMoleculeNode = (opacity: number) => (
    <g opacity={opacity}>
      <line x1="0" y1="0" x2="-4" y2="-4" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1" />
      <line x1="0" y1="0" x2="4" y2="2" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1" />
      <circle cx="0" cy="0" r="2.5" fill="#3B82F6" />
      <circle cx="-4" cy="-4" r="1.5" fill="#10B981" />
      <circle cx="4" cy="2" r="1.5" fill="#10B981" />
    </g>
  );

  const renderVectorNode = (opacity: number) => (
    <g opacity={opacity}>
      <circle cx="0" cy="0" r="2.5" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" fill="none" />
      <line x1="-5" y1="0" x2="5" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
      <line x1="0" y1="-5" x2="0" y2="5" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
    </g>
  );

  const renderCitationNode = (opacity: number) => (
    <g opacity={opacity}>
      <circle cx="0" cy="0" r="1.8" fill="#FBBF24" />
      <path d="M -4,-3 L -5.5,-3 L -5.5,3 L -4,3" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" fill="none" />
      <path d="M 4,-3 L 5.5,-3 L 5.5,3 L 4,3" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" fill="none" />
    </g>
  );

  const renderConnectionNode = (opacity: number) => (
    <g opacity={opacity}>
      <line x1="-3" y1="2" x2="3" y2="3" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
      <line x1="3" y1="3" x2="0" y2="-4" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
      <line x1="0" y1="-4" x2="-3" y2="2" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
      <circle cx="-3" cy="2" r="1.5" fill="#fff" />
      <circle cx="3" cy="3" r="1.5" fill="#fff" />
      <circle cx="0" cy="-4" r="1.5" fill="#fff" />
    </g>
  );

  const renderCheckNode = (opacity: number) => (
    <g opacity={opacity}>
      <circle cx="0" cy="0" r="4.5" stroke="#10B981" strokeWidth="1.2" fill="rgba(16, 185, 129, 0.1)" />
      <path
        d="M -2,0 L -0.5,1.5 L 2,-1"
        stroke="#10B981"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );

  // Compute node parameters (X, Y projection tilted by 10 degrees, with depth scaling and opacity)
  const computeNodes = () => {
    const rx = 190;
    const ry = 45;
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
      const scale = 0.85 + 0.2 * z;
      const opacity = 0.4 + 0.6 * ((z + 1) / 2); // fades slightly in the back
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
          className="font-bold text-white font-sans text-xl tracking-tight"
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
        className="relative flex flex-col items-center justify-center w-[480px] h-[480px]"
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
          className="absolute inset-0 w-full h-full pointer-events-none fill-none"
        >
          {/* Tilted Ellipse Orbit Track (fades in at 700ms) */}
          <motion.ellipse
            cx="200"
            cy="200"
            rx="190"
            ry="45"
            transform="rotate(10, 200, 200)"
            stroke="rgba(255, 255, 255, 0.05)"
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
            className="absolute rounded-full border border-emerald-500/25 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            style={{ width: 220, height: 220 }}
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
            className="absolute rounded-full border border-blue-500/35 bg-blue-500/5"
            style={{ width: 150, height: 150 }}
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
            className="font-bold text-white font-sans text-5xl md:text-6xl tracking-tight z-10"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            SciVerify
          </motion.span>

          {/* Subtitle (Fades in at 400ms) */}
          <motion.span
            className="text-[10px] md:text-[11px] font-medium tracking-[0.25em] text-slate-400 mt-3 uppercase z-10 select-none text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          >
            Scientific Claim Verification
          </motion.span>
        </div>

        {/* SVG Canvas for Front Nodes (rendered on top of wordmark) */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full pointer-events-none fill-none z-20"
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
