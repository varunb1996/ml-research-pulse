"use client";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { OneThingToTry } from "@/types/digest";

const difficultyStyle: Record<string, { bg: string; color: string }> = {
  beginner:     { bg: "var(--green-light)",  color: "var(--green)" },
  intermediate: { bg: "var(--amber-light)",  color: "var(--amber)" },
  advanced:     { bg: "#fde8e8",             color: "#c0392b" },
};

export default function OneThingToTryCard({ data }: { data: OneThingToTry }) {
  const { action, why, time_estimate, difficulty } = data;
  const style = difficultyStyle[difficulty] ?? difficultyStyle.intermediate;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl p-6"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
        One Thing To Try
      </p>

      <p className="text-lg font-semibold leading-snug mb-2"
        style={{ color: "var(--text-primary)", fontFamily: "Georgia, serif" }}>
        {action}
      </p>
      <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>{why}</p>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          <Clock size={12} /> {time_estimate}
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{ background: style.bg, color: style.color }}>
          {difficulty}
        </span>
      </div>
    </motion.section>
  );
}
