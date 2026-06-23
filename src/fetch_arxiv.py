import requests
import xml.etree.ElementTree as ET
import datetime
from typing import Any

ARXIV_API = "http://export.arxiv.org/api/query"
ATOM_NS = "http://www.w3.org/2005/Atom"
ARXIV_NS = "http://arxiv.org/schemas/atom"

CATEGORIES = ["cs.AI", "cs.LG", "stat.ML", "cs.CL", "cs.CV"]


def fetch_arxiv_papers(max_results: int = 30) -> list[dict[str, Any]]:
    query = " OR ".join(f"cat:{c}" for c in CATEGORIES)
    params = {
        "search_query": query,
        "start": 0,
        "max_results": max_results,
        "sortBy": "submittedDate",
        "sortOrder": "descending",
    }

    try:
        resp = requests.get(ARXIV_API, params=params, timeout=15)
        resp.raise_for_status()
    except Exception as e:
        print(f"[fetch_arxiv] Warning: {e}")
        return []

    try:
        root = ET.fromstring(resp.content)
    except ET.ParseError as e:
        print(f"[fetch_arxiv] XML parse error: {e}")
        return []

    papers = []
    for entry in root.findall(f"{{{ATOM_NS}}}entry"):
        arxiv_id_url = entry.findtext(f"{{{ATOM_NS}}}id", "")
        arxiv_id = arxiv_id_url.split("/abs/")[-1].strip()

        title = entry.findtext(f"{{{ATOM_NS}}}title", "").replace("\n", " ").strip()
        summary = entry.findtext(f"{{{ATOM_NS}}}summary", "").replace("\n", " ").strip()
        published = entry.findtext(f"{{{ATOM_NS}}}published", "")

        authors = [
            a.findtext(f"{{{ATOM_NS}}}name", "")
            for a in entry.findall(f"{{{ATOM_NS}}}author")[:3]
        ]

        categories = [
            t.get("term", "")
            for t in entry.findall(f"{{{ATOM_NS}}}category")
        ]
        primary_cat = categories[0] if categories else "cs.AI"

        pdf_url = ""
        for link in entry.findall(f"{{{ATOM_NS}}}link"):
            if link.get("title") == "pdf":
                pdf_url = link.get("href", "")

        papers.append({
            "id": arxiv_id,
            "title": title,
            "summary": summary,
            "authors": authors,
            "url": f"https://arxiv.org/abs/{arxiv_id}",
            "pdf_url": pdf_url or f"https://arxiv.org/pdf/{arxiv_id}",
            "category": primary_cat,
            "source": "arxiv",
            "published": published,
        })

    return papers
