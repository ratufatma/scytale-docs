---
layout: home

hero:
  name: "Scytale Layer-1"
  text: "High-Throughput, Deterministic UTXO Blockchain"
  tagline: "Protokol Layer-1 generasi baru dengan BLAKE3, Ed25519, 120-Byte Compact Header, Zero-Float Fee Market, dan P2P Wire Go."
  actions:
    - theme: brand
      text: "Mulai Cepat Node"
      link: "/getting-started"
    - theme: alt
      text: "CLI Handbook"
      link: "/cli-handbook"
    - theme: alt
      text: "Spesifikasi Arsitektur"
      link: "/architecture"

features:
  - icon: ⚡
    title: "BLAKE3 & Ed25519 Modern Crypto"
    details: "Kriptografi generasi berikutnya: hashing pohon BLAKE3 dengan throughput 4-8x melampaui SHA-256 dan verifikasi tanda tangan digital Ed25519 yang tahan terhadap side-channel attack."
  
  - icon: 📐
    title: "120-Byte Header & utxo_root"
    details: "Struktur block header kompak tepat 120 byte yang menyematkan akar komitmen status UTXO (utxo_root), memungkinkan verifikasi SPV instan dan sinkronisasi tanpa memori berlebih."

  - icon: 🛡️
    title: "Zero-Float Fee Market"
    details: "Seluruh kalkulasi biaya komputasi dan bandwidth menggunakan aritmatika integer murni (1 SCY = 10^8 micron / atomic units), mengeliminasi risiko bug pembulatan floating-point pada konsensus."

  - icon: 🌐
    title: "P2P Wire Go & Autonomous DNS"
    details: "Sub-lapisan jaringan binary framing kencang dalam Go dengan zero-copy deserialization, multiplexed stream, dan penemuan peer otomatis melalui Autonomous DNS Seeder bawaan."

  - icon: 🔑
    title: "Native Bech32 Addresses (scy1...)"
    details: "Format alamat pengguna manusiawi berstandar BIP-173 dengan prefix 'scy1', visual error-detection berbasis algoritma kode BCH, dan pencegahan kesalahan ketik (typo-proof)."
---

# Selamat Datang di Scytale Devnet

**Scytale** adalah blockchain Layer-1 berbasis model **UTXO (Unspent Transaction Output)** modern yang dirancang untuk performa ekstrem, konsensus deterministik, dan keamanan kriptografis generasi berikutnya. Protokol Scytale memadukan kesederhanaan model transaksi Bitcoin dengan kecepatan pemrosesan kontemporer, hashing BLAKE3 parallelizable, dan validasi status stateless via *UTXO commitment root*.

::: tip STATUS DEVNET SAAT INI
Jaringan **Scytale Public Devnet (Chain ID: `scytale-devnet-1`)** aktif. Siapa pun dapat menjalankan validator node secara mandiri menggunakan Docker Compose, berpartisipasi dalam penemuan blok, dan menguji transmisi transaksi via `scytale-cli`.
:::

---

## 5 Pilar Inti Arsitektur Scytale

### 1. Kriptografi BLAKE3 & Ed25519
Scytale meninggalkan algoritma warisan seperti SHA-256 dan ECDSA secp256k1 demi kecepatan dan keamanan modern:
* **BLAKE3 Hashing**: Memanfaatkan struktur *Merkle tree* internal yang mendukung paralelisasi SIMD (AVX-512, NEON), memproses data blok hingga 4–8 kali lebih cepat daripada SHA-256 dan 3 kali lebih cepat daripada BLAKE2b.
* **Ed25519 Signatures**: Skema tanda tangan Edwards-curve Digital Signature Algorithm (RFC 8032) dengan panjang kunci publik 32-byte dan tanda tangan 64-byte. Kebal secara matematis terhadap timing attacks dan fault attacks tanpa memerlukan sumber entropi acak saat penandatanganan.

### 2. 120-Byte Compact Block Header (`utxo_root`)
Setiap blok pada Scytale memiliki header biner fixed berukuran tepat **120 bytes**:

```
+---------------+------------------+--------------------+--------------------+
| Version (4B)  | Prev Block (32B) | Merkle Root (32B)  | UTXO Root (32B)    |
+---------------+------------------+--------------------+--------------------+
| Timestamp (8B)| Bits/Target (4B) | Nonce (8B)         | Total = 120 Bytes  |
+---------------+------------------+--------------------+--------------------+
```

