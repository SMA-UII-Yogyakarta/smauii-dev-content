# Changelog

Semua perubahan signifikan pada repo ini didokumentasikan di sini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versi mengikuti [Semantic Versioning](https://semver.org/lang/id/) — `MAJOR.MINOR.PATCH`.

- **MAJOR**: Restrukturisasi besar (perubahan URL/slug yang breaking)
- **MINOR**: Modul atau lesson baru
- **PATCH**: Perbaikan konten, typo, error kode

---

## [Unreleased]

### Direncanakan
- Capstone project (`99-proyek-*.md`) untuk setiap modul
- Quiz/assessment per lesson (format akan ditentukan)
- Lesson Docker dasar untuk track Jaringan Komputer
- Lesson Kubernetes intro untuk track Jaringan Komputer
- Lesson fine-tuning IndoBERT untuk track AI
- Lesson PCB design dengan KiCad untuk track Robotika
- Contoh dataset Indonesia untuk track Data Science
- Terjemahan README ke bahasa Inggris untuk jangkauan lebih luas

---

## [0.3.0] — 2026-04-17

### Ditambahkan
- `CONTRIBUTING.md` — panduan lengkap menulis lesson (17k karakter)
- `CONTENT_STANDARDS.md` — checklist dan rubrik kualitas
- `CODE_OF_CONDUCT.md` — kode etik komunitas
- `CHANGELOG.md` — histori perubahan
- `LICENSE` — Creative Commons BY-SA 4.0
- `.github/ISSUE_TEMPLATE/lesson_request.yml` — template request lesson
- `.github/ISSUE_TEMPLATE/content_error.yml` — template laporan error
- `.github/PULL_REQUEST_TEMPLATE.md` — template PR
- README baru: badges, tabel track, struktur repo, fitur konten

---

## [0.2.0] — 2026-04-17

### Ditambahkan
- **Software Engineering** (8 lesson baru): Web Fundamentals (3), JavaScript (3), Framework Modern (3), Open Source (1)
- **AI** (11 lesson): Pengantar AI (2), Machine Learning (3), Deep Learning (3), Computer Vision (2), NLP (2)
- **Data Science** (12 lesson): Pipeline (1), Statistik (2), Python Data (3), Visualisasi (3), ML Terapan (3)
- **Jaringan Komputer** (12 lesson): Dasar Jaringan (3), Protokol (3), Linux Server (2), Cloud (2), DevOps (2)
- **Keamanan Siber** (12 lesson): Dasar Keamanan (3), Kriptografi (2), Web Security (2), CTF (2), Ethical Hacking (3)
- **Robotika/IoT** (12 lesson): Elektronika (2), Arduino (2), Sensor (2), IoT Platform (3), Proyek Robot (3)

### Diubah
- Rename `_index.md` → `README.md` agar terbaca langsung di GitHub

---

## [0.1.0] — 2026-04-16

### Ditambahkan
- Struktur repo awal dengan folder `tracks/`
- Track Software Engineering: modul `01-git-github` dengan 2 lesson:
  - `01-apa-itu-git.md` — konsep version control
  - `02-github-kolaborasi.md` — GitHub dan kolaborasi
- README dasar dengan struktur dan frontmatter spec
