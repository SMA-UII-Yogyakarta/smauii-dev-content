---
title: "SQL & Database untuk Data Science"
track: data-science
module: 03-python-data
order: 3
level: intermediate
duration: 45
tags: [sql, database, postgresql, query, analytics]
author: sandikodev
updated: 2026-04-17
---

# SQL & Database untuk Data Science

SQL adalah skill wajib data scientist — hampir semua data tersimpan di database relasional.

## SQL Dasar

```sql
-- Buat tabel
CREATE TABLE siswa (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    kelas VARCHAR(20),
    jurusan VARCHAR(10),
    nilai_mtk DECIMAL(5,2),
    nilai_ipa DECIMAL(5,2),
    kehadiran INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert data
INSERT INTO siswa (nama, kelas, jurusan, nilai_mtk, nilai_ipa, kehadiran)
VALUES ('Sandi Kurniawan', 'XII IPA 1', 'IPA', 92.5, 88.0, 95);

-- Select dasar
SELECT * FROM siswa WHERE jurusan = 'IPA' AND nilai_mtk >= 80;
SELECT nama, nilai_mtk FROM siswa ORDER BY nilai_mtk DESC LIMIT 10;
```

## Analisis dengan SQL

```sql
-- Statistik per kelas
SELECT
    kelas,
    COUNT(*) as total_siswa,
    ROUND(AVG(nilai_mtk), 2) as avg_mtk,
    ROUND(AVG(nilai_ipa), 2) as avg_ipa,
    MAX(nilai_mtk) as max_mtk,
    MIN(nilai_mtk) as min_mtk,
    STDDEV(nilai_mtk) as std_mtk
FROM siswa
GROUP BY kelas
ORDER BY avg_mtk DESC;

-- Ranking nilai
SELECT
    nama,
    nilai_mtk,
    RANK() OVER (ORDER BY nilai_mtk DESC) as ranking,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY nilai_mtk)
        OVER (PARTITION BY kelas) as median_kelas
FROM siswa;

-- Identifikasi siswa berisiko
SELECT nama, kelas, nilai_mtk, kehadiran
FROM siswa
WHERE nilai_mtk < (SELECT AVG(nilai_mtk) - STDDEV(nilai_mtk) FROM siswa)
   OR kehadiran < 75;
```

## Window Functions

```sql
-- Moving average nilai 3 semester
SELECT
    semester,
    avg_nilai,
    AVG(avg_nilai) OVER (
        ORDER BY semester
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as moving_avg_3
FROM (
    SELECT semester, AVG(nilai) as avg_nilai
    FROM nilai_semester
    GROUP BY semester
) t;

-- Perkembangan nilai per siswa
SELECT
    siswa_id,
    semester,
    nilai,
    nilai - LAG(nilai) OVER (PARTITION BY siswa_id ORDER BY semester) as delta
FROM nilai_semester;
```

## Pandas + SQL

```python
import pandas as pd
from sqlalchemy import create_engine

# Koneksi ke PostgreSQL
engine = create_engine("postgresql://user:pass@localhost/smauii_db")

# Query langsung ke DataFrame
df = pd.read_sql("""
    SELECT s.nama, s.kelas, s.jurusan,
           AVG(n.nilai) as avg_nilai,
           COUNT(n.id) as total_mata_pelajaran
    FROM siswa s
    JOIN nilai n ON s.id = n.siswa_id
    GROUP BY s.id, s.nama, s.kelas, s.jurusan
    HAVING AVG(n.nilai) >= 75
    ORDER BY avg_nilai DESC
""", engine)

print(df.head(10))

# Simpan hasil analisis kembali ke DB
df_hasil.to_sql("hasil_analisis", engine, if_exists="replace", index=False)
```

## Latihan

1. Setup PostgreSQL dengan Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres`
2. Import dataset nilai siswa (CSV) ke PostgreSQL
3. Buat query untuk 5 insight menarik dari data
4. Buat report dengan query + visualisasi Pandas
