---
layout: home

hero:
  name: "Scytale 协议"
  text: "高吞吐量 Layer-1 区块链"
  tagline: "120字节规范区块头、BLAKE3工作量证明、确定性UTXO状态根以及自主DNS网络引导。"
  actions:
    - theme: brand
      text: 快速启动验证节点
      link: /zh/getting-started
    - theme: alt
      text: GitHub 源码
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "CPU友好型 BLAKE3 PoW"
    details: "针对现代CPU SIMD指令集深度优化的超高速哈希算法，在保持高去中心化安全性的同时防止专用ASIC垄断。"
  - icon: 🛡️
    title: "120字节对齐区块头与状态根"
    details: "严格的二进制对齐结构，将version、prev_hash、merkle_root与规范utxo_root直接绑定，提供故障即关闭的共识验证。"
  - icon: 🚀
    title: "Fast Sync 线路上行协议"
    details: "二进制分块流式传输（getsnap/snapshot），单个数据包支持高达2000个UTXO，具备动态内存树重建与30秒限流机制。"
  - icon: ⚖️
    title: "零浮点确定性费率模型"
    details: "完全基于整数聪的交易费用计算，杜绝浮点计算不一致导致的共识分叉与舍入攻击漏洞。"
  - icon: 🔑
    title: "原生 Bech32 地址 (scy1...)"
    details: "Ed25519公钥密码签名与Bech32地址编码完美结合，具备6字符BCH错误检测校验码。"
  - icon: 🌐
    title: "自主 DNS 种子节点 (端口 53)"
    details: "独立运行的DNS爬虫，具备抗女巫攻击防护（每个/24子网最多2个节点）以及Fisher-Yates洗牌算法。"
---

# Scytale Layer-1 协议 (v0.3.0-devnet)

欢迎查阅 **Scytale Layer-1 区块链协议** 官方开发者文档。Scytale 是使用 Rust 构建的高性能确定性 UTXO 去中心化账本。
