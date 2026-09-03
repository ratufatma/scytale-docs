import React, { useState } from 'react';
import { Activity, RefreshCw, Copy, Check, Server, ShieldCheck, Wifi } from 'lucide-react';

export const NodeStatusInspector: React.FC = () => {
  const [isSynced, setIsSynced] = useState(true);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blockHeight, setBlockHeight] = useState(18420);
  const [peers, setPeers] = useState(8);

  const statusResponse = {
    chain_id: "scytale-devnet-1",
    version: "v0.3.0-devnet",
    status: isSynced ? "online" : "syncing",
    synced: isSynced,
    block_height: isSynced ? blockHeight : 11200,
    tip_hash: isSynced ? "0a9c8fe26177bc954313f8983942078dbb45281b951ef40d421712a144e137b0" : "8f1a23c456...d091a",
    utxo_root: isSynced ? "e42b10cd47291a1824be79116acb879ef448e02d8495034b07c803df3985a932" : "11a0c842...3fa92",
    utxo_count: isSynced ? 89452 : 45120,
    peers_connected: peers,
    mempool_size: isSynced ? 14 : 0,
    network_hashrate_ths: 42.15,
    uptime_seconds: 1840,
    zero_float_fee_rate_micron: 10
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setBlockHeight(prev => prev + 1);
      setLoading(false);
    }, 400);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(statusResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-[#27272a] bg-[#09090b] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272a] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#10b981]" />
          <h3 className="text-sm font-bold text-[#fafafa]">
            Node RPC Inspector: <code className="text-xs text-[#3b82f6] bg-[#18181b] px-2 py-0.5 rounded border border-[#27272a]">GET /api/v1/status</code>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSynced(!isSynced)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors flex items-center gap-1.5 ${
              isSynced
                ? 'bg-[#18181b] border-[#10b981]/50 text-[#10b981]'
                : 'bg-[#18181b] border-amber-500/50 text-amber-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isSynced ? 'bg-[#10b981] animate-pulse' : 'bg-amber-400 animate-ping'}`} />
            {isSynced ? 'Status: Synced' : 'Status: Syncing (Fast-Sync)'}
          </button>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-1.5 rounded-md bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] transition-colors"
            title="Poll Node Ulang"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Salin JSON</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <div className="p-3 rounded-md bg-[#111114] border border-[#27272a]">
          <div className="flex items-center justify-between text-[#71717a] text-xs mb-1">
            <span>Block Height</span>
            <Server className="w-3.5 h-3.5 text-[#3b82f6]" />
          </div>
          <div className="text-base font-bold font-mono text-[#fafafa]">
            #{statusResponse.block_height.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#71717a]">Kanonikal Chain Tip</span>
        </div>

        <div className="p-3 rounded-md bg-[#111114] border border-[#27272a]">
          <div className="flex items-center justify-between text-[#71717a] text-xs mb-1">
            <span>Peers Wire (9001)</span>
            <Wifi className="w-3.5 h-3.5 text-[#10b981]" />
          </div>
          <div className="text-base font-bold font-mono text-[#10b981]">
            {statusResponse.peers_connected} Active
          </div>
          <span className="text-[10px] text-[#71717a]">Autonomous DNS Seeder</span>
        </div>

        <div className="p-3 rounded-md bg-[#111114] border border-[#27272a]">
          <div className="flex items-center justify-between text-[#71717a] text-xs mb-1">
            <span>UTXO Set Count</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-base font-bold font-mono text-amber-300">
            {statusResponse.utxo_count.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#71717a]">BLAKE3 Tree Leaf Items</span>
        </div>

        <div className="p-3 rounded-md bg-[#111114] border border-[#27272a]">
          <div className="flex items-center justify-between text-[#71717a] text-xs mb-1">
            <span>Zero-Float Fee</span>
            <Activity className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-base font-bold font-mono text-purple-300">
            10 micron/B
          </div>
          <span className="text-[10px] text-[#71717a]">Integer Unit Math</span>
        </div>
      </div>

      {/* Raw Response JSON Preview */}
      <div className="bg-[#111114] rounded-md p-3 border border-[#27272a] font-mono text-xs overflow-x-auto text-[#a1a1aa]">
        <div className="text-[#52525b] text-[10px] mb-1.5 flex items-center justify-between">
          <span>HTTP/1.1 200 OK — Content-Type: application/json</span>
          <span>Response latency: 2.1ms</span>
        </div>
        <pre className="text-[#3b82f6] leading-relaxed">
          {JSON.stringify(statusResponse, null, 2)}
        </pre>
      </div>
    </div>
  );
};
