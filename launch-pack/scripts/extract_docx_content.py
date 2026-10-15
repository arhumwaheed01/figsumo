"""Split FigSumo-All-Page-Content.docx text export into per-URL markdown files."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

RAW = Path(__file__).resolve().parents[1] / "_all-page-content-raw.txt"
OUT = Path(__file__).resolve().parents[1] / "content-all"

PATTERN = re.compile(
    r"(?m)^(?P<title>.+)\nURL\nhttps://figsumo\.com(?P<path>/[a-z0-9\-/]+)\n"
    r"Title tag\n(?P<title_tag>.+)\nMeta description\n(?P<meta>.+)\n",
)


def strip_char_count(value: str) -> str:
    return re.sub(r"\s*\(\d+\s*chars?\)\s*$", "", value.strip())


def field(block: str, name: str) -> str:
    match = re.search(rf"(?m)^{re.escape(name)}\n(.+)$", block)
    return match.group(1).strip() if match else ""


def main() -> None:
    raw = RAW.read_text(encoding="utf-8")
    matches = list(PATTERN.finditer(raw))
    print(f"pages_matched={len(matches)}")

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    index: list[dict] = []
    for i, match in enumerate(matches):
        start = match.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(raw)
        block = raw[start:end].strip()
        path = match.group("path")
        title_tag = strip_char_count(match.group("title_tag")).replace('"', "'")
        meta = strip_char_count(match.group("meta")).replace('"', "'")
        page_title = match.group("title").strip()

        country = field(block, "Country")
        status = field(block, "Status")
        body_words = field(block, "Body words")

        h1_match = re.search(r"(?m)^H1:\s*(.+)$", block)
        if h1_match:
            body = block[h1_match.start() :].strip()
            h1 = h1_match.group(1).strip().replace('"', "'")
        else:
            body = block
            h1 = page_title.replace('"', "'")

        rel = path.strip("/") + ".md"
        dest = OUT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        verify_count = body.count("[VERIFY]")

        dest.write_text(
            "\n".join(
                [
                    "---",
                    f"url: {path}",
                    f'title: "{title_tag}"',
                    f'description: "{meta}"',
                    f'h1: "{h1}"',
                    f"country: {country or 'global'}",
                    f"status: {status or 'unknown'}",
                    f"body_words: {body_words or 'n/a'}",
                    f"verify_flags: {verify_count}",
                    "updated: 2026-10-15",
                    "source: FigSumo-All-Page-Content.docx",
                    "---",
                    "",
                    body,
                    "",
                ]
            ),
            encoding="utf-8",
        )
        index.append(
            {
                "path": path,
                "file": rel.replace("\\", "/"),
                "title": title_tag,
                "verify_flags": verify_count,
                "words": body_words,
            }
        )

    (OUT / "INDEX.json").write_text(
        json.dumps({"count": len(index), "pages": index}, indent=2),
        encoding="utf-8",
    )
    print(f"wrote={len(index)} dir={OUT}")
    print(f"with_verify={sum(1 for p in index if p['verify_flags'] > 0)}")


if __name__ == "__main__":
    main()
