import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw, Home } from 'lucide-react';
import { courses } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CourseTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  const questions = course?.finalTest?.questions ?? [];

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!course || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Test non disponible</p>
      </div>
    );
  }

  const total = questions.length;
  const correctCount = questions.reduce(
    (acc, q, i) => (answers[i] === q.correctAnswer ? acc + 1 : acc),
    0
  );
  const score = Math.round((correctCount / total) * 100);
  const passed = score >= 70;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div
          className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center mb-4',
            passed ? 'bg-primary/10' : 'bg-destructive/10'
          )}
        >
          {passed ? (
            <Trophy className="w-10 h-10 text-primary" />
          ) : (
            <XCircle className="w-10 h-10 text-destructive" />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-1">
          {passed ? 'Bravo, cours validé !' : 'Test non validé'}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Vous avez obtenu {correctCount} / {total} ({score}%)
        </p>

        <div className="w-full max-w-sm space-y-2 mb-8">
          {questions.map((q, i) => {
            const ok = answers[i] === q.correctAnswer;
            return (
              <div
                key={q.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card text-left"
              >
                {ok ? (
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                )}
                <p className="text-sm text-foreground truncate">Question {i + 1}</p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 w-full max-w-sm">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onClick={() => {
              setAnswers({});
              setCurrentQ(0);
              setSubmitted(false);
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Refaire
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl gradient-primary"
            onClick={() => navigate(`/course/${course.id}`)}
          >
            <Home className="w-4 h-4 mr-2" /> Retour
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const selected = answers[currentQ];

  const handleSelect = (idx: number) => {
    setAnswers((a) => ({ ...a, [currentQ]: idx }));
  };

  const handleNext = () => {
    if (selected === undefined) return;
    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(`/course/${id}`)}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="text-center flex-1 px-4">
            <p className="text-xs text-muted-foreground">Test final</p>
            <h1 className="text-sm font-semibold text-foreground truncate">{course.title}</h1>
          </div>
          <div className="w-9" />
        </div>
        <div className="px-4 pb-3">
          <div className="flex gap-1">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'h-1 flex-1 rounded-full',
                  idx < currentQ ? 'bg-primary' : idx === currentQ ? 'bg-primary/70' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 animate-fade-in">
        <p className="text-xs text-muted-foreground mb-2">
          Question {currentQ + 1} / {total}
        </p>
        <div className="bg-card rounded-xl p-4 shadow-card mb-4">
          <p className="font-medium text-foreground">{q.text}</p>
        </div>

        <div className="space-y-3">
          {q.options.map((option, index) => {
            const isSelected = selected === index;
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={cn(
                  'w-full p-4 rounded-xl text-left transition-all border-2',
                  isSelected
                    ? 'bg-primary/5 border-primary'
                    : 'bg-card border-transparent shadow-card hover:shadow-card-hover'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0',
                      isSelected
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
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          onClick={handleNext}
          disabled={selected === undefined}
          className="w-full h-12 text-base font-semibold rounded-xl gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {currentQ < total - 1 ? 'Question suivante' : 'Terminer le test'}
        </Button>
      </div>
    </div>
  );
}
