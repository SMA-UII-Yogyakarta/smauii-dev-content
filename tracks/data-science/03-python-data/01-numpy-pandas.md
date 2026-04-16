---
title: "Python untuk Data — NumPy & Pandas"
track: data-science
module: 03-python-data
order: 1
level: beginner
duration: 50
tags: [python, numpy, pandas, data-wrangling]
author: sandikodev
updated: 2026-04-17
---

# Python untuk Data — NumPy & Pandas

NumPy dan Pandas adalah dua library paling penting dalam ekosistem data science Python.

## NumPy — Komputasi Numerik

```python
import numpy as np

# Array
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2, 3], [4, 5, 6]])

# Operasi vektorisasi (jauh lebih cepat dari loop)
arr * 2          # [2, 4, 6, 8, 10]
arr ** 2         # [1, 4, 9, 16, 25]
np.sqrt(arr)     # [1, 1.41, 1.73, 2, 2.24]

# Statistik
np.mean(arr)     # 3.0
np.std(arr)      # 1.41
np.sum(arr)      # 15

# Indexing & Slicing
matrix[0, :]     # Baris pertama: [1, 2, 3]
matrix[:, 1]     # Kolom kedua: [2, 5]
matrix[matrix > 3]  # Boolean indexing: [4, 5, 6]

# Broadcasting
a = np.array([[1], [2], [3]])  # Shape (3,1)
b = np.array([10, 20, 30])     # Shape (3,)
a + b  # Shape (3,3) — otomatis broadcast
```

## Pandas — Analisis Data Tabular

```python
import pandas as pd

# Buat DataFrame
df = pd.DataFrame({
    "nama": ["Sandi", "Koko", "Rara", "Budi"],
    "kelas": ["XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPA 1"],
    "nilai_mtk": [90, 75, 85, 70],
    "nilai_ipa": [88, 80, 72, 65],
    "track": ["software", "ai", "data", "software"]
})

# Eksplorasi dasar
df.head()           # 5 baris pertama
df.info()           # Tipe data + missing values
df.describe()       # Statistik deskriptif
df.shape            # (4, 5)
```

## Data Wrangling

```python
# Seleksi kolom
df[["nama", "nilai_mtk"]]
df.loc[:, "nama":"nilai_mtk"]  # Slice kolom

# Filter baris
df[df["nilai_mtk"] >= 80]
df.query("nilai_mtk >= 80 and kelas == 'XII IPA 1'")

# Tambah kolom
df["rata_rata"] = (df["nilai_mtk"] + df["nilai_ipa"]) / 2
df["lulus"] = df["rata_rata"] >= 75

# GroupBy — agregasi per grup
df.groupby("kelas")["nilai_mtk"].mean()
df.groupby("track").agg({"nilai_mtk": ["mean", "max", "count"]})

# Pivot table
pd.pivot_table(df, values="nilai_mtk", index="kelas", columns="track", aggfunc="mean")
```

## Handling Missing Data

```python
# Cek missing
df.isnull().sum()
df.isnull().mean() * 100  # Persentase

# Hapus baris dengan missing
df.dropna()
df.dropna(subset=["nilai_mtk"])  # Hanya kolom tertentu

# Isi missing
df["nilai_mtk"].fillna(df["nilai_mtk"].mean())  # Isi dengan mean
df["kelas"].fillna("Tidak Diketahui")            # Isi dengan nilai tetap
df.fillna(method="ffill")                         # Forward fill
```

## Merge & Join

```python
siswa = pd.DataFrame({"id": [1, 2, 3], "nama": ["A", "B", "C"]})
nilai = pd.DataFrame({"id": [1, 2, 4], "nilai": [90, 85, 70]})

# Inner join — hanya yang ada di keduanya
pd.merge(siswa, nilai, on="id")

# Left join — semua dari kiri
pd.merge(siswa, nilai, on="id", how="left")

# Concat — gabung vertikal
pd.concat([df1, df2], ignore_index=True)
```

## Latihan

Dataset: [Indonesian Student Performance](https://www.kaggle.com/)
1. Load CSV dengan Pandas
2. Cek dan handle missing values
3. Hitung rata-rata nilai per kelas dan per jurusan
4. Temukan 10 siswa dengan nilai tertinggi
5. Export hasil ke CSV baru
