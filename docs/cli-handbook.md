# Panduan Lengkap scytale-cli

`scytale-cli` adalah utilitas baris perintah (CLI) resmi untuk mengelola dompet (*wallet*), menandatangani dan mentransmisikan transaksi P2PKH deterministik, mengontrol penambangan (*mining*), dan berinteraksi dengan node Scytale RPC via port 8332.

---

## 1. Instalasi dan Setup Awal

### Menggunakan Docker Wrapper (Direkomendasikan)
Jika Anda telah menjalankan node via Docker Compose, Anda dapat langsung mengeksekusi `scytale-cli` di dalam container:

```bash
alias scytale-cli="docker exec -it scytale-validator scytale-cli"
```

### Mengunduh Biner Mandiri
```bash
# Unduh biner untuk Linux x86_64
curl -LO https://github.com/ratufatma/scytale-docs/releases/download/v0.4.2-devnet/scytale-cli-linux-amd64.tar.gz
tar -xzf scytale-cli-linux-amd64.tar.gz
sudo mv scytale-cli /usr/local/bin/

# Verifikasi instalasi
scytale-cli version
```

Output:
```text
scytale-cli v0.4.2-devnet (rev: d84e2a, arch: amd64, target: scytale-devnet-1)
```

---

## 2. Manajemen Kunci: `keygen`

Perintah `keygen` membangkitkan pasangan kunci kriptografis **Ed25519**, mnemonic seed frase 24-kata standar BIP-39, dan alamat publik berformat **Bech32** dengan prefix `scy1...`.

### Membuat Dompet Baru

```bash
scytale-cli wallet keygen --name my-validator-wallet
```

### Contoh Output Interaktif

```text
================================================================================
                    SCY_TALE ED25519 KEYPAIR GENERATED
================================================================================
Wallet Name    : my-validator-wallet
Bech32 Address : scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m
Public Key (HEX): 8a4c12f458e8b211a76b9f3014aef72c88432a106e238914b301c23f9901d81e
Storage Path   : ~/.scytale/wallets/my-validator-wallet.json

[!] SIMPAN 24 KATA MNEMONIC DI TEMPAT AMAN & RAHASIA:
--------------------------------------------------------------------------------
1. orbital    2. scytale   3. venture   4. quantum   5. matrix    6. cipher
7. timber     8. blake     9. beacon   10. ledger   11. copper   12. harbor
13. dynamic   14. alpine   15. fortress 16. shield   17. anchor   18. granite
19. cascade   20. vector   21. horizon  22. circuit  23. summit   24. velocity
--------------------------------------------------------------------------------
Catatan: Alamat 'scy1...' di atas siap menerima reward mining devnet atau transfer token.
```

::: danger KEAMANAN MNEMONIC
Jangan pernah membagikan 24 kata mnemonic atau private key Anda kepada pihak mana pun. Siapa pun yang memiliki frasa ini memiliki kontrol mutlak atas koin Anda.
:::

---

## 3. Pengecekan Saldo: `wallet balance`

Untuk memeriksa saldo koin yang belum dibelanjakan (*Unspent Transaction Outputs*) pada alamat Bech32 tertentu:

### Perintah Cek Saldo

```bash
scytale-cli wallet balance --address scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m
```

### Output Representasi Nilai Satuan

```text
+------------------------------------------------------------------------------+
|                    RINGKASAN SALDO DOMPET SCYTALE DEVNET                     |
+------------------------------------------------------------------------------+
| Alamat Bech32     : scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m       |
| Total Saldo       : 250.50000000 SCY                                         |
| Satuan Atomik     : 25,050,000,000 micron (Integer uint64)                   |
| Jumlah UTXO Aktif : 3 buah                                                   |
| Status Terkunci   : 0 micron (0 UTXO unconfirmed)                            |
+------------------------------------------------------------------------------+

Daftar UTXO Aktif:
[1] TxID: 3a91bf...:0 | Nilai: 100.00000000 SCY | Block: #17200 | Confirm: 1220
[2] TxID: 7c42e1...:1 | Nilai: 150.00000000 SCY | Block: #17890 | Confirm: 530
[3] TxID: 99e0df...:0 | Nilai:   0.50000000 SCY | Block: #18419 | Confirm: 1
```

::: info KONVERSI SATUAN
* $1\text{ SCY} = 100{,}000{,}000\text{ micron}$
* Tidak ada pecahan desimal mengambang (*float*) di tingkat protokol konsensus; CLI selalu memetakan perhitungan ke nilai integer pasti.
:::

---

## 4. Pengiriman Transaksi P2PKH: `tx send`

Scytale menggunakan skrip **P2PKH (Pay to Public Key Hash)** yang ditandatangani dengan Ed25519. Perintah `tx send` menyertakan fitur `--auto-utxo` untuk memilih input terkecil yang mencukupi (*coin selection*), menghitung kembalian (*change address*), dan membubuhkan tanda tangan secara otomatis.

