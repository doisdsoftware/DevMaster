import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Play,
  Target,
} from 'lucide-react';
import Markdown from 'react-markdown';
import type { Lesson } from '../data/roadmapData';
import { getAdjacentLessons } from '../data/roadmapData';
import { cn } from '../lib/utils';
import { ExerciseQuiz } from './ExerciseQuiz';

export type LessonTab = 'conteudo' | 'quiz' | 'extras';

type Props = {
  lesson: Lesson;
  tab: LessonTab;
  onTabChange: (t: LessonTab) => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpenTutor: () => void;
  onSelectLesson: (l: Lesson) => void;
  quizChoices: Record<string, number>;
  onQuizSelect: (exerciseId: string, optionIndex: number) => void;
};

const tabs: { id: LessonTab; label: string; icon: typeof BookOpen }[] = [
  { id: 'conteudo', label: 'Conteúdo', icon: BookOpen },
  { id: 'quiz', label: 'Avaliação', icon: ClipboardList },
  { id: 'extras', label: 'Recursos', icon: Target },
];

export function LessonPanel({
  lesson,
  tab,
  onTabChange,
  isCompleted,
  onToggleComplete,
  onOpenTutor,
  onSelectLesson,
  quizChoices,
  onQuizSelect,
}: Props) {
  const { prev, next } = getAdjacentLessons(lesson.id);

  return (
    <motion.article
      key={lesson.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-md shadow-zinc-900/[0.04] ring-1 ring-zinc-900/[0.02]"
      aria-labelledby={`lesson-title-${lesson.id}`}
    >
      <div className="relative overflow-hidden bg-zinc-950 px-6 py-10 md:px-10 md:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.45), transparent 45%),
              radial-gradient(circle at 80% 60%, rgba(234, 88, 12, 0.25), transparent 50%),
              linear-gradient(180deg, rgba(24, 24, 27, 0.2), rgba(9, 9, 11, 0.95))`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-200/90">
            <span className="rounded-md bg-white/10 px-2 py-0.5 backdrop-blur-sm">{lesson.category}</span>
            <span className="text-white/40">·</span>
            <span className="text-amber-100/80">{lesson.estimatedMinutes} min estimados</span>
          </div>
          <h2
            id={`lesson-title-${lesson.id}`}
            className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            {lesson.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-[15px]">{lesson.description}</p>
        </div>
      </div>

      <div className="border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 md:px-8">
        <div
          className="flex flex-wrap gap-1 rounded-xl bg-zinc-100/80 p-1 md:inline-flex"
          role="tablist"
          aria-label="Seções da aula"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const selected = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`tab-${id}-${lesson.id}`}
                aria-controls={`tabpanel-${id}-${lesson.id}`}
                onClick={() => onTabChange(id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition',
                  selected
                    ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/80'
                    : 'text-zinc-600 hover:text-zinc-900',
                )}
              >
                <Icon size={16} strokeWidth={2} aria-hidden />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-8 md:px-10 md:py-10">
        <AnimatePresence mode="wait">
          {tab === 'conteudo' && (
            <motion.div
              key="c"
              role="tabpanel"
              id={`tabpanel-conteudo-${lesson.id}`}
              aria-labelledby={`tab-conteudo-${lesson.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {lesson.studyTip && (
                <div className="mb-8 flex gap-3 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/30 p-4 md:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Lightbulb size={20} strokeWidth={2} aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-800/80">
                      Dica de estudo
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-700">{lesson.studyTip}</p>
                  </div>
                </div>
              )}
              <div className="max-w-3xl">
                <div className="markdown-body">
                  <Markdown>{lesson.content}</Markdown>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'quiz' && (
            <motion.div
              key="q"
              role="tabpanel"
              id={`tabpanel-quiz-${lesson.id}`}
              aria-labelledby={`tab-quiz-${lesson.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-zinc-600">
                Questões para reforço. O feedback imediato ajuda a corrigir conceitos antes de avançar.
              </p>
              <ExerciseQuiz exercises={lesson.exercises} choices={quizChoices} onSelect={onQuizSelect} />
            </motion.div>
          )}

          {tab === 'extras' && (
            <motion.div
              key="e"
              role="tabpanel"
              id={`tabpanel-extras-${lesson.id}`}
              aria-labelledby={`tab-extras-${lesson.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-10"
            >
              <section>
                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-zinc-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Target size={18} strokeWidth={2} aria-hidden />
                  </span>
                  Objetivos de aprendizagem
                </h3>
                <ul className="space-y-3">
                  {lesson.objectives.map((o, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50/40 px-4 py-3 text-sm leading-relaxed text-zinc-700"
                    >
                      <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-4 text-base font-semibold text-zinc-900">Glossário</h3>
                {lesson.glossary.length === 0 ? (
                  <p className="text-sm text-zinc-500">Nenhum termo adicional nesta aula.</p>
                ) : (
                  <dl className="grid gap-3 sm:grid-cols-1">
                    {lesson.glossary.map((g) => (
                      <div
                        key={g.term}
                        className="rounded-xl border border-zinc-100 bg-white px-4 py-3.5 shadow-sm"
                      >
                        <dt className="font-semibold text-zinc-900">{g.term}</dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-zinc-600">{g.definition}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>

              <section>
                <h3 className="mb-4 text-base font-semibold text-zinc-900">Referências</h3>
                {lesson.resources.length === 0 ? (
                  <p className="text-sm text-zinc-500">
                    Use o Tutor IA ou a documentação oficial da tecnologia que estiver estudando.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {lesson.resources.map((r) => (
                      <li key={r.url}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm font-medium text-amber-700 transition hover:text-amber-800"
                        >
                          <span className="border-b border-amber-700/30 transition group-hover:border-amber-800">
                            {r.title}
                          </span>
                          <ExternalLink size={14} className="opacity-60" strokeWidth={2} aria-hidden />
                        </a>
                        {r.note && <p className="mt-1 text-xs text-zinc-500">{r.note}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4 border-t border-zinc-100 bg-zinc-50/30 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex w-full gap-2 sm:w-auto">
          <button
            type="button"
            disabled={!prev}
            onClick={() => prev && onSelectLesson(prev)}
            className={cn(
              'inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition sm:flex-none',
              prev
                ? 'border-zinc-200 bg-white text-zinc-800 shadow-sm hover:border-zinc-300 hover:bg-zinc-50'
                : 'cursor-not-allowed border-transparent bg-zinc-100 text-zinc-300',
            )}
          >
            <ArrowLeft size={18} strokeWidth={2} aria-hidden />
            Anterior
          </button>
          <button
            type="button"
            disabled={!next}
            onClick={() => next && onSelectLesson(next)}
            className={cn(
              'inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition sm:flex-none',
              next
                ? 'border-zinc-200 bg-white text-zinc-800 shadow-sm hover:border-zinc-300 hover:bg-zinc-50'
                : 'cursor-not-allowed border-transparent bg-zinc-100 text-zinc-300',
            )}
          >
            Próxima
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-zinc-100 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-8">
        <button
          type="button"
          onClick={onToggleComplete}
          className={cn(
            'inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-semibold shadow-sm transition active:scale-[0.99] md:h-11',
            isCompleted
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/25 hover:from-amber-600 hover:to-orange-700',
          )}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={20} strokeWidth={2} aria-hidden />
              Aula concluída
            </>
          ) : (
            <>
              <Play size={20} fill="currentColor" aria-hidden />
              Marcar como concluída
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenTutor}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-zinc-900"
        >
          <MessageSquare size={18} strokeWidth={2} aria-hidden />
          Falar com o Tutor IA
        </button>
      </div>
    </motion.article>
  );
}

export function LessonEmptyState({ onHint }: { onHint?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white px-8 py-16 text-center shadow-sm"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-50 ring-1 ring-zinc-200/80">
        <GraduationCap size={32} className="text-zinc-400" strokeWidth={1.5} aria-hidden />
      </div>
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Comece por uma aula</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
        Selecione um módulo na barra lateral. O conteúdo foi organizado em sequência lógica — da lógica de programação
        até arquitetura e deploy.
      </p>
      {onHint ? (
        <button
          type="button"
          onClick={onHint}
          className="mt-8 text-sm font-semibold text-amber-700 transition hover:text-amber-800"
        >
          Abrir Tutor IA para um plano de estudos →
        </button>
      ) : null}
    </motion.div>
  );
}
