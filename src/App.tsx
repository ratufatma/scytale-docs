import React, { useState, useEffect } from 'react';
import { DOC_FILES } from './data/docsContent';
import { LOCALES } from './data/locales';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocViewer } from './components/DocViewer';
import { RawFilesModal } from './components/RawFilesModal';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [locale, setLocale] = useState<string>('en');
  const [activeDocId, setActiveDocId] = useState<string>('en-index');
  const [isRawModalOpen, setIsRawModalOpen] = useState<boolean>(false);
  const [modalInitialFile, setModalInitialFile] = useState<string>('config');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const activeDoc = DOC_FILES.find(d => d.id === activeDocId) || DOC_FILES[1];
  const isDark = theme === 'dark';
  const isRTL = locale === 'ar';

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectLocale = (newLocale: string) => {
    setLocale(newLocale);
    // Automatically match the index doc of that locale
    if (newLocale === 'en') setActiveDocId('en-index');
    else if (newLocale === 'id') setActiveDocId('id-index');
    else if (newLocale === 'zh') setActiveDocId('zh-index');
    else if (newLocale === 'ja') setActiveDocId('ja-index');
    else if (newLocale === 'ko') setActiveDocId('ko-index');
    else if (newLocale === 'hi') setActiveDocId('hi-index');
    else if (newLocale === 'ar') setActiveDocId('ar-index');
  };

  const handleOpenRawModal = (fileId: string = 'config') => {
    setModalInitialFile(fileId);
    setIsRawModalOpen(true);
  };

  const handleSelectDoc = (id: string) => {
    setActiveDocId(id);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen font-sans selection:bg-cyan-500/30 relative overflow-x-hidden transition-colors ${
        isDark ? 'bg-[#0b0f19] text-[#f8fafc]' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Background Geometric Balance Circles */}
      <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-20 z-0 hidden lg:block">
        <div className="w-[420px] h-[420px] border border-cyan-500 rounded-full flex items-center justify-center">
          <div className="w-[220px] h-[220px] border border-emerald-500 rounded-full flex items-center justify-center">
            <div className="w-[80px] h-[80px] border border-cyan-400/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Top Header with Theme Switch & i18n Dropdown */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        locale={locale}
        onSelectLocale={handleSelectLocale}
        onSelectDoc={handleSelectDoc}
        onOpenRawModal={() => handleOpenRawModal(activeDocId)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto flex relative z-10">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            theme={theme}
            onToggleTheme={toggleTheme}
            locale={locale}
            onSelectLocale={handleSelectLocale}
            activeDocId={activeDocId}
            onSelectDoc={handleSelectDoc}
            onOpenRawModal={handleOpenRawModal}
          />
        </div>

        {/* Mobile Drawer Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div
              className={`relative w-72 max-w-[80vw] z-10 h-full p-4 overflow-y-auto border-r ${
                isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <Sidebar
                theme={theme}
                onToggleTheme={toggleTheme}
                locale={locale}
                onSelectLocale={handleSelectLocale}
                activeDocId={activeDocId}
                onSelectDoc={handleSelectDoc}
                onOpenRawModal={id => {
                  setIsMobileSidebarOpen(false);
                  handleOpenRawModal(id);
                }}
              />
            </div>
          </div>
        )}

        {/* Document Content View */}
        <main className="flex-1 min-w-0 pb-16">
          <DocViewer
            theme={theme}
            locale={locale}
            file={activeDoc}
            onNavigate={handleSelectDoc}
            onOpenRawModal={handleOpenRawModal}
          />
        </main>
      </div>

      {/* Raw Files Exporter Modal (18 files across 7 locales) */}
      <RawFilesModal
        theme={theme}
        isOpen={isRawModalOpen}
        onClose={() => setIsRawModalOpen(false)}
        initialFileId={modalInitialFile}
      />
    </div>
  );
}
