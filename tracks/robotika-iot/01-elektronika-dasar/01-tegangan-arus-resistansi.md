---
title: "Tegangan, Arus, dan Resistansi"
track: robotika-iot
module: 01-elektronika-dasar
order: 1
level: beginner
duration: 30
tags: [elektronika, ohm, tegangan, arus, resistor]
author: sandikodev
updated: 2026-04-17
---

# Tegangan, Arus, dan Resistansi

Tiga konsep fundamental elektronika yang menjadi dasar semua rangkaian listrik.

## Analogi Air

Elektronika lebih mudah dipahami dengan analogi air:

| Listrik | Air | Satuan |
|---------|-----|--------|
| Tegangan (V) | Tekanan air | Volt (V) |
| Arus (I) | Debit air | Ampere (A) |
| Resistansi (R) | Hambatan pipa | Ohm (Ω) |
| Daya (P) | Daya pompa | Watt (W) |

## Hukum Ohm

$$V = I \times R$$

Atau:
$$I = \frac{V}{R} \qquad R = \frac{V}{I}$$

**Contoh:**
- Tegangan baterai: $V = 5\text{ V}$
- Resistor: $R = 220\text{ Ω}$
- Arus yang mengalir: $I = \frac{5}{220} \approx 22.7\text{ mA}$

## Daya

$$P = V \times I = \frac{V^2}{R} = I^2 \times R$$

> **Penting:** LED biasa butuh arus ~20mA. Tanpa resistor, LED akan terbakar!

## Resistor

Resistor membatasi arus dalam rangkaian.

### Kode Warna

```
Coklat = 1
Merah  = 2
Oranye = 3
Kuning = 4
Hijau  = 5
Biru   = 6
Ungu   = 7
Abu    = 8
Putih  = 9
Hitam  = 0
Emas   = ×0.1 (toleransi 5%)
Perak  = ×0.01 (toleransi 10%)
```

Resistor 4 band: `[digit1][digit2][multiplier][toleransi]`

Contoh: Merah-Merah-Coklat-Emas = 2-2-×10-5% = **220Ω ±5%**

## Menghitung Resistor untuk LED

```
Vcc = 5V (Arduino)
Vled = 2V (LED merah)
Iled = 20mA = 0.02A

R = (Vcc - Vled) / Iled
R = (5 - 2) / 0.02
R = 150Ω → pakai 220Ω (nilai standar terdekat)
```

## Rangkaian Seri vs Paralel

**Seri:** Arus sama, tegangan terbagi
$$R_{total} = R_1 + R_2 + R_3$$

**Paralel:** Tegangan sama, arus terbagi
$$\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}$$

## Latihan

1. Hitung resistor yang dibutuhkan untuk LED biru (Vf = 3.2V) dengan Arduino 5V
2. Buat rangkaian di [Tinkercad](https://www.tinkercad.com) — LED + resistor + Arduino
3. Simulasikan dan verifikasi arus yang mengalir
