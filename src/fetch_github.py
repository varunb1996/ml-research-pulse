import requests
import datetime
from typing import Any

GITHUB_SEARCH_API = "https://api.github.com/search/repositories"

ML_TOPICS = ["machine-learning", "deep-learning", "llm", "transformers", "pytorch", "diffusion-models"]


def fetch_github_trending(limit: int = 8) -> list[dict[str, Any]]:
    since = (datetime.date.today() - datetime.timedelta(days=7)).isoformat()

    query = f"topic:machine-learning created:>{since} stars:>5"
    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": limit,
    }

    headers = {"Accept": "application/vnd.github+json"}

    try:
        resp = requests.get(GITHUB_SEARCH_API, params=params, headers=headers, timeout=10)
        resp.raise_for_status()
        items = resp.json().get("items", [])
    except Exception as e:
        print(f"[fetch_github] Warning: {e}")
        return []

    repos = []
    for repo in items:
        repos.append({
            "id": str(repo["id"]),
            "title": repo["full_name"],
            "summary": repo.get("description") or "No description provided.",
            "url": repo["html_url"],
            "stars": repo["stargazers_count"],
            "language": repo.get("language", "Unknown"),
            "topics": repo.get("topics", []),
            "source": "github",
            "created_at": repo.get("created_at", ""),
        })

    return repos


def fetch_github_paper_implementations(paper_title: str) -> list[dict[str, Any]]:
    """Check if a given paper already has GitHub implementations."""
    query = f"{paper_title} in:name,description,readme"
    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": 3,
    }
    headers = {"Accept": "application/vnd.github+json"}

    try:
        resp = requests.get(GITHUB_SEARCH_API, params=params, headers=headers, timeout=10)
        resp.raise_for_status()
        return resp.json().get("items", [])
    except Exception:
        return []
