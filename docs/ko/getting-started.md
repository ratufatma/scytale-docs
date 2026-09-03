# 검증 노드 빠른 시작 (v0.3.0-devnet)

Docker Compose로 **v0.3.0-devnet** 검증 노드를 신속하게 배포하고 실행하는 방법입니다.

---

## 1. 단일 명령어로 노드 시작

```bash
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale
docker compose up -d node-1
```

---

## 2. 노드 RPC 상태 검증

```bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
```
