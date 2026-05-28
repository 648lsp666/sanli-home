# GitHub Profile README Design Spec
**Date:** 2026-05-28
**Repo:** github.com/648lsp666/648lsp666 (special GitHub profile repo)
**Status:** Approved

---

## Overview

A full-dynamic GitHub profile README for Sanli. Style: dark techy, cyan accent, bilingual (Chinese primary / English secondary). Maximalist — uses every major dynamic widget category.

---

## Section Layout (top to bottom)

### 1. Typing Animation Header
- Tool: `readme-typing-svg` (DenverCoder9)
- URL: `https://readme-typing-svg.demolab.com`
- Lines (cycle): `Frontend Engineer 🚀`, `Builder & Tinkerer ⚙️`, `在字节搬砖，偷偷造东西`, `AI Tools Enthusiast 🤖`, `Side Hustler in Progress`
- Style: `font=Fira+Code&size=22&duration=3000&pause=1000&color=22D3EE&center=true&vCenter=true&width=600`

### 2. Greeting + Bio
- `## 嗨，我是 Sanli 👋` heading
- Two-line bio:
  - Chinese: `前端工程师 @ 字节跳动 · 喜欢造东西 · 关注 AI 如何改变生活`
  - English: `Frontend Engineer · Building side projects · Exploring the AI-powered future`
- Inline badge row (shields.io flat-square):
  - `ByteDance` (red)
  - `Next.js` (black)
  - `TypeScript` (blue)
  - `Side Hustler` (cyan)

### 3. GitHub Stats Triple (two-column layout)

Left column:
- **github-readme-stats** overall card: stars, commits, PRs, issues, contribs
  - `theme=tokyonight&hide_border=true&bg_color=0a0a0a&title_color=22d3ee&icon_color=22d3ee&text_color=a3a3a3`
- **github-readme-streak-stats** commit streak
  - `theme=tokyonight&hide_border=true&background=0a0a0a&ring=22d3ee&fire=22d3ee&currStreakLabel=22d3ee`

Right column:
- **Top Languages** card
  - Same theme params, `layout=compact`

### 4. 3D Contribution Graph
- Tool: `profile-3d-contrib` (yoshi389111)
- GitHub Action: runs daily at UTC 00:30 (`schedule: cron: '30 0 * * *'`)
- Output file: `profile-3d-contrib/profile-night-rainbow.svg`
- Displayed full-width in README

### 5. Tech Stack Badge Wall
- Tool: `skillicons.dev`
- Icons: `ts,js,react,nextjs,tailwind,nodejs,python,git,vercel,vscode`
- Two rows if needed, centered

### 6. Project Card (Pinned)
- Tool: `github-readme-stats` pin card
- Repo: `648lsp666/opportunity-radar` (见微 Prowl)
- Same dark theme params

### 7. Snake Contribution Animation
- Tool: GitHub Action generating `github-snake.svg` / `github-snake-dark.svg`
- Action: `Platane/snk@v3`, runs daily at UTC 00:00 + on push
- Output pushed to `output` branch
- Dark mode snake (green dots on dark background)

### 8. Footer
- Visitor counter: `komarev.com/ghpvc/?username=648lsp666&style=flat-square&color=22d3ee`
- Social links row: GitHub profile · Personal site (sanli-home.vercel.app) · Email

---

## GitHub Actions Required

### `.github/workflows/snake.yml`
```yaml
name: Generate Snake
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: Platane/snk@v3
        with:
          github_user_name: 648lsp666
          outputs: |
            dist/github-snake.svg
            dist/github-snake-dark.svg?palette=github-dark
      - uses: crazy-max/ghaction-github-pages@v3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### `.github/workflows/3d-contrib.yml`
```yaml
name: Generate 3D Contribution Graph
on:
  schedule:
    - cron: "30 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: yoshi389111/github-profile-3d-contrib@0.7.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          USERNAME: 648lsp666
      - name: Commit & Push
        run: |
          git config user.email "action@github.com"
          git config user.name "GitHub Action"
          git add -A
          git diff --cached --quiet || git commit -m "Update 3D contribution graph"
          git push
```

---

## File Structure

```
648lsp666/          (repo name = GitHub username)
├── README.md
└── .github/
    └── workflows/
        ├── snake.yml
        └── 3d-contrib.yml
```

---

## Out of Scope (v1)

- Spotify "Now Playing" widget (requires OAuth setup)
- WakaTime coding stats (requires WakaTime account + tracking)
- Blog post feed (requires RSS)