Kehadiran field **`utxo_root` (32 bytes)** secara eksplisit memuat *cryptographic commitment* (pohon status Patricia/Merkle BLAKE3) dari seluruh kumpulan UTXO aktif pada blok tersebut. Klien ringan (SPV), mobile wallet, dan node baru dapat memverifikasi saldo tanpa mengunduh riwayat transaksi puluhan gigabyte dari genesis.

### 3. Zero-Float Fee Market
Salah satu penyebab utama *fork non-deterministik* dan celah eksploitasi pada sistem terdesentralisasi adalah kalkulasi biaya berbasis pecahan (*floating-point*). Scytale memberlakukan:
* **Integer-Only Unit**: Seluruh nilai dinyatakan dalam satuan terkecil **micron** (1 SCY = `100,000,000` micron).
* **Deterministic Fee Calculation**: Rumus biaya transaksi adalah deterministik mutlak:
  $$\text{Fee} = (\text{Byte Size} \times \text{Base Rate Integer}) + \text{OpCode Weight}$$
* **No Division Remainders Loss**: Pembagian sisa dialokasikan kembali secara deterministik ke validator fee-pool sesuai aturan konsensus statis.

### 4. High-Throughput P2P Wire Protocol (Go)
Engine *networking* Scytale ditulis menggunakan bahasa pemrograman **Go**, memanfaatkan:
* **Binary Framing**: Paket data dibungkus dengan magic byte `0x53435901` (`SCY\x01`), command header 12-byte, payload length 4-byte, dan checksum BLAKE3 4-byte.
* **Stream Multiplexing**: Jalur pertukaran blok dan transaksi memisahkan kanal kontrol (ping/pong/addr) dari kanal data berbobot tinggi (blocks chunk/UTXO snapshot).
* **Autonomous DNS Seeder**: Node baru otomatis melakukan *lookup* ke cluster DNS seeder resmi yang secara berkala memverifikasi kesehatan port 9001 validator aktif.

### 5. Native Bech32 Addressing (`scy1...`)
Seluruh akun pengguna dan transaksi P2PKH (Pay-to-Public-Key-Hash) menggunakan alamat berbasis **Bech32**:
* **Human-Readable Prefix**: Dimulai dengan prefix jaringan `scy1` untuk devnet/mainnet.
* **Payload**: Hash 32-byte BLAKE3 dari Ed25519 Public Key yang di-*encode* ke charset 32-karakter (`qpzry9x8gf2tvdw0s3jn54khce6mua7l`).
* **BCH Checksum**: Mampu mendeteksi hingga 4 karakter kesalahan ketik berurutan dan mengabaikan sensitivitas huruf besar/kecil.

---

## Ringkasan Spesifikasi Devnet

| Parameter | Spesifikasi Teknis | Keterangan |
| :--- | :--- | :--- |
| **Chain ID** | `scytale-devnet-1` | Pengenal unik jaringan devnet |
| **Header Size** | `120 Bytes` | Fixed size dengan `utxo_root` |
| **Block Time** | `10 Detik` | Rata-rata interval waktu penemuan blok |
| **Difficulty Retarget** | Setiap `120 Blok` (~20 menit) | Penyesuaian bertahap anti-oscillation |
| **Default P2P Port** | `9001` | Komunikasi P2P Wire antar-node |
| **Default RPC Port** | `8332` | JSON-RPC dan REST API `/api/v1/*` |
| **Satuan Dasar** | `1 SCY = 100,000,000 micron` | Representasi integer uint64 |
| **Format Alamat** | `scy1q[a-z0-9]{38,58}` | Bech32 Ed25519 Public Key Hash |

---

## Panduan Langkah Berikutnya

* 🚀 **[Jalankan Node Validator](/getting-started)**: Setup node validator penuh hanya dalam satu perintah Docker Compose.
* 💻 **[Kuasai Scytale CLI](/cli-handbook)**: Buat wallet, cek saldo, buat transaksi P2PKH, dan aktifkan modul mining.
* 🏛️ **[Pahami Arsitektur Inti](/architecture)**: Pelajari detail teknis Compact UTXO Commitment dan protokol sinkronisasi cepat.
