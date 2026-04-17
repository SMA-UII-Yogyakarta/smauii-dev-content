---
title: "Layout & Grid System"
track: desain-uiux
module: 01-fondasi-desain
order: 3
level: beginner
duration: 30
tags: [layout, grid, columns, responsive, figma]
author: sandikodev
updated: 2026-04-17
---

# Layout & Grid System

Grid adalah tulang punggung layout yang konsisten — tanpanya, desain terasa acak dan tidak teratur.

## Mengapa Grid?

Tanpa grid, setiap elemen diposisikan berdasarkan "rasa". Hasilnya inkonsisten dan susah di-maintain. Dengan grid, semua elemen mengikuti sistem yang sama — desain terasa teratur meski kompleks.

## 12-Column Grid

Standar industri untuk web:

```
|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  |
|           Full width (12 kolom)                                          |
|     Half (6)      |     Half (6)      |
|  Third (4)  |  Third (4)  |  Third (4)  |
|Quarter(3)|Quarter(3)|Quarter(3)|Quarter(3)|
```

**Kenapa 12?** Bisa dibagi 2, 3, 4, dan 6 — sangat fleksibel.

## Anatomi Grid

```
Margin    Column    Gutter    Column    Margin
|←──→|←──────→|←──→|←──────→|←──→|
```

- **Column** — area konten
- **Gutter** — jarak antar kolom (biasanya 16-24px)
- **Margin** — jarak dari tepi layar (biasanya 16-32px)

## Breakpoint & Responsive Grid

```
Mobile  (< 640px):  4 kolom, gutter 16px, margin 16px
Tablet  (640-1024): 8 kolom, gutter 24px, margin 24px
Desktop (> 1024px): 12 kolom, gutter 24px, margin 32px+
```

## Setup Grid di Figma

1. Select frame → klik `+` di panel **Grid**
2. Pilih **Columns**
3. Set: Count=12, Gutter=24, Margin=32
4. Warna grid: biru transparan (untuk visibility saat desain)

## 8-Point Grid untuk Spacing

Semua spacing menggunakan kelipatan 8:

```
4px  → micro spacing (icon padding)
8px  → xs (gap antar elemen kecil)
16px → sm (padding dalam card)
24px → md (gap antar section kecil)
32px → lg (padding section)
48px → xl (gap antar section besar)
64px → 2xl (hero padding)
```

> **Mengapa 8?** Layar modern (1x, 2x, 3x density) semua bisa membagi 8 dengan sempurna — tidak ada pixel pecahan.

## Rangkuman

- Grid 12 kolom adalah standar web yang fleksibel
- Gutter dan margin konsisten menciptakan ritme visual
- 8-point grid untuk spacing — tidak ada angka acak
- Responsive: grid menyesuaikan breakpoint

## Latihan

Di Figma:
1. Buat frame Desktop (1440px) dengan 12-column grid
2. Buat frame Mobile (390px) dengan 4-column grid
3. Desain layout halaman sederhana (hero + 3 card) yang responsif di keduanya
4. Pastikan semua elemen snap ke grid
