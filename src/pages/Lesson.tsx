import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Play, FileText, Video } from 'lucide-react';
import { courses } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEnrollment } from '@/hooks/useEnrollment';
import { toast } from 'sonner';

type Tab = 'video' | 'text';

export default function Lesson() {
  const { id, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { isEnrolled } = useEnrollment();

  const [tab, setTab] = useState<Tab>('video');
  const [showExercise, setShowExercise] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);

  const course = courses.find((c) => c.id === id);
  const chapter = course?.chapters.find((ch) => ch.id === chapterId);
  const lesson = chapter?.lessons.find((l) => l.id === lessonId);

  const enrolled = course ? course.isEnrolled || isEnrolled(course.id) : false;

  const questions = useMemo(
    () =>
      lesson?.exercise?.questions ?? [
        {
          id: 'fallback',
          text: `Question sur "${lesson?.title}"`,
          options: ['Réponse correcte', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
        },
      ],
    [lesson]
  );

  if (!course || !chapter || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Leçon non trouvée</p>
      </div>
    );
  }

  if (!enrolled) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-12 h-12 text-primary mb-4" />
        <h2 className="text-lg font-bold mb-2">Inscription requise</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Vous devez vous inscrire au cours pour accéder à cette leçon.
        </p>
        <Button onClick={() => navigate(`/course/${course.id}`)} className="gradient-primary">
          Voir le cours
        </Button>
      </div>
    );
  }

  const lessonIndex = chapter.lessons.findIndex((l) => l.id === lessonId);
  const chapterIndex = course.chapters.findIndex((c) => c.id === chapterId);
  const isLastLesson = lessonIndex === chapter.lessons.length - 1;
  const isLastChapter = chapterIndex === course.chapters.length - 1;
  const nextLesson = chapter.lessons[lessonIndex + 1];
  const nextChapter = course.chapters[chapterIndex + 1];

  const currentQuestion = questions[currentQ];
  const isCorrect = validated && selectedAnswer === currentQuestion.correctAnswer;

  const resetExercise = () => {
    setShowExercise(false);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setValidated(false);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;
    setValidated(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      toast.success('Bonne réponse !');
    } else {
      toast.error('Réponse incorrecte, réessayez.');
    }
  };

  const handleNext = () => {
    // Cas: contenu de leçon -> exercice
    if (!showExercise) {
      if (lesson.hasExercise) {
        setShowExercise(true);
        return;
      }
      goToNext();
      return;
    }

    // Cas: exercice
    if (!validated) {
      handleValidate();
      return;
    }
    if (!isCorrect) {
      // Permettre de réessayer
      setValidated(false);
      setSelectedAnswer(null);
      return;
    }

    // Question suivante
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setValidated(false);
      return;
    }

    // Fin de l'exercice -> suite
    toast.success('Exercice réussi 🎉');
    goToNext();
  };

  const goToNext = () => {
    resetExercise();
    if (nextLesson) {
      navigate(`/course/${id}/chapter/${chapterId}/lesson/${nextLesson.id}`);
    } else if (isLastLesson && !isLastChapter && nextChapter) {
      // Aller à la première leçon du chapitre suivant
      navigate(`/course/${id}/chapter/${nextChapter.id}/lesson/${nextChapter.lessons[0].id}`);
    } else if (isLastLesson && isLastChapter) {
      // Fin du cours -> test final
      navigate(`/course/${id}/test`);
    } else {
      navigate(`/course/${id}`);
    }
  };

  const buttonLabel = () => {
    if (!showExercise) return lesson.hasExercise ? "Passer à l'exercice" : 'Continuer';
    if (!validated) return 'Valider';
    if (!isCorrect) return 'Réessayer';
    if (currentQ < questions.length - 1) return 'Question suivante';
    if (isLastLesson && isLastChapter) return 'Passer au test final';
    return 'Continuer';
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(`/course/${id}`)}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="text-center flex-1 px-4">
            <p className="text-xs text-muted-foreground truncate">{chapter.title}</p>
            <h1 className="text-sm font-semibold text-foreground truncate">{lesson.title}</h1>
          </div>
          <div className="w-9" />
        </div>

        {/* Progress lessons */}
        <div className="px-4 pb-3">
          <div className="flex gap-1">
            {chapter.lessons.map((l, idx) => (
              <div
                key={l.id}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all',
                  idx < lessonIndex ? 'bg-primary' : idx === lessonIndex ? 'bg-primary/70' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {!showExercise ? (
          <div className="animate-fade-in">
            {/* Tabs vidéo / texte */}
            <div className="flex gap-2 mb-4 p-1 bg-muted rounded-xl">
              <button
                onClick={() => setTab('video')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                  tab === 'video' ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground'
                )}
              >
                <Video className="w-4 h-4" /> Vidéo
              </button>
              <button
                onClick={() => setTab('text')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                  tab === 'text' ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground'
                )}
              >
                <FileText className="w-4 h-4" /> Texte
              </button>
            </div>

            {tab === 'video' ? (
              <div className="animate-fade-in">
                <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-card mb-4">
                  {lesson.videoUrl ? (
                    <iframe
                      src={lesson.videoUrl}
                      title={lesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/60">
                      <Play className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <h2 className="text-lg font-bold text-foreground">{lesson.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">Durée: {lesson.duration}</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-foreground mb-3">{lesson.title}</h2>
                <div className="bg-card rounded-xl p-4 shadow-card mb-4">
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                    {lesson.textContent}
                  </p>
                </div>
              </div>
            )}

            {lesson.keyPoints && lesson.keyPoints.length > 0 && (
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mt-4">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Points clés à retenir</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {lesson.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Exercice</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Question {currentQ + 1} / {questions.length}
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-card mb-4">
              <p className="font-medium text-foreground">{currentQuestion.text}</p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOpt = index === currentQuestion.correctAnswer;
                return (
                  <button
                    key={index}
                    onClick={() => !validated && setSelectedAnswer(index)}
                    disabled={validated}
                    className={cn(
                      'w-full p-4 rounded-xl text-left transition-all border-2',
                      validated && isCorrectOpt
                        ? 'bg-primary/10 border-primary text-foreground'
                        : validated && isSelected && !isCorrectOpt
                        ? 'bg-destructive/10 border-destructive text-foreground'
                        : isSelected
                        ? 'bg-primary/5 border-primary'
                        : 'bg-card border-transparent shadow-card hover:shadow-card-hover'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0',
                          isSelected || (validated && isCorrectOpt)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-sm">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {validated && currentQuestion.explanation && (
              <div className="mt-4 p-4 rounded-xl bg-muted animate-scale-in">
                <p className="text-xs text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          onClick={handleNext}
          disabled={showExercise && !validated && selectedAnswer === null}
          className="w-full h-12 text-base font-semibold rounded-xl gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            {buttonLabel()}
            <ArrowRight className="w-5 h-5" />
          </span>
        </Button>
      </div>
    </div>
  );
}
