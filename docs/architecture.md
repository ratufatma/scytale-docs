# Arsitektur Tingkat Tinggi Scytale Layer-1

Dokumen ini merangkum arsitektur internal protokol blockchain Layer-1 Scytale berdasarkan spesifikasi Tasks 32–38. Scytale dirancang dengan fokus pada **throughput tinggi**, **state commitment deterministik**, dan **sinkronisasi berkecepatan tinggi** melalui tiga inovasi arsitektural utama:

1. **Compact UTXO Commitment (120-Byte Block Header)**
2. **Fast Sync Wire Protocol (Golang Streaming)**
3. **Autonomous DNS Seeder & Peer Health Crawler**

---

## 1. Compact UTXO Commitment & 120B Block Header

Berbeda dari blockchain warisan yang memisahkan status koin dari header blok, Scytale menyematkan **`utxo_root`** secara langsung di dalam header blok berukuran tetap tepat **120 bytes**.

### Struktur Biner Header Blok (Fixed 120 Bytes)

```
Offset (Byte)   Ukuran (Byte)   Nama Field      Tipe Data    Deskripsi
---------------------------------------------------------------------------------------
0x00 - 0x03     4 Bytes         version         uint32_le    Versi konsensus protokol (v1 = 0x00000001)
0x04 - 0x23     32 Bytes        prev_hash       [32]byte     BLAKE3 hash dari 120B header blok sebelumnya
0x24 - 0x43     32 Bytes        merkle_root     [32]byte     Akar Merkle Tree transaksi dalam blok
0x44 - 0x63     32 Bytes        utxo_root       [32]byte     Akar pohon status UTXO pasca eksekusi blok
0x64 - 0x6B     8 Bytes         timestamp       uint64_le    Waktu Unix epoch dalam detik (UTC)
0x6C - 0x6F     4 Bytes         nbits (target)  uint32_le    Format ringkas target kesulitan Proof-of-Work
0x70 - 0x77     8 Bytes         nonce           uint64_le    Nilai acak penambang untuk memenuhi target PoW
---------------------------------------------------------------------------------------
TOTAL UKURAN : 120 BYTES SECARA KAKU (FIXED-LENGTH BINARY ALIGNMENT)
```

### Mekanisme `utxo_root`
Setiap kali transaksi baru diproses dalam suatu blok:
1. Output yang dibelanjakan dihapus dari struktur data status lokal.
2. Output baru (*unspent*) ditambahkan ke pohon Merkle-Patricia berbasis BLAKE3.
3. Node menghitung akar hash 32-byte dari pohon tersebut dan menuliskannya ke field `utxo_root`.

```
                    +--------------------------------+
                    |  120-BYTE SCYTALE BLOCK HEADER |
                    +--------------------------------+
                    |  version:     0x00000001       |
                    |  prev_hash:   0x3b1c...99a0    |
                    |  merkle_root: 0x8a12...ff01    |
                    |  utxo_root:   0x4e8d...77b2  <-------+
                    |  timestamp:   1788390000       |      |
                    |  nbits:       0x1e0ffff0       |      | (Cryptographic
                    |  nonce:       0x000004218a99   |      |  Root Binding)
                    +--------------------------------+      |
                                                            |
                       +------------------------------------+
                       |
                       v
         [ BLAKE3 RADIX-16 UTXO COMMITMENT TREE ]
                       /                        \
           [Branch Hash A]                    [Branch Hash B]
             /         \                        /         \
         [Leaf 0]    [Leaf 1]               [Leaf 2]    [Leaf 3]
            |           |                      |           |
        UTXO: scy1q...  UTXO: scy1q...         UTXO: ...   UTXO: ...
```

### Keunggulan Desain:
* **Stateless Client Verification**: Klien ringan (SPV) atau dompet seluler cukup meminta *Merkle Inclusion Proof* dari suatu UTXO relatif terhadap `utxo_root` di header blok untuk membuktikan kepemilikan dana secara instan tanpa mengunduh riwayat transaksi berukuran gigabyte.
* **Instant Chain Reorganization Detection**: Jika dua penambang menghasilkan state UTXO yang berbeda sedikit pun, hash `utxo_root` akan langsung bertabrakan dan blok yang tidak valid segera ditolak sebelum parsing transaksi mendalam dilakukan.

---

## 2. Fast Sync Wire Protocol (Golang)

Lapisan komunikasi jaringan (*network wire layer*) Scytale ditulis dalam Go murni, memanfaatkan model konkurensi goroutine dan I/O non-blocking untuk memfasilitasi transmisi data massal dengan latensi minimal.

### Format Paket Biner Wire

Setiap paket P2P yang melintasi port `9001` dikemas dengan format header 20-byte:

```
+--------------------+---------------------+--------------------+--------------------+
| Magic Bytes (4B)   | Command Name (12B)  | Payload Length(4B) | BLAKE3 Checksum(4B)|
| 0x53 0x43 0x59 0x01| "getutxos\0\0\0..." | uint32 Little-End  | 4-byte slice BLAKE3|
+--------------------+---------------------+--------------------+--------------------+
|                               PAYLOAD DATA (Ukuran N Bytes)                        |
+------------------------------------------------------------------------------------+
```

