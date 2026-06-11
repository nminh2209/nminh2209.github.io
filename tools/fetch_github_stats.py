import json
import subprocess
import sys

USER = "nminh2209"

def gh_api(path):
    r = subprocess.run(
        ["gh", "api", path],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True,
    )
    if not r.stdout or not r.stdout.strip():
        return []
    return json.loads(r.stdout)

repos = gh_api(f"users/{USER}/repos?per_page=100")
total_commits = 0
total_stars = 0
repo_data = []

for r in repos:
    if r.get("fork"):
        continue
    name = r["name"]
    total_stars += r.get("stargazers_count", 0)
    try:
        contribs = gh_api(f"repos/{USER}/{name}/contributors")
        mine = next((c["contributions"] for c in contribs if c.get("login") == USER), 0) if contribs else 0
    except (subprocess.CalledProcessError, json.JSONDecodeError):
        mine = 0
    total_commits += mine
    repo_data.append({
        "name": name,
        "commits": mine,
        "stars": r.get("stargazers_count", 0),
        "lang": r.get("language"),
        "homepage": r.get("homepage") or "",
        "pushed": r.get("pushed_at", ""),
        "description": r.get("description") or "",
    })

repo_data.sort(key=lambda x: x["commits"], reverse=True)

print(json.dumps({
    "total_commits": total_commits,
    "total_stars": total_stars,
    "repo_count": len(repo_data),
    "top_repos": repo_data[:12],
}, indent=2))
