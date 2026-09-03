export interface DocFile {
  id: string;
  filename: string;
  path: string;
  title: string;
  category: string;
  locale: 'en' | 'id' | 'zh' | 'ja' | 'ko' | 'hi' | 'ar';
  description: string;
  rawContent: string;
}

export const DOC_FILES: DocFile[] = [
  // ==========================================
  // 1. VITEPRESS CONFIGURATION (.mts)
  // ==========================================
  {
    id: 'config',
    filename: 'config.mts',
    path: 'docs/.vitepress/config.mts',
    title: 'VitePress Config (7 Locales & RTL)',
    category: 'Konfigurasi & i18n',
    locale: 'en',
    description: 'VitePress configuration with complete 7 locales (en, id, zh, ja, ko, hi, ar with dir: rtl), dark/light appearance, and local search.',
    rawContent: `import { defineConfig } from 'vitepress'

// Scytale Layer-1 Protocol Documentation (v0.3.0-devnet)
// Supporting 7 locales with Arabic RTL and custom slate/cyan/emerald theme
export default defineConfig({
  title: 'Scytale Devnet Docs',
  description: 'Official Developer Documentation for Scytale Layer-1 Blockchain Protocol (v0.3.0-devnet)',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,

  // Built-in Dark/Light theme mode switch
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/scytale-logo.svg' }],
    ['meta', { name: 'theme-color', content: '#06b6d4' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Scytale Layer-1 Protocol Docs' }],
    ['meta', { property: 'og:description', content: 'BLAKE3 PoW, 120-Byte Canonical Header, Fast Sync Wire Protocol, and Autonomous DNS Seeding.' }]
  ],

  // Multi-language (i18n) Configuration with Arabic RTL
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Scytale Protocol',
      description: 'Official developer documentation for Scytale Layer-1 Protocol',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'CLI Handbook', link: '/cli-handbook' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'v0.3.0-devnet', link: '/release-v030' }
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Protocol Overview', link: '/' },
              { text: 'Release v0.3.0-devnet', link: '/release-v030' },
              { text: 'Getting Started (Docker)', link: '/getting-started' }
            ]
          },
          {
            text: 'Validator & CLI',
            items: [
              { text: 'CLI Handbook & Transactions', link: '/cli-handbook' },
              { text: 'Node Verification & RPC', link: '/getting-started#verifying-node-status' }
            ]
          },
          {
            text: 'Protocol Architecture',
            items: [
              { text: 'Core Architecture', link: '/architecture' },
              { text: '120-Byte Canonical Header', link: '/architecture#1-authenticated-state-transition-engine-task-32' },
              { text: 'Fast Sync Wire Protocol', link: '/architecture#2-fast-sync-wire-protocol-task-33' },
              { text: 'Autonomous DNS Seeder', link: '/architecture#3-zero-configuration-cold-start-bootstrapping' }
            ]
          }
        ]
      }
    },
    id: {
      label: 'Bahasa Indonesia',
      lang: 'id-ID',
      link: '/id/',
      title: 'Protokol Scytale',
      description: 'Dokumentasi resmi pengembang protokol Layer-1 Scytale',
      themeConfig: {
        nav: [
          { text: 'Beranda', link: '/id/' },
          { text: 'Mulai Cepat', link: '/id/getting-started' },
          { text: 'Panduan CLI', link: '/id/cli-handbook' },
          { text: 'Arsitektur', link: '/architecture' },
          { text: 'v0.3.0-devnet', link: '/release-v030' }
        ],
        sidebar: [
          {
            text: 'Pengenalan',
            items: [
              { text: 'Ringkasan Protokol', link: '/id/' },
              { text: 'Release v0.3.0-devnet', link: '/release-v030' },
              { text: 'Mulai Cepat Node (Docker)', link: '/id/getting-started' }
            ]
          },
          {
            text: 'Panduan Validator & CLI',
            items: [
              { text: 'CLI Handbook & Transaksi', link: '/id/cli-handbook' },
              { text: 'Verifikasi Node & RPC API', link: '/id/getting-started#verifikasi-status-node' }
            ]
          }
        ]
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'Scytale 协议',
      description: 'Scytale Layer-1 区块链协议官方开发者文档',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '快速入门', link: '/zh/getting-started' },
          { text: 'CLI 手册', link: '/cli-handbook' },
          { text: '核心架构', link: '/architecture' }
        ],
        sidebar: [
          {
            text: '快速开始',
            items: [
              { text: '协议概述', link: '/zh/' },
              { text: '运行验证节点', link: '/zh/getting-started' }
            ]
          }
        ]
      }
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      title: 'Scytale プロトコル',
      description: 'Scytale Layer-1 ブロックチェーン公式開発者ドキュメント',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: 'クイックスタート', link: '/ja/getting-started' },
          { text: 'CLI ハンドブック', link: '/cli-handbook' },
          { text: 'アーキテクチャ', link: '/architecture' }
        ],
        sidebar: [
          {
            text: 'はじめに',
            items: [
              { text: '概要', link: '/ja/' },
              { text: 'ノード起動ガイド', link: '/ja/getting-started' }
            ]
          }
        ]
      }
    },
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko/',
      title: 'Scytale 프로토콜',
      description: 'Scytale Layer-1 블록체인 공식 개발자 문서',
      themeConfig: {
        nav: [
          { text: '홈', link: '/ko/' },
          { text: '빠른 시작', link: '/ko/getting-started' },
          { text: 'CLI 가이드', link: '/cli-handbook' },
          { text: '아키텍처', link: '/architecture' }
        ],
        sidebar: [
          {
            text: '시작하기',
            items: [
              { text: '프로토콜 개요', link: '/ko/' },
              { text: '검증 노드 실행', link: '/ko/getting-started' }
            ]
          }
        ]
      }
    },
    hi: {
      label: 'हिन्दी',
      lang: 'hi-IN',
      link: '/hi/',
      title: 'Scytale प्रोटोकॉल',
      description: 'Scytale Layer-1 ब्लॉकचेन आधिकारिक डेवलपर दस्तावेज़ीकरण',
      themeConfig: {
        nav: [
          { text: 'होम', link: '/hi/' },
          { text: 'त्वरित शुरुआत', link: '/hi/getting-started' },
          { text: 'CLI हैंडबुक', link: '/cli-handbook' },
          { text: 'आर्किटेक्चर', link: '/architecture' }
        ],
        sidebar: [
          {
            text: 'परिचय',
            items: [
              { text: 'प्रोटोकॉल विवरण', link: '/hi/' },
              { text: 'वैलिडेटर नोड सेटअप', link: '/hi/getting-started' }
            ]
          }
        ]
      }
    },
    ar: {
      label: 'العربية',
      lang: 'ar-SA',
      dir: 'rtl', // Right-to-Left writing and layout orientation
      link: '/ar/',
      title: 'بروتوكول Scytale',
      description: 'الوثائق الرسمية لمطوري بروتوكول بلوكشين Scytale Layer-1',
      themeConfig: {
        nav: [
          { text: 'الرئيسية', link: '/ar/' },
          { text: 'البدء السريع', link: '/ar/getting-started' },
          { text: 'دليل الأوامر', link: '/cli-handbook' },
          { text: 'المعمارية', link: '/architecture' }
        ],
        sidebar: [
          {
            text: 'المقدمة',
            items: [
              { text: 'نظرة عامة على البروتوكول', link: '/ar/' },
              { text: 'تشغيل عقدة التحقق', link: '/ar/getting-started' }
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    siteTitle: 'Scytale Devnet Docs',
    logo: '/scytale-logo.svg',

    // Local Search Provider
    search: {
      provider: 'local',
      options: {
        locales: {
          id: { translations: { button: { buttonText: 'Cari dokumentasi' } } },
          zh: { translations: { button: { buttonText: '搜索文档' } } },
          ja: { translations: { button: { buttonText: 'ドキュメントを検索' } } },
          ko: { translations: { button: { buttonText: '문서 검색' } } },
          hi: { translations: { button: { buttonText: 'दस्तावेज़ खोजें' } } },
          ar: { translations: { button: { buttonText: 'بحث في التوثيق' } } }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ratufatma/scytale-docs' }
    ],

    footer: {
      message: 'Scytale Layer-1 Protocol | v0.3.0-devnet | BLAKE3 PoW Engine',
      copyright: 'Copyright © 2026 Scytale Network Core Contributors'
    }
  }
})
`
  },

  // ==========================================
  // 2. ENGLISH (ROOT /) DOCUMENTATION
  // ==========================================
  {
    id: 'en-index',
    filename: 'index.md',
    path: 'docs/index.md',
    title: 'Scytale Layer-1 Protocol Overview',
    category: 'Root / English',
    locale: 'en',
    description: 'High-throughput Layer-1 with 120-Byte Header, BLAKE3 PoW, Zero-Float Fee Market, and Fast Sync Wire Protocol.',
    rawContent: `---
layout: home

hero:
  name: "Scytale Protocol"
  text: "High-Throughput Layer-1 Blockchain"
  tagline: "120-Byte Canonical Header, CPU-Friendly BLAKE3 PoW, Deterministic UTXO State Engine & Autonomous DNS Seeding."
  actions:
    - theme: brand
      text: Quickstart Node
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "CPU-Friendly BLAKE3 PoW"
    details: "Ultra-fast cryptographic hashing optimized for SIMD parallelism. Eliminates specialized ASIC monopolies while maintaining robust distributed security."
  - icon: 🛡️
    title: "120-Byte Header & State Root"
    details: "Strict binary alignment binding version, prev_hash, merkle_root, and canonical utxo_root directly in every block header for fail-closed consensus."
  - icon: 🚀
    title: "Fast Sync Wire Protocol"
    details: "Chunked binary streaming (getsnap/snapshot) delivering up to 2,000 UTXOs per packet with dynamic memory reconstruction and 30s rate limits."
  - icon: ⚖️
    title: "Zero-Float Deterministic Fees"
    details: "Strict integer Satoshi math for transaction fee calculation. Eliminates floating-point consensus drift and rounding attack vectors completely."
  - icon: 🔑
    title: "Native Bech32 Addresses (scy1...)"
    details: "Ed25519 public key cryptographic signatures paired with human-friendly Bech32 encoding and a 6-character BCH error detection checksum."
  - icon: 🌐
    title: "Autonomous DNS Seeding (Port 53)"
    details: "Standalone DNS crawler with anti-Sybil protection (max 2 nodes per /24 subnet) and Fisher-Yates peer shuffling for zero-config bootstrapping."
---

# Scytale Layer-1 Protocol (v0.3.0-devnet)

Welcome to the official developer documentation for the **Scytale Layer-1 Blockchain Protocol**. Scytale is an open-source, deterministic UTXO-based decentralized ledger engineered in Rust for enterprise-grade throughput and lightweight validator operation.

## Network Topology & Standard Ports

| Service / Layer | Default Port | Transport | Purpose |
| :--- | :--- | :--- | :--- |
| **P2P Gossip & Wire** | \`9001\` | TCP | Block propagation, transaction relay, and \`getsnap\` fast sync |
| **HTTP RPC Gateway** | \`8332\` | HTTP / JSON | Node inspection, wallet balances, and mempool submission |
| **DNS Seeder Daemon** | \`53\` | UDP / TCP | Autonomous seed discovery with Fisher-Yates peer shuffling |

## Quick Command Matrix

\`\`\`bash
# 1. Start a local validator node via Docker Compose
docker compose up -d node-1

# 2. Inspect node status via HTTP RPC
curl -s http://127.0.0.1:8332/api/v1/status | jq .

# 3. Generate an Ed25519 wallet keypair
scytale-cli keygen --out wallet.json

# 4. Check Bech32 address balance
scytale-cli balance scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2
\`\`\`
`
  },
  {
    id: 'en-getting-started',
    filename: 'getting-started.md',
    path: 'docs/getting-started.md',
    title: 'Validator Node Quickstart',
    category: 'Root / English',
    locale: 'en',
    description: 'Run a Scytale validator node with 1 command via Docker Compose, connect via DNS seeder, and verify RPC status.',
    rawContent: `# Validator Node Quickstart (v0.3.0-devnet)

This guide walks you through launching a fully synchronized Scytale Layer-1 validator node on the **v0.3.0-devnet** using Docker Compose.

---

## 1. One-Command Node Execution

Launch the validator container using the production-ready \`docker-compose.yml\`:

\`\`\`bash
# Clone the repository
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# Boot the primary validator node in the background
docker compose up -d node-1
\`\`\`

### Example Docker Compose Configuration

\`\`\`yaml
version: '3.8'
services:
  node-1:
    image: ghcr.io/scytale-network/scytale-node:v0.3.0-devnet
    container_name: scytale-validator-1
    ports:
      - "9001:9001" # P2P Gossip Port
      - "8332:8332" # HTTP RPC Gateway
    volumes:
      - scytale_data:/data/redb
    environment:
      - SCYTALE_NETWORK=devnet
      - SCYTALE_DNS_SEED=seed.devnet.scytale.org
      - SCYTALE_LOG_LEVEL=info
    restart: unless-stopped

volumes:
  scytale_data:
\`\`\`

---

## 2. Autonomous Cold-Start Bootstrapping

Scytale validators require **zero static peer configuration**. When launched with an empty database:

1. **DNS Seeder Query:** The internal \`scytale-p2p\` crawler sends a DNS request to \`seed.devnet.scytale.org\` on port 53.
2. **Anti-Sybil Filtering:** The seeder returns randomized active peers (limited to max 2 nodes per \`/24\` IPv4 subnet).
3. **Fast Sync Handshake:** The node establishes connections on port 9001, requesting UTXO state chunks (\`getsnap\`).

To monitor live peer discovery logs:

\`\`\`bash
docker logs -f scytale-validator-1 | grep "p2p"
\`\`\`

---

## 3. Verifying Node Status via HTTP RPC

Verify consensus height, authenticated \`utxo_root\`, and connected peer counts:

\`\`\`bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
\`\`\`

### Sample RPC Response

\`\`\`json
{
  "network": "devnet",
  "protocol_version": 1,
  "block_height": 142890,
  "best_block_hash": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  "utxo_root": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "peer_count": 8,
  "mempool_size": 14,
  "uptime_seconds": 86400,
  "memory_rss_bytes": 18454912
}
\`\`\`
`
  },
  {
    id: 'en-cli-handbook',
    filename: 'cli-handbook.md',
    path: 'docs/cli-handbook.md',
    title: 'CLI Handbook & Transactions',
    category: 'Root / English',
    locale: 'en',
    description: 'Comprehensive guide to scytale-cli: Ed25519 key generation, Bech32 addresses, zero-float transactions, and CPU mining.',
    rawContent: `# Scytale CLI Handbook (v0.3.0-devnet)

\`scytale-cli\` is the official command-line interface for managing Ed25519 cryptographic keypairs, querying deterministic balances, building zero-float P2PKH transactions, and launching multi-threaded CPU miners.

---

## 1. Key Generation & Bech32 Addresses

Generate a fresh Ed25519 private key and derive its native Bech32 address (\`scy1...\`):

\`\`\`bash
# Generate keypair and save securely
scytale-cli keygen --out wallet.json

# Display native Bech32 address
scytale-cli address --key wallet.json
\`\`\`

**Output:**
\`\`\`
Address: scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2
Public Key: 4d6174746865772053637974616c652045643235353139204b657921
Format: Bech32 (HRP: scy, Checksum: BCH-6)
\`\`\`

---

## 2. Checking Balances & UTXO Proofs

Query confirmed balances and inspect active UTXO commitments:

\`\`\`bash
scytale-cli balance scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2
\`\`\`

**Output:**
\`\`\`
Confirmed Balance : 2,450.00000000 SCY (245,000,000,000 Satoshis)
Unconfirmed (Pool): 0.00000000 SCY
UTXO OutPoints    : 4 confirmed leaves
State Root Match  : VALID (matches header 0x44-0x63)
\`\`\`

---

## 3. Sending Transactions (P2PKH Zero-Float)

Transfer funds with strictly deterministic integer fees:

\`\`\`bash
scytale-cli send \\
  --from wallet.json \\
  --to scy1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4 \\
  --amount 10000000000 \\
  --fee 10000
\`\`\`

* **Zero-Float Precision:** Fees and outputs are calculated strictly as 64-bit unsigned integers (\`u64\`).
* **Broadcast Wire:** Submitted directly to \`http://127.0.0.1:8332/api/v1/tx/submit\`.

---

## 4. CPU Mining Control

Launch the integrated multi-threaded BLAKE3 Proof-of-Work miner:

\`\`\`bash
# Mine with 4 CPU threads to your Bech32 address
scytale-cli mine start \\
  --reward-to scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2 \\
  --threads 4
\`\`\`
`
  },
  {
    id: 'en-architecture',
    filename: 'architecture.md',
    path: 'docs/architecture.md',
    title: 'Core Protocol Architecture',
    category: 'Root / English',
    locale: 'en',
    description: 'Technical architecture deep-dive: 120-byte block header, lexicographical binary Merkle state tree, redb storage, and fast sync.',
    rawContent: `# Scytale Layer-1 Protocol Architecture (v0.3.0-devnet)

This document specifies the consensus architecture, cryptographic data structures, and wire layer protocols of the Scytale Layer-1 blockchain.

---

## 1. Authenticated State Transition Engine (Task 32)

Unlike legacy UTXO blockchains that decouple the coin state from block headers, Scytale commits the canonical **\`utxo_root\`** directly inside a strictly aligned **120-byte block header**.

### 120-Byte Block Header Structure

\`\`\`
Offset (Byte)   Size (Byte)   Field Name      Data Type    Description
-----------------------------------------------------------------------------------------
0x00 - 0x03     4 Bytes       version         uint32_le    Protocol consensus version (v1 = 0x01)
0x04 - 0x23     32 Bytes      prev_hash       [32]byte     BLAKE3 hash of previous 120B header
0x24 - 0x43     32 Bytes      merkle_root     [32]byte     Transaction Merkle tree root
0x44 - 0x63     32 Bytes      utxo_root       [32]byte     Authenticated UTXO state commitment root
0x64 - 0x6B     8 Bytes       timestamp       uint64_le    Unix epoch seconds (UTC)
0x6C - 0x6F     4 Bytes       nbits (target)  uint32_le    Compact PoW difficulty representation
0x70 - 0x77     8 Bytes       nonce           uint64_le    Miner nonce fulfilling difficulty target
-----------------------------------------------------------------------------------------
TOTAL SIZE : EXACTLY 120 BYTES (FIXED-LENGTH BINARY ALIGNMENT)
\`\`\`

### Lexicographical Binary Merkle Tree
* **State Leaf Preimages:** Leaves are evaluated with BLAKE3 hashes sorted strictly by lexicographical \`OutPoint\` order (\`txid\` 32-byte followed by \`vout\` 4-byte little-endian) stored in embedded \`redb\`.
* **Deterministic Verification:** Eliminates platform-specific floating point variances across x86_64 and ARM64 architectures.
* **Fail-Closed Consensus Rule:** Any state divergence immediately rejects the block with \`BlockError::InvalidUtxoRoot\`.

---

## 2. Fast Sync Wire Protocol (Task 33)

* **Chunked Streaming:** The state snapshot is divided into binary chunks (\`getsnap\` / \`snapshot\`) capped at $\\le 2,000$ entries per message.
* **Dynamic Stream Insertion:** Receiving nodes reconstruct the Merkle tree in memory, validating the result against the canonical \`utxo_root\` before persisting to disk.
* **Anti-DoS Protection:** Rate limits enforce a 30-second cooldown per connection on snapshot requests.

---

## 3. Autonomous DNS Seeder (Tasks 35, 36 & 38)

* **Standalone Daemon:** Runs on port 53 (UDP/TCP) using \`miekg/dns\`.
* **Anti-Sybil Guard:** Returns a maximum of 2 active nodes per IPv4 \`/24\` subnet.
* **Fisher-Yates Shuffle:** Randomizes active peer addresses to evenly distribute initial validator sync workloads.
`
  },
  {
    id: 'en-release-v030',
    filename: 'release-v030.md',
    path: 'docs/release-v030.md',
    title: 'Release Notes v0.3.0-devnet',
    category: 'Root / English',
    locale: 'en',
    description: 'Completion of Milestone Phase 3: Tasks 32 to 38, zero-float hardening, and memory optimization to 12-24 MiB RAM.',
    rawContent: `# Scytale Release Notes: v0.3.0-devnet

Scytale Layer-1 Protocol version **v0.3.0-devnet** concludes **Phase 3 (Core Protocol, Programmable Consensus & Network Autonomy)**.

### Key Milestones Achieved

1. **Task 32:** Authenticated State Transition Engine with 120-byte block header and canonical \`utxo_root\`.
2. **Task 33:** Fast sync chunked wire protocol (\`getsnap\` / \`snapshot\`) handling up to 2,000 UTXOs per packet.
3. **Task 34:** System hardening, deadlock elimination on \`submit_transaction\`, and validator RAM footprint reduced to **12–24 MiB**.
4. **Tasks 35, 36 & 38:** Standalone DNS seeder on port 53 with anti-Sybil subnet partitioning and Fisher-Yates shuffling.
`
  },

  // ==========================================
  // 3. BAHASA INDONESIA (/id/)
  // ==========================================
  {
    id: 'id-index',
    filename: 'index.md',
    path: 'docs/id/index.md',
    title: 'Ringkasan Protokol Scytale Layer-1',
    category: 'Bahasa Indonesia (/id/)',
    locale: 'id',
    description: 'Blockchain Layer-1 berperforma tinggi dengan Header 120B, BLAKE3 PoW, Zero-Float Fee Market, dan Fast Sync Wire Protocol.',
    rawContent: `---
layout: home

hero:
  name: "Protokol Scytale"
  text: "Blockchain Layer-1 Berkecepatan Tinggi"
  tagline: "Header Kanonikal 120-Byte, BLAKE3 PoW Ramah CPU, State Engine UTXO Deterministik & DNS Seeding Otonom."
  actions:
    - theme: brand
      text: Mulai Cepat Node
      link: /id/getting-started
    - theme: alt
      text: Repositori GitHub
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "Proof-of-Work BLAKE3 Ramah CPU"
    details: "Fungsi hash kriptografis ultra-cepat dengan optimasi paralel SIMD. Mencegah monopoli ASIC terspesialisasi sambil mempertahankan keamanan terdistribusi tinggi."
  - icon: 🛡️
    title: "Header 120-Byte & UTXO State Root"
    details: "Struktur biner tetap yang mengikat version, prev_hash, merkle_root, dan utxo_root kanonikal secara langsung di header untuk konsensus fail-closed."
  - icon: 🚀
    title: "Protokol Transpor Fast Sync"
    details: "Streaming biner terfragmentasi (getsnap/snapshot) berkapasitas hingga 2.000 UTXO per paket dengan rekonstruksi dinamis dan rate-limiter 30 detik."
  - icon: ⚖️
    title: "Zero-Float Fee Market"
    details: "Perhitungan biaya transaksi berbasis integer mutlak tanpa angka desimal floating-point. Menghilangkan risiko perpecahan konsensus dan eksploitasi pembulatan."
  - icon: 🔑
    title: "Alamat Asli Bech32 (scy1...)"
    details: "Tanda tangan kriptografi Ed25519 dipadukan dengan format alamat Bech32 yang mudah dibaca manusia serta checksum pendeteksi galat BCH 6 karakter."
  - icon: 🌐
    title: "Autonomous DNS Seeding (Port 53)"
    details: "Daemon DNS mandiri dengan proteksi anti-Sybil (maksimal 2 node per subnet /24) dan pengacakan Fisher-Yates untuk bootstrapping tanpa konfigurasi manual."
---

# Protokol Scytale Layer-1 (v0.3.0-devnet)

Selamat datang di dokumentasi resmi pengembang **Protokol Blockchain Scytale Layer-1**. Scytale adalah buku besar terdesentralisasi berbasis UTXO deterministik yang dibangun dengan bahasa Rust untuk validator berkinerja tinggi dan konsumsi memori hemat.

## Port Standar & Jaringan Devnet

| Layanan / Modul | Port Default | Protokol | Kegunaan |
| :--- | :--- | :--- | :--- |
| **P2P Wire & Gossip** | \`9001\` | TCP | Propagasi blok, relay transaksi, dan sinkronisasi cepat \`getsnap\` |
| **HTTP RPC Gateway** | \`8332\` | HTTP / JSON | Inspeksi status node, saldo dompet, dan submission mempool |
| **DNS Seeder Daemon** | \`53\` | UDP / TCP | Penemuan peer otonom tanpa hardcoded IP dengan algoritma Fisher-Yates |
`
  },
  {
    id: 'id-getting-started',
    filename: 'getting-started.md',
    path: 'docs/id/getting-started.md',
    title: 'Panduan Cepat Node Validator',
    category: 'Bahasa Indonesia (/id/)',
    locale: 'id',
    description: 'Menjalankan node validator Scytale dengan 1 perintah Docker Compose, terhubung via DNS seeder, dan verifikasi RPC.',
    rawContent: `# Panduan Mulai Cepat Node Validator (v0.3.0-devnet)

Panduan ini menuntun Anda untuk menjalankan node validator blockchain Scytale Layer-1 yang tersinkronisasi penuh pada jaringan **v0.3.0-devnet** menggunakan Docker Compose.

---

## 1. Menjalankan Node 1 Perintah

Jalankan container validator menggunakan berkas \`docker-compose.yml\`:

\`\`\`bash
# Klon repositori Scytale
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# Jalankan node validator di latar belakang
docker compose up -d node-1
\`\`\`

---

## 2. Bootstrapping Otonom (Cold-Start Tanpa Peer Statis)

Node Scytale **tidak memerlukan daftar IP statis**. Saat pertama kali menyala:

1. Modul \`scytale-p2p\` melakukan kueri ke server DNS seeder \`seed.devnet.scytale.org\` pada port 53.
2. DNS seeder memberikan daftar peer aktif yang telah diacak dengan Fisher-Yates dan difilter anti-Sybil (maksimal 2 node per subnet \`/24\`).
3. Node validator otomatis meminta snapshot status koin (\`getsnap\`) pada port 9001.

Pantau log pencarian peer secara real-time:

\`\`\`bash
docker logs -f scytale-validator-1 | grep "p2p"
\`\`\`

---

## 3. Verifikasi Status Node via cURL RPC

Periksa tinggi blok, status \`utxo_root\`, dan jumlah peer terhubung:

\`\`\`bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
\`\`\`
`
  },
  {
    id: 'id-cli-handbook',
    filename: 'cli-handbook.md',
    path: 'docs/id/cli-handbook.md',
    title: 'CLI Handbook & Transaksi',
    category: 'Bahasa Indonesia (/id/)',
    locale: 'id',
    description: 'Panduan lengkap scytale-cli: pembuatan kunci Ed25519, alamat Bech32, transfer dana zero-float, dan penambang CPU.',
    rawContent: `# Panduan Lengkap scytale-cli (v0.3.0-devnet)

\`scytale-cli\` adalah utilitas baris perintah resmi untuk berinteraksi dengan blockchain Scytale: membuat kunci Ed25519, memeriksa saldo, mengirim transaksi P2PKH deterministik, dan menambang blok PoW.

---

## 1. Pembuatan Kunci & Alamat Bech32

\`\`\`bash
# Membuat keypair Ed25519 baru
scytale-cli keygen --out wallet.json

# Menampilkan alamat Bech32 (scy1...)
scytale-cli address --key wallet.json
\`\`\`

---

## 2. Memeriksa Saldo & Status UTXO

\`\`\`bash
scytale-cli balance scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2
\`\`\`

---

## 3. Mengirim Transaksi P2PKH

\`\`\`bash
scytale-cli send \\
  --from wallet.json \\
  --to scy1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4 \\
  --amount 10000000000 \\
  --fee 10000
\`\`\`

---

## 4. Menjalankan Penambang CPU BLAKE3

\`\`\`bash
scytale-cli mine start \\
  --reward-to scy1qf8g2c0d5h7k3j9v4m6x1a2e8p5t0y4w9s2 \\
  --threads 4
\`\`\`
`
  },

  // ==========================================
  // 4. CHINESE SIMPLIFIED (/zh/)
  // ==========================================
  {
    id: 'zh-index',
    filename: 'index.md',
    path: 'docs/zh/index.md',
    title: 'Scytale Layer-1 协议概述',
    category: '简体中文 (/zh/)',
    locale: 'zh',
    description: '具有120字节确定性区块头、BLAKE3 CPU友好工作量证明、快速同步协议的高吞吐Layer-1区块链。',
    rawContent: `---
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
`
  },
  {
    id: 'zh-getting-started',
    filename: 'getting-started.md',
    path: 'docs/zh/getting-started.md',
    title: '验证节点快速入门',
    category: '简体中文 (/zh/)',
    locale: 'zh',
    description: '通过 Docker Compose 一键启动 Scytale 验证节点，利用自主 DNS 种子节点发现对等节点。',
    rawContent: `# 验证节点快速入门 (v0.3.0-devnet)

本指南介绍如何使用 Docker Compose 一键运行 Scytale 验证节点并连接到 **v0.3.0-devnet**。

---

## 1. 单命令启动容器

\`\`\`bash
# 克隆代码仓库
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# 启动验证节点容器
docker compose up -d node-1
\`\`\`

---

## 2. 检查节点 RPC 状态

\`\`\`bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
\`\`\`
`
  },

  // ==========================================
  // 5. JAPANESE (/ja/)
  // ==========================================
  {
    id: 'ja-index',
    filename: 'index.md',
    path: 'docs/ja/index.md',
    title: 'Scytale Layer-1 プロトコル概要',
    category: '日本語 (/ja/)',
    locale: 'ja',
    description: '120Bカノニカルブロックヘッダー、BLAKE3 PoW、決定論的UTXOエンジンを備えた高スループットLayer-1ブロックチェーン。',
    rawContent: `---
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
`
  },
  {
    id: 'ja-getting-started',
    filename: 'getting-started.md',
    path: 'docs/ja/getting-started.md',
    title: 'バリデータノード クイックスタート',
    category: '日本語 (/ja/)',
    locale: 'ja',
    description: 'Docker Compose による1コマンドでのノード起動、DNSシーダー経由の自動ピア接続とRPC検証。',
    rawContent: `# バリデータノード クイックスタート (v0.3.0-devnet)

Docker Compose を使用して **v0.3.0-devnet** 検証ノードを即座に立ち上げる手順です。

---

## 1. 1コマンドでのノード起動

\`\`\`bash
# リポジトリのクローン
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# バリデータコンテナをバックグラウンドで起動
docker compose up -d node-1
\`\`\`

---

## 2. HTTP RPC ステータスの確認

\`\`\`bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
\`\`\`
`
  },

  // ==========================================
  // 6. KOREAN (/ko/)
  // ==========================================
  {
    id: 'ko-index',
    filename: 'index.md',
    path: 'docs/ko/index.md',
    title: 'Scytale Layer-1 프로토콜 개요',
    category: '한국어 (/ko/)',
    locale: 'ko',
    description: '120B 고정 블록 헤더, BLAKE3 PoW, 결정론적 UTXO 상태 엔진을 탑재한 고성능 Layer-1 블록체인.',
    rawContent: `---
layout: home

hero:
  name: "Scytale 프로토콜"
  text: "고성능 Layer-1 블록체인"
  tagline: "120바이트 정규 블록 헤더, CPU 친화적 BLAKE3 PoW, 결정론적 UTXO 상태 루트 및 자율 DNS 시딩."
  actions:
    - theme: brand
      text: 노드 빠른 시작
      link: /ko/getting-started
    - theme: alt
      text: GitHub 저장소
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "CPU 친화적 BLAKE3 PoW"
    details: "SIMD 병렬 처리에 최적화된 고속 해시 알고리즘으로 ASIC 독점을 방지하고 분산형 탈중앙성을 확보합니다."
  - icon: 🛡️
    title: "120B 표준 헤더 및 상태 루트"
    details: "버전, 이전 해시, 머클 루트 및 utxo_root를 120바이트 고정 바이너리로 바인딩하여 무결성을 강제합니다."
  - icon: 🚀
    title: "Fast Sync 와이어 프로토콜"
    details: "패킷당 최대 2,000개의 UTXO를 청크 단위로 고속 스트리밍 전송하며 동적 메모리 트리 재구성을 지원합니다."
  - icon: ⚖️
    title: "부동소수점 없는 결정론적 수수료"
    details: "정수 사토시 단위만을 사용하여 부동소수점 연산 불일치로 인한 합의 분기 취약점을 원천 차단합니다."
  - icon: 🔑
    title: "기본 Bech32 주소 (scy1...)"
    details: "Ed25519 공개키 서명 및 오류 감지용 6글자 BCH 체크섬을 갖춘 가독성 높은 Bech32 주소 체계."
  - icon: 🌐
    title: "자율형 DNS 시더 (포트 53)"
    details: "서브넷(/24)당 최대 2개 노드 제한 및 Fisher-Yates 무작위 셔플을 제공하는 독립형 DNS 피어 검색 엔진."
---

# Scytale Layer-1 프로토콜 (v0.3.0-devnet)

Scytale Layer-1 블록체인 프로토콜 공식 개발자 문서입니다.
`
  },
  {
    id: 'ko-getting-started',
    filename: 'getting-started.md',
    path: 'docs/ko/getting-started.md',
    title: '검증 노드 빠른 시작',
    category: '한국어 (/ko/)',
    locale: 'ko',
    description: 'Docker Compose를 활용한 1개 명령어 노드 실행, DNS 부트스트래핑 및 RPC 상태 점검.',
    rawContent: `# 검증 노드 빠른 시작 (v0.3.0-devnet)

Docker Compose로 **v0.3.0-devnet** 검증 노드를 신속하게 배포하고 실행하는 방법입니다.

---

## 1. 단일 명령어로 노드 시작

\`\`\`bash
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale
docker compose up -d node-1
\`\`\`

---

## 2. 노드 RPC 상태 검증

\`\`\`bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
\`\`\`
`
  },

  // ==========================================
  // 7. HINDI (/hi/)
  // ==========================================
  {
    id: 'hi-index',
    filename: 'index.md',
    path: 'docs/hi/index.md',
    title: 'Scytale Layer-1 प्रोटोकॉल अवलोकन',
    category: 'हिन्दी (/hi/)',
    locale: 'hi',
    description: '120B कैनोनिकल हेडर, BLAKE3 PoW, और डिटर्मिनिस्टिक UTXO स्टेट इंजन के साथ उच्च-थ्रूपुट लेयर-1 ब्लॉकचेन।',
    rawContent: `---
layout: home

hero:
  name: "Scytale प्रोटोकॉल"
  text: "उच्च-थ्रूपुट Layer-1 ब्लॉकचेन"
  tagline: "120-बाइट कैनोनिकल हेडर, सीपीयू-अनुकूल BLAKE3 PoW, डिटर्मिनिस्टिक UTXO स्टेट रूट और स्वायत्त DNS सीडिंग।"
  actions:
    - theme: brand
      text: वैलिडेटर शुरू करें
      link: /hi/getting-started
    - theme: alt
      text: GitHub रिपॉजिटरी
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "सीपीयू-अनुकूल BLAKE3 PoW"
    details: "SIMD समानांतर गणना के लिए अनुकूलित अल्ट्रा-फास्ट हैशिंग, जो ASIC एकाधिकार को समाप्त करता है।"
  - icon: 🛡️
    title: "120-बाइट हेडर व स्टेट रूट"
    details: "ब्लॉक हेडर में utxo_root को सीधे एकीकृत करके पूर्णतः सुरक्षित और सुसंगत सहमति प्रदान करता है।"
  - icon: 🚀
    title: "फास्ट सिंक वायर प्रोटोकॉल"
    details: "बाइनरी चंक्ड स्ट्रीमिंग जो प्रति पैकेट 2,000 UTXO तक ट्रांसफर करने में सक्षम है।"
  - icon: ⚖️
    title: "ज़ीरो-फ्लोट शुल्क मॉडल"
    details: "फ्लोटिंग-पॉइंट गणना से होने वाले विचलन को रोकने के लिए केवल सटीक पूर्णांक सातोशी का उपयोग।"
  - icon: 🔑
    title: "मूल Bech32 पता (scy1...)"
    details: "Ed25519 सार्वजनिक क्रिप्टोग्राफिक कुंजियों के साथ त्रुटि का पता लगाने वाला 6-वर्ण BCH चेकसम।"
  - icon: 🌐
    title: "स्वायत्त DNS सीडर (पोर्ट 53)"
    details: "एंटी-सिबिल सुरक्षा और फिशर-येट्स रैंडमाइजेशन के साथ स्वतंत्र पीयर डिस्कवरी प्रणाली।"
---

# Scytale Layer-1 प्रोटोकॉल (v0.3.0-devnet)

Scytale Layer-1 ब्लॉकचेन प्रोटोकॉल के आधिकारिक डेवलपर दस्तावेज़ीकरण में आपका स्वागत है।
`
  },
  {
    id: 'hi-getting-started',
    filename: 'getting-started.md',
    path: 'docs/hi/getting-started.md',
    title: 'वैलिडेटर नोड त्वरित शुरुआत',
    category: 'हिन्दी (/hi/)',
    locale: 'hi',
    description: 'Docker Compose के माध्यम से 1 कमांड में Scytale नोड चलाएं और RPC स्थिति की पुष्टि करें।',
    rawContent: `# वैलिडेटर नोड त्वरित शुरुआत (v0.3.0-devnet)

Docker Compose के साथ **v0.3.0-devnet** पर वैलिडेटर नोड चलाने की संक्षिप्त मार्गदर्शिका।

---

## 1. एक कमांड में नोड चालू करें

\`\`\`bash
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale
docker compose up -d node-1
\`\`\`

---

## 2. नोड स्थिति की जाँच

\`\`\`bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
\`\`\`
`
  },

  // ==========================================
  // 8. ARABIC (/ar/ with RTL support)
  // ==========================================
  {
    id: 'ar-index',
    filename: 'index.md',
    path: 'docs/ar/index.md',
    title: 'نظرة عامة على بروتوكول Scytale Layer-1',
    category: 'العربية (/ar/ RTL)',
    locale: 'ar',
    description: 'بلوكشين عالي الإنتاجية بترويسة 120 بايت وإثبات عمل BLAKE3 الصديق للمعالجات وجذر UTXO الحتمي.',
    rawContent: `---
layout: home

hero:
  name: "بروتوكول Scytale"
  text: "بلوكشين الطبقة الأولى عالي الإنتاجية"
  tagline: "ترويسة قياسية بحجم 120 بايت، إثبات عمل BLAKE3، محرك حالة UTXO الحتمي وبذور DNS ذاتية التشغيل."
  actions:
    - theme: brand
      text: البدء السريع للعقدة
      link: /ar/getting-started
    - theme: alt
      text: مستودع GitHub
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "إثبات عمل BLAKE3 صديق للمعالجات"
    details: "تجزئة مشفرة فائقة السرعة محسّنة لتوازي SIMD، تمنع احتكار أجهزة ASIC وتضمن الأمان اللامركزي."
  - icon: 🛡️
    title: "ترويسة 120 بايت وجذر الحالة"
    details: "محاذاة ثنائية دقيقة تربط الإصدار وجذر ميركل مع utxo_root القانوني مباشرة داخل كل ترويسة كتلة."
  - icon: 🚀
    title: "بروتوكول المزامنة السريعة Fast Sync"
    details: "بث ثنائي مجزأ ينقل حتى 2000 مخرج UTXO لكل حزمة مع إعادة بناء ديناميكي للشجرة في الذاكرة."
  - icon: ⚖️
    title: "سوق رسوم خالي من الفواصل العشرية"
    details: "حسابات دقيقة قائمة على أعداد صحيحة من الساتوشي تقضي تماماً على انحرافات حسابات الفواصل العائمة."
  - icon: 🔑
    title: "عناوين Bech32 الأصلية (scy1...)"
    details: "توقيعات تشفير Ed25519 مقترنة بتنسيق Bech32 مع مجموع تدقيق BCH مكون من 6 أحرف لاكتشاف الأخطاء."
  - icon: 🌐
    title: "بذور DNS ذاتية الإدارة (منفذ 53)"
    details: "نظام استكشاف أقران مستقل مزود بحماية ضد هجمات Sybil وخوارزمية Fisher-Yates لتوزيع الأحمال."
---

# بروتوكول Scytale Layer-1 (v0.3.0-devnet)

مرحباً بكم في التوثيق الرسمي لمطوري **بروتوكول بلوكشين Scytale Layer-1**. Scytale هو دفتر أستاذ لامركزي فائق السرعة مبني بلغة Rust.
`
  },
  {
    id: 'ar-getting-started',
    filename: 'getting-started.md',
    path: 'docs/ar/getting-started.md',
    title: 'دليل البدء السريع لعقدة التحقق',
    category: 'العربية (/ar/ RTL)',
    locale: 'ar',
    description: 'تشغيل عقدة تحقق Scytale بأمر واحد عبر Docker Compose والمزامنة التلقائية والتحقق من RPC.',
    rawContent: `# دليل البدء السريع لعقدة التحقق (v0.3.0-devnet)

يوضح هذا الدليل كيفية تشغيل عقدة تحقق كاملة ومتزامنة على شبكة **v0.3.0-devnet** باستخدام Docker Compose.

---

## 1. تشغيل العقدة بأمر واحد

\`\`\`bash
# استنساخ المستودع
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale

# تشغيل العقدة في الخلفية
docker compose up -d node-1
\`\`\`

---

## 2. التحقق من حالة العقدة عبر cURL RPC

\`\`\`bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
\`\`\`
`
  }
];
