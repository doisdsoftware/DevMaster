import { BookOpen, CheckCircle2, ChevronRight, Code2, Cpu, Search } from 'lucide-react';
import type { Lesson, Module } from '../data/roadmapData';
import { cn } from '../lib/utils';

type Props = {
  modules: Module[];
  selectedLesson: Lesson | null;
  completedIds: string[];
  filter: string;
  onFilterChange: (v: string) => void;
  onSelectLesson: (lesson: Lesson) => void;
};

export function RoadmapSidebar({
  modules,
  selectedLesson,
  completedIds,
  filter,
  onFilterChange,
  onSelectLesson,
}: Props) {
  const q = filter.trim().toLowerCase();

  const visibleCount = modules.reduce((acc, m) => {
    const lessons = q
      ? m.lessons.filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q) ||
            l.category.toLowerCase().includes(q),
        )
      : m.lessons;
    return acc + lessons.length;
  }, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-900/5 ring-1 ring-zinc-900/[0.02] md:p-6">
        <div className="mb-5 flex items-end justify-between gap-2">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">Currículo</h2>
            <p className="mt-1 text-sm font-medium text-zinc-600">Sua trilha de aprendizado</p>
          </div>
          <span className="rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-medium tabular-nums text-zinc-500">
            {visibleCount} aulas
          </span>
        </div>

        <div className="relative mb-6">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-zinc-400"
            strokeWidth={2}
            aria-hidden
          />
          <input
            type="search"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Buscar por título ou tema…"
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 pl-10 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-amber-500/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            aria-label="Buscar aulas na trilha"
            autoComplete="off"
          />
        </div>

        {visibleCount === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 px-4 py-8 text-center">
            <p className="text-sm font-medium text-zinc-700">Nenhuma aula encontrada</p>
            <p className="mt-1 text-xs text-zinc-500">Ajuste os termos da busca ou limpe o campo.</p>
            {q ? (
              <button
                type="button"
                onClick={() => onFilterChange('')}
                className="mt-4 text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                Limpar busca
              </button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-8">
            {modules.map((module, idx) => {
              const visibleLessons = q
                ? module.lessons.filter(
                    (l) =>
                      l.title.toLowerCase().includes(q) ||
                      l.description.toLowerCase().includes(q) ||
                      l.category.toLowerCase().includes(q),
                  )
                : module.lessons;

              if (visibleLessons.length === 0) return null;

              return (
                <div key={module.id} className="relative">
                  {idx !== modules.length - 1 && (
                    <div
                      className="absolute left-[19px] top-11 bottom-0 w-px bg-gradient-to-b from-zinc-200 to-transparent pointer-events-none"
                      aria-hidden
                    />
                  )}
                  <div className="flex gap-4">
                    <div
                      className={cn(
                        'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-sm',
                        module.level === 'Iniciante' &&
                          'border-emerald-200 bg-emerald-50 text-emerald-700',
                        module.level === 'Intermediário' &&
                          'border-sky-200 bg-sky-50 text-sky-700',
                        module.level === 'Avançado' &&
                          'border-violet-200 bg-violet-50 text-violet-700',
                      )}
                    >
                      {module.level === 'Iniciante' ? (
                        <BookOpen size={17} strokeWidth={2} />
                      ) : module.level === 'Intermediário' ? (
                        <Code2 size={17} strokeWidth={2} />
                      ) : (
                        <Cpu size={17} strokeWidth={2} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        {module.level}
                      </span>
                      <h3 className="mt-0.5 text-base font-semibold leading-snug text-zinc-900">{module.title}</h3>
                      <div className="mt-3 space-y-1.5">
                        {visibleLessons.map((lesson) => {
                          const active = selectedLesson?.id === lesson.id;
                          const done = completedIds.includes(lesson.id);
                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => onSelectLesson(lesson)}
                              aria-current={active ? 'true' : undefined}
                              className={cn(
                                'group flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition',
                                active
                                  ? 'border-amber-300/80 bg-amber-50/90 shadow-sm ring-1 ring-amber-500/10'
                                  : 'border-zinc-100 bg-white hover:border-zinc-200 hover:bg-zinc-50/80',
                              )}
                            >
                              <div className="flex min-w-0 flex-1 items-start gap-3">
                                <span className="mt-0.5 shrink-0" aria-hidden>
                                  {done ? (
                                    <CheckCircle2 size={17} className="text-emerald-600" strokeWidth={2} />
                                  ) : (
                                    <span
                                      className={cn(
                                        'block size-[17px] rounded-full border-2 transition',
                                        active
                                          ? 'border-amber-400 bg-amber-100/50'
                                          : 'border-zinc-300 group-hover:border-amber-300/60',
                                      )}
                                    />
                                  )}
                                </span>
                                <div className="min-w-0">
                                  <span
                                    className={cn(
                                      'block truncate text-sm font-medium leading-snug',
                                      active ? 'text-zinc-900' : 'text-zinc-800',
                                    )}
                                  >
                                    {lesson.title}
                                  </span>
                                  <span className="mt-0.5 block text-[11px] text-zinc-500">
                                    {lesson.estimatedMinutes} min · {lesson.category}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight
                                size={16}
                                className={cn(
                                  'shrink-0 text-zinc-300 transition group-hover:text-zinc-400',
                                  active && 'text-amber-600',
                                )}
                                strokeWidth={2}
                                aria-hidden
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
