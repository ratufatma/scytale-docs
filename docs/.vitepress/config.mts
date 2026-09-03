import { defineConfig } from 'vitepress'

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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico' }],
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
    logo: '/logo.svg',

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
