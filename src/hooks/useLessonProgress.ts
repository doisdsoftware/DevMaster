import { useCallback, useEffect, useMemo, useState } from 'react';

const COMPLETED_KEY = 'devmaster-completed-lessons';
const QUIZ_KEY = 'devmaster-quiz-state';

export type QuizRecord = Record<string, Record<string, number>>;

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useLessonProgress(totalLessons: number) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [quizChoices, setQuizChoices] = useState<QuizRecord>({});

  useEffect(() => {
    setCompleted(loadJson<string[]>(COMPLETED_KEY, []));
    setQuizChoices(loadJson<QuizRecord>(QUIZ_KEY, {}));
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setQuizAnswer = useCallback((lessonId: string, exerciseId: string, optionIndex: number) => {
    setQuizChoices((prev) => {
      const next = {
        ...prev,
        [lessonId]: { ...prev[lessonId], [exerciseId]: optionIndex },
      };
      localStorage.setItem(QUIZ_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const progressPercent = useMemo(() => {
    if (!totalLessons) return 0;
    return Math.min(100, Math.round((completed.length / totalLessons) * 100));
  }, [completed.length, totalLessons]);

  return {
    completed,
    toggleCompleted,
    quizChoices,
    setQuizAnswer,
    progressPercent,
  };
}
