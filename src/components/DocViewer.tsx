import React, { useState } from 'react';
import { DocFile } from '../data/docsContent';
import { LOCALES } from '../data/locales';
import {
  Copy,
  Check,
  Terminal,
  Layers,
  Activity,
  FileCode,
  Shield,
  Zap,
  Compass,
  Cpu,
  ExternalLink,
  Sparkles,
  Globe,
  Radio,
  Lock,
  Boxes,
  Database,
  Key,
  Network
} from 'lucide-react';
import { InteractiveCli } from './InteractiveCli';
import { HeaderByteInspector } from './HeaderByteInspector';
import { NodeStatusInspector } from './NodeStatusInspector';

interface DocViewerProps {
  theme: 'dark' | 'light';
  locale: string;
  file: DocFile;
  onNavigate: (fileId: string) => void;
  onOpenRawModal: (fileId: string) => void;
}

export const DocViewer: React.FC<DocViewerProps> = ({
  theme,
  locale,
  file,
  onNavigate,
  onOpenRawModal
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'inspector' | 'cli' | 'status'>('inspector');

  const isDark = theme === 'dark';
  const isRTL = locale === 'ar' || file.locale === 'ar';
  const currentLocaleConfig = LOCALES[locale] || LOCALES.en;

  const handleCopySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isHomePage = file.id.endsWith('index');
  const isGettingStarted = file.id.includes('getting-started');
  const isCliHandbook = file.id.includes('cli-handbook');
  const isArchitecture = file.id.includes('architecture');
  const isReleaseNotes = file.id.includes('release-v030');
  const isConfig = file.id === 'config';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`max-w-4xl mx-auto px-4 sm:px-8 py-8 transition-colors ${
        isDark ? 'text-slate-100' : 'text-slate-900'
      }`}
    >
      {/* File Breadcrumb & Action Banner */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b text-xs ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 font-mono text-slate-400">
          <span>docs</span>
          <span>/</span>
          {file.locale !== 'en' && (
            <>
              <span className="text-cyan-400 font-semibold">{file.locale}</span>
              <span>/</span>
            </>
          )}
          <span className="text-cyan-400 font-semibold">{file.filename}</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-sans border ${
              isDark
                ? 'bg-slate-900 text-slate-300 border-slate-800'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {file.category}
          </span>
          {isRTL && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
              RTL Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenRawModal(file.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>Raw Markdown (.md)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: HOME PAGE (Hero + 6-Feature Grid + Interactive Modules)
         ========================================================================= */}
      {isHomePage && (
        <div className="space-y-12">
          {/* Hero Section */}
          <div
            className={`text-center py-12 px-6 rounded-xl border relative overflow-hidden transition-all ${
              isDark
                ? 'bg-gradient-to-b from-[#0f172a] to-[#0b0f19] border-slate-800'
                : 'bg-gradient-to-b from-white to-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            {/* Geometric ring accents */}
            <div className="absolute -top-24 -right-24 w-64 h-64 border border-cyan-500/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-52 h-52 border border-emerald-500/10 rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Scytale Layer-1 Devnet (v0.3.0-devnet)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {locale === 'id'
                ? 'Blockchain Layer-1 Berkecepatan Tinggi'
                : locale === 'zh'
                ? '高性能 Layer-1 区块链协议'
                : locale === 'ja'
                ? '次世代 高スループット Layer-1'
                : locale === 'ko'
                ? '고성능 결정론적 Layer-1 블록체인'
                : locale === 'hi'
                ? 'उच्च-थ्रूपुट Layer-1 ब्लॉकचेن'
                : locale === 'ar'
                ? 'بلوكشين الطبقة الأولى عالي الإنتاجية'
                : 'High-Throughput Layer-1 Protocol'}
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              {currentLocaleConfig.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() =>
                  onNavigate(
                    locale === 'id'
                      ? 'id-getting-started'
                      : locale === 'zh'
                      ? 'zh-getting-started'
                      : locale === 'ja'
                      ? 'ja-getting-started'
                      : locale === 'ko'
                      ? 'ko-getting-started'
                      : locale === 'hi'
                      ? 'hi-getting-started'
                      : locale === 'ar'
                      ? 'ar-getting-started'
                      : 'en-getting-started'
                  )
                }
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>
                  {locale === 'id'
                    ? 'Mulai Cepat Node'
                    : locale === 'zh'
                    ? '快速启动节点'
                    : locale === 'ja'
                    ? 'ノードを起動'
                    : locale === 'ko'
                    ? '노드 빠른 시작'
                    : locale === 'hi'
                    ? 'नोड शुरू करें'
                    : locale === 'ar'
                    ? 'تشغيل العقدة'
                    : 'Quickstart Node'}
                </span>
              </button>

              <button
                onClick={() => onNavigate(locale === 'id' ? 'id-cli-handbook' : 'en-cli-handbook')}
                className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm border transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                }`}
              >
                CLI Handbook
              </button>

              <button
                onClick={() => onNavigate('en-architecture')}
                className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm border transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                }`}
              >
                Architecture (120B Header)
              </button>

              <button
                onClick={() => onNavigate('en-release-v030')}
                className="px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>v0.3.0 Notes</span>
              </button>
            </div>
          </div>

          {/* 6-Card Feature Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>
                  {locale === 'id'
                    ? '6 Pilar Fitur Utama Scytale'
                    : locale === 'zh'
                    ? 'Scytale 六大核心技术支柱'
                    : locale === 'ja'
                    ? 'Scytale 6つのコア機能'
                    : locale === 'ko'
                    ? 'Scytale 6대 핵심 아키텍처'
                    : locale === 'hi'
                    ? 'Scytale की 6 मुख्य विशेषताएँ'
                    : locale === 'ar'
                    ? 'ركائز بروتوكول Scytale الست الأساسية'
                    : '6 Architectural Pillars of Scytale'}
                </span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Consensus v1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Feature 1 */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-[#0f172a]/70 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">CPU-Friendly BLAKE3 PoW</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ultra-fast SIMD-accelerated cryptographic hashing prevents specialized ASIC monopolies while maintaining robust distributed security.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-[#0f172a]/70 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">120-Byte Header & State Root</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strict binary alignment directly binding <code className="text-cyan-400">utxo_root</code> in every block header for deterministic fail-closed consensus.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-[#0f172a]/70 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">Fast Sync Wire Protocol</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chunked binary streaming (<code className="text-cyan-400">getsnap</code> / <code className="text-cyan-400">snapshot</code>) transmitting up to 2,000 UTXOs per message with dynamic memory trees.
                </p>
              </div>

              {/* Feature 4 */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-[#0f172a]/70 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">Zero-Float Deterministic Fees</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pure integer Satoshi math for transaction fee calculation. Eliminates floating-point consensus drift and rounding attack vectors.
                </p>
              </div>

              {/* Feature 5 */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-[#0f172a]/70 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">Native Bech32 (scy1...)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ed25519 public key cryptographic signatures paired with human-friendly Bech32 encoding and a 6-character BCH error detection checksum.
                </p>
              </div>

              {/* Feature 6 */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-[#0f172a]/70 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">Autonomous DNS Seeder (Port 53)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Standalone DNS crawler with anti-Sybil protection (max 2 nodes per /24 subnet) and Fisher-Yates peer shuffling for zero-config cold-starts.
                </p>
              </div>
            </div>
          </div>

          {/* Network Topology & Standard Ports Table */}
          <div
            className={`p-5 rounded-xl border ${
              isDark ? 'bg-[#0f172a]/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Network Topology & Ports</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Devnet Active
              </span>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <th className="py-2 font-semibold">Service</th>
                    <th className="py-2 font-semibold">Port</th>
                    <th className="py-2 font-semibold">Transport</th>
                    <th className="py-2 font-semibold">Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  <tr>
                    <td className="py-2 font-medium">P2P Wire & Gossip</td>
                    <td className="py-2 font-mono text-cyan-400 font-bold">9001</td>
                    <td className="py-2 text-slate-400">TCP</td>
                    <td className="py-2 text-slate-300">Block relay, mempool sync, getsnap wire streaming</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">HTTP RPC Gateway</td>
                    <td className="py-2 font-mono text-cyan-400 font-bold">8332</td>
                    <td className="py-2 text-slate-400">HTTP/JSON</td>
                    <td className="py-2 text-slate-300">Wallet balance queries, node status, tx submission</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">DNS Seeder Daemon</td>
                    <td className="py-2 font-mono text-cyan-400 font-bold">53</td>
                    <td className="py-2 text-slate-400">UDP/TCP</td>
                    <td className="py-2 text-slate-300">Autonomous peer discovery with Fisher-Yates shuffle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Embedded Interactive Tools Tabs */}
          <div className="space-y-4 pt-4 border-t border-slate-800/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Developer Playground</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Test the 120-byte header format, simulate CLI wallet transactions, or query live node RPC.
                </p>
              </div>

              {/* Playground Switcher */}
              <div
                className={`p-1 rounded-lg border flex items-center gap-1 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setActiveInteractiveTab('inspector')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeInteractiveTab === 'inspector'
                      ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  120B Header Inspector
                </button>
                <button
                  onClick={() => setActiveInteractiveTab('cli')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeInteractiveTab === 'cli'
                      ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  CLI Terminal
                </button>
                <button
                  onClick={() => setActiveInteractiveTab('status')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeInteractiveTab === 'status'
                      ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  RPC Node Inspector
                </button>
              </div>
            </div>

            {/* Interactive Component Body */}
            <div>
              {activeInteractiveTab === 'inspector' && <HeaderByteInspector />}
              {activeInteractiveTab === 'cli' && <InteractiveCli />}
              {activeInteractiveTab === 'status' && <NodeStatusInspector />}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: GETTING STARTED (Docker Compose, DNS Cold-Start, Status RPC)
         ========================================================================= */}
      {isGettingStarted && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {locale === 'id' ? 'Panduan Mulai Cepat Node Validator' : 'Validator Node Quickstart (v0.3.0-devnet)'}
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              {locale === 'id'
                ? 'Jalankan node validator Scytale yang tersinkronisasi penuh dengan 1 perintah Docker Compose, penemuan peer otonom via DNS Seeder (Port 53), dan verifikasi HTTP RPC.'
                : 'Launch a fully synchronized Scytale validator node with 1 Docker Compose command, autonomous DNS bootstrapping (Port 53), and HTTP RPC verification.'}
            </p>
          </div>

          {/* Quick Step 1 */}
          <div
            className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#0f172a]/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold">
                  1
                </span>
                <span>{locale === 'id' ? 'Jalankan Node 1 Perintah' : 'One-Command Execution'}</span>
              </span>
              <span className="text-xs font-mono text-cyan-400">docker-compose.yml</span>
            </div>

            <div className="relative group">
              <pre className="p-3.5 rounded-lg bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
                {`git clone https://github.com/ratufatma/scytale-docs.git
cd scytale
docker compose up -d node-1`}
              </pre>
              <button
                onClick={() =>
                  handleCopySnippet(
                    `git clone https://github.com/ratufatma/scytale-docs.git\ncd scytale\ndocker compose up -d node-1`,
                    'step1'
                  )
                }
                className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy Command"
              >
                {copiedCode === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Quick Step 2: Autonomous Cold-Start DNS */}
          <div
            className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#0f172a]/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-center font-bold">
                  2
                </span>
                <span>{locale === 'id' ? 'Penemuan Peer Otonom (Port 53)' : 'Cold-Start DNS Bootstrapping (Port 53)'}</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">Zero Static Peers</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {locale === 'id'
                ? 'Validator Scytale tidak memerlukan daftar peer statis manual. Modul scytale-p2p secara otomatis mengirimkan kueri ke seed.devnet.scytale.org (port 53 UDP/TCP), menerima peer aktif yang diacak algoritma Fisher-Yates dengan filter anti-Sybil (/24 subnet).'
                : 'Scytale validators require zero manual static peer configurations. The scytale-p2p module queries seed.devnet.scytale.org on port 53, receiving active peers randomized with Fisher-Yates and anti-Sybil protection (max 2 nodes per /24 subnet).'}
            </p>
            <pre className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800">
              {`docker logs -f scytale-validator-1 | grep "p2p"`}
            </pre>
          </div>

          {/* Quick Step 3: Status RPC + Live Inspector */}
          <div
            className={`p-5 rounded-xl border space-y-4 ${
              isDark ? 'bg-[#0f172a]/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold">
                  3
                </span>
                <span>{locale === 'id' ? 'Verifikasi Status via cURL' : 'Verifying Node Status via HTTP RPC'}</span>
              </span>
              <span className="text-xs font-mono text-cyan-400">Port 8332</span>
            </div>

            <div className="relative group">
              <pre className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
                {`curl -s http://127.0.0.1:8332/api/v1/status | jq .`}
              </pre>
              <button
                onClick={() =>
                  handleCopySnippet(`curl -s http://127.0.0.1:8332/api/v1/status | jq .`, 'curl-status')
                }
                className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy Command"
              >
                {copiedCode === 'curl-status' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Live Interactive Node Status Inspector */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Live RPC Status Simulator
              </div>
              <NodeStatusInspector />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: CLI HANDBOOK & TRANSACTIONS
         ========================================================================= */}
      {isCliHandbook && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {locale === 'id' ? 'Panduan Lengkap scytale-cli & Transaksi' : 'Scytale CLI Handbook & Transactions'}
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Official command-line utility for managing Ed25519 keypairs, Bech32 addresses (<code className="text-cyan-400">scy1...</code>), zero-float fee transactions, and multi-threaded CPU mining.
            </p>
          </div>

          {/* Interactive Terminal Simulator */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Interactive CLI Simulator</span>
            </h2>
            <InteractiveCli />
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: ARCHITECTURE (120B Header, Merkle Tree, Fast Sync)
         ========================================================================= */}
      {isArchitecture && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Core Protocol Architecture: 120-Byte Header & Authenticated State
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Consensus specification of the Scytale Layer-1 blockchain: strictly aligned 120-byte block header, lexicographical binary Merkle state tree, redb storage, and fast sync streaming.
            </p>
          </div>

          {/* Interactive Header Inspector embedded */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Canonical 120-Byte Block Header Byte Alignment</span>
            </h2>
            <HeaderByteInspector />
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: VITEPRESS CONFIG (.mts) VIEW
         ========================================================================= */}
      {isConfig && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              docs/.vitepress/config.mts: 7 Locales with Arabic RTL
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Complete production VitePress configuration supporting 7 languages (en, id, zh, ja, ko, hi, ar with <code className="text-cyan-400">dir: 'rtl'</code>), local search, and theme styling.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
              isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-xs">
              <span className="font-bold text-cyan-400">7 Active Locales:</span>{' '}
              <span className="text-slate-300">
                🇬🇧 en (root), 🇮🇩 id, 🇨🇳 zh, 🇯🇵 ja, 🇰🇷 ko, 🇮🇳 hi, 🇸🇦 ar (RTL)
              </span>
            </div>
            <button
              onClick={() => onOpenRawModal('config')}
              className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs shadow-sm transition-colors shrink-0"
            >
              Export config.mts
            </button>
          </div>

          {/* Code Viewer */}
          <div className="relative group">
            <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800 leading-relaxed">
              {file.rawContent}
            </pre>
            <button
              onClick={() => handleCopySnippet(file.rawContent, 'config-raw')}
              className="absolute top-3 right-3 p-2 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copy Entire Config"
            >
              {copiedCode === 'config-raw' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 6: RELEASE NOTES v0.3.0
         ========================================================================= */}
      {isReleaseNotes && (
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Milestone: Phase 3 Complete (Tasks 32–38)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Scytale v0.3.0-devnet: State Engine, Fast Sync & Autonomous Seeding
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              This milestone introduces canonical UTXO state commitment on 120-byte block headers, chunked fast sync wire protocol, anti-Sybil DNS discovery, and validator RAM optimization to 12–24 MiB.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Header Size</div>
              <div className="text-sm font-bold font-mono text-cyan-400">120 Bytes</div>
              <div className="text-[10px] text-slate-400">utxo_root binding</div>
            </div>
            <div className={`p-3.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Fast Sync Chunk</div>
              <div className="text-sm font-bold font-mono text-emerald-400">≤ 2,000 UTXOs</div>
              <div className="text-[10px] text-slate-400">getsnap streaming</div>
            </div>
            <div className={`p-3.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">RAM Footprint</div>
              <div className="text-sm font-bold font-mono text-amber-400">12–24 MiB</div>
              <div className="text-[10px] text-slate-400">zero-copy deserialization</div>
            </div>
            <div className={`p-3.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Anti-Sybil Seeder</div>
              <div className="text-sm font-bold font-mono text-indigo-400">2 /24 Subnet</div>
              <div className="text-[10px] text-slate-400">Fisher-Yates shuffle</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
