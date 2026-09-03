export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  rootPath: string;
  tagline: string;
}

export const LOCALES: Record<string, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
    rootPath: '',
    tagline: 'High-throughput Layer-1 with 120B Header, BLAKE3 PoW & Deterministic UTXO Root'
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    dir: 'ltr',
    rootPath: 'id',
    tagline: 'Blockchain Layer-1 berperforma tinggi dengan Header 120B, BLAKE3 PoW & UTXO Root deterministik'
  },
  zh: {
    code: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    dir: 'ltr',
    rootPath: 'zh',
    tagline: '具有120字节区块头、BLAKE3工作量证明与确定性UTXO状态根的高吞吐Layer-1区块链'
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr',
    rootPath: 'ja',
    tagline: '120Bヘッダー、BLAKE3 PoW、確定性UTXOルートを備えた高スループットLayer-1ブロックチェーン'
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    dir: 'ltr',
    rootPath: 'ko',
    tagline: '120B 블록 헤더, BLAKE3 PoW 및 결정론적 UTXO 상태 루트를 갖춘 고성능 Layer-1 블록체인'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
    rootPath: 'hi',
    tagline: '120B हेडर, BLAKE3 PoW और डिटर्मिनिस्टिक UTXO रूट के साथ उच्च-थ्रूपुट लेयर-1 ब्लॉकचेन'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
    rootPath: 'ar',
    tagline: 'بلوكشين الطبقة الأولى عالي الإنتاجية بترويسة 120 بايت وإثبات عمل BLAKE3 وجذر UTXO حتمي'
  }
};
