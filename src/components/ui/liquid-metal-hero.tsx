"use client";

import { motion } from "framer-motion";
import HalftoneShaderBackground from "./halftone-shader-background";

interface LiquidMetalHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick?: () => void;
  features?: string[];
}

export default function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
}: LiquidMetalHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32">
      <div style={{ position: "fixed", inset: 0, zIndex: -10 }}>
        <HalftoneShaderBackground />
      </div>
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {badge && (
            <motion.div className="flex justify-center" variants={itemVariants}>
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-white backdrop-blur-sm">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.div className="space-y-4 md:space-y-6" variants={itemVariants}>
            <motion.h1
              role="heading"
              aria-level={1}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight font-display px-2"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            <motion.p
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-2xl text-neutral-300 leading-relaxed px-2"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            variants={buttonVariants}
          >
            <motion.button
              onClick={onPrimaryCtaClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto rounded-full bg-white text-neutral-900 hover:bg-neutral-200 transition-colors duration-300 shadow-2xl text-base md:text-lg px-8 py-3.5 md:py-4 font-semibold"
            >
              {primaryCtaLabel}
            </motion.button>

            {secondaryCtaLabel && onSecondaryCtaClick && (
              <motion.button
                onClick={onSecondaryCtaClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto rounded-full border border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-colors duration-300 backdrop-blur-sm text-base md:text-lg px-8 py-3.5 md:py-4 font-semibold"
              >
                {secondaryCtaLabel}
              </motion.button>
            )}
          </motion.div>

          {features.length > 0 && (
            <motion.div className="pt-6 md:pt-12" variants={itemVariants}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl"
              >
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="flex items-center justify-center text-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.8 + index * 0.1,
                        }}
                      >
                        <p className="text-white font-medium text-base md:text-lg">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
