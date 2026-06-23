"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { TopPaper } from "@/types/digest";

function PaperCard({ data, index }: { data: TopPaper; index: number }) {
  const { paper, tldr, bullets, who_should_read } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono font-bold" style={{ color: "var(--border-dark)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
          {who_should_read}
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-sm leading-snug mb-1.5" style={{ color: "var(--text-primary)" }}>
          {paper.title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{tldr}</p>
      </div>

      {bullets?.length > 0 && (
        <ul className="space-y-1.5 pt-1" style={{ borderTop: "1px solid var(--border)" }}>
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-xs pt-1.5" style={{ color: "var(--text-secondary)" }}>
              <span className="flex-shrink-0 mt-0.5 text-xs" style={{ color: "var(--accent)" }}>→</span>
              {b}
            </li>
          ))}
        </ul>
      )}

      <a href={paper.url} target="_blank" rel="noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium mt-auto pt-1 transition-opacity hover:opacity-70"
        style={{ color: "var(--accent)" }}>
        <ExternalLink size={11} /> Read paper
      </a>
    </motion.div>
  );
}

export default function TopPapers({ papers }: { papers: TopPaper[] }) {
  if (!papers?.length) return null;

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
        Top Papers This Week
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {papers.map((p, i) => <PaperCard key={p.paper?.id || i} data={p} index={i} />)}
      </div>
    </section>
  );
}
