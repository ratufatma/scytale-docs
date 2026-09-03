import React, { useState } from 'react';
import { Layers, Check, Copy } from 'lucide-react';

interface FieldSpec {
  name: string;
  offset: string;
  size: string;
  type: string;
  color: string;
  badge: string;
  desc: string;
  example: string;
  significance: string;
}

const FIELDS: FieldSpec[] = [
  {
    name: 'version',
    offset: '0x00 - 0x03',
    size: '4 Bytes',
    type: 'uint32_le',
    color: 'border-sky-500 bg-sky-500/10 text-sky-400',
    badge: 'Consensus Version',
    desc: 'Pengidentifikasi versi aturan konsensus protokol Scytale. Mendukung fork upgrade.',
    example: '01 00 00 00 (v1.0)',
    significance: 'Memastikan seluruh node menolak blok dari versi konsensus usang.'
  },
  {
    name: 'prev_hash',
    offset: '0x04 - 0x23',
    size: '32 Bytes',
    type: '[32]byte',
    color: 'border-indigo-500 bg-indigo-500/10 text-indigo-400',
    badge: 'BLAKE3 Hash',
    desc: 'BLAKE3 cryptographic hash dari 120-byte block header induk sebelumnya.',
    example: '3b 1c 9a f4 08 ... 99 a0 (32 bytes)',
    significance: 'Membentuk rantai kriptografis tahan manipulasi (anti-tamper chain continuity).'
  },
  {
    name: 'merkle_root',
    offset: '0x24 - 0x43',
    size: '32 Bytes',
    type: '[32]byte',
    color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
    badge: 'Tx Merkle Tree',
    desc: 'Akar pohon Merkle biner BLAKE3 yang mengikat seluruh transaksi dalam blok.',
    example: '8a 12 e9 4b c0 ... ff 01 (32 bytes)',
    significance: 'Validasi kepemilikan transaksi individual via SPV proof 32-byte log(N).'
  },
  {
    name: 'utxo_root',
    offset: '0x44 - 0x63',
    size: '32 Bytes',
    type: '[32]byte',
    color: 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold',
    badge: 'CORE INNOVATION',
    desc: 'Akar pohon status Radix-16 BLAKE3 dari seluruh UTXO aktif pasca-eksekusi blok.',
    example: '4e 8d 33 a1 78 ... 77 b2 (32 bytes)',
    significance: 'Memungkinkan stateless fast-sync & light client verification tanpa memuat seluruh riwayat transaksi.'
  },
  {
    name: 'timestamp',
    offset: '0x64 - 0x6B',
    size: '8 Bytes',
    type: 'uint64_le',
    color: 'border-purple-500 bg-purple-500/10 text-purple-400',
    badge: 'Unix Epoch (s)',
    desc: 'Waktu penerbitan blok dalam detik UTC sejak 1 Jan 1970.',
    example: '50 3b a8 66 00 00 00 00 (1788390000)',
    significance: 'Digunakan dalam evaluasi dynamic difficulty retarget setiap 120 blok.'
  },
  {
    name: 'nbits (target)',
    offset: '0x6C - 0x6F',
    size: '4 Bytes',
    type: 'uint32_le',
    color: 'border-rose-500 bg-rose-500/10 text-rose-400',
    badge: 'Compact PoW Target',
    desc: 'Format floating-exponent mantissa representasi ambang batas kesulitan penambangan.',
    example: 'f0 ff 0f 1e (0x1e0ffff0)',
    significance: 'Mengontrol laju penerbitan blok tetap pada rerata 10 detik per blok.'
  },
  {
    name: 'nonce',
    offset: '0x70 - 0x77',
    size: '8 Bytes',
    type: 'uint64_le',
    color: 'border-cyan-500 bg-cyan-500/10 text-cyan-400',
    badge: 'Mining Counter',
    desc: 'Ruang pencarian 64-bit yang diiterasi oleh miner untuk menghasilkan hash <= target.',
    example: '99 8a 21 04 00 00 00 00 (4332185)',
    significance: 'Memfasilitasi Proof-of-Work hardware hashing tanpa kehabisan ruang solusi.'
  }
];

