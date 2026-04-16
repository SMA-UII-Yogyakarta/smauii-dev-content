---
title: "Linux Server Administration"
track: jaringan-komputer
module: 03-linux-server
order: 1
level: intermediate
duration: 50
tags: [linux, cli, server, bash, systemd]
author: sandikodev
updated: 2026-04-17
---

# Linux Server Administration

Linux adalah sistem operasi yang menjalankan 96% server di dunia. Menguasai Linux CLI adalah skill wajib untuk network engineer dan DevOps.

## Navigasi Filesystem

```bash
# Struktur direktori Linux
/
├── bin/     # Binary (perintah dasar)
├── etc/     # Konfigurasi sistem
├── home/    # Home directory user
├── var/     # Data variabel (log, database)
├── tmp/     # File sementara
├── usr/     # Program user
└── srv/     # Data service (web, ftp)

# Navigasi
pwd          # Print working directory
ls -la       # List dengan detail + hidden files
cd /var/log  # Pindah direktori
cd ~         # Ke home directory
cd -         # Ke direktori sebelumnya
```

## Manajemen File

```bash
# Buat
mkdir -p projects/web/src   # Buat direktori (termasuk parent)
touch index.html             # Buat file kosong
echo "Hello" > file.txt     # Tulis ke file (overwrite)
echo "World" >> file.txt    # Append ke file

# Salin & Pindah
cp -r src/ backup/          # Copy rekursif
mv old-name.txt new-name.txt # Rename/pindah
rsync -av src/ dest/        # Sync direktori (lebih powerful dari cp)

# Hapus
rm file.txt                 # Hapus file
rm -rf direktori/           # Hapus direktori (hati-hati!)

# Cari
find /var/log -name "*.log" -mtime -7  # Log < 7 hari
grep -r "error" /var/log/nginx/        # Cari teks di file
```

## User & Permission

```bash
# User management
useradd -m -s /bin/bash sandi   # Buat user
passwd sandi                     # Set password
usermod -aG sudo sandi           # Tambah ke grup sudo
userdel -r sandi                 # Hapus user + home

# Permission
# Format: [type][owner][group][others]
# -rwxr-xr--
#  │││ │││ │││
#  │││ │││ └── others: r-- (read only)
#  │││ └────── group:  r-x (read + execute)
#  └────────── owner:  rwx (full)

chmod 755 script.sh    # rwxr-xr-x
chmod +x script.sh     # Tambah execute permission
chown sandi:www-data file.txt  # Ubah owner:group
```

## Process Management

```bash
# Lihat proses
ps aux                  # Semua proses
top                     # Real-time monitor
htop                    # Versi lebih bagus dari top

# Kontrol proses
kill -9 PID             # Force kill
pkill nginx             # Kill by name
nohup ./app &           # Jalankan di background

# Systemd service
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl enable nginx  # Auto-start saat boot
systemctl status nginx
journalctl -u nginx -f  # Lihat log real-time
```

## SSH

```bash
# Connect ke server
ssh user@192.168.1.100
ssh -p 2222 user@server.com  # Port custom

# SSH key (lebih aman dari password)
ssh-keygen -t ed25519 -C "email@example.com"
ssh-copy-id user@server.com  # Copy public key ke server

# SSH config (~/.ssh/config)
Host myserver
    HostName 192.168.1.100
    User sandi
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# Sekarang bisa: ssh myserver
```

## Firewall dengan UFW

```bash
ufw enable
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw deny 3306       # Block MySQL dari luar
ufw status verbose
```

## Latihan

1. Setup VPS gratis di [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
2. Connect via SSH dengan key (bukan password)
3. Install Nginx: `apt install nginx`
4. Buat halaman HTML sederhana di `/var/www/html/`
5. Akses via browser menggunakan IP server
