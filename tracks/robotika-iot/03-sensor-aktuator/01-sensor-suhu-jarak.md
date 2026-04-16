---
title: "Sensor Suhu, Jarak, dan Cahaya"
track: robotika-iot
module: 03-sensor-aktuator
order: 1
level: beginner
duration: 45
tags: [sensor, dht11, ultrasonic, ldr, arduino]
author: sandikodev
updated: 2026-04-17
---

# Sensor Suhu, Jarak, dan Cahaya

Sensor adalah "indera" robot — memungkinkan sistem merasakan lingkungan fisik.

## DHT11 — Sensor Suhu & Kelembaban

**Spesifikasi:**
- Suhu: 0–50°C (±2°C)
- Kelembaban: 20–90% RH (±5%)
- Protokol: Single-wire digital

**Wiring:**
```
DHT11    Arduino
VCC  →   5V
GND  →   GND
DATA →   Pin 2 (+ resistor 10kΩ ke VCC)
```

```cpp
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000);  // DHT11 butuh 2 detik antar pembacaan

  float suhu = dht.readTemperature();
  float kelembaban = dht.readHumidity();

  if (isnan(suhu) || isnan(kelembaban)) {
    Serial.println("Gagal membaca sensor!");
    return;
  }

  Serial.print("Suhu: ");
  Serial.print(suhu);
  Serial.print("°C | Kelembaban: ");
  Serial.print(kelembaban);
  Serial.println("%");

  // Alert jika suhu terlalu tinggi
  if (suhu > 35) {
    Serial.println("⚠️ SUHU TERLALU TINGGI!");
  }
}
```

## HC-SR04 — Sensor Ultrasonik (Jarak)

**Prinsip kerja:** Kirim gelombang suara → ukur waktu pantulan

$$d = \frac{t \times v_{suara}}{2} = \frac{t \times 343}{2} \text{ m}$$

```cpp
#define TRIG_PIN 9
#define ECHO_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

float bacaJarak() {
  // Kirim pulse 10µs
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Ukur durasi echo
  long durasi = pulseIn(ECHO_PIN, HIGH);

  // Hitung jarak (cm)
  return durasi * 0.034 / 2;
}

void loop() {
  float jarak = bacaJarak();
  Serial.print("Jarak: ");
  Serial.print(jarak);
  Serial.println(" cm");

  // Buzzer jika terlalu dekat
  if (jarak < 10) {
    tone(8, 1000, 100);  // Buzzer di pin 8
  }

  delay(100);
}
```

## LDR — Sensor Cahaya

```cpp
#define LDR_PIN A0
#define LED_PIN 9

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int nilaiCahaya = analogRead(LDR_PIN);  // 0-1023
  // Gelap = nilai tinggi, Terang = nilai rendah

  // Auto-brightness LED
  int brightness = map(nilaiCahaya, 0, 1023, 255, 0);
  analogWrite(LED_PIN, brightness);

  Serial.print("Cahaya: ");
  Serial.print(nilaiCahaya);
  Serial.print(" | Brightness: ");
  Serial.println(brightness);

  delay(100);
}
```

## Servo Motor

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);  // Pin 9
}

void loop() {
  // Sweep 0° → 180° → 0°
  for (int pos = 0; pos <= 180; pos++) {
    myServo.write(pos);
    delay(15);
  }
  for (int pos = 180; pos >= 0; pos--) {
    myServo.write(pos);
    delay(15);
  }
}
```

## Proyek: Stasiun Cuaca Mini

```cpp
#include <DHT.h>
#include <LiquidCrystal_I2C.h>

DHT dht(2, DHT11);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  dht.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {
  float suhu = dht.readTemperature();
  float kelembaban = dht.readHumidity();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Suhu: " + String(suhu, 1) + "C");
  lcd.setCursor(0, 1);
  lcd.print("RH: " + String(kelembaban, 1) + "%");

  delay(2000);
}
```

## Latihan

1. Buat sistem alarm suhu: LED merah nyala jika suhu > 30°C
2. Buat parking sensor: buzzer berbunyi makin cepat jika objek makin dekat
3. Buat lampu otomatis: nyala saat gelap, mati saat terang
