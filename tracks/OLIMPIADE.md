# Track Olimpiade — Brief untuk Kontributor

Dokumen ini adalah panduan bagi kontributor yang ingin membuat konten persiapan olimpiade/kompetisi di platform Digital Lab SMA UII.

Baca [CONTRIBUTING.md](./CONTRIBUTING.md) dan [CONTENT_STANDARDS.md](./CONTENT_STANDARDS.md) terlebih dahulu sebelum mulai menulis.

---

## Konsep: Olimpiade bukan Track Terpisah

Konten olimpiade **tidak** diletakkan di track baru. Melainkan lesson yang relevan untuk kompetisi diberi tag `olimpiade` di frontmatter, sehingga siswa bisa memfilternya dari halaman Belajar.

```yaml
---
title: "Dynamic Programming — Knapsack Problem"
track: software-engineering
module: 06-algoritma-kompetitif
tags: [olimpiade, osn-informatika, algoritma]
level: advanced
---
```

Ini menjaga konten tetap terhubung dengan track induknya dan menghindari duplikasi.

---

## Kompetisi yang Relevan untuk Siswa SMA

### 1. KSN / OSN Informatika ⭐ Prioritas Utama

**Nama resmi:** Kompetisi Sains Nasional (KSN) bidang Informatika  
*(sebelumnya: Olimpiade Sains Nasional / OSN — nama berubah sejak 2020)*

**Penyelenggara:** Pusat Prestasi Nasional (Puspresnas), Kemendikdasmen  
**Tingkat:** SMA/MA sederajat  
**Bahasa pemrograman resmi:** C++ (Pascal sudah tidak digunakan sejak ~2019)  
**Sifat soal:** Algoritmik — tidak ada soal teori, semua soal harus diselesaikan dengan program

