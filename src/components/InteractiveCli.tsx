import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

interface CliHistory {
  command: string;
  output: string;
  type?: 'success' | 'info' | 'warn' | 'error';
}

export const InteractiveCli: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CliHistory[]>([
    {
      command: 'scytale-cli version',
      output: 'scytale-cli v0.3.0-devnet (rev: 7c38e1, arch: amd64, target: scytale-devnet-1)\nConnected to RPC node at http://127.0.0.1:8332',
      type: 'info'
    }
  ]);
  const [copied, setCopied] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let result = '';
    let resType: 'success' | 'info' | 'warn' | 'error' = 'info';

    if (trimmed.includes('keygen')) {
      resType = 'success';
      result = `================================================================================
                    SCY_TALE ED25519 KEYPAIR GENERATED
================================================================================
Wallet Name    : dev-validator-wallet
Bech32 Address : scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m
Public Key (HEX): 8a4c12f458e8b211a76b9f3014aef72c88432a106e238914b301c23f9901d81e
Storage Path   : ~/.scytale/wallets/dev-validator-wallet.json

[!] SIMPAN 24 KATA MNEMONIC DI TEMPAT AMAN & RAHASIA:
--------------------------------------------------------------------------------
1. orbital    2. scytale   3. venture   4. quantum   5. matrix    6. cipher
7. timber     8. blake     9. beacon   10. ledger   11. copper   12. harbor
13. dynamic   14. alpine   15. fortress 16. shield   17. anchor   18. granite
19. cascade   20. vector   21. horizon  22. circuit  23. summit   24. velocity
--------------------------------------------------------------------------------`;
    } else if (trimmed.includes('balance')) {
      resType = 'success';
      result = `+------------------------------------------------------------------------------+
|                    RINGKASAN SALDO DOMPET SCYTALE DEVNET                     |
+------------------------------------------------------------------------------+
| Alamat Bech32     : scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m       |
| Total Saldo       : 250.50000000 SCY                                         |
| Satuan Atomik     : 25,050,000,000 micron (Integer uint64)                   |
| Jumlah UTXO Aktif : 3 buah                                                   |
| Status Terkunci   : 0 micron (0 UTXO unconfirmed)                            |
+------------------------------------------------------------------------------+

Daftar UTXO Aktif:
[1] TxID: 3a91bf920a...:0 | Nilai: 100.00000000 SCY | Block: #17200 | Confirm: 1220
[2] TxID: 7c42e14e10...:1 | Nilai: 150.00000000 SCY | Block: #17890 | Confirm: 530
[3] TxID: 99e0df238a...:0 | Nilai:   0.50000000 SCY | Block: #18419 | Confirm: 1`;
    } else if (trimmed.includes('tx send')) {
      resType = 'success';
      result = `[+] Menganalisis state UTXO untuk alamat pengirim...
[+] Mengagregasi 1 UTXO (Nilai: 500000 micron)
[+] Alokasi Output:
    -> Penerima (scy1q7z8...): 100000 micron
    -> Change (scy1qq8n...):   399500 micron
    -> Fee Konsensus:          500 micron (Zero-Float integer)
[+] Menandatangani payload dengan Ed25519 Private Key... OK (Signature: 64 bytes)
[+] Menyiarkan transaksi via P2P Wire ke http://127.0.0.1:8332/api/v1/tx...

================================================================================
                           TRANSAKSI BERHASIL DISIARKAN
================================================================================
TxID      : 4f9812e9b0d87a4128f654ce923e110c71a399f6b4d1a520e0349bca710526e3
Ukuran    : 184 bytes (Zero-Float Cost: 2.71 micron/byte)
Status    : Diterima di Mempool Lokal (Menunggu blok berikutnya)
Konfirmasi: Pantau dengan 'scytale-cli tx status 4f9812e9...'`;
    } else if (trimmed.includes('miner start')) {
      resType = 'success';
      result = `[+] Memulai penambang Scytale internal...
[+] Utas Kerja (Worker Threads) : 4 CPU cores
[+] Alamat Penerima Reward       : scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m
[+] Target Kesulitan (nBits)     : 0x1e0ffff0
[+] Algoritma Header             : BLAKE3 (SIMD AVX2 Accelerated)
[+] Status                       : AKTIF. Menambang pada tinggi blok #18421...`;
    } else if (trimmed.includes('miner status')) {
      resType = 'info';
      result = `{
  "mining": true,
  "threads": 4,
  "reward_address": "scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m",
  "hashrate_khs": 1420.85,
  "blocks_mined_session": 3,
  "last_block_time": "2026-09-02T20:14:52Z",
  "current_target": "00000ffff0000000000000000000000000000000000000000000000000000000"
}`;
    } else if (trimmed.includes('miner stop')) {
      resType = 'warn';
      result = `[+] Mengirim sinyal SIGTERM ke 4 worker miner...
[+] Utas pekerja berhasil dihentikan secara aman.
[+] Status penambangan: NONAKTIF.`;
    } else if (trimmed.includes('help')) {
      result = `Available Scytale CLI Commands:
  scytale-cli wallet keygen --name <name>         Generate Ed25519 keypair & Bech32 address
  scytale-cli wallet balance --address <scy1...>  Query unspent outputs & integer balance
  scytale-cli tx send --to <scy1> --amount <m>    Send deterministic P2PKH tx with auto-UTXO
  scytale-cli miner start --threads 4             Start local CPU miner for devnet
  scytale-cli miner status                        Check current hashrate and mined blocks
  scytale-cli miner stop                          Halt active miner workers
  scytale-cli node status                         Query node /api/v1/status
  clear                                           Clear the terminal window`;
    } else {
      resType = 'error';
      result = `scytale-cli: command not recognized: "${trimmed}". Type "scytale-cli help" for available commands.`;
    }

    setHistory(prev => [...prev, { command: trimmed, output: result, type: resType }]);
    setInputVal('');
  };

  const handleQuickCommand = (cmd: string) => {
    setInputVal(cmd);
    executeCommand(cmd);
  };

  const handleCopyHistory = () => {
    const text = history.map(h => `$ ${h.command}\n${h.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-[#27272a] bg-[#09090b] shadow-sm overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111114] border-b border-[#27272a]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-[#a1a1aa] font-sans font-semibold text-xs">
            <Terminal className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>scytale-cli interactive shell (v0.4.2-devnet)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHistory}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] transition-colors text-[11px]"
            title="Salin Output Terminal"
          >
            {copied ? <Check className="w-3 h-3 text-[#10b981]" /> : <Copy className="w-3 h-3" />}
            <span>Salin</span>
          </button>
          <button
            onClick={() => setHistory([])}
            className="p-1 rounded bg-[#18181b] hover:bg-[#27272a] text-[#71717a] hover:text-white border border-[#27272a] transition-colors"
            title="Clear Terminal"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="px-4 py-2 bg-[#09090b] border-b border-[#27272a] flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] uppercase font-sans text-[#71717a] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#3b82f6]" /> Quick Run:
        </span>
        <button
          onClick={() => handleQuickCommand('scytale-cli wallet keygen --name my-wallet')}
          className="px-2 py-0.5 rounded bg-[#18181b] text-[#3b82f6] border border-[#27272a] hover:border-[#3b82f6]/50 transition-colors text-[11px]"
        >
          keygen
        </button>
        <button
          onClick={() => handleQuickCommand('scytale-cli wallet balance --address scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m')}
          className="px-2 py-0.5 rounded bg-[#18181b] text-[#10b981] border border-[#27272a] hover:border-[#10b981]/50 transition-colors text-[11px]"
        >
          wallet balance
        </button>
        <button
          onClick={() => handleQuickCommand('scytale-cli tx send --to scy1q7z8p49x3k2lm5n7r9x8gf2tvdw0s3jn54khce6m892 --amount 100000 --fee 500 --auto-utxo')}
          className="px-2 py-0.5 rounded bg-[#18181b] text-amber-300 border border-[#27272a] hover:border-amber-400/50 transition-colors text-[11px]"
        >
          tx send (auto-utxo)
        </button>
        <button
          onClick={() => handleQuickCommand('scytale-cli miner start --threads 4 --reward-addr scy1qq8n7z39e4y4v5k2lm6p7tr9x8gf2tvdw0s3jn54khce6m')}
          className="px-2 py-0.5 rounded bg-[#18181b] text-purple-300 border border-[#27272a] hover:border-purple-400/50 transition-colors text-[11px]"
        >
          miner start
        </button>
        <button
          onClick={() => handleQuickCommand('scytale-cli miner status')}
          className="px-2 py-0.5 rounded bg-[#18181b] text-[#a1a1aa] border border-[#27272a] hover:border-[#a1a1aa]/50 transition-colors text-[11px]"
        >
          miner status
        </button>
        <button
          onClick={() => handleQuickCommand('scytale-cli miner stop')}
          className="px-2 py-0.5 rounded bg-[#18181b] text-rose-400 border border-[#27272a] hover:border-rose-400/50 transition-colors text-[11px]"
        >
          miner stop
        </button>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 max-h-[360px] overflow-y-auto space-y-3 bg-[#09090b] text-[#fafafa]">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-[#3b82f6] font-semibold">
              <span className="text-[#52525b]">dev@scytale-node:~$</span>
              <span>{item.command}</span>
            </div>
            <pre className={`whitespace-pre-wrap leading-relaxed text-[11px] p-2.5 rounded bg-[#111114] border border-[#27272a] ${
              item.type === 'success' ? 'text-[#10b981]' :
              item.type === 'warn' ? 'text-amber-300' :
              item.type === 'error' ? 'text-rose-400' : 'text-[#a1a1aa]'
            }`}>
              {item.output}
            </pre>
          </div>
        ))}
        <div ref={terminalBottomRef} />
      </div>

      {/* Terminal Input Line */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          executeCommand(inputVal);
        }}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#111114] border-t border-[#27272a]"
      >
        <span className="text-[#52525b] font-bold">dev@scytale-node:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ketik perintah CLI (misal: scytale-cli help)..."
          className="flex-1 bg-transparent text-[#fafafa] placeholder-[#52525b] focus:outline-none font-mono text-xs"
        />
        <button
          type="submit"
          className="flex items-center gap-1 px-3 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md font-sans font-medium text-xs transition-colors shadow-sm"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Jalankan</span>
        </button>
      </form>
    </div>
  );
};