export const HeaderByteInspector: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(3); // default utxo_root
  const [copied, setCopied] = useState(false);

  const selected = FIELDS[selectedIdx];

  const handleCopySpec = () => {
    const text = `Field: ${selected.name}\nOffset: ${selected.offset} (${selected.size})\nType: ${selected.type}\nDeskripsi: ${selected.desc}\nSignifikansi: ${selected.significance}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-[#27272a] bg-[#09090b] p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#3b82f6]" />
          <h3 className="text-sm font-bold text-[#fafafa]">
            Interactive 120-Byte Header Byte-Inspector
          </h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#18181b] text-[#3b82f6] border border-[#27272a]">
          Total: 120 Bytes (Fixed)
        </span>
      </div>

      <p className="text-xs text-[#71717a] mb-3">
        Klik segmen biner di bawah untuk menginspeksi struktur 120-byte block header deterministik Scytale:
      </p>

      {/* Visual Memory Strip */}
      <div className="grid grid-cols-12 gap-1.5 p-2 bg-[#111114] rounded-md border border-[#27272a] mb-4 font-mono text-[11px]">
        {/* Version (4B - col-1) */}
        <button
          onClick={() => setSelectedIdx(0)}
          className={`col-span-1 p-2 rounded text-center transition-all border ${
            selectedIdx === 0 ? 'border-[#3b82f6] bg-[#3b82f6]/20 ring-1 ring-[#3b82f6]' : 'border-[#27272a] bg-[#18181b] hover:border-[#3b82f6]/40'
          } text-blue-300`}
        >
          <div className="font-bold">ver</div>
          <div className="text-[9px] text-[#71717a]">4B</div>
        </button>

        {/* Prev Hash (32B - col-3) */}
        <button
          onClick={() => setSelectedIdx(1)}
          className={`col-span-3 p-2 rounded text-center transition-all border ${
            selectedIdx === 1 ? 'border-[#3b82f6] bg-[#3b82f6]/20 ring-1 ring-[#3b82f6]' : 'border-[#27272a] bg-[#18181b] hover:border-[#3b82f6]/40'
          } text-indigo-300`}
        >
          <div className="font-bold">prev_hash</div>
          <div className="text-[9px] text-[#71717a]">32B (BLAKE3)</div>
        </button>

        {/* Merkle Root (32B - col-3) */}
        <button
          onClick={() => setSelectedIdx(2)}
          className={`col-span-3 p-2 rounded text-center transition-all border ${
            selectedIdx === 2 ? 'border-[#3b82f6] bg-[#3b82f6]/20 ring-1 ring-[#3b82f6]' : 'border-[#27272a] bg-[#18181b] hover:border-[#3b82f6]/40'
          } text-emerald-300`}
        >
          <div className="font-bold">merkle_root</div>
          <div className="text-[9px] text-[#71717a]">32B (BLAKE3)</div>
        </button>

        {/* UTXO Root (32B - col-3) */}
        <button
          onClick={() => setSelectedIdx(3)}
          className={`col-span-3 p-2 rounded text-center transition-all border ${
            selectedIdx === 3 ? 'border-amber-500 bg-amber-500/20 ring-1 ring-amber-500' : 'border-[#27272a] bg-[#18181b] hover:border-amber-500/50'
          } text-amber-300 relative shadow-sm`}
        >
          <div className="font-bold flex items-center justify-center gap-1">
            <span>utxo_root</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
          </div>
          <div className="text-[9px] text-[#71717a]">32B (Compact)</div>
        </button>

        {/* Timestamp (8B - col-1) */}
        <button
          onClick={() => setSelectedIdx(4)}
          className={`col-span-1 p-2 rounded text-center transition-all border ${
            selectedIdx === 4 ? 'border-[#3b82f6] bg-[#3b82f6]/20 ring-1 ring-[#3b82f6]' : 'border-[#27272a] bg-[#18181b] hover:border-[#3b82f6]/40'
          } text-purple-300`}
        >
          <div className="font-bold">time</div>
          <div className="text-[9px] text-[#71717a]">8B</div>
        </button>

        {/* nBits (4B - col-1) */}
        <button
          onClick={() => setSelectedIdx(5)}
          className={`col-span-1 p-2 rounded text-center transition-all border ${
            selectedIdx === 5 ? 'border-[#3b82f6] bg-[#3b82f6]/20 ring-1 ring-[#3b82f6]' : 'border-[#27272a] bg-[#18181b] hover:border-[#3b82f6]/40'
          } text-rose-300`}
        >
          <div className="font-bold">nbits</div>
          <div className="text-[9px] text-[#71717a]">4B</div>
        </button>

        {/* Nonce (8B - col-1) */}
        <button
          onClick={() => setSelectedIdx(6)}
          className={`col-span-1 p-2 rounded text-center transition-all border ${
            selectedIdx === 6 ? 'border-[#3b82f6] bg-[#3b82f6]/20 ring-1 ring-[#3b82f6]' : 'border-[#27272a] bg-[#18181b] hover:border-[#3b82f6]/40'
          } text-cyan-300`}
        >
          <div className="font-bold">nonce</div>
          <div className="text-[9px] text-[#71717a]">8B</div>
        </button>
      </div>

      {/* Selected Field Details */}
      <div className="p-4 rounded-md bg-[#111114] border border-[#27272a]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[#3b82f6] text-xs">
              field: {selected.name}
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
              {selected.badge}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#71717a]">
            <span>Offset: <strong className="text-white">{selected.offset}</strong></span>
            <span>Size: <strong className="text-white">{selected.size}</strong></span>
            <span>Type: <strong className="text-white">{selected.type}</strong></span>
            <button
              onClick={handleCopySpec}
              className="p-1 rounded bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
              title="Salin Spesifikasi Field"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <p className="text-xs text-[#a1a1aa] mb-2 leading-relaxed">
          {selected.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono bg-[#18181b] p-2.5 rounded border border-[#27272a]">
          <div>
            <span className="text-[#52525b] block text-[10px]">Contoh Nilai Biner:</span>
            <span className="text-[#3b82f6] break-all">{selected.example}</span>
          </div>
          <div>
            <span className="text-[#52525b] block text-[10px]">Signifikansi Konsensus:</span>
            <span className="text-[#10b981]">{selected.significance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
