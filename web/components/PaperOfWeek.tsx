"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { PaperOfWeek } from "@/types/digest";

export default function PaperOfWeekCard({ data }: { data: PaperOfWeek }) {
  const { paper, headline, summary, key_takeaway, excitement_score } = data;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: "var(--accent)" }} />

      <div className="p-8">
        {/* Label row */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            Paper of the Week
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "var(--amber-light)", color: "var(--amber)" }}>
            {excitement_score}/10 excitement
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-2"
          style={{ color: "var(--text-primary)", fontFamily: "Georgia, serif" }}>
          {headline}
        </h2>

        {/* Meta */}
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          {paper.authors?.slice(0, 3).join(", ")}
          {paper.authors?.length > 3 ? " et al." : ""}
          {paper.category ? ` · ${paper.category}` : ""}
        </p>

        {/* Divider */}
        <div className="mb-6" style={{ borderTop: "1px solid var(--border)" }} />

        {/* Summary */}
        <div className="space-y-3 mb-6">
          {summary.split(/\n\n|\n(?=[A-Z])/).filter(Boolean).map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {para.trim()}
            </p>
          ))}
        </div>

        {/* Key takeaway */}
        <div className="rounded-xl p-4 mb-6 flex gap-3"
          style={{ background: "var(--accent-light)", border: "1px solid #ebd5cb" }}>
          <div className="w-1 rounded-full flex-shrink-0 self-stretch" style={{ background: "var(--accent)" }} />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>
              Key Takeaway
            </p>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>{key_takeaway}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 flex-wrap">
          <a href={paper.url} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Read Paper <ExternalLink size={13} />
          </a>
          {paper.pdf_url && (
            <a href={paper.pdf_url} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              PDF <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.section>
  );
}
