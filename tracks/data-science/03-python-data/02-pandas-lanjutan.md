---
title: "Pandas Lanjutan — Data Cleaning & Feature Engineering"
track: data-science
module: 03-python-data
order: 2
level: intermediate
duration: 45
tags: [pandas, data-cleaning, feature-engineering, regex]
author: sandikodev
updated: 2026-04-17
---

# Pandas Lanjutan — Data Cleaning & Feature Engineering

Data scientist menghabiskan 80% waktu untuk membersihkan data. Kuasai ini dan kamu sudah setengah jalan.

## Deteksi & Handle Outlier

```python
import pandas as pd
import numpy as np

df = pd.read_csv("data_nilai.csv")

# IQR Method
Q1 = df["nilai"].quantile(0.25)
Q3 = df["nilai"].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

outliers = df[(df["nilai"] < lower) | (df["nilai"] > upper)]
print(f"Outlier: {len(outliers)} baris")

# Hapus atau cap outlier
df_clean = df[df["nilai"].between(lower, upper)]
df["nilai_capped"] = df["nilai"].clip(lower, upper)
```

## String Operations

```python
# Bersihkan kolom nama
df["nama"] = (df["nama"]
    .str.strip()           # Hapus whitespace
    .str.title()           # Title Case
    .str.replace(r"\s+", " ", regex=True)  # Multiple spaces → single
)

# Ekstrak informasi dari string
df["kelas_angka"] = df["kelas"].str.extract(r"(\d+)")  # "XII IPA 1" → "1"
df["jurusan"] = df["kelas"].str.extract(r"(IPA|IPS)")

# Split kolom
df[["nama_depan", "nama_belakang"]] = df["nama"].str.split(" ", n=1, expand=True)
```

## DateTime Operations

```python
df["tanggal"] = pd.to_datetime(df["tanggal"])

df["tahun"] = df["tanggal"].dt.year
df["bulan"] = df["tanggal"].dt.month
df["hari"] = df["tanggal"].dt.day_name()
df["semester"] = df["bulan"].apply(lambda m: 1 if m <= 6 else 2)

# Hitung durasi
df["lama_studi"] = (pd.Timestamp.now() - df["tanggal_masuk"]).dt.days
```

## Feature Engineering

```python
# Interaksi fitur
df["nilai_x_kehadiran"] = df["nilai"] * df["pct_kehadiran"]

# Binning — ubah kontinu ke kategori
df["kategori_nilai"] = pd.cut(df["nilai"],
    bins=[0, 60, 70, 80, 90, 100],
    labels=["E", "D", "C", "B", "A"]
)

# Encoding
# One-hot encoding
df_encoded = pd.get_dummies(df, columns=["jurusan", "kelas"])

# Label encoding untuk ordinal
level_map = {"beginner": 0, "intermediate": 1, "advanced": 2}
df["level_enc"] = df["level"].map(level_map)

# Target encoding (mean encoding)
target_mean = df.groupby("kelas")["lulus"].mean()
df["kelas_target_enc"] = df["kelas"].map(target_mean)
```

## Pipeline Scikit-learn

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier

numeric_features = ["nilai", "kehadiran", "lama_studi"]
categorical_features = ["jurusan", "kelas"]

preprocessor = ColumnTransformer([
    ("num", StandardScaler(), numeric_features),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
])

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(n_estimators=100))
])

pipeline.fit(X_train, y_train)
score = pipeline.score(X_test, y_test)
print(f"Accuracy: {score:.2%}")
```

## Latihan

Dataset nilai siswa 3 tahun terakhir:
1. Bersihkan: handle missing, outlier, format tidak konsisten
2. Feature engineering: buat 5 fitur baru yang bermakna
3. Buat pipeline preprocessing + model
4. Evaluasi dengan cross-validation
