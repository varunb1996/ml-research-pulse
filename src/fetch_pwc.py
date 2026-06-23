import requests
import time
from typing import Any

# Semantic Scholar API — free, no key required, reliable
S2_API = "https://api.semanticscholar.org/graph/v1/paper/search"
S2_FIELDS = "paperId,title,abstract,authors,year,publicationDate,openAccessPdf,citationCount,externalIds"

AI_QUERIES = ["large language model", "diffusion model", "reinforcement learning", "vision transformer"]


def fetch_pwc_trending(limit: int = 10) -> list[dict[str, Any]]:
    """Fetch recent highly-cited AI papers via Semantic Scholar (replaces PwC API)."""
    papers = []
    seen_ids = set()

    for query in AI_QUERIES[:2]:
        params = {
            "query": query,
            "fields": S2_FIELDS,
            "limit": limit // 2 + 2,
            "sort": "citationCount:desc",
        }
        headers = {"User-Agent": "ml-research-pulse/1.0"}
        data = None
        for attempt in range(3):
            try:
                resp = requests.get(S2_API, params=params, headers=headers, timeout=12)
                if resp.status_code == 429:
                    time.sleep(5 * (attempt + 1))
                    continue
                resp.raise_for_status()
                data = resp.json()
                break
            except Exception as e:
                print(f"[fetch_s2] Warning for '{query}' (attempt {attempt+1}): {e}")
                time.sleep(3)
        if not data:
            continue

        for item in data.get("data", []):
            pid = item.get("paperId", "")
            if not pid or pid in seen_ids:
                continue
            seen_ids.add(pid)

            arxiv_id = (item.get("externalIds") or {}).get("ArXiv", "")
            pdf_url = (item.get("openAccessPdf") or {}).get("url", "")
            authors = [a.get("name", "") for a in (item.get("authors") or [])[:3]]

            papers.append({
                "id": arxiv_id or pid,
                "title": item.get("title", "").strip(),
                "summary": (item.get("abstract") or "").strip(),
                "authors": authors,
                "url": f"https://arxiv.org/abs/{arxiv_id}" if arxiv_id else f"https://www.semanticscholar.org/paper/{pid}",
                "pdf_url": pdf_url,
                "category": "Semantic Scholar",
                "source": "semantic_scholar",
                "citations": item.get("citationCount", 0),
                "published": item.get("publicationDate", ""),
                "has_code": bool(arxiv_id),
                "github_url": "",
            })

        if len(papers) >= limit:
            break

    return papers[:limit]
