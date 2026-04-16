---
title: "Arduino — Pemrograman Mikrokontroler"
track: robotika-iot
module: 02-arduino
order: 1
level: beginner
duration: 45
tags: [arduino, mikrokontroler, c++, digital-io, pwm]
author: sandikodev
updated: 2026-04-17
---

# Arduino — Pemrograman Mikrokontroler

Arduino adalah platform mikrokontroler open source yang memudahkan pemrograman hardware.

## Anatomi Arduino Uno

```
         ┌─────────────────────────────┐
         │  [USB]  [Power]  [Reset]    │
    ─────┤                             ├─────
    D13  │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │  5V
    D12  │                             │  GND
    D11~ │         ARDUINO             │  A0
    D10~ │           UNO               │  A1
    D9~  │                             │  A2
    D8   │                             │  A3
    ─────┤                             ├─────
         └─────────────────────────────┘
```

`~` = PWM capable pin

## Struktur Sketch Arduino

```cpp
// Variabel global
const int LED_PIN = 13;
int counter = 0;

// setup() — berjalan sekali saat power on
void setup() {
  pinMode(LED_PIN, OUTPUT);  // Set pin sebagai output
  Serial.begin(9600);        // Inisialisasi serial monitor
  Serial.println("Arduino siap!");
}

// loop() — berjalan terus-menerus
void loop() {
  digitalWrite(LED_PIN, HIGH);  // LED nyala
  delay(1000);                   // Tunggu 1 detik
  digitalWrite(LED_PIN, LOW);   // LED mati
  delay(1000);

  counter++;
  Serial.print("Blink ke-");
  Serial.println(counter);
}
```

## Digital I/O

```cpp
// Output — kontrol LED
pinMode(13, OUTPUT);
digitalWrite(13, HIGH);  // 5V
digitalWrite(13, LOW);   // 0V

// Input — baca tombol
pinMode(2, INPUT_PULLUP);  // Internal pull-up resistor
int state = digitalRead(2);
// HIGH = tidak ditekan, LOW = ditekan (karena pull-up)
```

## Analog I/O

```cpp
// Analog Read — baca sensor (0-1023)
int nilaiPot = analogRead(A0);  // Potensiometer
float tegangan = nilaiPot * (5.0 / 1023.0);
Serial.println(tegangan);

// PWM — simulasi analog output (0-255)
// Hanya pin dengan ~ yang support PWM
analogWrite(9, 128);   // 50% duty cycle = ~2.5V
analogWrite(9, 255);   // 100% = 5V
analogWrite(9, 0);     // 0% = 0V
```

## Contoh: LED Dimmer

```cpp
const int LED = 9;    // PWM pin
const int POT = A0;   // Potensiometer

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  int potValue = analogRead(POT);        // 0-1023
  int brightness = map(potValue, 0, 1023, 0, 255);  // Konversi range
  analogWrite(LED, brightness);
  delay(10);
}
```

## Komunikasi Serial

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  // Kirim data ke komputer
  Serial.print("Suhu: ");
  Serial.print(25.5);
  Serial.println(" °C");

  // Terima perintah dari komputer
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    if (cmd == '1') digitalWrite(13, HIGH);
    if (cmd == '0') digitalWrite(13, LOW);
  }

  delay(1000);
}
```

## Latihan

1. Buat rangkaian LED + tombol di Tinkercad
2. Program: tekan tombol → LED nyala, lepas → LED mati
3. Tambah: LED berkedip 3x saat tombol ditekan
4. Tampilkan status di Serial Monitor
