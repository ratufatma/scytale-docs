# Panduan Lengkap scytale-cli (v0.3.0-devnet)

`scytale-cli` adalah utilitas baris perintah resmi untuk berinteraksi dengan blockchain Scytale: membuat kunci Ed25519, memeriksa saldo, mengirim transaksi P2PKH deterministik, dan menambang blok PoW.

---

## 1. Pembuatan Kunci & Alamat Bech32

```bash
# Membuat keypair Ed25519 baru
scytale-cli keygen --out wallet.json

# Menampilkan alamat Bech32 (scy1...)
scytale-cli address --key wallet.json
```

---

## 2. Memeriksa Saldo & Status UTXO

```bash
scytale-cli balance scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2
```

---

## 3. Mengirim Transaksi P2PKH

```bash
scytale-cli send \
  --from wallet.json \
  --to scy1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4 \
  --amount 10000000000 \
  --fee 10000
```

---

## 4. Menjalankan Penambang CPU BLAKE3

```bash
scytale-cli mine start \
  --reward-to scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2 \
  --threads 4
```
