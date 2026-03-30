import { useEffect } from 'react';
import type { RefObject } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, Loader2, MessageSquare, Send, X } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

type ChatMessage = { role: 'user' | 'ai'; text: string };

type Props = {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  isTyping: boolean;
  chatEndRef: RefObject<HTMLDivElement | null>;
  lessonTitle?: string;
};

export function TutorDrawer({
  open,
  onClose,
  messages,
  input,
  onInputChange,
  onSend,
  isTyping,
  chatEndRef,
  lessonTitle,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-[2px]"
            aria-hidden
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-zinc-200/80 bg-white shadow-2xl shadow-zinc-900/10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tutor-drawer-title"
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-100 bg-zinc-950 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-900/30">
                  <Bot size={22} strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 id="tutor-drawer-title" className="truncate text-base font-semibold text-white">
                    Tutor DevMaster
                  </h3>
                  <p className="truncate text-[11px] font-medium text-zinc-400">
                    {lessonTitle ? `Contexto: ${lessonTitle}` : 'Assistente de aprendizado'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Fechar painel do tutor"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
                {messages.length === 0 && (
                  <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/80">
                      <MessageSquare size={22} className="text-zinc-400" strokeWidth={2} aria-hidden />
                    </div>
                    <p className="text-sm font-medium text-zinc-800">Como posso ajudar?</p>
                    <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-zinc-500">
                      Perguntas sobre a trilha, exercícios extras, revisão de código ou plano de estudos. Com uma aula
                      aberta, uso o conteúdo como referência.
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex flex-col gap-1',
                      msg.role === 'user' ? 'items-end' : 'items-start',
                    )}
                  >
                    <span className="px-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                      {msg.role === 'user' ? 'Você' : 'Tutor'}
                    </span>
                    <div
                      className={cn(
                        'max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
                        msg.role === 'user'
                          ? 'rounded-tr-md bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                          : 'rounded-tl-md border border-zinc-100 bg-zinc-50 text-zinc-800',
                      )}
                    >
                      <div
                        className={cn(
                          'markdown-body text-[14px] leading-relaxed',
                          msg.role === 'user' && 'markdown-body--on-accent',
                        )}
                      >
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Loader2 size={16} className="animate-spin" strokeWidth={2} aria-hidden />
                    <span className="text-xs font-medium">Gerando resposta…</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="border-t border-zinc-100 bg-white p-4">
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSend();
                      }
                    }}
                    placeholder="Ex.: explique closures com um exemplo em TypeScript…"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 pr-14 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-amber-500/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/15"
                    aria-label="Mensagem para o tutor"
                  />
                  <button
                    type="button"
                    onClick={onSend}
                    disabled={!input.trim() || isTyping}
                    className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm transition hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Enviar mensagem"
                  >
                    <Send size={18} strokeWidth={2} />
                  </button>
                </div>
                <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                  Enter envia · Shift+Enter nova linha · Esc fecha
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
