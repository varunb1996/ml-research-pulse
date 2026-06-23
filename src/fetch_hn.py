import requests
import datetime
from typing import Any

HN_SEARCH_API = "https://hn.algolia.com/api/v1/search"

AI_KEYWORDS = ["LLM", "machine learning", "AI", "deep learning", "neural network",
               "transformer", "diffusion", "GPT", "embedding", "fine-tuning", "RAG"]


def fetch_hn_ai_posts(min_points: int = 50, limit: int = 8) -> list[dict[str, Any]]:
    since_ts = int((datetime.datetime.now() - datetime.timedelta(days=7)).timestamp())

    params = {
        "query": "AI machine learning LLM transformer neural",
        "tags": "story",
        "hitsPerPage": limit * 3,
    }

    try:
        resp = requests.get(HN_SEARCH_API, params=params, timeout=10)
        resp.raise_for_status()
        hits = resp.json().get("hits", [])
    except Exception as e:
        print(f"[fetch_hn] Warning: {e}")
        return []

    posts = []
    seen = set()
    for hit in hits:
        url = hit.get("url") or f"https://news.ycombinator.com/item?id={hit['objectID']}"
        if url in seen:
            continue
        seen.add(url)

        posts.append({
            "id": hit["objectID"],
            "title": hit.get("title", "").strip(),
            "summary": "",
            "url": url,
            "hn_url": f"https://news.ycombinator.com/item?id={hit['objectID']}",
            "points": hit.get("points", 0),
            "comments": hit.get("num_comments", 0),
            "author": hit.get("author", ""),
            "source": "hackernews",
            "created_at": hit.get("created_at", ""),
        })

        if len(posts) >= limit:
            break

    return sorted(posts, key=lambda x: x["points"], reverse=True)
