---
title: "Dasar JavaScript"
track: software-engineering
module: 03-javascript
order: 1
level: beginner
duration: 40
tags: [javascript, variabel, fungsi, array]
author: sandikodev
updated: 2026-04-17
---

# Dasar JavaScript

JavaScript (JS) adalah bahasa pemrograman yang berjalan di browser dan server (Node.js/Bun).

## Variabel

```javascript
// let — bisa diubah
let nama = "Sandi";
nama = "Koko"; // OK

// const — tidak bisa diubah
const PI = 3.14159;
// PI = 3; // Error!

// var — hindari, scope-nya membingungkan
var lama = "jangan pakai ini";
```

## Tipe Data

```javascript
// Primitif
let angka = 42;
let desimal = 3.14;
let teks = "Halo dunia";
let benar = true;
let kosong = null;
let tidakAda = undefined;

// Objek
let siswa = {
  nama: "Sandi",
  kelas: "XII IPA 1",
  tracks: ["software", "ai"]
};

// Array
let buah = ["apel", "mangga", "jeruk"];
```

## Fungsi

```javascript
// Function declaration
function sapa(nama) {
  return `Halo, ${nama}!`;
}

// Arrow function (modern)
const tambah = (a, b) => a + b;

// Async function
const ambilData = async (url) => {
  const res = await fetch(url);
  return res.json();
};
```

## Kondisi

```javascript
const nilai = 85;

if (nilai >= 90) {
  console.log("A");
} else if (nilai >= 80) {
  console.log("B");
} else {
  console.log("C");
}

// Ternary
const grade = nilai >= 80 ? "Lulus" : "Tidak Lulus";
```

## Loop

```javascript
const angka = [1, 2, 3, 4, 5];

// forEach
angka.forEach(n => console.log(n));

// map — transformasi array
const kuadrat = angka.map(n => n * n);
// [1, 4, 9, 16, 25]

// filter — saring array
const genap = angka.filter(n => n % 2 === 0);
// [2, 4]

// reduce — akumulasi
const total = angka.reduce((sum, n) => sum + n, 0);
// 15
```

## DOM Manipulation

```javascript
// Ambil elemen
const tombol = document.getElementById("btn");
const judul = document.querySelector("h1");

// Ubah konten
judul.textContent = "Judul Baru";

// Event listener
tombol.addEventListener("click", () => {
  alert("Tombol diklik!");
});

// Buat elemen baru
const div = document.createElement("div");
div.className = "card";
div.textContent = "Konten baru";
document.body.appendChild(div);
```

## Fetch API

```javascript
// GET data
const getData = async () => {
  try {
    const res = await fetch("https://api.github.com/users/sandikodev");
    const data = await res.json();
    console.log(data.name, data.public_repos);
  } catch (error) {
    console.error("Gagal fetch:", error);
  }
};

getData();
```

## Latihan

1. Buat fungsi `hitungRataRata(arr)` yang menerima array angka dan mengembalikan rata-ratanya
2. Buat halaman HTML dengan tombol "Muat Data" yang fetch data dari GitHub API dan tampilkan nama + jumlah repo
