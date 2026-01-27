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
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { courses } from '@/data/courses';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CategoryType } from '@/types/course';

const categoryColors: Record<CategoryType, string> = {
  programming: 'bg-category-programming',
  networks: 'bg-category-networks',
  robotics: 'bg-category-robotics',
  electronics: 'bg-category-electronics',
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(course?.chapters[0]?.id || null);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cours non trouvé</p>
      </div>
    );
  }

  const handleLessonClick = (chapterId: string, lessonId: string) => {
    navigate(`/course/${course.id}/chapter/${chapterId}/lesson/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className={cn(
        "relative h-48",
        categoryColors[course.category]
      )}>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Course Info */}
      <div className="px-4 -mt-8 relative">
        <div className="bg-card rounded-2xl shadow-card p-4">
          <h1 className="text-xl font-bold text-foreground">{course.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount}</span>
            </div>
          </div>

          {course.isEnrolled && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">Progression</span>
                <span className="text-xs font-semibold text-primary">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-semibold text-foreground mb-2">Description</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Course Content */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Contenu du cours</h2>
          <span className="text-xs text-muted-foreground">
            {course.chaptersCount} chapitres • {course.lessonsCount} leçons
          </span>
        </div>

        <div className="space-y-3">
          {course.chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id} className="bg-card rounded-xl shadow-card overflow-hidden">
              <button
                onClick={() => setExpandedChapter(
                  expandedChapter === chapter.id ? null : chapter.id
                )}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold",
                    chapter.isCompleted 
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {chapterIndex + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground text-sm">{chapter.title}</h3>
                    <p className="text-xs text-muted-foreground">{chapter.lessons.length} leçons</p>
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
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(chapter.id, lesson.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        lesson.isCompleted 
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border-2 border-border"
                      )}>
                        {lesson.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Play className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                      {lesson.hasExercise && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          Exercice
                        </span>
                      )}
                    </button>
                  ))}
                  
                  {chapter.hasFinalExercise && (
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground flex-shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-primary">Exercice Final</p>
                        <p className="text-xs text-primary/70">Test du chapitre</p>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button 
          className="w-full h-12 text-base font-semibold rounded-xl gradient-primary hover:opacity-90 transition-opacity"
        >
          {course.isEnrolled ? 'Continuer le cours' : "S'inscrire gratuitement"}
        </Button>
      </div>
    </div>
  );
}
