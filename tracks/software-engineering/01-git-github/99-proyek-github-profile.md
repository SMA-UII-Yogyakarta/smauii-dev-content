---
title: "Proyek: GitHub Profile yang Menarik"
track: software-engineering
module: 01-git-github
order: 99
level: beginner
duration: 60
prerequisites:
  - software-engineering/01-git-github/01-apa-itu-git
  - software-engineering/01-git-github/02-github-kolaborasi
  - software-engineering/01-git-github/03-branching-workflow
tags: [git, github, portfolio, profile, readme]
author: sandikodev
updated: 2026-04-18
---

# Proyek: GitHub Profile yang Menarik

GitHub profile adalah CV hidup yang bekerja 24/7. Recruiter dan kolaborator akan melihat ini sebelum memutuskan apakah mereka mau bekerja denganmu.

## Yang Akan Kamu Bangun

Sebuah GitHub profile README yang:
- Memperkenalkan dirimu secara profesional
- Menampilkan skill dan teknologi yang kamu kuasai
- Menunjukkan statistik kontribusi
- Menampilkan proyek terbaik
- Mencerminkan kepribadianmu

## Prasyarat

Pastikan kamu sudah menyelesaikan:
- [ ] Apa itu Git?
- [ ] GitHub & Kolaborasi
- [ ] Git Branching & Workflow

## Langkah-langkah

### Fase 1: Setup (10 menit)

```bash
# Buat repo dengan nama sama persis dengan username GitHub-mu
# Contoh: jika username-mu adalah "sandikodev", buat repo "sandikodev"
# Repo ini otomatis menjadi profile README

git clone https://github.com/USERNAME/USERNAME.git
cd USERNAME
touch README.md
```

### Fase 2: Tulis README (30 menit)

Gunakan template ini sebagai starting point, lalu kustomisasi:

```markdown
# Halo, saya [Nama Kamu] 👋

> [Satu kalimat yang mendeskripsikan siapa kamu dan apa yang kamu kerjakan]

## Tentang Saya

- 🎓 Siswa [Kelas] di SMA UII Yogyakarta
- 💻 Belajar [teknologi yang sedang dipelajari]
- 🌱 Saat ini fokus pada [topik/proyek saat ini]
- 🎯 Tujuan: [apa yang ingin dicapai]

## Skill

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
<!-- Tambahkan badge untuk skill yang kamu kuasai -->

## Proyek Terbaru

| Proyek | Deskripsi | Tech |
|--------|-----------|------|
| [Nama Proyek](link) | Deskripsi singkat | Python, Flask |

## Statistik GitHub

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=USERNAME&show_icons=true&theme=dark)

## Kontak

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/USERNAME)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:email@example.com)
```

### Fase 3: Commit dan Push (10 menit)

```bash
git add README.md
git commit -m "feat: add GitHub profile README"
git push origin main
```

### Fase 4: Verifikasi (10 menit)

Buka `https://github.com/USERNAME` dan pastikan README tampil dengan benar.

## Kriteria Keberhasilan

- [ ] README tampil di halaman profil GitHub
- [ ] Ada foto atau avatar yang representatif
- [ ] Deskripsi singkat yang jelas tentang siapa kamu
- [ ] Minimal 3 skill badge yang relevan
- [ ] Link ke minimal 1 proyek atau repo
- [ ] Informasi kontak (LinkedIn atau email)

## Tantangan Ekstra

1. Tambahkan **GitHub Streak Stats**: `https://github-readme-streak-stats.herokuapp.com/?user=USERNAME`
2. Tambahkan **Wakatime stats** jika kamu pakai VS Code
3. Buat **animasi** menggunakan [capsule-render](https://github.com/kyechan99/capsule-render)
4. Tambahkan **quote motivasi** yang berubah setiap hari

## Referensi

- [Awesome GitHub Profile README](https://github.com/abhisheknaiidu/awesome-github-profile-readme) — inspirasi dari developer lain
- [Shields.io](https://shields.io) — buat badge custom
- [Simple Icons](https://simpleicons.org) — icon untuk badge
