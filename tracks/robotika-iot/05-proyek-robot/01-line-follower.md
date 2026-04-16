---
title: "Robot Line Follower"
track: robotika-iot
module: 05-proyek-robot
order: 1
level: intermediate
duration: 90
tags: [robot, line-follower, motor, pid, arduino]
author: sandikodev
updated: 2026-04-17
---

# Robot Line Follower

Line follower adalah robot yang mengikuti garis hitam di atas permukaan putih — proyek klasik yang mengajarkan kontrol motor dan sensor.

## Komponen yang Dibutuhkan

| Komponen | Jumlah | Fungsi |
|----------|--------|--------|
| Arduino Uno | 1 | Otak robot |
| Motor DC + roda | 2 | Penggerak |
| Driver motor L298N | 1 | Kontrol motor |
| Sensor IR TCRT5000 | 2-5 | Deteksi garis |
| Baterai 9V | 1 | Sumber daya |
| Chassis robot | 1 | Rangka |

## Wiring

```
L298N Motor Driver:
  IN1, IN2 → Arduino pin 5, 6 (Motor kiri)
  IN3, IN4 → Arduino pin 9, 10 (Motor kanan)
  ENA, ENB → Arduino pin 3, 11 (PWM speed)
  VCC → 9V baterai
  GND → GND bersama

Sensor IR (2 sensor):
  Sensor kiri → Arduino A0
  Sensor kanan → Arduino A1
  VCC → 5V
  GND → GND
```

## Kode Dasar

```cpp
// Pin motor
#define IN1 5
#define IN2 6
#define IN3 9
#define IN4 10
#define ENA 3
#define ENB 11

// Pin sensor
#define SENSOR_KIRI A0
#define SENSOR_KANAN A1

// Kecepatan
#define SPEED_NORMAL 150
#define SPEED_BELOK 100

void setup() {
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT);
  Serial.begin(9600);
}

void maju(int speedKiri, int speedKanan) {
  // Motor kiri maju
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  analogWrite(ENA, speedKiri);

  // Motor kanan maju
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENB, speedKanan);
}

void berhenti() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}

void loop() {
  int kiri = digitalRead(SENSOR_KIRI);   // 0 = garis hitam
  int kanan = digitalRead(SENSOR_KANAN); // 1 = permukaan putih

  if (kiri == 0 && kanan == 0) {
    // Keduanya di garis → maju lurus
    maju(SPEED_NORMAL, SPEED_NORMAL);
  } else if (kiri == 0 && kanan == 1) {
    // Garis di kiri → belok kiri
    maju(SPEED_BELOK, SPEED_NORMAL);
  } else if (kiri == 1 && kanan == 0) {
    // Garis di kanan → belok kanan
    maju(SPEED_NORMAL, SPEED_BELOK);
  } else {
    // Tidak ada garis → berhenti
    berhenti();
  }
}
```

## Kontrol PID — Lebih Halus

PID (Proportional-Integral-Derivative) membuat gerakan robot lebih smooth:

$$u(t) = K_p e(t) + K_i \int e(t)dt + K_d \frac{de(t)}{dt}$$

```cpp
// Dengan 5 sensor IR
float Kp = 25, Ki = 0, Kd = 15;
float lastError = 0, integral = 0;

int bacaSensor() {
  // Return posisi error: -2 (kiri jauh) hingga +2 (kanan jauh)
  int s[5];
  for (int i = 0; i < 5; i++) s[i] = digitalRead(sensorPin[i]);

  if (s[0]==0 && s[1]==1 && s[2]==1 && s[3]==1 && s[4]==1) return -2;
  if (s[0]==1 && s[1]==0 && s[2]==1 && s[3]==1 && s[4]==1) return -1;
  if (s[0]==1 && s[1]==1 && s[2]==0 && s[3]==1 && s[4]==1) return 0;
  if (s[0]==1 && s[1]==1 && s[2]==1 && s[3]==0 && s[4]==1) return 1;
  if (s[0]==1 && s[1]==1 && s[2]==1 && s[3]==1 && s[4]==0) return 2;
  return 0;
}

void loop() {
  float error = bacaSensor();
  integral += error;
  float derivative = error - lastError;

  float correction = Kp*error + Ki*integral + Kd*derivative;
  lastError = error;

  int speedKiri = constrain(SPEED_NORMAL - correction, 0, 255);
  int speedKanan = constrain(SPEED_NORMAL + correction, 0, 255);
  maju(speedKiri, speedKanan);
}
```

## Obstacle Avoidance

```cpp
#include <NewPing.h>

NewPing sonar(TRIG_PIN, ECHO_PIN, 200);

void loop() {
  int jarak = sonar.ping_cm();

  if (jarak > 0 && jarak < 15) {
    // Ada halangan → mundur + belok
    mundur(150, 150);
    delay(300);
    belokKanan(150, 150);
    delay(400);
  } else {
    // Ikuti garis
    ikutiGaris();
  }
}
```

## Latihan

1. Rakit robot line follower dengan 2 sensor
2. Test di lintasan berbentuk oval
3. Upgrade ke 5 sensor + PID
4. Tambah obstacle avoidance dengan HC-SR04
5. Ukur waktu tempuh dan optimasi Kp, Ki, Kd
