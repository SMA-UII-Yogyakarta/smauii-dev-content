---
title: "Bash Scripting untuk Admin"
track: jaringan-komputer
module: 03-linux-server
order: 2
level: intermediate
duration: 40
tags: [bash, scripting, automation, cron, linux]
author: sandikodev
updated: 2026-04-17
---

# Bash Scripting untuk Admin

Otomatisasi tugas repetitif dengan Bash — dari backup harian hingga monitoring server.

## Dasar Bash Script

```bash
#!/bin/bash
# Selalu mulai dengan shebang

# Variabel
NAMA="SMA UII Lab"
TANGGAL=$(date +%Y-%m-%d)
IP_SERVER=$(hostname -I | awk '{print $1}')

echo "Server: $NAMA"
echo "Tanggal: $TANGGAL"
echo "IP: $IP_SERVER"

# Kondisi
if [ -f "/var/log/nginx/error.log" ]; then
    echo "Nginx error log ada"
fi

# Loop
for service in nginx mysql redis; do
    if systemctl is-active --quiet $service; then
        echo "✅ $service running"
    else
        echo "❌ $service stopped"
    fi
done
```

## Fungsi

```bash
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a /var/log/myapp.log
}

send_alert() {
    local message=$1
    curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
        -d "chat_id=$CHAT_ID&text=$message" > /dev/null
}

check_disk() {
    local usage=$(df / | awk 'NR==2 {print $5}' | tr -d '%')
    if [ $usage -gt 80 ]; then
        send_alert "⚠️ Disk usage: ${usage}% di $HOSTNAME"
        log "WARNING: Disk usage $usage%"
    fi
}
```

## Script Backup Otomatis

```bash
#!/bin/bash
set -euo pipefail  # Exit on error, undefined var, pipe fail

BACKUP_DIR="/backup/$(date +%Y-%m-%d)"
DB_NAME="smauii_lab"
RETENTION_DAYS=7

mkdir -p "$BACKUP_DIR"

# Backup database
mysqldump -u root -p"$DB_PASSWORD" "$DB_NAME" | \
    gzip > "$BACKUP_DIR/db_${DB_NAME}.sql.gz"

# Backup files
tar -czf "$BACKUP_DIR/uploads.tar.gz" /var/www/html/uploads/

# Upload ke S3
aws s3 sync "$BACKUP_DIR" "s3://smauii-backup/$(date +%Y-%m-%d)/"

# Hapus backup lama
find /backup -type d -mtime +$RETENTION_DAYS -exec rm -rf {} +

echo "Backup selesai: $BACKUP_DIR"
```

## Monitoring Script

```bash
#!/bin/bash
# monitor.sh — kirim alert jika ada masalah

CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d. -f1)
MEM=$(free | awk '/Mem:/ {printf "%.0f", $3/$2 * 100}')
DISK=$(df / | awk 'NR==2 {print $5}' | tr -d '%')

STATUS="📊 Server Status\n"
STATUS+="CPU: ${CPU}%\n"
STATUS+="Memory: ${MEM}%\n"
STATUS+="Disk: ${DISK}%\n"

# Alert jika melebihi threshold
[[ $CPU -gt 90 ]] && STATUS+="🚨 CPU KRITIS!\n"
[[ $MEM -gt 90 ]] && STATUS+="🚨 MEMORY KRITIS!\n"
[[ $DISK -gt 85 ]] && STATUS+="🚨 DISK KRITIS!\n"

# Cek service
for svc in nginx mysql; do
    if ! systemctl is-active --quiet $svc; then
        STATUS+="🚨 $svc DOWN!\n"
        systemctl restart $svc  # Auto restart
    fi
done

curl -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage" \
    -d "chat_id=$CHAT_ID&text=$(echo -e "$STATUS")&parse_mode=HTML"
```

## Cron Job — Jadwal Otomatis

```bash
crontab -e

# Format: menit jam hari bulan hari_minggu perintah
0 2 * * *     /root/backup.sh          # Setiap jam 2 pagi
*/5 * * * *   /root/monitor.sh         # Setiap 5 menit
0 0 * * 0     /root/weekly-report.sh   # Setiap Minggu tengah malam
@reboot       /root/startup.sh         # Saat server restart

# Cek cron log
grep CRON /var/log/syslog | tail -20
```

## Latihan

1. Buat script health check: CPU, memory, disk, services
2. Kirim laporan harian ke Telegram
3. Buat script backup database + upload ke cloud storage
4. Setup cron untuk jalankan monitoring setiap 5 menit
