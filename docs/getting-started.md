# Panduan Cepat Menjalankan Node Validator

Panduan ini mendemonstrasikan cara meluncurkan dan memverifikasi **Full Node / Validator Scytale** pada Devnet dalam hitungan menit menggunakan **Docker Compose** (hanya 1 perintah).

---

## Prasyarat Sistem

Sebelum memulai, pastikan mesin Anda memenuhi spesifikasi minimal berikut:

### Perangkat Lunak
* **Docker Engine**: Versi 24.0+ atau lebih baru
* **Docker Compose**: Versi 2.20+ (CLI `docker compose`)
* **curl** dan **jq**: Untuk pengujian REST API endpoint

### Rekomendasi Perangkat Keras
| Komponen | Spesifikasi Minimal | Rekomendasi Validator Produksi |
| :--- | :--- | :--- |
| **CPU** | 2 Core (x86_64 atau ARM64) | 4+ Core dengan dukungan SIMD AVX2 / NEON |
| **RAM** | 4 GB RAM | 8 GB RAM DDR4/DDR5 |
| **Penyimpanan** | 50 GB NVMe SSD | 150+ GB NVMe SSD berkecepatan IOPS tinggi |
| **Jaringan** | 20 Mbps simetris | 100 Mbps broadband dengan IP Publik Statis |

---

## Struktur Port Jaringan

Scytale beroperasi menggunakan dua port komunikasi utama yang harus dikonfigurasi pada firewall / security group Anda:

```
                  +-----------------------------------+
                  |        SCY my-scytale-node        |
                  |                                   |
[P2P Wire Peer]   |  PORT 9001: TCP / UDP Wire        |  (Gossip, Block & UTXO Sync)
=================>|  - Wajib dibuka ke publik (0.0.0.0)|
                  |                                   |
[DApp / CLI Client|  PORT 8332: HTTP REST / JSON-RPC  |  (Query Status, Tx Submit)
=================>|  - Akses lokal / reverse-proxy   |
                  +-----------------------------------+
```

1. **Port `9001` (P2P Wire Protocol)**:
   * **Protokol**: TCP & UDP
   * **Deskripsi**: Port pertukaran data blok, transmisi transaksi (gossip), penemuan peer (*Autonomous DNS Seeder*), dan *fast-sync wire stream*.
   * **Kebijakan Firewall**: **Wajib diizinkan (Inbound 0.0.0.0/0)** agar node Anda dapat terhubung dua arah dengan peer lain.

2. **Port `8332` (REST API & JSON-RPC)**:
   * **Protokol**: TCP (HTTP/1.1 & HTTP/2)
   * **Deskripsi**: Port antarmuka developer, melayani endpoint `/api/v1/*` untuk query status sinkronisasi, saldo alamat Bech32, dan penyerahan transaksi.
   * **Kebijakan Firewall**: Dianjurkan dibatasi ke `127.0.0.1` atau reverse-proxy dengan TLS/Auth jika dibuka untuk publik.

---

## 1 Perintah: Meluncurkan Node dengan Docker Compose

Buat direktori kerja baru dan berkas konfigurasi `docker-compose.yml`:

```bash
mkdir -p scytale-node && cd scytale-node
```

Simpan berkas `docker-compose.yml` berikut:

```yaml
services:
  scytale-node:
    image: ghcr.io/scytale-network/scytale-node:v0.4.2-devnet
    container_name: scytale-validator
    restart: unless-stopped
    ports:
      # Port 9001: P2P Wire Protocol (Wajib exposed untuk interaksi jaringan)
      - "9001:9001"
      # Port 8332: REST & JSON-RPC API
      - "127.0.0.1:8332:8332"
    environment:
      - SCY_NETWORK=devnet
      - SCY_CHAIN_ID=scytale-devnet-1
      - SCY_P2P_LISTEN_PORT=9001
      - SCY_P2P_EXTERNAL_ADDR=${EXTERNAL_IP:-}:9001
      - SCY_RPC_LISTEN_PORT=8332
      - SCY_DNS_SEED=seed.devnet.scytale.org:9001
      - SCY_LOG_LEVEL=info
      - SCY_DATA_DIR=/var/lib/scytale/data
    volumes:
      - scytale_data:/var/lib/scytale/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8332/api/v1/health"]
      interval: 15s
      timeout: 5s
      retries: 3
      start_period: 20s

volumes:
  scytale_data:
    name: scytale_devnet_data
```

