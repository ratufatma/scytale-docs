# 验证节点快速入门 (v0.3.0-devnet)

本指南介绍如何使用 Docker Compose 一键运行 Scytale 验证节点并连接到 **v0.3.0-devnet**。

---

## 1. 单命令启动容器

```bash
# 克隆代码仓库
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# 启动验证节点容器
docker compose up -d node-1
```

---

## 2. 检查节点 RPC 状态

```bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
```
