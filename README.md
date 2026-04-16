# smauii-dev-content

Repositori konten pembelajaran untuk **SMAUII Developer Foundation**.

Konten ditulis dalam format Markdown dan mendukung:
- **LaTeX** — untuk notasi matematika
- **Mermaid** — untuk diagram dan flowchart
- **Code blocks** — dengan syntax highlighting

## Struktur

```
tracks/
  <nama-track>/
    _index.md          # Deskripsi track & roadmap
    <nomor>-<slug>/
      _index.md        # Metadata modul
      <nomor>-<judul>.md
```

## Kontribusi

1. Fork repo ini
2. Buat branch: `feat/nama-materi`
3. Tulis konten dengan frontmatter yang benar
4. Pull Request ke `main`

## Frontmatter

```yaml
---
title: "Judul Materi"
track: software-engineering
level: beginner | intermediate | advanced
duration: 30
prerequisites: []
tags: []
author: username-github
updated: YYYY-MM-DD
---
```
