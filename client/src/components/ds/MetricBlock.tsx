import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricBlockProps {
  value: string | number;
  label: string;
  delta?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  accentColor?: string;
}

export function MetricBlock({
  value,
  label,
  delta,
  className,
  accentColor = "var(--primary)",
}: MetricBlockProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-baseline gap-3"
      >
        <span
          className="font-display text-[clamp(4rem,8vw,6rem)] font-black leading-none tracking-[-0.04em]"
          style={{ color: accentColor }}
        >
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "font-mono-tech text-sm font-bold",
              delta.isPositive ? "text-[--primary]" : "text-destructive"
            )}
          >
            {delta.isPositive ? "+" : ""}
            {delta.value}
          </span>
        )}
      </motion.div>
      <p className="font-mono-tech text-[10px] font-black uppercase tracking-[0.28em] text-white/40">
        {label}
      </p>
    </div>
  );
}