### Jalankan Node

Jalankan satu perintah berikut untuk mengunduh image dan menjalankan node di latar belakang (*daemon mode*):

```bash
docker compose up -d
```

Output yang diharapkan:
```text
[+] Running 2/2
 ✔ Network scytale-node_default      Created
 ✔ Container scytale-validator       Started
```

---

## Memantau Log Node

Pantau aktivitas P2P wire handshake dan penemuan blok secara langsung menggunakan log Docker:

```bash
docker compose logs -f --tail=100
```

Contoh output log normal:
```text
INFO[2026-09-02T20:15:00Z] [P2P] Scytale Wire Node Engine starting... version=v0.4.2-devnet
INFO[2026-09-02T20:15:01Z] [P2P] Listening for wire connections on 0.0.0.0:9001
INFO[2026-09-02T20:15:02Z] [RPC] HTTP REST/RPC Server ready on 0.0.0.0:8332
INFO[2026-09-02T20:15:03Z] [SEEDER] DNS query to seed.devnet.scytale.org resolved 14 active peers
INFO[2026-09-02T20:15:05Z] [WIRE] Outbound handshake successful with peer 198.51.100.22:9001
INFO[2026-09-02T20:15:06Z] [SYNC] Fast-sync stream initiated. Downloading compact UTXO commitment...
INFO[2026-09-02T20:15:10Z] [CHAIN] Applied block #18420 (hash: 0a9c8f... utxo_root: e42b10...)
```

---

## Verifikasi Sinkronisasi Node (`/api/v1/status`)

Setelah node berjalan selama beberapa detik, verifikasi status jaringan dan progres sinkronisasi menggunakan endpoint REST API bawaan:

### Perintah cURL

```bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
```

### Contoh Respons JSON

```json
{
  "chain_id": "scytale-devnet-1",
  "version": "v0.4.2-devnet",
  "status": "online",
  "synced": true,
  "block_height": 18420,
  "tip_hash": "0a9c8fe26177bc954313f8983942078dbb45281b951ef40d421712a144e137b0",
  "utxo_root": "e42b10cd47291a1824be79116acb879ef448e02d8495034b07c803df3985a932",
  "utxo_count": 89452,
  "peers_connected": 8,
  "mempool_size": 14,
  "network_hashrate_ths": 42.15,
  "uptime_seconds": 1840,
  "zero_float_fee_rate_micron": 10
}
```

### Deskripsi Parameter Respons

| Parameter | Tipe | Penjelasan |
| :--- | :--- | :--- |
| `synced` | `boolean` | Bernilai `true` jika tinggi blok lokal telah menyamai konsensus kanonikal jaringan. Jika masih `false`, node sedang melakukan fast-sync. |
| `block_height` | `integer` | Nomor tinggi blok terbaru yang telah divalidasi dan disimpan di basis data lokal. |
| `peers_connected`| `integer` | Jumlah node tetangga yang aktif terhubung via P2P Wire (Port 9001). Nilai ideal adalah $\ge 3$. |
| `utxo_count` | `integer` | Total unspent transaction output yang valid dan tercatat dalam komitmen status state pohon BLAKE3 saat ini. |
| `tip_hash` | `string` | Hash 32-byte (heksadesimal) dari 120-byte block header pada tinggi blok teratas. |
| `utxo_root` | `string` | Akar kriptografis pohon status UTXO yang dicatat pada header blok terbaru. |

---

## Penghentian dan Pembersihan

Untuk menghentikan container validator tanpa menghapus data blockchain:

```bash
docker compose stop
```

Untuk menyalakan kembali:
```bash
docker compose start
```

Untuk menghapus container dan membersihkan seluruh volume database:
```bash
docker compose down -v
```
::: warning PERINGATAN PENGHAPUSAN VOLUME
Flag `-v` akan menghapus volume Docker `scytale_devnet_data`. Node Anda harus melakukan proses sinkronisasi dari awal saat dinyalakan kembali.
:::
