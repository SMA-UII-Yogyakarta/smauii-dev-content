---
title: "JavaScript Modern (ES6+)"
track: software-engineering
module: 03-javascript
order: 3
level: intermediate
duration: 35
tags: [javascript, es6, destructuring, modules, spread]
author: sandikodev
updated: 2026-04-17
---

# JavaScript Modern (ES6+)

ES6 (2015) dan versi setelahnya membawa banyak fitur yang membuat kode JavaScript lebih bersih dan ekspresif.

## Destructuring

```javascript
// Object destructuring
const user = { nama: "Sandi", kelas: "XII", tracks: ["software", "ai"] };
const { nama, kelas, tracks } = user;

// Dengan rename
const { nama: namaSiswa } = user;

// Default value
const { role = "member" } = user;

// Array destructuring
const [pertama, kedua, ...sisanya] = [1, 2, 3, 4, 5];
// pertama=1, kedua=2, sisanya=[3,4,5]

// Swap variabel
let a = 1, b = 2;
[a, b] = [b, a];
```

## Spread & Rest

```javascript
// Spread — sebar elemen
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // {a:1, b:2}

// Clone objek (shallow)
const copy = { ...original };

// Merge objek
const merged = { ...defaults, ...overrides };

// Rest — kumpulkan sisa argumen
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
sum(1, 2, 3, 4); // 10
```

## Optional Chaining & Nullish Coalescing

```javascript
const user = { profile: { avatar: null } };

// Tanpa optional chaining (error jika null)
// const url = user.profile.avatar.url; // TypeError!

// Dengan optional chaining
const url = user?.profile?.avatar?.url; // undefined (aman)

// Nullish coalescing — fallback jika null/undefined
const nama = user?.nama ?? "Anonim";
const count = data?.count ?? 0;

// Nullish assignment
user.role ??= "member"; // set hanya jika null/undefined
```

## Template Literals

```javascript
const nama = "Sandi";
const kelas = "XII IPA 1";

// Multi-line
const pesan = `
  Halo ${nama}!
  Kamu dari kelas ${kelas}.
  Selamat datang di SMA UII Lab.
`;

// Tagged template (advanced)
const highlight = (strings, ...values) =>
  strings.reduce((result, str, i) =>
    result + str + (values[i] ? `<b>${values[i]}</b>` : ""), "");

const html = highlight`Halo ${nama} dari ${kelas}!`;
```

## Modules (ESM)

```javascript
// math.js — export
export const PI = 3.14159;
export const tambah = (a, b) => a + b;
export default class Calculator { ... }

// app.js — import
import Calculator, { PI, tambah } from "./math.js";
import * as math from "./math.js";

// Dynamic import (lazy loading)
const { default: Chart } = await import("./chart.js");
```

## Array Methods Modern

```javascript
const siswa = [
  { nama: "Sandi", nilai: 90, track: "software" },
  { nama: "Koko", nilai: 75, track: "ai" },
  { nama: "Rara", nilai: 85, track: "software" },
];

// find — cari satu elemen
const sandi = siswa.find(s => s.nama === "Sandi");

// findIndex
const idx = siswa.findIndex(s => s.nama === "Koko");

// some — ada yang memenuhi?
const adaLulus = siswa.some(s => s.nilai >= 80);

// every — semua memenuhi?
const semuaLulus = siswa.every(s => s.nilai >= 70);

// flat & flatMap
const nested = [[1, 2], [3, 4]];
nested.flat(); // [1,2,3,4]

// Object.entries / fromEntries
Object.entries({ a: 1, b: 2 }); // [["a",1],["b",2]]
Object.fromEntries([["a", 1], ["b", 2]]); // {a:1, b:2}
```

## Latihan

Refactor kode ini menggunakan fitur ES6+:

```javascript
// Sebelum
function getUser(data) {
  var nama = data.nama;
  var email = data.email;
  var role = data.role || "member";
  return "Halo " + nama + " (" + email + ") - " + role;
}

// Sesudah: gunakan destructuring, default value, template literal
```
