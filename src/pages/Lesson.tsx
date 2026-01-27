import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { courses } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Lesson() {
  const { id, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showExercise, setShowExercise] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const course = courses.find(c => c.id === id);
  const chapter = course?.chapters.find(ch => ch.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  if (!course || !chapter || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Leçon non trouvée</p>
      </div>
    );
  }

  const lessonIndex = chapter.lessons.findIndex(l => l.id === lessonId);
  const isLastLesson = lessonIndex === chapter.lessons.length - 1;
  const nextLesson = chapter.lessons[lessonIndex + 1];

  const exerciseQuestion = {
    text: `Question sur "${lesson.title}"`,
    options: [
      'Réponse A - Option correcte',
      'Réponse B - Option incorrecte',
      'Réponse C - Option incorrecte',
      'Réponse D - Option incorrecte',
    ],
    correctAnswer: 0,
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setIsCorrect(index === exerciseQuestion.correctAnswer);
  };

  const handleNext = () => {
    if (showExercise && !isCorrect) {
      return;
    }

    if (lesson.hasExercise && !showExercise) {
      setShowExercise(true);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else if (nextLesson) {
      navigate(`/course/${id}/chapter/${chapterId}/lesson/${nextLesson.id}`);
      setShowExercise(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else if (isLastLesson && chapter.hasFinalExercise) {
      navigate(`/course/${id}/chapter/${chapterId}/exercise`);
    } else {
      navigate(`/course/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
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
            <p className="text-xs text-muted-foreground">{chapter.title}</p>
            <h1 className="text-sm font-semibold text-foreground truncate">{lesson.title}</h1>
          </div>
          <div className="w-9" />
        </div>
        
        {/* Progress */}
        <div className="px-4 pb-3">
          <div className="flex gap-1">
            {chapter.lessons.map((l, idx) => (
              <div
                key={l.id}
                className={cn(
                  "h-1 flex-1 rounded-full transition-all",
                  idx <= lessonIndex ? "bg-primary" : "bg-muted"
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
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-4">{lesson.title}</h2>
              
              <div className="bg-card rounded-xl p-4 shadow-card mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  {lesson.content}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-muted rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">📚 Points clés</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Premier point important de cette leçon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Deuxième concept à retenir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Troisième élément essentiel</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <h3 className="font-semibold text-primary mb-2">💡 Astuce</h3>
                  <p className="text-sm text-muted-foreground">
                    N'hésitez pas à pratiquer ces concepts en réalisant des exercices supplémentaires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Exercice</h2>
              <p className="text-sm text-muted-foreground mt-1">Testez vos connaissances</p>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-card mb-4">
              <p className="font-medium text-foreground">{exerciseQuestion.text}</p>
            </div>

            <div className="space-y-3">
              {exerciseQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isCorrect !== null}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all",
                    selectedAnswer === index
                      ? isCorrect
                        ? "bg-primary text-primary-foreground"
                        : "bg-destructive text-destructive-foreground"
                      : "bg-card shadow-card hover:shadow-card-hover"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                      selectedAnswer === index
                        ? "bg-white/20 text-inherit"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-sm">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {isCorrect !== null && (
              <div className={cn(
                "mt-4 p-4 rounded-xl text-center animate-scale-in",
                isCorrect ? "bg-primary/10" : "bg-destructive/10"
              )}>
                <p className={cn(
                  "font-semibold",
                  isCorrect ? "text-primary" : "text-destructive"
                )}>
                  {isCorrect ? "🎉 Excellent ! Bonne réponse !" : "❌ Incorrect. Essayez encore."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button 
          onClick={handleNext}
          disabled={showExercise && isCorrect !== true}
          className="w-full h-12 text-base font-semibold rounded-xl gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            {showExercise 
              ? isCorrect ? 'Continuer' : 'Sélectionnez une réponse'
              : lesson.hasExercise ? "Passer à l'exercice" : 'Leçon suivante'
            }
            {(!showExercise || isCorrect) && <ArrowRight className="w-5 h-5" />}
          </span>
        </Button>
      </div>
    </div>
  );
}
