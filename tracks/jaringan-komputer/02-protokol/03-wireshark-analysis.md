---
title: "Wireshark & Network Analysis"
track: jaringan-komputer
module: 02-protokol
order: 3
level: intermediate
duration: 35
tags: [wireshark, packet-analysis, tcpdump, network-forensics]
author: sandikodev
updated: 2026-04-17
---

# Wireshark & Network Analysis

Wireshark adalah network protocol analyzer — bisa "melihat" semua paket yang lewat di jaringan.

## Instalasi & Setup

```bash
# Linux
apt install wireshark tshark

# Izinkan user biasa capture
sudo dpkg-reconfigure wireshark-common  # Pilih Yes
sudo usermod -aG wireshark $USER
```

## Filter Wireshark

```
# Filter dasar
ip.addr == 192.168.1.100     # IP tertentu
ip.src == 192.168.1.1        # Source IP
ip.dst == 8.8.8.8            # Destination IP
tcp.port == 80               # Port HTTP
http                         # Hanya HTTP traffic
dns                          # Hanya DNS
tcp.flags.syn == 1           # TCP SYN packets (new connections)

# Filter kombinasi
ip.addr == 192.168.1.100 && http
http && http.request.method == "POST"
!(arp || dns || icmp)        # Sembunyikan noise
```

## Analisis HTTP

```
# Filter: http
# Klik kanan request → Follow → HTTP Stream

# Lihat semua request
http.request.method == "GET"
http.request.method == "POST"

# Cari password di plain HTTP (jangan lakukan di jaringan orang lain!)
http.request.method == "POST" && http contains "password"
```

## Analisis DNS

```
# Lihat semua DNS query
dns.flags.response == 0

# Cari domain mencurigakan
dns && dns.qry.name contains "malware"

# Export DNS queries ke teks
tshark -r capture.pcap -Y dns -T fields -e dns.qry.name | sort | uniq -c
```

## tcpdump — CLI Packet Capture

```bash
# Capture semua traffic
tcpdump -i eth0 -w capture.pcap

# Filter saat capture
tcpdump -i eth0 host 192.168.1.100
tcpdump -i eth0 port 80 or port 443
tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'

# Analisis langsung
tcpdump -i eth0 -A -n port 80  # ASCII output, tanpa DNS resolve

# Top talkers
tcpdump -r capture.pcap -nn | awk '{print $3}' | sort | uniq -c | sort -rn | head
```

## Network Forensics

```bash
# Ekstrak file dari PCAP
tshark -r capture.pcap --export-objects http,./extracted_files

# Rekonstruksi session TCP
tshark -r capture.pcap -q -z follow,tcp,ascii,0

# Analisis dengan Python
from scapy.all import *
packets = rdpcap("capture.pcap")
for pkt in packets:
    if pkt.haslayer(HTTP):
        if pkt[HTTP].Method == b"POST":
            print(pkt[HTTP].load)
```

## Latihan

1. Capture traffic saat login ke website HTTP (bukan HTTPS)
2. Temukan username dan password di Wireshark
3. Analisis traffic DNS — domain mana yang paling sering dikunjungi?
4. Buat laporan: berapa % traffic HTTP vs HTTPS?
