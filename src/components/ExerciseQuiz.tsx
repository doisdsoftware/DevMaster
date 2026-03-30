import { CheckCircle2, CircleAlert, Lightbulb } from 'lucide-react';
import type { Exercise } from '../data/roadmapData';
import { cn } from '../lib/utils';

type Props = {
  exercises: Exercise[];
  choices: Record<string, number>;
  onSelect: (exerciseId: string, optionIndex: number) => void;
};

export function ExerciseQuiz({ exercises, choices, onSelect }: Props) {
  if (!exercises.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 px-4 py-8 text-center">
        <p className="text-sm font-medium text-zinc-700">Sem questões nesta aula</p>
        <p className="mt-1 text-xs text-zinc-500">
          Use a aba Recursos ou o Tutor IA para aprofundar com exercícios personalizados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {exercises.map((ex, idx) => {
        const selected = choices[ex.id];
        const isAnswered = selected !== undefined;
        const isCorrect = isAnswered && selected === ex.correctIndex;

        return (
          <div
            key={ex.id}
            className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm md:p-6"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-amber-700/90">
              Questão {idx + 1} de {exercises.length}
            </p>
            <p className="mb-4 text-[15px] font-medium leading-snug text-zinc-900">{ex.question}</p>
            <div className="space-y-2">
              {ex.options.map((opt, i) => {
                const picked = selected === i;
                const showSolution = isAnswered;
                const correct = i === ex.correctIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => onSelect(ex.id, i)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                      !showSolution &&
                        'border-zinc-200 bg-zinc-50/30 hover:border-amber-300/60 hover:bg-amber-50/40',
                      showSolution && correct && 'border-emerald-300 bg-emerald-50 text-emerald-950',
                      showSolution && !correct && picked && 'border-red-200 bg-red-50 text-red-950',
                      showSolution && !correct && !picked && 'border-zinc-100 bg-zinc-50/50 text-zinc-400',
                    )}
                  >
                    <span className="font-mono text-xs font-semibold tabular-nums text-zinc-400">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div
                className={cn(
                  'mt-4 flex gap-3 rounded-xl border p-4 text-sm',
                  isCorrect
                    ? 'border-emerald-200/80 bg-emerald-50/80 text-emerald-950'
                    : 'border-amber-200/80 bg-amber-50/60 text-amber-950',
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} strokeWidth={2} />
                ) : (
                  <CircleAlert className="mt-0.5 shrink-0 text-amber-600" size={18} strokeWidth={2} />
                )}
                <div>
                  <p className="font-semibold">{isCorrect ? 'Correto' : 'Quase — leia o feedback'}</p>
                  <p className="mt-1 leading-relaxed opacity-90">{ex.explanation}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <p className="flex items-start gap-2 border-t border-zinc-100 pt-4 text-xs text-zinc-500">
        <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2} aria-hidden />
        <span>
          Respostas e progresso ficam salvos neste navegador (armazenamento local), junto com as aulas concluídas.
        </span>
      </p>
    </div>
  );
}
