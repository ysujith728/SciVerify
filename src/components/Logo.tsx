import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'compact' | 'full' | 'boot' | 'icon';
  layoutId?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', layoutId, className = '', ...props }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check if animated in this browser session
    const flag = sessionStorage.getItem('sciverify_logo_assembled');
    if (flag) {
      setHasAnimated(true);
    } else if (variant === 'boot') {
      sessionStorage.setItem('sciverify_logo_assembled', 'true');
    }
  }, [variant]);

  // Motion path drawing parameters
  const pathVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const letterVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const textVariants: any = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Pure SVG Prism Symbol
  const renderSVGIcon = (size = 32) => (
    <svg
      viewBox="0 0 100 100"
      height={size}
      width={size}
      className="fill-none select-none pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal scientific cell container */}
      <motion.polygon
        points="50,15 80,32 80,68 50,85 20,68 20,32"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />

      {/* S: Winding scientific wave (representing data fluctuations) */}
      <motion.path
        d="M36,36 C46,26 54,42 50,52 C46,62 54,74 64,64"
        stroke="#3B82F6" // Cobalt Blue
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      />

      {/* V: Sharp logic validation checkmark */}
      <motion.path
        d="M42,52 L49,60 L62,38"
        stroke="#10B981" // Emerald Green
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      />
    </svg>
  );

  // Variant [1]: Icon-only representation
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} {...props}>
        {renderSVGIcon(32)}
      </div>
    );
  }

  // Variant [2]: Compact header monogram
  if (variant === 'compact') {
    return (
      <div 
        className={`flex items-center gap-2 select-none cursor-default font-mono ${className}`}
        {...props}
      >
        {renderSVGIcon(24)}
        <div className="flex items-center text-xs tracking-wider">
          <span className="font-bold text-white uppercase">SCI</span>
          <span className="text-cobalt font-bold mx-1 opacity-80">//</span>
          <span className="font-light text-slate-300 uppercase">V</span>
        </div>
      </div>
    );
  }

  // Variant [3]: Boot sequence animated marquee
  if (variant === 'boot') {
    return (
      <motion.div layoutId={layoutId} className={`flex flex-col items-center gap-8 ${className}`} {...(props as any)}>
        {renderSVGIcon(110)}
        <motion.div 
          className="flex items-center font-mono select-none cursor-default text-3xl md:text-5xl tracking-[0.15em]"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.8 }}
        >
          <span className="font-bold text-white uppercase">SCI</span>
          <span className="text-cobalt font-bold mx-4 opacity-80">//</span>
          <motion.div 
            className="overflow-hidden flex items-center justify-start"
            variants={letterVariants}
            transition={{ delay: 1.0 }}
          >
            <span className="font-light text-slate-300 uppercase">VERIFY</span>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Variant [4]: Standard full wordmark (Header/Landing)
  return (
    <motion.div 
      layoutId={layoutId}
      className={`relative flex items-center gap-3 select-none cursor-default font-mono ${className}`}
      {...(props as any)}
    >
      {renderSVGIcon(28)}
      <div className="flex items-center text-sm tracking-[0.12em]">
        <span className="font-bold text-white uppercase">SCI</span>
        <span className="text-cobalt font-bold mx-2 opacity-80">//</span>
        <motion.div 
          className="overflow-hidden flex items-center justify-start"
          variants={letterVariants}
          initial={hasAnimated ? "visible" : "hidden"}
          animate="visible"
          transition={hasAnimated ? { duration: 0 } : { delay: 0.2, duration: 0.8 }}
        >
          <span className="font-light text-slate-300 uppercase">VERIFY</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Logo;
