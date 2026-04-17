---
title: "Google Analytics & Data-Driven Marketing"
track: digital-marketing
module: 05-analytics-growth
order: 1
level: intermediate
duration: 40
tags: [google-analytics, data, metrics, dashboard, insight]
author: sandikodev
updated: 2026-04-17
---

# Google Analytics & Data-Driven Marketing

Data tanpa interpretasi hanya angka. Skill analytics adalah kemampuan mengubah angka menjadi keputusan.

## Setup Google Analytics 4

```
1. Buka analytics.google.com
2. Buat property baru → pilih "Web"
3. Masukkan URL website
4. Copy tracking code → paste di <head> semua halaman

Untuk Astro:
```

```astro
---
// src/layouts/Layout.astro
---
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Metrics yang Wajib Dipantau

### Traffic Metrics

| Metric | Artinya | Target |
|--------|---------|--------|
| Users | Jumlah pengunjung unik | Naik setiap bulan |
| Sessions | Jumlah kunjungan | - |
| Pageviews | Jumlah halaman dilihat | - |
| Bounce Rate | % yang langsung pergi | < 60% |
| Avg. Session Duration | Rata-rata waktu di site | > 2 menit |

### Acquisition Metrics

```
Organic Search  → dari Google (SEO berhasil)
Direct          → ketik URL langsung (brand awareness tinggi)
Social          → dari media sosial
Referral        → dari website lain (backlink)
Email           → dari email marketing
Paid Search     → dari Google Ads
```

## Membaca Data dengan Benar

### Jangan Terjebak Vanity Metrics

```
Vanity metrics (terlihat bagus tapi tidak bermakna):
  - Total pageviews tanpa konteks
  - Follower count
  - Likes

Actionable metrics (yang benar-benar penting):
  - Conversion rate
  - Revenue per visitor
  - Retention rate
  - Cost per acquisition
```

### Segmentasi

Jangan lihat data secara agregat — segmentasi untuk insight yang lebih dalam:

```python
# Contoh pertanyaan yang butuh segmentasi:
"Apakah pengguna mobile punya bounce rate lebih tinggi?"
→ Segmentasi: Device type

"Apakah pengguna dari Instagram lebih engaged?"
→ Segmentasi: Traffic source

"Apakah halaman tertentu menyebabkan drop-off?"
→ Segmentasi: Landing page
```

## Funnel Analysis

Lacak di mana pengguna drop-off dalam alur konversi:

```
Halaman utama → 1000 pengunjung
    ↓ 60% lanjut
Halaman daftar → 600 pengunjung
    ↓ 40% lanjut
Form registrasi → 240 pengunjung
    ↓ 50% selesai
Registrasi berhasil → 120 konversi

Conversion rate: 12%
Drop-off terbesar: form registrasi (50% drop)
→ Prioritas perbaikan: sederhanakan form
```

## Dashboard Sederhana

Buat dashboard mingguan dengan 5 metric utama:

```
Week of [tanggal]:
  Users:           1,234 (+12% vs minggu lalu)
  Top source:      Organic Search (45%)
  Top page:        /learn/software-engineering
  Conversion rate: 8.5% (-1.2%)
  Avg. session:    3m 24s (+15s)

Action items:
  → Conversion rate turun → cek form registrasi
  → Organic traffic naik → pertahankan posting blog
```

## Latihan

1. Setup Google Analytics 4 di website Digital Lab
2. Buat dashboard dengan 5 metric utama di GA4
3. Analisis: dari mana traffic terbesar berasal? Halaman mana yang paling banyak dikunjungi?
4. Identifikasi 1 masalah dari data dan buat hipotesis solusinya
