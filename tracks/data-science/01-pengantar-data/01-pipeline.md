---
title: "Data Science Pipeline"
track: data-science
module: 01-pengantar-data
order: 1
level: beginner
duration: 25
tags: [data-science, pipeline, pandas, numpy]
author: sandikodev
updated: 2026-04-17
---

# Data Science Pipeline

Setiap proyek data science mengikuti alur yang sama — dari pertanyaan bisnis hingga insight yang actionable.

## Pipeline Lengkap

```mermaid
graph LR
    Q[Pertanyaan] --> C[Kumpulkan Data]
    C --> Cl[Bersihkan Data]
    Cl --> E[Eksplorasi EDA]
    E --> M[Modeling]
    M --> V[Visualisasi]
    V --> I[Insight & Keputusan]
```

## 1. Definisikan Pertanyaan

Sebelum menyentuh data, tanyakan:
- Apa yang ingin kita ketahui?
- Keputusan apa yang akan diambil berdasarkan data ini?
- Bagaimana kita tahu kalau analisis kita berhasil?

**Contoh pertanyaan yang baik:**
> "Faktor apa yang paling mempengaruhi kelulusan siswa di SMA UII?"

## 2. Kumpulkan Data

Sumber data:
- **Internal** — Database sekolah, absensi, nilai
- **Eksternal** — Kaggle, UCI ML Repository, data.go.id
- **API** — Twitter, GitHub, OpenWeather
- **Web scraping** — BeautifulSoup, Scrapy

## 3. Bersihkan Data

Data kotor adalah musuh utama data scientist. Masalah umum:

```python
import pandas as pd

df = pd.read_csv("data_siswa.csv")

# Cek missing values
print(df.isnull().sum())

# Hapus duplikat
df = df.drop_duplicates()

# Isi missing value
df["nilai"].fillna(df["nilai"].mean(), inplace=True)

# Fix tipe data
df["tanggal"] = pd.to_datetime(df["tanggal"])
```

## 4. Eksplorasi Data (EDA)

```python
# Statistik deskriptif
print(df.describe())

# Distribusi nilai
df["nilai"].hist(bins=20)

# Korelasi antar variabel
df.corr()["kelulusan"].sort_values(ascending=False)
```

## 5. Tipe Data

| Tipe | Contoh | Analisis |
|------|--------|----------|
| Numerik kontinu | Tinggi badan, nilai | Mean, median, std |
| Numerik diskrit | Jumlah absen | Count, mode |
| Kategorikal nominal | Jurusan, gender | Frekuensi, chi-square |
| Kategorikal ordinal | Grade (A/B/C) | Median, rank |
| Time series | Nilai per semester | Trend, seasonality |

## Latihan

1. Download dataset [Student Performance](https://www.kaggle.com/datasets/spscientist/students-performance-in-exams) dari Kaggle
2. Load dengan Pandas
3. Jawab: Siapa yang rata-rata nilainya lebih tinggi — siswa yang ikut kursus persiapan atau tidak?
