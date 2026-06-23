"use client";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import type { GithubRepo } from "@/types/digest";

const langColor: Record<string, string> = {
  Python: "#3572A5", TypeScript: "#2b7489", JavaScript: "#c9a000",
  Jupyter: "#DA5B0B", Rust: "#dea584", Go: "#00ADD8",
};

export default function GithubRepos({ repos }: { repos: GithubRepo[] }) {
  if (!repos?.length) return null;

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
        Trending ML Repos
      </p>
      <div className="flex flex-col gap-3">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.url} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-xl p-4 flex items-start gap-4 group no-underline transition-all hover:shadow-sm"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold truncate group-hover:underline"
                  style={{ color: "var(--text-primary)", textDecorationColor: "var(--accent)" }}>
                  {repo.title.split("/")[1] || repo.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                {repo.summary}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--amber)" }}>
                <Star size={11} fill="currentColor" /> {repo.stars.toLocaleString()}
              </div>
              {repo.language && (
                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="w-2 h-2 rounded-full"
                    style={{ background: langColor[repo.language] ?? "var(--border-dark)" }} />
                  {repo.language}
                </div>
              )}
              <ExternalLink size={11} style={{ color: "var(--text-muted)" }} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
