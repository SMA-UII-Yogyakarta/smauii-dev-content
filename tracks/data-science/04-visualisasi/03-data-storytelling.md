---
title: "Data Storytelling & Laporan"
track: data-science
module: 04-visualisasi
order: 3
level: intermediate
duration: 40
tags: [storytelling, report, jupyter, presentation, communication]
author: sandikodev
updated: 2026-04-17
---

# Data Storytelling & Laporan

Analisis yang bagus tidak berguna jika tidak bisa dikomunikasikan dengan efektif.

## Struktur Laporan Data Science

```
1. Executive Summary (1 halaman)
   - Pertanyaan bisnis
   - Temuan utama
   - Rekomendasi

2. Metodologi
   - Sumber data
   - Proses cleaning
   - Metode analisis

3. Temuan & Visualisasi
   - Satu insight per visualisasi
   - Narasi yang menjelaskan "so what?"

4. Rekomendasi
   - Actionable, spesifik, terukur

5. Lampiran
   - Kode, data, referensi
```

## Jupyter Notebook yang Rapi

```python
# %% [markdown]
# # Analisis Faktor Kelulusan Siswa SMA UII
# 
# **Pertanyaan:** Faktor apa yang paling mempengaruhi kelulusan?
# 
# **Dataset:** 500 siswa, 2020-2024
# **Tools:** Python, Pandas, Scikit-learn, Plotly

# %% Setup
import pandas as pd
import plotly.express as px
from IPython.display import display, Markdown

# Helper untuk format angka
def fmt(n, decimals=1):
    return f"{n:.{decimals}f}"

# %% [markdown]
# ## 1. Load & Eksplorasi Data

# %%
df = pd.read_csv("data_siswa.csv")

# Summary statistics yang informatif
summary = pd.DataFrame({
    "Rata-rata": df.mean().round(2),
    "Median": df.median().round(2),
    "Std Dev": df.std().round(2),
    "Min": df.min(),
    "Max": df.max()
})

display(Markdown(f"**Total siswa:** {len(df)} | **Tingkat kelulusan:** {df['lulus'].mean():.1%}"))
display(summary)
```

## Narasi Data yang Baik

```python
# Buruk: hanya tampilkan angka
print(f"Rata-rata nilai: {avg:.2f}")

# Baik: tambahkan konteks dan insight
insight = f"""
**Temuan Utama:**
Rata-rata nilai siswa adalah **{avg:.1f}** — lebih tinggi {avg - baseline:.1f} poin 
dibanding tahun lalu. Siswa dengan kehadiran di atas 85% memiliki nilai rata-rata 
**{high_attend_avg:.1f}**, dibanding {low_attend_avg:.1f} untuk kehadiran rendah 
— selisih signifikan {high_attend_avg - low_attend_avg:.1f} poin.
"""
display(Markdown(insight))
```

## Presentasi dengan Rise.js

```bash
# Konversi Jupyter ke presentasi (pakai RISE extension)
pip install RISE
jupyter notebook  # Aktifkan RISE dari toolbar

# Atau export ke slides
jupyter nbconvert notebook.ipynb --to slides --post serve
```

## nbconvert — Export ke Berbagai Format

```bash
# Export ke HTML
jupyter nbconvert analysis.ipynb --to html --template classic

# Export ke PDF
jupyter nbconvert analysis.ipynb --to pdf

# Export tanpa kode (hanya output)
jupyter nbconvert analysis.ipynb --to html --no-input
```

## Latihan

1. Buat Jupyter Notebook analisis data siswa dengan narasi lengkap
2. Setiap visualisasi harus punya judul informatif dan 1-2 kalimat kesimpulan
3. Export ke HTML dan bagikan ke teman
4. Buat ringkasan 1 halaman untuk "kepala sekolah" — tanpa jargon teknis
