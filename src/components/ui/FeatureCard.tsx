"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
  className,
}: FeatureCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <div
      className={cn(
        "group relative h-full min-w-0 overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-6 transition-all duration-300 hover:border-accent-purple/30 hover:shadow-lg dark:hover:glow-purple",
        className
      )}
      style={{ backgroundImage: "var(--gradient-card)" }}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple transition-colors group-hover:bg-accent-purple group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mb-2 break-words font-display text-lg font-semibold text-text-primary">
        {title}
      </h3>
      <p className="break-words text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );

  if (prefersReducedMotion) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      {content}
    </motion.div>
  );
}