**Sumber verifikasi:**
- Website resmi: [pusatprestasinasional.kemdikbud.go.id](https://pusatprestasinasional.kemdikbud.go.id)
- Arsip soal & pembahasan: [toki.or.id](https://toki.or.id)
- Platform latihan resmi: [tlx.toki.or.id](https://tlx.toki.or.id)

**Timeline seleksi (estimasi — verifikasi ke Puspresnas tiap tahun karena bisa berubah):**

| Tahap | Nama | Waktu Estimasi | Penyelenggara |
|-------|------|----------------|---------------|
| 1 | Seleksi Sekolah (KSN-S) | Januari–Februari | Sekolah masing-masing |
| 2 | Seleksi Kabupaten/Kota (KSN-K) | Maret–April | Dinas Pendidikan Kab/Kota |
| 3 | Seleksi Provinsi (KSN-P) | Mei | Dinas Pendidikan Provinsi |
| 4 | Tingkat Nasional (KSN) | Juni–Juli | Puspresnas, rotasi kota tuan rumah |

**Materi KSN Informatika (berdasarkan silabus resmi):**

| Kategori | Topik |
|----------|-------|
| Algoritma dasar | Sorting (bubble, merge, quick, heap), searching (binary search), greedy |
| Struktur data | Array, linked list, stack, queue, deque, tree, binary search tree, heap |
| Graph | Representasi (adjacency list/matrix), BFS, DFS, topological sort |
| Shortest path | Dijkstra, Bellman-Ford, Floyd-Warshall |
| Dynamic programming | Memoization, tabulation, knapsack, LCS, LIS, coin change |
| Matematika diskrit | Modular arithmetic, GCD/LCM (Euclidean), bilangan prima (Sieve of Eratosthenes), kombinatorik |
| String | Brute force matching, KMP, hashing |
| Lanjutan (nasional) | Segment tree, BIT/Fenwick tree, union-find, network flow, computational geometry |

---

### 2. TOKI (Tim Olimpiade Komputer Indonesia)

**Penyelenggara:** TOKI — organisasi nirlaba yang mengelola seleksi tim Indonesia untuk IOI  
**Fungsi:** Seleksi dan pelatihan peserta untuk IOI (International Olympiad in Informatics)  
**Tingkat:** SMA (untuk IOI), ada juga TOKI Open untuk umum (mahasiswa/alumni boleh ikut)

TOKI mengelola platform latihan dan materi pelatihan yang bisa diakses gratis:

- Platform latihan: [tlx.toki.or.id](https://tlx.toki.or.id) — berisi soal KSN tahun lalu dan soal latihan
- Materi pelatihan: [training.toki.or.id](https://training.toki.or.id) — kurikulum terstruktur dari dasar sampai IOI
- Website: [toki.or.id](https://toki.or.id)

> **Catatan:** Materi di training.toki.or.id adalah referensi terbaik untuk konten olimpiade di repo ini. Jangan duplikasi — referensikan saja.

---

### 3. Bebras Indonesia

**Penyelenggara:** Bebras Indonesia, dikoordinasi oleh ITB  
**Fokus:** Computational thinking — tidak memerlukan bahasa pemrograman  
**Cocok untuk:** Pemula, kelas X–XI yang belum bisa coding  
**Waktu:** Biasanya Oktober–November setiap tahun

Bebras adalah entry point yang ideal sebelum KSN Informatika. Soal-soalnya melatih logika dan berpikir komputasional tanpa barrier bahasa pemrograman.

- Website: [bebras.or.id](https://bebras.or.id)
- Soal latihan per tahun tersedia di website resmi

---

### 4. KSN Matematika

**Penyelenggara:** Puspresnas, Kemendikdasmen  
**Timeline:** Sama dengan KSN Informatika  
**Relevansi:** Materi matematika diskrit di KSN Matematika sangat overlap dengan KSN Informatika

Topik yang overlap dan berguna untuk keduanya:
- Kombinatorik dan peluang
- Teori bilangan (GCD, LCM, modular arithmetic, bilangan prima)
- Logika dan pembuktian
- Rekursi dan induksi matematika

---

### 5. ICPC (International Collegiate Programming Contest)

**Penyelenggara:** ICPC Foundation  
**Tingkat:** Mahasiswa (tapi siswa SMA bisa mulai belajar materinya sekarang)  
**Relevansi:** Competitive programming yang dipelajari untuk KSN langsung berguna untuk ICPC saat kuliah

---

### 6. Gemastik

**Nama resmi:** Gelar Mahasiswa Teknologi Informasi dan Komunikasi  
**Penyelenggara:** Kemendikbud + Perguruan Tinggi (rotasi tuan rumah)  
**Tingkat:** Mahasiswa  
**Waktu:** Biasanya Agustus–Oktober  
**Bidang:** Programming, UI/UX, game dev, data mining, keamanan siber, animasi

Relevansi untuk Digital Lab: konten persiapan Gemastik bisa jadi motivasi siswa SMA untuk melihat ke depan.

- Website: [gemastik.kemdikbud.go.id](https://gemastik.kemdikbud.go.id)

---

## Panduan Membuat Konten Olimpiade

### Struktur folder yang direkomendasikan

Tambahkan modul baru di track yang paling relevan:

```
tracks/
├── software-engineering/
│   ├── 06-algoritma-kompetitif/     ← modul baru
│   │   ├── README.md
│   │   ├── 01-kompleksitas-waktu.md
│   │   ├── 02-sorting-lanjutan.md
│   │   ├── 03-dynamic-programming.md
│   │   ├── 04-graph-traversal.md
│   │   └── 99-latihan-ksn.md        ← kumpulan soal latihan
```

Untuk soal tipe Bebras (tanpa coding), bisa masuk ke track manapun yang relevan dengan tag `bebras`.

### Frontmatter wajib

```yaml
---
title: "Judul Lesson"
track: software-engineering
module: 06-algoritma-kompetitif
order: 1
level: intermediate          # beginner | intermediate | advanced
duration: 45                 # estimasi menit
tags: [olimpiade, osn-informatika, algoritma]
author: username-github-kamu
updated: 2026-04-24
description: "Deskripsi singkat satu kalimat"
---
```

### Tag yang tersedia

| Tag | Kapan dipakai |
|-----|--------------|
| `olimpiade` | **Wajib** untuk semua konten kompetisi |
| `osn-informatika` | Materi spesifik KSN/OSN Informatika |
| `osn-matematika` | Materi spesifik KSN/OSN Matematika |
| `bebras` | Soal tipe Bebras (computational thinking, tanpa coding) |
| `toki` | Materi tingkat TOKI/IOI (advanced) |
| `algoritma` | Konten algoritma umum |
| `competitive-programming` | Competitive programming umum |

### Format lesson olimpiade

Lesson olimpiade mengikuti standar [CONTRIBUTING.md](./CONTRIBUTING.md) dengan tambahan:

1. **Konteks kompetisi** — sebutkan di level mana materi ini muncul (KSN-K, KSN-P, atau Nasional)
2. **Kompleksitas** — selalu cantumkan time complexity dan space complexity
3. **Contoh soal** — minimal 1 soal dengan pembahasan langkah demi langkah
4. **Latihan mandiri** — link ke soal di TLX atau Codeforces (jangan buat soal sendiri yang tidak terverifikasi)
5. **Referensi** — link ke materi lanjutan

```markdown
## Konteks Kompetisi

Materi ini muncul di **KSN tingkat Provinsi dan Nasional**.
Di tingkat Kabupaten, biasanya cukup memahami versi dasar (lihat lesson sebelumnya).

## Kompleksitas

| Operasi | Time | Space |
|---------|------|-------|
| Build | O(n log n) | O(n) |
| Query | O(log n) | O(1) |

## Contoh Soal

**Soal (KSN 2023 — Provinsi):**
...

**Pembahasan:**
...

## Latihan Mandiri

1. [TLX] [Nama soal](https://tlx.toki.or.id/...) — level: mudah
2. [Codeforces] [Nama soal](https://codeforces.com/...) — level: sedang

## Referensi Lanjutan

- [CP-Algorithms: Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)
- [TOKI Training Gate](https://training.toki.or.id)
```

---

## Roadmap Konten (Prioritas)

### Fase 1 — Fondasi KSN Kabupaten (target: pemula yang baru mulai)
- [ ] Kompleksitas waktu dan ruang (Big-O notation)
- [ ] Sorting lanjutan (merge sort, quick sort) + kapan pakai yang mana
- [ ] Binary search dan variasinya
- [ ] Rekursi dan backtracking dasar
- [ ] Pengantar dynamic programming (memoization vs tabulation)

### Fase 2 — KSN Provinsi
- [ ] DP lanjutan: knapsack 0/1, LCS, LIS, coin change
- [ ] Graph: representasi, BFS, DFS
- [ ] Shortest path: Dijkstra
- [ ] Matematika: modular arithmetic, Sieve of Eratosthenes, kombinatorik dasar

### Fase 3 — KSN Nasional / TOKI
- [ ] Struktur data lanjutan: segment tree, BIT/Fenwick tree, union-find
- [ ] Graph lanjutan: topological sort, SCC, network flow
- [ ] String: KMP, Z-function, hashing
- [ ] DP lanjutan: bitmask DP, tree DP, digit DP
- [ ] Computational geometry dasar

### Bebras (paralel, untuk pemula tanpa coding)
- [ ] Soal-soal tipe Bebras dengan pembahasan pola pikir
- [ ] Latihan computational thinking: dekomposisi, abstraksi, pattern recognition

---

## Platform Latihan Soal

| Platform | URL | Keterangan |
|----------|-----|-----------|
| TLX (TOKI) | [tlx.toki.or.id](https://tlx.toki.or.id) | **Utama** — soal KSN Indonesia, gratis |
| TOKI Training | [training.toki.or.id](https://training.toki.or.id) | Kurikulum terstruktur, gratis |
| Codeforces | [codeforces.com](https://codeforces.com) | Internasional, rating system, kontes rutin |
| SPOJ | [spoj.com](https://spoj.com) | Koleksi soal klasik |
| LeetCode | [leetcode.com](https://leetcode.com) | Lebih ke interview prep, bagus untuk DP & graph |
| CP-Algorithms | [cp-algorithms.com](https://cp-algorithms.com) | Referensi algoritma terlengkap (Inggris) |
| USACO Guide | [usaco.guide](https://usaco.guide) | Kurikulum competitive programming terstruktur |

---

## Yang Tidak Boleh Ada di Konten Olimpiade

- Soal yang diklaim "dari KSN" tanpa sumber yang bisa diverifikasi — link ke TLX atau sumber resmi
- Solusi soal kompetisi yang masih aktif (ongoing contest)
- Kode yang tidak bisa dikompilasi dengan `g++ -std=c++17`
- Kompleksitas yang tidak dicantumkan untuk algoritma non-trivial

---

*Dokumen ini dikelola oleh tim Digital Lab SMA UII. Untuk pertanyaan atau koreksi, buka issue di [smauii-dev-content](https://github.com/SMA-UII-Yogyakarta/smauii-dev-content/issues).*
