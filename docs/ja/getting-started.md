# バリデータノード クイックスタート (v0.3.0-devnet)

Docker Compose を使用して **v0.3.0-devnet** 検証ノードを即座に立ち上げる手順です。

---

## 1. 1コマンドでのノード起動

```bash
# リポジトリのクローン
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# バリデータコンテナをバックグラウンドで起動
docker compose up -d node-1
```

---

## 2. HTTP RPC ステータスの確認

```bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
```
