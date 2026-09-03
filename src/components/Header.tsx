import React, { useState } from 'react';
import { Shield, Search, FolderGit2, Github, Menu, X, Sparkles, Sun, Moon, Globe, ChevronDown, Check } from 'lucide-react';
import { DOC_FILES } from '../data/docsContent';
import { LOCALES } from '../data/locales';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  locale: string;
  onSelectLocale: (locale: string) => void;
  onSelectDoc: (id: string) => void;
  onOpenRawModal: () => void;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  locale,
  onSelectLocale,
  onSelectDoc,
  onOpenRawModal,
  onToggleMobileSidebar,
  isMobileSidebarOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);

  const activeLocaleConfig = LOCALES[locale] || LOCALES.en;

  const searchResults = searchQuery.trim()
    ? DOC_FILES.filter(
        f =>
          f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.rawContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.path.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-[#0b0f19]/85 border-[#1e293b] text-[#f8fafc]'
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
        {/* Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className={`md:hidden p-1.5 rounded-md transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle Navigation"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => onSelectDoc(locale === 'id' ? 'id-index' : locale === 'zh' ? 'zh-index' : locale === 'ja' ? 'ja-index' : locale === 'ko' ? 'ko-index' : locale === 'hi' ? 'hi-index' : locale === 'ar' ? 'ar-index' : 'en-index')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-md flex items-center justify-center text-white shadow-sm shadow-cyan-500/20 transition-transform group-hover:scale-105">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 sm:gap-2">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Scytale Docs</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  v0.3.0
                </span>
              </div>
              <div className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold hidden sm:block">
                Layer-1 Protocol
              </div>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm lg:max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search docs (BLAKE3, 120B header, utxo_root, Bech32)..."
              className={`w-full rounded-md pl-9 pr-4 py-1.5 text-xs sm:text-sm font-sans transition-all focus:outline-none focus:ring-1 ${
                isDark
                  ? 'bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500'
                  : 'bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-cyan-600'
              }`}
            />
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchQuery.trim() && (
            <div
              className={`absolute top-full left-0 right-0 mt-1.5 p-2 rounded-md shadow-2xl z-50 max-h-80 overflow-y-auto border ${
                isDark
                  ? 'bg-[#0f172a] border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {searchResults.length > 0 ? (
                searchResults.map(result => (
                  <button
                    key={result.id}
                    onClick={() => {
                      onSelectDoc(result.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left p-2.5 rounded transition-colors flex items-start gap-2.5 ${
                      isDark ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">{result.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{result.description}</div>
                      <span className="text-[10px] font-mono text-cyan-500/90">{result.path}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-slate-400">
                  No matching documentation found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions: Theme Toggle, i18n Dropdown, Export Button, GitHub */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium">
          {/* Theme Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-md border transition-all flex items-center gap-1.5 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800 hover:text-amber-200'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            <span className="hidden lg:inline text-[11px] font-medium">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* i18n Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLocaleDropdownOpen(!isLocaleDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold">{activeLocaleConfig.flag}</span>
              <span className="hidden sm:inline font-mono">{activeLocaleConfig.code.toUpperCase()}</span>
              {activeLocaleConfig.dir === 'rtl' && (
                <span className="text-[9px] px-1 py-0.2 bg-emerald-500/20 text-emerald-400 rounded font-mono">
                  RTL
                </span>
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isLocaleDropdownOpen && (
              <div
                className={`absolute right-0 mt-1.5 w-48 rounded-md shadow-xl border p-1.5 z-50 animate-in fade-in duration-150 ${
                  isDark
                    ? 'bg-[#0f172a] border-slate-800 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Language (i18n)
                </div>
                {Object.values(LOCALES).map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => {
                      onSelectLocale(loc.code);
                      setIsLocaleDropdownOpen(false);
                      // Auto-switch to corresponding index
                      const targetId = loc.code === 'en' ? 'en-index' : `${loc.code}-index`;
                      onSelectDoc(targetId);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      locale === loc.code
                        ? isDark
                          ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                          : 'bg-cyan-50 text-cyan-700 font-semibold'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{loc.flag}</span>
                      <span>{loc.nativeName}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      {loc.dir === 'rtl' && (
                        <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                          RTL
                        </span>
                      )}
                      {locale === loc.code && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Raw Files Exporter Button */}
          <button
            onClick={onOpenRawModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white text-xs font-semibold shadow-sm shadow-cyan-500/20 transition-all active:scale-95"
            title="Export full VitePress directory structure"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">VitePress Files</span>
            <span className="sm:hidden">Files</span>
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/ratufatma/scytale-docs"
            target="_blank"
            rel="noreferrer"
            className={`p-1.5 rounded-md transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
