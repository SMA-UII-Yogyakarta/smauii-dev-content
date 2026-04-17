---
title: "Servo & Stepper Motor"
track: robotika-iot
module: 03-sensor-aktuator
order: 2
level: intermediate
duration: 35
tags: [servo, stepper, motor, aktuator, arduino]
author: sandikodev
updated: 2026-04-17
---

# Servo & Stepper Motor

Servo dan stepper motor memberikan kontrol posisi yang presisi — berbeda dari motor DC biasa.

## Servo Motor

Servo motor mengontrol posisi sudut (0°-180°) dengan presisi tinggi menggunakan sinyal PWM.

**Cara kerja:**
- Sinyal PWM 50Hz
- Pulse 1ms → 0°
- Pulse 1.5ms → 90°
- Pulse 2ms → 180°

```cpp
#include <Servo.h>

Servo servo1;
Servo servo2;

void setup() {
  servo1.attach(9);   // Pin 9
  servo2.attach(10);  // Pin 10
  Serial.begin(9600);
}

void loop() {
  // Sweep otomatis
  for (int pos = 0; pos <= 180; pos += 5) {
    servo1.write(pos);
    delay(50);
  }

  // Kontrol via Serial Monitor
  if (Serial.available()) {
    int angle = Serial.parseInt();
    if (angle >= 0 && angle <= 180) {
      servo1.write(angle);
      Serial.print("Servo ke: ");
      Serial.println(angle);
    }
  }
}
```

## Aplikasi Servo: Pintu Otomatis

```cpp
#include <Servo.h>
#include <NewPing.h>

Servo pintu;
NewPing sonar(TRIG, ECHO, 200);

void setup() {
  pintu.attach(9);
  pintu.write(0);  // Pintu tertutup
}

void loop() {
  int jarak = sonar.ping_cm();

  if (jarak > 0 && jarak < 30) {
    pintu.write(90);   // Buka pintu
    delay(3000);       // Tunggu 3 detik
    pintu.write(0);    // Tutup pintu
  }
  delay(100);
}
```

## Stepper Motor

Stepper motor bergerak dalam langkah diskrit — cocok untuk CNC, 3D printer, kamera slider.

**28BYJ-48 + ULN2003 Driver:**

```cpp
#include <Stepper.h>

// 28BYJ-48: 2048 langkah per putaran
const int STEPS_PER_REV = 2048;
Stepper stepper(STEPS_PER_REV, 8, 10, 9, 11);

void setup() {
  stepper.setSpeed(10);  // RPM
}

void loop() {
  // Putar 1 putaran penuh searah jarum jam
  stepper.step(STEPS_PER_REV);
  delay(1000);

  // Putar 1 putaran berlawanan
  stepper.step(-STEPS_PER_REV);
  delay(1000);
}
```

## Kontrol Presisi Stepper

```cpp
// Putar tepat 90 derajat
void putar(float derajat) {
  int langkah = (derajat / 360.0) * STEPS_PER_REV;
  stepper.step(langkah);
}

void loop() {
  putar(90);   // Putar 90°
  delay(500);
  putar(-45);  // Balik 45°
  delay(500);
}
```

## Proyek: Kamera Slider Otomatis

```cpp
// Slider bergerak perlahan untuk time-lapse
void setup() {
  stepper.setSpeed(5);
}

void loop() {
  // Gerak 1 langkah setiap 5 detik
  stepper.step(1);
  delay(5000);
}
```

## Latihan

1. Buat servo yang mengikuti posisi potensiometer
2. Buat pintu otomatis dengan sensor ultrasonik
3. Buat jam analog dengan 3 stepper motor (jam, menit, detik)
