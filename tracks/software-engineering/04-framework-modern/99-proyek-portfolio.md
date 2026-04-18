---
title: "Proyek: Portfolio Pribadi dengan Astro"
track: software-engineering
module: 04-framework-modern
order: 99
level: intermediate
duration: 120
prerequisites:
  - software-engineering/04-framework-modern/01-pengantar-react
  - software-engineering/04-framework-modern/02-typescript-dasar
  - software-engineering/04-framework-modern/03-astro-framework
tags: [astro, portfolio, deployment, github-pages, personal-brand]
author: sandikodev
updated: 2026-04-18
---

# Proyek: Portfolio Pribadi dengan Astro

Portfolio adalah bukti nyata kemampuanmu — lebih kuat dari CV manapun. Proyek ini akan menghasilkan website portfolio yang bisa diakses publik.

## Yang Akan Kamu Bangun

Website portfolio dengan:
- Halaman utama dengan hero section
- Halaman "Tentang Saya"
- Halaman proyek dengan daftar karya
- Halaman kontak
- Deploy ke GitHub Pages (gratis)

## Prasyarat

- [ ] Pengantar React
- [ ] TypeScript Dasar
- [ ] Astro Framework

## Langkah-langkah

### Fase 1: Setup Project (15 menit)

```bash
# Buat project Astro baru
npm create astro@latest portfolio -- --template minimal
cd portfolio

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

### Fase 2: Struktur Halaman (30 menit)

```
src/
  pages/
    index.astro      ← Halaman utama
    about.astro      ← Tentang saya
    projects.astro   ← Daftar proyek
    contact.astro    ← Kontak
  components/
    Header.astro
    Footer.astro
    ProjectCard.astro
  layouts/
    Layout.astro
```

### Fase 3: Konten (45 menit)

**`src/pages/index.astro`** — Hero section:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="[Nama Kamu] — Developer">
  <section class="hero">
    <h1>Halo, saya <span class="highlight">[Nama Kamu]</span> 👋</h1>
    <p>Siswa SMA UII yang passionate di [bidang]. Saya membangun [jenis proyek].</p>
    <div class="cta">
      <a href="/projects">Lihat Proyek</a>
      <a href="/contact">Hubungi Saya</a>
    </div>
  </section>
</Layout>
```

**`src/pages/projects.astro`** — Daftar proyek:

```astro
---
const projects = [
  {
    title: "Nama Proyek",
    description: "Deskripsi singkat apa yang dilakukan proyek ini",
    tech: ["Python", "Flask"],
    github: "https://github.com/username/repo",
    demo: "https://demo-url.com",
  },
  // tambahkan proyek lainnya
];
---
```

### Fase 4: Deploy ke GitHub Pages (30 menit)

```bash
# Install adapter GitHub Pages
npm install @astrojs/github-pages

# Update astro.config.mjs
# site: 'https://USERNAME.github.io'
# base: '/portfolio'

# Build
npm run build

# Push ke GitHub dan aktifkan GitHub Pages
```

## Kriteria Keberhasilan

- [ ] Website bisa diakses publik via GitHub Pages
- [ ] Ada minimal 3 halaman (home, projects, contact)
- [ ] Minimal 2 proyek ditampilkan dengan deskripsi dan link
- [ ] Responsive di mobile dan desktop
- [ ] Ada link ke GitHub profile

## Tantangan Ekstra

1. Tambahkan **dark/light mode toggle**
2. Tambahkan **animasi** saat scroll menggunakan CSS atau Framer Motion
3. Tambahkan **blog** menggunakan Astro Content Collections
4. Integrasikan dengan **GitHub API** untuk tampilkan repo terbaru secara otomatis

## Referensi

- [Astro Docs](https://docs.astro.build)
- [GitHub Pages Docs](https://pages.github.com)
- [Inspirasi portfolio developer](https://github.com/emmabostian/developer-portfolios)
