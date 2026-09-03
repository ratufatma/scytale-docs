# Panduan Mulai Cepat Node Validator (v0.3.0-devnet)

Panduan ini menuntun Anda untuk menjalankan node validator blockchain Scytale Layer-1 yang tersinkronisasi penuh pada jaringan **v0.3.0-devnet** menggunakan Docker Compose.

---

## 1. Menjalankan Node 1 Perintah

Jalankan container validator menggunakan berkas `docker-compose.yml`:

```bash
# Klon repositori Scytale
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# Jalankan node validator di latar belakang
docker compose up -d node-1
```

---

## 2. Bootstrapping Otonom (Cold-Start Tanpa Peer Statis)

Node Scytale **tidak memerlukan daftar IP statis**. Saat pertama kali menyala:

1. Modul `scytale-p2p` melakukan kueri ke server DNS seeder `seed.devnet.scytale.org` pada port 53.
2. DNS seeder memberikan daftar peer aktif yang telah diacak dengan Fisher-Yates dan difilter anti-Sybil (maksimal 2 node per subnet `/24`).
3. Node validator otomatis meminta snapshot status koin (`getsnap`) pada port 9001.

Pantau log pencarian peer secara real-time:

```bash
docker logs -f scytale-validator-1 | grep "p2p"
```

---

## 3. Verifikasi Status Node via cURL RPC

Periksa tinggi blok, status `utxo_root`, dan jumlah peer terhubung:

```bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
```
