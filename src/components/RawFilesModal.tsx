import React, { useState } from 'react';
import { DOC_FILES, DocFile } from '../data/docsContent';
import { LOCALES } from '../data/locales';
import { X, Copy, Check, FileCode, FolderGit2, Search, ExternalLink } from 'lucide-react';

interface RawFilesModalProps {
  theme: 'dark' | 'light';
  isOpen: boolean;
  onClose: () => void;
  initialFileId?: string;
}

export const RawFilesModal: React.FC<RawFilesModalProps> = ({
  theme,
  isOpen,
  onClose,
  initialFileId = 'config'
}) => {
  const [activeId, setActiveId] = useState(initialFileId);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const currentFile = DOC_FILES.find(f => f.id === activeId) || DOC_FILES[0];

  const filteredFiles = filterQuery.trim()
    ? DOC_FILES.filter(
        f =>
          f.filename.toLowerCase().includes(filterQuery.toLowerCase()) ||
          f.path.toLowerCase().includes(filterQuery.toLowerCase()) ||
          f.title.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : DOC_FILES;

  const handleCopy = (file: DocFile) => {
    navigator.clipboard.writeText(file.rawContent);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const combined = DOC_FILES.map(
      f => `<!-- ========================================== -->\n<!-- FILE: ${f.path} -->\n<!-- ========================================== -->\n\`\`\`${f.filename.endsWith('.mts') ? 'typescript' : 'markdown'}\n${f.rawContent}\n\`\`\``
    ).join('\n\n');

    navigator.clipboard.writeText(combined);
    setCopiedId('ALL');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-6xl h-[92vh] rounded-lg shadow-2xl flex flex-col overflow-hidden border ${
          isDark
            ? 'bg-[#0b0f19] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white shadow-sm">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                VitePress Documentation Suite (18 Files, 7 Locales)
              </h2>
              <p className="text-xs text-slate-400">
                Ready-to-copy Markdown & TypeScript files for your repository (Scytale v0.3.0-devnet)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold text-xs transition-all shadow-sm"
            >
              {copiedId === 'ALL' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy All (18 Files)</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-md transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left File List + Right Code Preview */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* File Selector Sidebar */}
          <div
            className={`w-72 sm:w-80 shrink-0 border-r flex flex-col ${
              isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            {/* Filter Search */}
            <div className={`p-2.5 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={e => setFilterQuery(e.target.value)}
                  placeholder="Filter by path or title..."
                  className={`w-full pl-8 pr-3 py-1 text-xs rounded border transition-colors focus:outline-none focus:ring-1 ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500'
                      : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-600 focus:ring-cyan-600'
                  }`}
                />
              </div>
            </div>

            {/* List of Files */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredFiles.map(file => {
                const isActive = file.id === currentFile.id;
                const loc = LOCALES[file.locale] || LOCALES.en;
                return (
                  <button
                    key={file.id}
                    onClick={() => setActiveId(file.id)}
                    className={`w-full text-left p-2 rounded text-xs transition-all flex items-start gap-2 ${
                      isActive
                        ? isDark
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold'
                          : 'bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold'
                        : isDark
                        ? 'hover:bg-slate-800/70 text-slate-300'
                        : 'hover:bg-slate-200/70 text-slate-700'
                    }`}
                  >
                    <FileCode className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[11px] truncate flex items-center justify-between gap-1">
                        <span className="truncate">{file.path}</span>
                        <span className="text-[10px] shrink-0">{loc.flag}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {file.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-950 text-slate-200">
            {/* Action Toolbar */}
            <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-mono text-cyan-400 truncate">{currentFile.path}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {currentFile.category}
                </span>
              </div>

              <button
                onClick={() => handleCopy(currentFile)}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium border border-slate-700 transition-colors shrink-0"
              >
                {copiedId === currentFile.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy File</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content with Line Numbers */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed selection:bg-cyan-500/30">
              <pre className="text-slate-300 whitespace-pre-wrap">
                {currentFile.rawContent}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
