---
layout: home

hero:
  name: "Protokol Scytale"
  text: "Blockchain Layer-1 Berkecepatan Tinggi"
  tagline: "Header Kanonikal 120-Byte, BLAKE3 PoW Ramah CPU, State Engine UTXO Deterministik & DNS Seeding Otonom."
  actions:
    - theme: brand
      text: Mulai Cepat Node
      link: /id/getting-started
    - theme: alt
      text: Repositori GitHub
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "Proof-of-Work BLAKE3 Ramah CPU"
    details: "Fungsi hash kriptografis ultra-cepat dengan optimasi paralel SIMD. Mencegah monopoli ASIC terspesialisasi sambil mempertahankan keamanan terdistribusi tinggi."
  - icon: 🛡️
    title: "Header 120-Byte & UTXO State Root"
    details: "Struktur biner tetap yang mengikat version, prev_hash, merkle_root, dan utxo_root kanonikal secara langsung di header untuk konsensus fail-closed."
  - icon: 🚀
    title: "Protokol Transpor Fast Sync"
    details: "Streaming biner terfragmentasi (getsnap/snapshot) berkapasitas hingga 2.000 UTXO per paket dengan rekonstruksi dinamis dan rate-limiter 30 detik."
  - icon: ⚖️
    title: "Zero-Float Fee Market"
    details: "Perhitungan biaya transaksi berbasis integer mutlak tanpa angka desimal floating-point. Menghilangkan risiko perpecahan konsensus dan eksploitasi pembulatan."
  - icon: 🔑
    title: "Alamat Asli Bech32 (scy1...)"
    details: "Tanda tangan kriptografi Ed25519 dipadukan dengan format alamat Bech32 yang mudah dibaca manusia serta checksum pendeteksi galat BCH 6 karakter."
  - icon: 🌐
    title: "Autonomous DNS Seeding (Port 53)"
    details: "Daemon DNS mandiri dengan proteksi anti-Sybil (maksimal 2 node per subnet /24) dan pengacakan Fisher-Yates untuk bootstrapping tanpa konfigurasi manual."
---

# Protokol Scytale Layer-1 (v0.3.0-devnet)

Selamat datang di dokumentasi resmi pengembang **Protokol Blockchain Scytale Layer-1**. Scytale adalah buku besar terdesentralisasi berbasis UTXO deterministik yang dibangun dengan bahasa Rust untuk validator berkinerja tinggi dan konsumsi memori hemat.

## Port Standar & Jaringan Devnet

| Layanan / Modul | Port Default | Protokol | Kegunaan |
| :--- | :--- | :--- | :--- |
| **P2P Wire & Gossip** | `9001` | TCP | Propagasi blok, relay transaksi, dan sinkronisasi cepat `getsnap` |
| **HTTP RPC Gateway** | `8332` | HTTP / JSON | Inspeksi status node, saldo dompet, dan submission mempool |
| **DNS Seeder Daemon** | `53` | UDP / TCP | Penemuan peer otonom tanpa hardcoded IP dengan algoritma Fisher-Yates |
