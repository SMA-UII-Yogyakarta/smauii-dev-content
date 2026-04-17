# Standar Kualitas Konten

Dokumen ini adalah referensi cepat standar kualitas yang harus dipenuhi setiap lesson. Untuk panduan lengkap termasuk contoh dan anti-patterns, lihat [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Checklist Lesson

Sebelum submit PR, verifikasi semua item ini:

### Frontmatter
- [ ] `title` — judul yang jelas dan deskriptif
- [ ] `track` — nama folder track (kebab-case)
- [ ] `module` — nama folder modul (kebab-case)
- [ ] `order` — nomor urut, tidak konflik dengan lesson lain
- [ ] `level` — `beginner`, `intermediate`, atau `advanced`
- [ ] `duration` — estimasi menit yang realistis (test sendiri dulu)
- [ ] `author` — GitHub username kamu
- [ ] `updated` — tanggal hari ini (YYYY-MM-DD)
- [ ] `prerequisites` — diisi jika ada ketergantungan lesson lain
- [ ] `tags` — 2-5 tag relevan

### Konten
- [ ] Ada paragraf pengantar yang menjelaskan MENGAPA topik ini penting
- [ ] Semua kode bisa dijalankan langsung — tidak ada placeholder `...` atau `YOUR_VALUE`
- [ ] Setiap blok kode ada output/hasil yang ditunjukkan (komentar atau print)
- [ ] Diagram Mermaid relevan, bukan sekadar dekoratif
- [ ] LaTeX hanya dipakai untuk rumus yang tidak bisa ditulis teks biasa
- [ ] Ada rangkuman di akhir (3-5 poin)
- [ ] Latihan spesifik: ada dataset/tools yang jelas, ada kriteria keberhasilan

### Bahasa & Format
- [ ] Ditulis dalam Bahasa Indonesia yang baik dan benar
- [ ] Tidak ada typo signifikan
- [ ] Heading hierarchy benar (H1 → H2 → H3, tidak loncat)
- [ ] Nama file mengikuti konvensi `NN-judul-lesson.md`
- [ ] Tidak ada informasi sensitif (API key, password, data pribadi)

---

## Rubrik Kualitas

### ✅ Excellent — PR langsung merge
- Konten original, tidak copy-paste dari dokumentasi resmi tanpa adaptasi
- Contoh relevan dengan konteks siswa SMA Indonesia
- Latihan memiliki kriteria keberhasilan yang jelas dan terukur
- Kode sudah diuji berjalan di environment bersih
- Menghubungkan konsep ke aplikasi dunia nyata

### 🔄 Good — PR dengan minor revision
- Konten jelas dan akurat
- Kode berjalan tapi mungkin butuh sedikit penyesuaian environment
- Latihan ada tapi kriteria keberhasilan kurang spesifik
- Beberapa contoh bisa lebih relevan

### ⚠️ Needs Work — PR butuh major revision
- Ada konsep yang salah atau menyesatkan
- Kode tidak bisa dijalankan langsung
- Terlalu banyak konsep dalam satu lesson (perlu dipecah)
- Tidak ada latihan atau latihan terlalu abstrak
- Copy-paste dari dokumentasi resmi tanpa adaptasi

---

## Ukuran Lesson yang Tepat

| Level | Durasi | Jumlah konsep utama | Estimasi baris kode |
|-------|--------|---------------------|---------------------|
| Beginner | 15–25 menit | 1–2 | < 50 |
| Intermediate | 25–45 menit | 2–3 | 50–150 |
| Advanced | 45–75 menit | 3–5 | 100–300 |

> Jika lesson kamu melebihi batas ini, **pecah menjadi 2 lesson**. Lebih baik 2 lesson pendek yang fokus daripada 1 lesson panjang yang membingungkan.

---

## Standar Penamaan

```
NN-judul-lesson.md          Lesson biasa (01, 02, dst)
99-proyek-nama.md           Capstone project modul
README.md                   Index track atau modul
```

Selalu gunakan **kebab-case** (huruf kecil, pisah dengan `-`). Tidak boleh ada spasi, underscore, atau karakter khusus.

---

## Hal yang Tidak Boleh Ada di Konten

- Informasi pribadi (nama siswa nyata, nomor telepon, alamat email asli)
- Kredensial atau secret (API key, password, token, private key)
- Konten yang mempromosikan produk atau layanan komersial secara berlebihan
- Teknik keamanan ofensif tanpa konteks etika dan disclaimer yang jelas
- Konten yang melanggar hak cipta (kutip dengan atribusi jika perlu)
- Klaim atau statistik tanpa sumber yang bisa diverifikasi
