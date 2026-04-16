---
title: "HTML — Struktur Halaman Web"
track: software-engineering
module: 02-web-fundamentals
order: 2
level: beginner
duration: 30
tags: [html, markup, semantic]
author: sandikodev
updated: 2026-04-17
---

# HTML — Struktur Halaman Web

HTML (HyperText Markup Language) adalah bahasa markup yang mendefinisikan struktur konten di web.

## Anatomi Dokumen HTML

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul Halaman</title>
</head>
<body>
  <h1>Halo Dunia!</h1>
  <p>Ini adalah paragraf pertama saya.</p>
</body>
</html>
```

## Tag Semantik

HTML5 memperkenalkan tag semantik — tag yang punya makna, bukan sekadar pembungkus visual.

```html
<header>   <!-- Bagian atas halaman / navigasi -->
<nav>      <!-- Menu navigasi -->
<main>     <!-- Konten utama -->
<article>  <!-- Konten mandiri (blog post, berita) -->
<section>  <!-- Bagian dalam halaman -->
<aside>    <!-- Konten sampingan (sidebar) -->
<footer>   <!-- Bagian bawah halaman -->
```

**Mengapa semantik penting?**
- Screen reader bisa membaca halaman dengan benar (aksesibilitas)
- SEO lebih baik — mesin pencari paham struktur konten
- Kode lebih mudah dibaca developer lain

## Elemen Penting

### Heading

```html
<h1>Judul Utama</h1>      <!-- Hanya 1 per halaman -->
<h2>Sub Judul</h2>
<h3>Sub Sub Judul</h3>
```

### Link & Gambar

```html
<a href="https://github.com" target="_blank">GitHub</a>
<img src="foto.jpg" alt="Deskripsi foto" width="400">
```

> **Penting:** Selalu isi atribut `alt` pada gambar untuk aksesibilitas.

### List

```html
<!-- Unordered list -->
<ul>
  <li>Git</li>
  <li>GitHub</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>Install Git</li>
  <li>Konfigurasi nama dan email</li>
  <li>Buat repository pertama</li>
</ol>
```

### Form

```html
<form action="/submit" method="POST">
  <label for="nama">Nama:</label>
  <input type="text" id="nama" name="nama" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <button type="submit">Kirim</button>
</form>
```

## Latihan

Buat file `index.html` dengan struktur:
1. Header berisi nama kamu
2. Nav berisi 3 link (GitHub, LinkedIn, Portfolio)
3. Main berisi artikel tentang dirimu
4. Footer berisi copyright

Buka di browser dan validasi di [validator.w3.org](https://validator.w3.org).
