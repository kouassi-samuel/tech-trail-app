export type CategoryType = 'programming' | 'networks' | 'robotics' | 'electronics';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon: string;
  description: string;
  courseCount: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  questions: Question[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  textContent: string;
  keyPoints?: string[];
  isCompleted: boolean;
  hasExercise: boolean;
  exercise?: Exercise;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  hasFinalExercise: boolean;
  finalExercise?: Exercise;
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  thumbnail: string;
  instructor: string;
  duration: string;
  lessonsCount: number;
  chaptersCount: number;
  progress: number;
  rating: number;
  studentsCount: number;
  chapters: Chapter[];
  isEnrolled: boolean;
  level?: 'Débutant' | 'Intermédiaire' | 'Avancé';
  finalTest?: Exercise;
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  completedChapters: string[];
  currentLesson?: string;
}
