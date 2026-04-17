---
title: "Breadboard & Prototyping"
track: robotika-iot
module: 01-elektronika-dasar
order: 2
level: beginner
duration: 25
tags: [breadboard, prototyping, komponen, rangkaian]
author: sandikodev
updated: 2026-04-17
---

# Breadboard & Prototyping

Breadboard memungkinkan kamu merakit rangkaian elektronik tanpa solder — sempurna untuk eksperimen.

## Anatomi Breadboard

```
  +  -  a b c d e   f g h i j  +  -
  ┌──┬──┬─────────┬─────────┬──┬──┐
1 │  │  │○ ○ ○ ○ ○│○ ○ ○ ○ ○│  │  │
2 │  │  │○ ○ ○ ○ ○│○ ○ ○ ○ ○│  │  │
3 │  │  │○ ○ ○ ○ ○│○ ○ ○ ○ ○│  │  │
  └──┴──┴─────────┴─────────┴──┴──┘
  Power rail      Komponen area
```

**Koneksi internal:**
- Baris `+` dan `-` (power rail): terhubung horizontal sepanjang breadboard
- Kolom `a-e` dan `f-j`: terhubung vertikal per baris
- Tengah: terpisah (gap)

## Komponen Dasar

### Resistor
```
Ω values: 220Ω, 470Ω, 1kΩ, 10kΩ, 100kΩ
Gunakan: membatasi arus, pull-up/pull-down
```

### Kapasitor
```
Electrolytic: 10µF, 100µF (polar — perhatikan + -)
Ceramic: 100nF (non-polar) — bypass/decoupling
Gunakan: filtering, stabilisasi tegangan
```

### LED
```
Anode (+) → resistor → Arduino pin
Cathode (-) → GND
Warna: merah (2V), kuning (2V), hijau (2.2V), biru (3.3V)
```

### Transistor NPN (BC547)
```
B (Base) → control signal (via resistor 1kΩ)
C (Collector) → load (+)
E (Emitter) → GND

Gunakan: switch motor, relay driver
```

## Rangkaian Dasar

### LED + Resistor

```
5V ─── 220Ω ─── LED(+) ─── LED(-) ─── GND
```

### Pull-up Resistor untuk Tombol

```
5V ─── 10kΩ ─── Arduino Pin 2 ─── Tombol ─── GND
```
Saat tombol tidak ditekan: pin baca HIGH (5V)
Saat ditekan: pin baca LOW (GND)

### Transistor sebagai Switch

```
Arduino Pin ─── 1kΩ ─── Base (B)
                          │
                     Collector (C) ─── Motor (+)
                     Emitter (E) ──── GND
Motor (-) ─── GND
```

## Tips Troubleshooting

```
Masalah umum:
1. LED tidak nyala → cek orientasi (anode/cathode), nilai resistor
2. Pembacaan sensor noise → tambah kapasitor 100nF di power supply
3. Motor mengganggu sensor → pisahkan power supply, tambah flyback diode
4. Koneksi intermittent → pastikan kaki komponen masuk penuh ke lubang

Tools diagnostik:
- Multimeter: ukur tegangan, arus, resistansi
- Oscilloscope: lihat sinyal digital/analog
- Logic analyzer: decode protokol I2C, SPI, UART
```

## Latihan

1. Rakit rangkaian LED + resistor di breadboard
2. Hitung dan verifikasi arus dengan multimeter
3. Tambah tombol — LED nyala saat ditekan
4. Tambah transistor — kontrol motor DC dengan Arduino
