"use client";
import { motion } from "framer-motion";

interface HeroProps {
  weekNumber: number;
  postStyle: string;
  generatedAt: string;
}

export default function Hero({ weekNumber, postStyle, generatedAt }: HeroProps) {
  const date = new Date(generatedAt);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="border-b" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
              Week #{weekNumber}
            </span>
            <span className="text-xs tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
              {postStyle}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-3 leading-tight"
            style={{ color: "var(--text-primary)", fontFamily: "Georgia, 'Times New Roman', serif" }}>
            ML Research{" "}
            <span style={{ color: "var(--accent)" }}>Pulse</span>
          </h1>

          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            {formatted} · Practitioner-first AI/ML digest
          </p>
        </motion.div>
      </div>
    </div>
  );
}
