import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'elearning_enrollments';

function read(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function useEnrollment() {
  const [enrolled, setEnrolled] = useState<string[]>(() => read());

  useEffect(() => {
    const handler = () => setEnrolled(read());
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const isEnrolled = useCallback(
    (courseId: string) => enrolled.includes(courseId),
    [enrolled]
  );

  const enroll = useCallback((courseId: string) => {
    const current = read();
    if (!current.includes(courseId)) {
      const next = [...current, courseId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      notify();
    }
  }, []);

  const unenroll = useCallback((courseId: string) => {
    const next = read().filter((id) => id !== courseId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    notify();
  }, []);

  return { enrolled, isEnrolled, enroll, unenroll };
}
