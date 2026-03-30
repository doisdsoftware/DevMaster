/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Bot, GraduationCap, Trophy } from 'lucide-react';
import { LessonEmptyState, LessonPanel, type LessonTab } from './components/LessonPanel';
import { RoadmapSidebar } from './components/RoadmapSidebar';
import { TutorDrawer } from './components/TutorDrawer';
import { ROADMAP_DATA, type Lesson, getTotalLessonCount } from './data/roadmapData';
import { useLessonProgress } from './hooks/useLessonProgress';
import { askTutor } from './services/geminiService';

const TOTAL_LESSONS = getTotalLessonCount();

export default function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonTab, setLessonTab] = useState<LessonTab>('conteudo');
  const [sidebarFilter, setSidebarFilter] = useState('');
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const { completed, toggleCompleted, quizChoices, setQuizAnswer, progressPercent } =
    useLessonProgress(TOTAL_LESSONS);

  useEffect(() => {
    setLessonTab('conteudo');
  }, [selectedLesson?.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping, isTutorOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const context = selectedLesson
      ? [
          `Aula: ${selectedLesson.title}`,
          `Descrição: ${selectedLesson.description}`,
          `Objetivos: ${selectedLesson.objectives.join(' | ')}`,
          `Dica de estudo: ${selectedLesson.studyTip ?? '—'}`,
          `Conteúdo (trecho): ${selectedLesson.content.slice(0, 12_000)}`,
        ].join('\n')
      : undefined;

    const response = await askTutor(userMsg, context);
    setChatMessages((prev) => [...prev, { role: 'ai', text: response }]);
    setIsTyping(false);
  };

  const currentQuiz = selectedLesson ? (quizChoices[selectedLesson.id] ?? {}) : {};

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-amber-200/80">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-white focus:text-zinc-900 focus:shadow-lg focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-black/5"
              aria-hidden
            >
              <GraduationCap size={22} strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold tracking-tight text-zinc-900">DevMaster</h1>
                <span className="hidden rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 sm:inline">
                  Academy
                </span>
              </div>
              <p className="text-xs font-medium text-zinc-500">Trilha estruturada · Fundamentos ao deploy</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <div
              className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3 py-2"
              role="status"
              aria-label={`Progresso: ${completed.length} de ${TOTAL_LESSONS} aulas concluídas`}
            >
              <div className="h-2 w-[min(140px,28vw)] overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-zinc-600">
                <Trophy size={14} className="text-amber-600" aria-hidden />
                <span>
                  {completed.length}/{TOTAL_LESSONS}
                </span>
                <span className="text-zinc-400">·</span>
                <span className="tabular-nums text-zinc-500">{progressPercent}%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsTutorOpen(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              <Bot size={18} strokeWidth={2} aria-hidden />
              Tutor IA
            </button>
          </div>
        </div>
      </header>

      <main
        id="conteudo-principal"
        className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-8"
        tabIndex={-1}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4" aria-label="Trilha de aprendizado">
            <RoadmapSidebar
              modules={ROADMAP_DATA}
              selectedLesson={selectedLesson}
              completedIds={completed}
              filter={sidebarFilter}
              onFilterChange={setSidebarFilter}
              onSelectLesson={setSelectedLesson}
            />
          </aside>

          <section className="lg:col-span-8" aria-label="Conteúdo da aula">
            <AnimatePresence mode="wait">
              {selectedLesson ? (
                <LessonPanel
                  key={selectedLesson.id}
                  lesson={selectedLesson}
                  tab={lessonTab}
                  onTabChange={setLessonTab}
                  isCompleted={completed.includes(selectedLesson.id)}
                  onToggleComplete={() => toggleCompleted(selectedLesson.id)}
                  onOpenTutor={() => setIsTutorOpen(true)}
                  onSelectLesson={setSelectedLesson}
                  quizChoices={currentQuiz}
                  onQuizSelect={(exerciseId, optionIndex) =>
                    setQuizAnswer(selectedLesson.id, exerciseId, optionIndex)
                  }
                />
              ) : (
                <LessonEmptyState key="empty" onHint={() => setIsTutorOpen(true)} />
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-200/80 bg-white/60 py-6 text-center">
        <p className="text-xs text-zinc-500">
          DevMaster · Conteúdo educacional · Progresso salvo localmente neste dispositivo
        </p>
      </footer>

      <TutorDrawer
        open={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        messages={chatMessages}
        input={inputMessage}
        onInputChange={setInputMessage}
        onSend={handleSendMessage}
        isTyping={isTyping}
        chatEndRef={chatEndRef}
        lessonTitle={selectedLesson?.title}
      />
    </div>
  );
}
