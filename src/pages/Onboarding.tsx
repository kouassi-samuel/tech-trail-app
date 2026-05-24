import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, GraduationCap } from 'lucide-react';
import slide1 from '@/assets/onboarding-1.png';
import slide2 from '@/assets/onboarding-2.png';
import slide3 from '@/assets/onboarding-3.png';

const slides = [
  {
    image: slide1,
    title: 'Bienvenue sur E-Learning',
    description: "Apprenez la programmation, les réseaux, la robotique et l'électronique où que vous soyez.",
  },
  {
    image: slide2,
    title: 'Contenu riche et interactif',
    description: 'Vidéos, cours écrits, exercices après chaque leçon et tests finaux pour valider vos acquis.',
  },
  {
    image: slide3,
    title: 'Progressez et réussissez',
    description: 'Suivez votre progression, obtenez vos certificats et atteignez vos objectifs.',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const isLast = index === slides.length - 1;

  const finish = () => {
    localStorage.setItem('onboarding_done', '1');
    navigate('/login');
  };

  const next = () => (isLast ? finish() : setIndex(index + 1));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-card">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">E-Learning</span>
        </div>
        {!isLast && (
          <button
            onClick={finish}
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Passer
          </button>
        )}
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div key={index} className="w-full max-w-sm animate-fade-in">
          <div className="relative mb-8 animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5 rounded-full blur-2xl" />
            <img
              src={slides[index].image}
              alt={slides[index].title}
              loading="lazy"
              width={1024}
              height={1024}
              className="relative w-full h-auto max-h-[320px] object-contain animate-bounce-soft"
            />
          </div>

          <div className="text-center space-y-3 animate-slide-up">
            <h1 className="text-3xl font-extrabold leading-tight bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent">
              {slides[index].title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed px-2">
              {slides[index].description}
            </p>
          </div>
        </div>
      </div>

      {/* Dots + CTA */}
      <div className="p-6 pb-10 space-y-6 relative z-10">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Aller à la diapositive ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-primary' : 'w-2 bg-primary/25'
              }`}
            />
          ))}
        </div>

        <Button
          size="lg"
          onClick={next}
          className="w-full h-14 text-base font-semibold rounded-2xl gradient-primary shadow-card-hover hover:opacity-95 hover:scale-[1.02] transition-all"
        >
          {isLast ? 'Commencer' : 'Suivant'}
          <ChevronRight className="ml-1 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