### Alur Fast-Sync (Snap-Sync Berbasis `utxo_root`)

Ketika validator baru bergabung ke jaringan, protokol tidak memaksa node untuk memutar ulang (*replay*) jutaan transaksi sejak blok genesis:

```
Node Baru (Joining Node)                         Node Tetangga (Serving Peer)
        |                                                     |
        |---- 1. HELLO / VERSION (Port 9001) ---------------->|
        |<--- 2. VERACK + CURRENT_TIP (Height 18420) ---------|
        |                                                     |
        |---- 3. GETHEADERS (From: Genesis, To: Tip) -------->|
        |<--- 4. HEADERS (120B * 18420 headers = ~2.2 MB) ----|
        |                                                     |
  [Verifikasi Rantai PoW & Validasi Header Selesai (100ms)]   |
        |                                                     |
        |---- 5. GETUTXO_CHUNK (Target Root: 0x4e8d...77b2) ->|
        |<--- 6. UTXO_STREAM (Compressed zstd leaf chunks) ---|
        |                                                     |
  [Rekonstruksi Pohon UTXO & Verifikasi kecocokan akar]       |
  [Status: SYNCED! Langsung siap memvalidasi blok baru]       |
```

1. **Download Headers**: Node mengunduh seluruh 120-byte header dari genesis hingga tip. Berkat ukuran header yang sangat ringkas (120B), 100.000 blok hanya memakan bandwidth sekitar **12 MB**.
2. **Snapshot UTXO Streaming**: Node meminta potongan snapshot UTXO yang terikat pada `utxo_root` blok teratas via command `GETUTXO_CHUNK`.
3. **Validasi Paralel**: Snapshot diverifikasi terhadap `utxo_root` secara paralel menggunakan semua core CPU yang tersedia. Setelah akar pohon cocok, node langsung berada pada status sinkron (**Synced**) hanya dalam beberapa detik.

---

## 3. Autonomous DNS Seeder

Untuk menghindari titik kegagalan tunggal (*Single Point of Failure / SPoF*) dan ketergantungan pada daftar IP statis yang ditanam di dalam kode sumber (*hardcoded bootstrap peers*), Scytale menerapkan **Autonomous DNS Seeder**.

```
                           +-------------------------------+
                           |      DNS Seeder Daemon        |
                           |   (seed.devnet.scytale.org)   |
                           +-------------------------------+
                                      |         ^
          1. Periodik TCP Healthcheck |         | 2. Crawl & Discover
             Port 9001 (Interval 60s) |         |    Peer Addresses
                                      v         |
                          +--------------------------------+
                          |   Scytale Peer Mesh Network    |
                          |                                |
                          |  [Node A: 9001] [Node B: 9001] |
                          |  [Node C: 9001] [Node D: DEAD] |
                          +--------------------------------+
                                          ^
                                          | 3. Resolusi DNS A/AAAA
                                          |    (Hanya mengembalikan
                                          |     node sehat: A, B, C)
                                          |
                              +-----------------------+
                              | Node Baru (Bootstrapping)
                              +-----------------------+
```

### Cara Kerja Autonomous DNS Seeder:
1. **Continuous Crawler**: Daemon seeder secara terus-menerus merayapi (*crawl*) jaringan P2P melalui pesan `GETADDR` dan `ADDR`.
2. **Strict Health Checking**: Seeder membuka koneksi handshake TCP ke port 9001 dari setiap peer yang ditemukan. Node hanya dinyatakan sehat jika:
   * Menjawab handshake versi dalam waktu $< 2$ detik.
   * Tinggi blok node berada dalam rentang toleransi $\pm 5$ blok dari tip mayoritas konsensus.
   * Tidak memiliki riwayat perilaku protokol berbahaya (*malformed packet*).
3. **Autonomous Pruning**: Peer yang tidak merespons selama 3 kali percobaan berturut-turut langsung dikeluarkan dari zona DNS.
4. **DNS Multi-A Query**: Ketika node baru mengeksekusi `dig seed.devnet.scytale.org A`, server DNS otoritatif mengembalikan daftar round-robin berisi hingga 25 alamat IP validator yang terbukti 100% aktif dan terverifikasi.

---

## Ringkasan Perbandingan Protokol

| Fitur | Scytale Layer-1 | Blockchain Tradisional (Bitcoin/EVM) |
| :--- | :--- | :--- |
| **Algoritma Hash** | BLAKE3 (SIMD Tree Hashing) | SHA-256 (Serial) / Keccak-256 |
| **Skema Tanda Tangan**| Ed25519 (Tahan side-channel) | ECDSA secp256k1 (Rentan timing attack) |
| **Ukuran Block Header** | **Tepat 120 Bytes** | Bervariasi / 80 Bytes (tanpa UTXO root) |
| **State Commitment**| `utxo_root` tertanam di header | Terpisah (World state tree) atau tidak ada di header |
| **Model Fee** | **Zero-Float Integer (micron)** | Gwei / Satoshi dengan floating rounding math |
| **Mekanisme Sync** | Fast Sync via snapshot `utxo_root` | Replay seluruh histori transaksi puluhan GB |
| **Penemuan Peer** | Autonomous DNS Crawler dinamis | Manual hardcoded IP lists / DHT lambat |