### Perintah Pengiriman

```bash
scytale-cli tx send \
  --from my-validator-wallet \
  --to scy1q7z8p49x3k2lm5n7r9x8gf2tvdw0s3jn54khce6m892 \
  --amount 100000 \
  --fee 500 \
  --auto-utxo
```

### Parameter Baris Perintah

| Parameter | Wajib | Keterangan |
| :--- | :--- | :--- |
| `--from` | Ya | Nama dompet lokal atau kunci privat pengirim. |
| `--to` | Ya | Alamat penerima valid berformat Bech32 `scy1...`. |
| `--amount` | Ya | Jumlah yang dikirim dalam satuan **micron** (misal: `100000` micron = `0.001` SCY). |
| `--fee` | Ya | Biaya transaksi mutlak dalam satuan integer **micron** (Zero-Float). |
| `--auto-utxo` | Opsional | Otomatis mengagregasi UTXO terkecil dan mengembalikan sisa dana (*change*) ke alamat pengirim. |

### Contoh Respon CLI Transmisi

```text
[+] Menganalisis state UTXO untuk alamat pengirim...
[+] Mengagregasi 1 UTXO (Nilai: 500000 micron)
[+] Alokasi Output:
    -> Penerima (scy1q7z8...): 100000 micron
    -> Change (scy1qq8n...):   399500 micron
    -> Fee Konsensus:          500 micron
[+] Menandatangani payload dengan Ed25519 Private Key... OK (Signature: 64 bytes)
[+] Menyiarkan transaksi via P2P Wire ke http://127.0.0.1:8332/api/v1/tx...

================================================================================
                           TRANSAKSI BERHASIL DISIARKAN
================================================================================
TxID      : 4f9812e9b0d87a4128f654ce923e110c71a399f6b4d1a520e0349bca710526e3
Ukuran    : 184 bytes (Zero-Float Cost: 2.71 micron/byte)
Status    : Diterima di Mempool Lokal (Menunggu blok berikutnya)
Konfirmasi: Pantau dengan 'scytale-cli tx status 4f9812e9...'
```

---

## 5. Kontrol Penambang: `miner start` / `stop`

Scytale menyediakan miner bawaan berbasis CPU multi-threaded yang dioptimasi untuk hashing BLAKE3 parallelizable.

### Memulai Mining (`miner start`)

Untuk memulai proses hashing blok baru dan mengarahkan reward koin coinbase ke alamat validator Anda:

```bash
scytale-cli miner start \
  --threads 4 \
  --reward-addr scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m
```

Output:
```text
[+] Memulai penambang Scytale internal...
[+] Utas Kerja (Worker Threads) : 4 CPU cores
[+] Alamat Penerima Reward       : scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m
[+] Target Kesulitan (nBits)     : 0x1e0ffff0
[+] Algoritma Header             : BLAKE3 (SIMD AVX2 Accelerated)
[+] Status                       : AKTIF. Menambang pada tinggi blok #18421...
```

### Mengecek Status Penambang (`miner status`)

```bash
scytale-cli miner status
```

Output:
```json
{
  "mining": true,
  "threads": 4,
  "reward_address": "scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m",
  "hashrate_khs": 1420.85,
  "blocks_mined_session": 3,
  "last_block_time": "2026-09-02T20:14:52Z",
  "current_target": "00000ffff0000000000000000000000000000000000000000000000000000000"
}
```

### Menghentikan Penambang (`miner stop`)

```bash
scytale-cli miner stop
```

Output:
```text
[+] Mengirim sinyal SIGTERM ke 4 worker miner...
[+] Utas pekerja berhasil dihentikan secara aman.
[+] Status penambangan: NONAKTIF.
```

---

## 6. Tabel Referensi Perintah Cepat

| Perintah | Argumen Utama | Fungsi |
| :--- | :--- | :--- |
| `wallet keygen` | `--name <string>` | Membuat pasangan kunci Ed25519 & alamat `scy1...` baru. |
| `wallet balance` | `--address <scy1...>` | Memeriksa saldo dan daftar UTXO aktif. |
| `wallet list` | - | Menampilkan daftar seluruh dompet lokal tersimpan. |
| `tx send` | `--to, --amount, --fee` | Menyiarkan transaksi P2PKH deterministik. |
| `tx status` | `<txid>` | Memeriksa status konfirmasi transaksi dalam rantai. |
| `miner start` | `--threads <n>, --reward-addr` | Mengaktifkan modul penambangan blok devnet. |
| `miner stop` | - | Menghentikan modul penambangan secara mulus. |
| `node status` | `--rpc <url>` | Menampilkan diagnostik node (identik dengan `/api/v1/status`). |
