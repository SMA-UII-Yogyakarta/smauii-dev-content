---
title: "Robot Arm & Inverse Kinematics"
track: robotika-iot
module: 05-proyek-robot
order: 3
level: advanced
duration: 75
tags: [robot-arm, kinematics, servo, 3dof, arduino]
author: sandikodev
updated: 2026-04-17
---

# Robot Arm & Inverse Kinematics

Robot arm adalah manipulator mekanik yang meniru gerakan lengan manusia — digunakan di industri manufaktur, medis, dan eksplorasi.

## Jenis Robot Arm

| Tipe | DOF | Kegunaan |
|------|-----|---------|
| SCARA | 4 | Assembly, PCB |
| Articulated | 6 | Welding, painting |
| Delta | 3 | Pick & place cepat |
| Cartesian | 3 | CNC, 3D printing |

## Kinematics

**Forward Kinematics** — dari sudut joint, hitung posisi end-effector:
$$\mathbf{T} = \mathbf{T}_1 \cdot \mathbf{T}_2 \cdot \mathbf{T}_3$$

**Inverse Kinematics** — dari posisi yang diinginkan, hitung sudut joint:
$$\theta_1, \theta_2, \theta_3 = \text{IK}(x, y, z)$$

## Robot Arm 3DOF dengan Servo

```cpp
#include <Servo.h>
#include <math.h>

Servo shoulder;  // Sendi bahu
Servo elbow;     // Sendi siku
Servo wrist;     // Sendi pergelangan

// Panjang segmen lengan (cm)
const float L1 = 15;  // Upper arm
const float L2 = 12;  // Forearm
const float L3 = 8;   // Hand

void setup() {
  shoulder.attach(9);
  elbow.attach(10);
  wrist.attach(11);
  Serial.begin(9600);

  // Posisi home
  moveToAngle(90, 90, 90);
  delay(1000);
}

void moveToAngle(int s, int e, int w) {
  shoulder.write(constrain(s, 0, 180));
  elbow.write(constrain(e, 0, 180));
  wrist.write(constrain(w, 0, 180));
  delay(500);
}

// Inverse Kinematics untuk 2DOF (x, y plane)
bool moveTo(float x, float y) {
  float d = sqrt(x*x + y*y);

  // Cek jangkauan
  if (d > L1 + L2 || d < abs(L1 - L2)) {
    Serial.println("Out of range!");
    return false;
  }

  // Hitung sudut siku (elbow)
  float cosElbow = (x*x + y*y - L1*L1 - L2*L2) / (2 * L1 * L2);
  float elbowAngle = acos(cosElbow) * 180 / PI;

  // Hitung sudut bahu (shoulder)
  float k1 = L1 + L2 * cos(acos(cosElbow));
  float k2 = L2 * sin(acos(cosElbow));
  float shoulderAngle = (atan2(y, x) - atan2(k2, k1)) * 180 / PI;

  Serial.print("Shoulder: "); Serial.print(shoulderAngle);
  Serial.print(" | Elbow: "); Serial.println(elbowAngle);

  shoulder.write((int)shoulderAngle);
  elbow.write((int)elbowAngle);
  delay(500);
  return true;
}
```

## Kontrol via Serial

```cpp
void loop() {
  if (Serial.available() >= 2) {
    float x = Serial.parseFloat();
    float y = Serial.parseFloat();
    moveTo(x, y);
  }
}
```

## Python Controller

```python
import serial
import time

arm = serial.Serial('/dev/ttyUSB0', 9600)
time.sleep(2)  # Tunggu Arduino ready

def move_to(x, y):
    command = f"{x},{y}\n"
    arm.write(command.encode())
    time.sleep(0.5)

# Gerak otomatis: ambil objek
def pick_and_place():
    move_to(10, 15)   # Ke posisi objek
    time.sleep(1)
    # Tutup gripper
    move_to(0, 20)    # Angkat
    move_to(-10, 15)  # Ke tujuan
    # Buka gripper

pick_and_place()
```

## Latihan

1. Rakit robot arm 3DOF dengan 3 servo
2. Implementasi forward kinematics — gerak manual
3. Implementasi inverse kinematics 2DOF
4. Buat program: robot arm otomatis menggambar persegi di udara
