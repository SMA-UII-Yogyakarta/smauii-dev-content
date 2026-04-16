---
title: "Visualisasi dengan Matplotlib & Seaborn"
track: data-science
module: 04-visualisasi
order: 1
level: beginner
duration: 45
tags: [visualisasi, matplotlib, seaborn, plotly, storytelling]
author: sandikodev
updated: 2026-04-17
---

# Visualisasi dengan Matplotlib & Seaborn

Visualisasi yang baik menceritakan kisah dari data — bukan sekadar menampilkan angka.

## Prinsip Visualisasi yang Baik

1. **Pilih chart yang tepat** untuk tipe data
2. **Satu pesan utama** per visualisasi
3. **Label yang jelas** — judul, sumbu, legenda
4. **Warna bermakna** — jangan pakai warna acak
5. **Hindari chartjunk** — dekorasi yang tidak informatif

## Memilih Chart yang Tepat

| Tujuan | Chart |
|--------|-------|
| Distribusi | Histogram, Box plot, Violin |
| Perbandingan | Bar chart, Grouped bar |
| Tren waktu | Line chart |
| Korelasi | Scatter plot, Heatmap |
| Proporsi | Pie chart (max 5 kategori), Stacked bar |
| Distribusi geografis | Choropleth map |

## Matplotlib Dasar

```python
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# 1. Line chart — tren nilai per semester
semester = [1, 2, 3, 4, 5, 6]
nilai = [72, 75, 80, 78, 85, 88]
axes[0, 0].plot(semester, nilai, 'b-o', linewidth=2, markersize=8)
axes[0, 0].set_title("Tren Nilai per Semester")
axes[0, 0].set_xlabel("Semester")
axes[0, 0].set_ylabel("Nilai")
axes[0, 0].grid(True, alpha=0.3)

# 2. Bar chart — jumlah siswa per track
tracks = ["Software", "AI", "Data", "Jaringan", "Security", "Robotika"]
counts = [25, 18, 15, 20, 12, 10]
colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#6b7280"]
axes[0, 1].bar(tracks, counts, color=colors)
axes[0, 1].set_title("Jumlah Siswa per Track")
axes[0, 1].tick_params(axis='x', rotation=45)

# 3. Histogram — distribusi nilai
nilai_all = np.random.normal(78, 10, 200)
axes[1, 0].hist(nilai_all, bins=20, color="#3b82f6", edgecolor="white", alpha=0.7)
axes[1, 0].axvline(np.mean(nilai_all), color='red', linestyle='--', label=f'Mean: {np.mean(nilai_all):.1f}')
axes[1, 0].set_title("Distribusi Nilai Siswa")
axes[1, 0].legend()

# 4. Scatter plot — korelasi jam belajar vs nilai
jam = np.random.uniform(1, 10, 50)
nilai_scatter = jam * 8 + np.random.normal(0, 5, 50)
axes[1, 1].scatter(jam, nilai_scatter, alpha=0.6, color="#10b981")
axes[1, 1].set_title("Jam Belajar vs Nilai")
axes[1, 1].set_xlabel("Jam Belajar per Hari")
axes[1, 1].set_ylabel("Nilai Ujian")

plt.tight_layout()
plt.savefig("dashboard.png", dpi=150, bbox_inches="tight")
plt.show()
```

## Seaborn — Statistical Visualization

```python
import seaborn as sns
import pandas as pd

sns.set_theme(style="darkgrid", palette="husl")

df = pd.DataFrame({
    "track": ["Software"]*30 + ["AI"]*25 + ["Data"]*20,
    "nilai": np.concatenate([
        np.random.normal(82, 8, 30),
        np.random.normal(78, 10, 25),
        np.random.normal(80, 9, 20)
    ])
})

# Box plot — distribusi per grup
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

sns.boxplot(data=df, x="track", y="nilai", ax=axes[0])
axes[0].set_title("Box Plot Nilai per Track")

sns.violinplot(data=df, x="track", y="nilai", ax=axes[1])
axes[1].set_title("Violin Plot")

# Heatmap — korelasi
corr_data = pd.DataFrame(np.random.randn(5, 5),
    columns=["Mtk", "IPA", "IPS", "Bhs", "Seni"])
sns.heatmap(corr_data.corr(), annot=True, fmt=".2f",
    cmap="coolwarm", ax=axes[2])
axes[2].set_title("Korelasi Antar Mata Pelajaran")
```

## Plotly — Visualisasi Interaktif

```python
import plotly.express as px
import plotly.graph_objects as go

# Scatter interaktif
fig = px.scatter(df, x="jam_belajar", y="nilai",
    color="track", size="absensi",
    hover_data=["nama", "kelas"],
    title="Hubungan Jam Belajar dan Nilai")
fig.show()

# Dashboard dengan subplots
from plotly.subplots import make_subplots
fig = make_subplots(rows=2, cols=2, subplot_titles=["A", "B", "C", "D"])
# ... tambah traces
fig.update_layout(height=800, title="Dashboard Akademik")
fig.write_html("dashboard.html")
```

## Latihan

Buat dashboard visualisasi dari dataset siswa:
1. Distribusi nilai (histogram + box plot)
2. Perbandingan nilai antar kelas (grouped bar)
3. Tren nilai per semester (line chart)
4. Korelasi nilai vs kehadiran (scatter + regression line)
5. Export sebagai HTML interaktif dengan Plotly
