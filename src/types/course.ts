export type CategoryType = 'programming' | 'networks' | 'robotics' | 'electronics';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon: string;
  description: string;
  courseCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  isCompleted: boolean;
  hasExercise: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  hasFinalExercise: boolean;
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
}

export interface Exercise {
  id: string;
  type: 'lesson' | 'chapter';
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  completedChapters: string[];
  currentLesson?: string;
}
