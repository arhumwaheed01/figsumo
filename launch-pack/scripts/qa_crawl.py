#!/usr/bin/env python3
"""FigSumo pre-push QA crawler. Standard library only (Python 3.9+).

Usage:
  python3 scripts/qa_crawl.py --base https://figsumo.vercel.app --csv on-page-seo.csv [--mode staging|production] [--only redirects|meta|all]

Checks (prints PASS/FAIL per line, exits 1 if any FAIL):
  redirects : every CSV row with redirect_301 -> exactly one 301/308 hop to new_url, which returns 200
  meta      : every live new_url -> 200, <title>, meta description and <h1> match the CSV, canonical is self, robots matches mode
"""
import argparse, csv, html, re, sys, urllib.request, urllib.error
from urllib.parse import urljoin

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None

opener = urllib.request.build_opener(NoRedirect)

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "FigSumo-QA/1.0"})
    try:
        r = opener.open(req, timeout=30)
        return r.status, dict(r.headers), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), e.read().decode("utf-8", "replace")

def first(pattern, text):
    m = re.search(pattern, text, re.I | re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True)
    ap.add_argument("--csv", required=True)
    ap.add_argument("--mode", choices=["staging", "production"], default="staging")
    ap.add_argument("--only", choices=["redirects", "meta", "all"], default="all")
    a = ap.parse_args()
    base = a.base.rstrip("/")
    rows = list(csv.DictReader(open(a.csv, encoding="utf-8")))
    fails = 0

    def report(ok, msg):
        nonlocal fails
        print(("PASS " if ok else "FAIL ") + msg)
        fails += 0 if ok else 1

    if a.only in ("redirects", "all"):
        for r in rows:
            if not r["redirect_301"].startswith("yes"):
                continue
            s, h, _ = get(base + r["current_url"])
            loc = h.get("Location") or h.get("location") or ""
            target = urljoin(base + "/", loc)
            ok = s in (301, 308) and target == base + r["new_url"]
            if ok:
                s2, _, _ = get(target)
                ok = s2 == 200
            report(ok, f"redirect {r['current_url']} -> {r['new_url']} (got {s} {loc})")

    if a.only in ("meta", "all"):
        seen = set()
        for r in rows:
            u = r["new_url"]
            if r["status"] in ("merge (301)", "remove (301)") or u in seen:
                continue
            seen.add(u)
            s, h, body = get(base + u)
            if s != 200:
                report(False, f"status {u} = {s}")
                continue
            title = first(r"<title[^>]*>(.*?)</title>", body)
            desc = first(r'<meta[^>]+name="description"[^>]+content="([^"]*)"', body)
            h1 = first(r"<h1[^>]*>(.*?)</h1>", body)
            canon = first(r'<link[^>]+rel="canonical"[^>]+href="([^"]*)"', body)
            robots = (first(r'<meta[^>]+name="robots"[^>]+content="([^"]*)"', body) or "") + " " + h.get("X-Robots-Tag", h.get("x-robots-tag", ""))
            report(title == r["title"], f"title {u}: {title!r}")
            report(desc == r["meta_description"], f"description {u}")
            report(h1 == r["h1"], f"h1 {u}: {h1!r}")
            report(bool(canon) and canon.rstrip("/").endswith(u), f"canonical {u}: {canon}")
            if a.mode == "staging":
                report("noindex" in robots, f"noindex present (staging) {u}")
            else:
                report("noindex" not in robots, f"no noindex (production) {u}")
    print(f"\n{fails} FAIL(s)")
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()
