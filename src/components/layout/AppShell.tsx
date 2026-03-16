import React, { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { CopilotPanel } from '../copilot/CopilotPanel';

interface AppShellProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children, navbar }) => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [side, setSide] = useState<'left' | 'right'>('right');
  const [width, setWidth] = useState(400);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (ev: MouseEvent) => {
      if (!isResizing.current) return;
      const delta = side === 'right' ? startX - ev.clientX : ev.clientX - startX;
      setWidth(Math.min(600, Math.max(320, startWidth + delta)));
    };

    const onMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [width, side]);

  return (
    <div className={`flex h-screen w-full overflow-hidden bg-background ${side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}>
      <main className="relative flex-1 overflow-y-auto transition-all duration-300 ease-out">
        {navbar}
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Copilot FAB */}
      {!isCopilotOpen && (
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-elevated animate-pulse-glow cursor-pointer transition-transform hover:scale-110"
          aria-label="Open AI Copilot"
        >
          <Bot className="w-7 h-7 text-primary-foreground" />
        </button>
      )}

      <AnimatePresence mode="popLayout">
        {isCopilotOpen && (
          <motion.aside
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ width }}
            className={`h-full bg-surface shadow-copilot z-20 flex flex-col relative ${side === 'right' ? 'border-l border-border' : 'border-r border-border'}`}
            style={{ width }}
          >
            {/* Resize handle */}
            <div
              onMouseDown={handleMouseDown}
              className={`absolute top-0 ${side === 'right' ? 'left-0' : 'right-0'} w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors z-30`}
            />
            <CopilotPanel
              onClose={() => setIsCopilotOpen(false)}
              onToggleSide={() => setSide(s => s === 'right' ? 'left' : 'right')}
              side={side}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
