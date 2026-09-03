import React from 'react';
import { DOC_FILES } from '../data/docsContent';
import { LOCALES } from '../data/locales';
import { BookOpen, Rocket, Terminal, Layers, Settings, FileCode, CheckCircle2, Sparkles, Sun, Moon, Globe } from 'lucide-react';

interface SidebarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  locale: string;
  onSelectLocale: (locale: string) => void;
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onOpenRawModal: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  theme,
  onToggleTheme,
  locale,
  onSelectLocale,
  activeDocId,
  onSelectDoc,
  onOpenRawModal
}) => {
  const isDark = theme === 'dark';
  const isRTL = locale === 'ar';

  // Build locale-specific navigation groups
  const getGroups = () => {
    switch (locale) {
      case 'id':
        return [
          {
            title: 'Pengenalan & Rilis',
            items: [
              { id: 'id-index', title: 'Ringkasan Protokol', path: 'docs/id/index.md', icon: BookOpen },
              { id: 'en-release-v030', title: 'Release v0.3.0-devnet', path: 'docs/release-v030.md', icon: Sparkles },
              { id: 'id-getting-started', title: 'Mulai Cepat Node (Docker)', path: 'docs/id/getting-started.md', icon: Rocket }
            ]
          },
          {
            title: 'Panduan Validator & CLI',
            items: [
              { id: 'id-cli-handbook', title: 'CLI Handbook & Transaksi', path: 'docs/id/cli-handbook.md', icon: Terminal },
              { id: 'id-getting-started', title: 'Verifikasi RPC Status', path: 'docs/id/getting-started.md', icon: CheckCircle2 }
            ]
          },
          {
            title: 'Arsitektur Protokol',
            items: [
              { id: 'en-architecture', title: 'Spesifikasi Arsitektur', path: 'docs/architecture.md', icon: Layers }
            ]
          },
          {
            title: 'Konfigurasi VitePress',
            items: [
              { id: 'config', title: 'docs/.vitepress/config.mts', path: 'docs/.vitepress/config.mts', icon: Settings }
            ]
          }
        ];

      case 'zh':
        return [
          {
            title: '快速开始 (/zh/)',
            items: [
              { id: 'zh-index', title: '协议概述 (Overview)', path: 'docs/zh/index.md', icon: BookOpen },
              { id: 'zh-getting-started', title: '验证节点快速入门', path: 'docs/zh/getting-started.md', icon: Rocket }
            ]
          },
          {
            title: '核心规范与 CLI',
            items: [
              { id: 'en-cli-handbook', title: 'CLI 交互手册 (EN)', path: 'docs/cli-handbook.md', icon: Terminal },
              { id: 'en-architecture', title: '120B 区块头与核心架构 (EN)', path: 'docs/architecture.md', icon: Layers },
              { id: 'en-release-v030', title: 'v0.3.0 发行说明', path: 'docs/release-v030.md', icon: Sparkles }
            ]
          },
          {
            title: '配置文件',
            items: [
              { id: 'config', title: 'VitePress 7语言多语言配置', path: 'docs/.vitepress/config.mts', icon: Settings }
            ]
          }
        ];

      case 'ja':
        return [
          {
            title: 'はじめに (/ja/)',
            items: [
              { id: 'ja-index', title: 'プロトコル概要', path: 'docs/ja/index.md', icon: BookOpen },
              { id: 'ja-getting-started', title: 'バリデータ起動ガイド', path: 'docs/ja/getting-started.md', icon: Rocket }
            ]
          },
          {
            title: '仕様 & CLI',
            items: [
              { id: 'en-cli-handbook', title: 'CLI ハンドブック (EN)', path: 'docs/cli-handbook.md', icon: Terminal },
              { id: 'en-architecture', title: '120B ヘッダー & アーキテクチャ', path: 'docs/architecture.md', icon: Layers },
              { id: 'en-release-v030', title: 'v0.3.0 リリースノート', path: 'docs/release-v030.md', icon: Sparkles }
            ]
          },
          {
            title: 'VitePress 設定',
            items: [
              { id: 'config', title: 'docs/.vitepress/config.mts', path: 'docs/.vitepress/config.mts', icon: Settings }
            ]
          }
        ];

      case 'ko':
        return [
          {
            title: '시작하기 (/ko/)',
            items: [
              { id: 'ko-index', title: '프로토콜 개요', path: 'docs/ko/index.md', icon: BookOpen },
              { id: 'ko-getting-started', title: '검증 노드 빠른 시작', path: 'docs/ko/getting-started.md', icon: Rocket }
            ]
          },
          {
            title: '사양 및 CLI',
            items: [
              { id: 'en-cli-handbook', title: 'CLI 핸드북 (EN)', path: 'docs/cli-handbook.md', icon: Terminal },
              { id: 'en-architecture', title: '120B 블록 헤더 아키텍처', path: 'docs/architecture.md', icon: Layers },
              { id: 'en-release-v030', title: 'v0.3.0 릴리스 노트', path: 'docs/release-v030.md', icon: Sparkles }
            ]
          },
          {
            title: '설정 파일',
            items: [
              { id: 'config', title: 'docs/.vitepress/config.mts', path: 'docs/.vitepress/config.mts', icon: Settings }
            ]
          }
        ];

      case 'hi':
        return [
          {
            title: 'परिचय (/hi/)',
            items: [
              { id: 'hi-index', title: 'प्रोटोकॉल अवलोकन', path: 'docs/hi/index.md', icon: BookOpen },
              { id: 'hi-getting-started', title: 'वैलिडेटर नोड शुरुआत', path: 'docs/hi/getting-started.md', icon: Rocket }
            ]
          },
          {
            title: 'विनिर्देश व CLI',
            items: [
              { id: 'en-cli-handbook', title: 'CLI गाइड (EN)', path: 'docs/cli-handbook.md', icon: Terminal },
              { id: 'en-architecture', title: '120B हेडर आर्किटेक्चर', path: 'docs/architecture.md', icon: Layers },
              { id: 'en-release-v030', title: 'v0.3.0 रिलीज़ नोट्स', path: 'docs/release-v030.md', icon: Sparkles }
            ]
          },
          {
            title: 'कॉन्फ़िगरेशन',
            items: [
              { id: 'config', title: 'docs/.vitepress/config.mts', path: 'docs/.vitepress/config.mts', icon: Settings }
            ]
          }
        ];

      case 'ar':
        return [
          {
            title: 'المقدمة (/ar/ RTL)',
            items: [
              { id: 'ar-index', title: 'نظرة عامة على البروتوكول', path: 'docs/ar/index.md', icon: BookOpen },
              { id: 'ar-getting-started', title: 'دليل البدء السريع لعقدة التحقق', path: 'docs/ar/getting-started.md', icon: Rocket }
            ]
          },
          {
            title: 'المعمارية وأدوات الأوامر',
            items: [
              { id: 'en-cli-handbook', title: 'دليل الأوامر CLI Handbook (EN)', path: 'docs/cli-handbook.md', icon: Terminal },
              { id: 'en-architecture', title: 'معمارية الترويسة 120 بايت وجذر UTXO', path: 'docs/architecture.md', icon: Layers },
              { id: 'en-release-v030', title: 'ملاحظات الإصدار v0.3.0', path: 'docs/release-v030.md', icon: Sparkles }
            ]
          },
          {
            title: 'إعدادات VitePress',
            items: [
              { id: 'config', title: 'docs/.vitepress/config.mts (RTL)', path: 'docs/.vitepress/config.mts', icon: Settings }
            ]
          }
        ];

      case 'en':
      default:
        return [
          {
            title: 'Introduction & Releases',
            items: [
              { id: 'en-index', title: 'Protocol Overview', path: 'docs/index.md', icon: BookOpen },
              { id: 'en-release-v030', title: 'Release v0.3.0-devnet', path: 'docs/release-v030.md', icon: Sparkles },
              { id: 'en-getting-started', title: 'Quickstart Node (Docker)', path: 'docs/getting-started.md', icon: Rocket }
            ]
          },
          {
            title: 'Validator & CLI',
            items: [
              { id: 'en-cli-handbook', title: 'CLI Handbook & Transactions', path: 'docs/cli-handbook.md', icon: Terminal },
              { id: 'en-getting-started', title: 'Node RPC Verification', path: 'docs/getting-started.md', icon: CheckCircle2 }
            ]
          },
          {
            title: 'Protocol Architecture',
            items: [
              { id: 'en-architecture', title: '120B Header & Fast Sync', path: 'docs/architecture.md', icon: Layers }
            ]
          },
          {
            title: 'VitePress Structure',
            items: [
              { id: 'config', title: 'docs/.vitepress/config.mts', path: 'docs/.vitepress/config.mts', icon: Settings }
            ]
          }
        ];
    }
  };

  const groups = getGroups();

  return (
    <aside
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`w-64 shrink-0 border-r p-4 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16 space-y-6 transition-colors ${
        isDark
          ? 'border-[#1e293b] bg-[#0b0f19] text-slate-200'
          : 'border-slate-200 bg-slate-50 text-slate-800'
      }`}
    >
      {/* Network Status Badge */}
      <div
        className={`px-3 py-2 rounded-md border text-xs font-mono flex items-center justify-between ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 text-slate-300'
            : 'bg-white border-slate-200 text-slate-700'
        }`}
      >
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
          DEVNET v0.3.0
        </span>
        <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ONLINE
        </span>
      </div>

      {/* Navigation Sections */}
      {groups.map((grp, idx) => (
        <div key={idx} className="space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2 px-2 tracking-wider">
            {grp.title}
          </div>
          <div className="space-y-0.5">
            {grp.items.map((item, itemIdx) => {
              const Icon = item.icon;
              const isActive = activeDocId === item.id;
              return (
                <button
                  key={itemIdx}
                  onClick={() => onSelectDoc(item.id)}
                  className={`w-full text-left px-3 py-2 text-xs transition-all flex items-center gap-2.5 rounded-md ${
                    isActive
                      ? isDark
                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 font-semibold'
                        : 'bg-cyan-50 text-cyan-800 border-l-2 border-cyan-600 font-semibold'
                      : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-l-2 border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border-l-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Exporter Card & Theme Info */}
      <div className={`pt-4 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className={`p-3 rounded-md border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs font-semibold mb-1 flex items-center gap-1.5 text-cyan-400">
            <FileCode className="w-3.5 h-3.5" />
            <span>7-Locale VitePress Suite</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-2.5 leading-relaxed">
            All 18 markdown & .mts configuration files are ready to copy directly into your repository.
          </p>
          <button
            onClick={() => onOpenRawModal(activeDocId)}
            className={`w-full py-1.5 px-2 rounded text-xs font-medium transition-colors text-center border block ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            Open File Exporter
          </button>
        </div>

        {/* Quick Theme Switch in Sidebar */}
        <button
          onClick={onToggleTheme}
          className={`w-full px-3 py-2 rounded-md border flex items-center justify-between text-xs transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="flex items-center gap-1.5">
            {isDark ? <Moon className="w-3.5 h-3.5 text-cyan-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            <span>{isDark ? 'Dark Slate Mode' : 'Light Slate Mode'}</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
            Toggle
          </span>
        </button>
      </div>
    </aside>
  );
};
