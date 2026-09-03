---
layout: home

hero:
  name: "Scytale プロトコル"
  text: "次世代 高スループット Layer-1"
  tagline: "厳格な120Bブロックヘッダー、BLAKE3 PoW、確定性UTXO状態コミットメント、自律DNSシード機能。"
  actions:
    - theme: brand
      text: クイックスタート
      link: /ja/getting-started
    - theme: alt
      text: GitHub リポジトリ
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "CPU最適化 BLAKE3 PoW"
    details: "SIMD並列演算に最適化された超高速暗号ハッシュ。ASICによる寡占を排除し、分散型の健全なセキュリティを維持します。"
  - icon: 🛡️
    title: "120バイト固定ヘッダー & UTXOルート"
    details: "version、prev_hash、merkle_root、そしてutxo_rootを直接格納する固定長バイナリ構造でフェイルクローズド合意を保証。"
  - icon: 🚀
    title: "Fast Sync ワイヤプロトコル"
    details: "1メッセージあたり最大2,000 UTXOを転送するバイナリチャンクストリーミング（getsnap/snapshot）と30秒レート制限。"
  - icon: ⚖️
    title: "ゼロ浮動小数点 決定論的手数料"
    details: "整数サトシ単位のみを用いた厳格な手数料計算。浮動小数点演算による合意分岐リスクを完全に排除します。"
  - icon: 🔑
    title: "ネイティブ Bech32 アドレス (scy1...)"
    details: "Ed25519公開鍵暗号署名と、誤り検出用6文字BCHチェックサムを備えたBech32形式アドレス。"
  - icon: 🌐
    title: "自律型 DNS シーダー (Port 53)"
    details: "シビル攻撃耐性（/24サブネットあたり最大2ノード）とFisher-Yatesシャッフルを備えたDNSシードエンジン。"
---

# Scytale Layer-1 プロトコル (v0.3.0-devnet)

Scytale Layer-1 ブロックチェーンプロトコルの公式開発者ドキュメントへようこそ。
