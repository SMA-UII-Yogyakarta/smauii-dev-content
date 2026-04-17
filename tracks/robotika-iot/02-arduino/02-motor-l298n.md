---
title: "Motor DC & Driver L298N"
track: robotika-iot
module: 02-arduino
order: 2
level: beginner
duration: 35
tags: [motor, l298n, pwm, robot, arduino]
author: sandikodev
updated: 2026-04-17
---

# Motor DC & Driver L298N

Motor DC mengubah energi listrik menjadi gerak mekanik — komponen utama robot bergerak.

## Mengapa Butuh Driver Motor?

Arduino hanya bisa output 40mA per pin — tidak cukup untuk motor DC yang butuh 500mA-2A. Driver motor L298N bertindak sebagai "amplifier" arus.

## L298N Motor Driver

```
L298N Pin:
  IN1, IN2 → Kontrol arah Motor A
  IN3, IN4 → Kontrol arah Motor B
  ENA      → Enable + PWM speed Motor A
  ENB      → Enable + PWM speed Motor B
  VCC      → 7-12V (power motor)
  5V       → 5V output (bisa power Arduino)
  GND      → Ground bersama
```

## Wiring

```
Arduino → L298N:
  Pin 5  → IN1
  Pin 6  → IN2
  Pin 9  → IN3
  Pin 10 → IN4
  Pin 3  → ENA (PWM)
  Pin 11 → ENB (PWM)
  GND    → GND

Baterai 9V → L298N VCC + GND
Motor kiri → OUT1, OUT2
Motor kanan → OUT3, OUT4
```

## Library Motor

```cpp
// Tanpa library
void motorKiri(int speed) {
  if (speed > 0) {
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    analogWrite(ENA, speed);
  } else if (speed < 0) {
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);
    analogWrite(ENA, -speed);
  } else {
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
  }
}

// Dengan library AFMotor
#include <AFMotor.h>
AF_DCMotor motor1(1);
motor1.setSpeed(200);
motor1.run(FORWARD);
delay(1000);
motor1.run(BACKWARD);
```

## Kontrol Robot 4 Arah

```cpp
#define IN1 5
#define IN2 6
#define IN3 9
#define IN4 10
#define ENA 3
#define ENB 11
#define SPEED 180

void maju() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, SPEED); analogWrite(ENB, SPEED);
}

void mundur() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  analogWrite(ENA, SPEED); analogWrite(ENB, SPEED);
}

void belokKiri() {
  digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH);  // Motor kiri mundur
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);   // Motor kanan maju
  analogWrite(ENA, SPEED); analogWrite(ENB, SPEED);
}

void belokKanan() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);   // Motor kiri maju
  digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH);  // Motor kanan mundur
  analogWrite(ENA, SPEED); analogWrite(ENB, SPEED);
}

void berhenti() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}
```

## Kontrol via Bluetooth (HC-05)

```cpp
#include <SoftwareSerial.h>
SoftwareSerial BT(2, 3); // RX, TX

void setup() {
  BT.begin(9600);
  // Setup motor pins...
}

void loop() {
  if (BT.available()) {
    char cmd = BT.read();
    switch(cmd) {
      case 'F': maju(); break;
      case 'B': mundur(); break;
      case 'L': belokKiri(); break;
      case 'R': belokKanan(); break;
      case 'S': berhenti(); break;
    }
  }
}
```

## Latihan

1. Rakit robot 2 roda dengan L298N
2. Program: maju 2 detik → belok kanan → maju 2 detik → berhenti
3. Tambah kontrol Bluetooth dengan app "Arduino Bluetooth Controller"
