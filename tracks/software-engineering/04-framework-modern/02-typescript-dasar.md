---
title: "TypeScript Dasar"
track: software-engineering
module: 04-framework-modern
order: 2
level: intermediate
duration: 40
tags: [typescript, types, interface, generics]
author: sandikodev
updated: 2026-04-17
---

# TypeScript Dasar

TypeScript adalah JavaScript dengan sistem tipe statis — menangkap bug sebelum runtime.

## Mengapa TypeScript?

```javascript
// JavaScript — bug saat runtime
function tambah(a, b) {
  return a + b;
}
tambah(1, "2"); // "12" — bukan error, tapi salah!

// TypeScript — error saat compile
function tambah(a: number, b: number): number {
  return a + b;
}
tambah(1, "2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

## Tipe Dasar

```typescript
// Primitif
let nama: string = "Sandi";
let umur: number = 17;
let aktif: boolean = true;
let kosong: null = null;
let tidakAda: undefined = undefined;

// Array
let angka: number[] = [1, 2, 3];
let teks: Array<string> = ["a", "b"];

// Tuple — array dengan tipe tetap
let koordinat: [number, number] = [10, 20];

// Union — salah satu dari beberapa tipe
let id: string | number = "abc123";
id = 42; // OK

// Literal type
let arah: "kiri" | "kanan" | "atas" | "bawah" = "kiri";
```

## Interface & Type

```typescript
// Interface — untuk objek
interface User {
  id: string;
  nama: string;
  email: string;
  role: "maintainer" | "member";
  kelas?: string; // optional
}

// Type alias — lebih fleksibel
type ID = string | number;
type Callback = (error: Error | null, data?: unknown) => void;

// Extend interface
interface Admin extends User {
  permissions: string[];
}
```

## Generics

```typescript
// Fungsi generic
function pertama<T>(arr: T[]): T {
  return arr[0];
}

pertama([1, 2, 3]);     // return type: number
pertama(["a", "b"]);    // return type: string

// Generic dengan constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { nama: "Sandi", umur: 17 };
getProperty(user, "nama"); // string
getProperty(user, "umur"); // number
// getProperty(user, "xyz"); // Error!
```

## Utility Types

```typescript
interface User {
  id: string;
  nama: string;
  email: string;
  password: string;
}

// Partial — semua field optional
type UserUpdate = Partial<User>;

// Required — semua field required
type UserRequired = Required<User>;

// Pick — ambil beberapa field
type UserPublic = Pick<User, "id" | "nama" | "email">;

// Omit — hapus beberapa field
type UserSafe = Omit<User, "password">;

// Record — objek dengan key/value tipe tertentu
type TrackStats = Record<string, number>;
const stats: TrackStats = { software: 10, ai: 5 };
```

## Latihan

Buat tipe TypeScript untuk sistem LMS ini:
1. Interface `Track` dengan field: id, title, description, icon, order
2. Interface `Lesson` dengan field: id, title, track, module, level, duration
3. Type `LessonLevel` = "beginner" | "intermediate" | "advanced"
4. Fungsi `filterByLevel(lessons: Lesson[], level: LessonLevel): Lesson[]`
