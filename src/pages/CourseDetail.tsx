import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  GraduationCap,
  Share2,
} from 'lucide-react';
import { courses } from '@/data/courses';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CategoryType } from '@/types/course';
import { useEnrollment } from '@/hooks/useEnrollment';
import { toast } from 'sonner';

const categoryColors: Record<CategoryType, string> = {
  programming: 'bg-category-programming',
  networks: 'bg-category-networks',
  robotics: 'bg-category-robotics',
  electronics: 'bg-category-electronics',
};

const categoryLabels: Record<CategoryType, string> = {
  programming: 'Programmation',
  networks: 'Réseaux',
  robotics: 'Robotique',
  electronics: 'Électronique',
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  const { isEnrolled, enroll } = useEnrollment();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(
    course?.chapters[0]?.id || null
  );

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cours non trouvé</p>
      </div>
    );
  }

  const enrolled = course.isEnrolled || isEnrolled(course.id);

  const firstLesson = course.chapters[0]?.lessons[0];

  const handlePrimary = () => {
    if (!enrolled) {
      enroll(course.id);
      toast.success('Inscription réussie 🎉');
      return;
    }
    if (firstLesson) {
      navigate(`/course/${course.id}/chapter/${course.chapters[0].id}/lesson/${firstLesson.id}`);
    }
  };

  const handleLessonClick = (chapterId: string, lessonId: string) => {
    if (!enrolled) {
      toast.info('Inscrivez-vous pour accéder aux leçons');
      return;
    }
    navigate(`/course/${course.id}/chapter/${chapterId}/lesson/${lessonId}`);
  };

  const handleTest = () => {
    if (!enrolled) {
      toast.info('Inscrivez-vous pour accéder au test final');
      return;
    }
    navigate(`/course/${course.id}/test`);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Hero */}
      <div className={cn('relative h-56 overflow-hidden', categoryColors[course.category])}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/40" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2.5 rounded-full bg-black/30 backdrop-blur-md text-white z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-black/30 backdrop-blur-md text-white z-10">
          <Share2 className="w-5 h-5" />
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-foreground">
            {categoryLabels[course.category]}
          </span>
          {course.level && (
            <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-semibold text-white">
              {course.level}
            </span>
          )}
        </div>
      </div>

      {/* Course Info */}
      <div className="px-4 -mt-6 relative">
        <div className="bg-card rounded-2xl shadow-card-hover p-5">
          <h1 className="text-xl font-bold text-foreground leading-tight">{course.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">par {course.instructor}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-semibold text-foreground">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount.toLocaleString()}</span>
            </div>
          </div>

          {enrolled && course.progress > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-muted-foreground">Progression</span>
                <span className="text-xs font-semibold text-primary">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-2">
        <div className="bg-card rounded-xl p-3 shadow-card text-center">
          <p className="text-lg font-bold text-primary">{course.chaptersCount}</p>
          <p className="text-[10px] text-muted-foreground">Chapitres</p>
        </div>
        <div className="bg-card rounded-xl p-3 shadow-card text-center">
          <p className="text-lg font-bold text-primary">{course.lessonsCount}</p>
          <p className="text-[10px] text-muted-foreground">Leçons</p>
        </div>
        <div className="bg-card rounded-xl p-3 shadow-card text-center">
          <p className="text-lg font-bold text-primary">1</p>
          <p className="text-[10px] text-muted-foreground">Test final</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-semibold text-foreground mb-2">À propos de ce cours</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
      </div>

      {/* Course Content */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Contenu du cours</h2>
          <span className="text-xs text-muted-foreground">
            {course.chaptersCount} chapitres • {course.lessonsCount} leçons
          </span>
        </div>

        <div className="space-y-3">
          {course.chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id} className="bg-card rounded-xl shadow-card overflow-hidden">
              <button
                onClick={() =>
                  setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)
                }
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold',
                      chapter.isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {chapterIndex + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground text-sm">{chapter.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {chapter.lessons.length} leçons
                      {chapter.hasFinalExercise ? ' • 1 exercice final' : ''}
                    </p>
                  </div>
                </div>
                {expandedChapter === chapter.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {expandedChapter === chapter.id && (
                <div className="px-4 pb-4 space-y-2 animate-fade-in">
                  {chapter.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(chapter.id, lesson.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted transition-colors"
                    >
                      <div
                        className={cn(
                          'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
                          lesson.isCompleted
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border-2 border-border'
                        )}
                      >
                        {lesson.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-muted-foreground ml-0.5" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {lesson.duration}
                          {lesson.videoUrl ? ' • Vidéo + Texte' : ' • Texte'}
                        </p>
                      </div>
                      {lesson.hasExercise && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex-shrink-0">
                          Exercice
                        </span>
                      )}
                    </button>
                  ))}

                  {chapter.hasFinalExercise && (
                    <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground flex-shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-primary">Exercice final du chapitre</p>
                        <p className="text-xs text-primary/70">Validez vos acquis</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Test final du cours */}
          <button
            onClick={handleTest}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:from-primary/15 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-primary-foreground flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Test final du cours</p>
              <p className="text-xs text-muted-foreground">
                Obtenez votre certificat à la fin de ce cours
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          onClick={handlePrimary}
          className="w-full h-12 text-base font-semibold rounded-xl gradient-primary hover:opacity-90 transition-opacity"
        >
          {enrolled
            ? course.progress > 0
              ? 'Continuer le cours'
              : 'Commencer le cours'
            : "S'inscrire gratuitement"}
        </Button>
      </div>
    </div>
  );
}
