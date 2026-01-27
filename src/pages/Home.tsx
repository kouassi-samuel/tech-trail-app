import { Search, Bell, BookOpen, Trophy, Target } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { CourseCard } from '@/components/ui/CourseCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { categories, courses } from '@/data/courses';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter(c => c.isEnrolled);
  const featuredCourses = courses.filter(c => c.rating >= 4.8);
  
  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;

  return (
    <MobileLayout>
      <div className="gradient-hero">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-6">
          <div>
            <p className="text-sm text-muted-foreground">Bienvenue 👋</p>
            <h1 className="text-xl font-bold text-foreground">Apprenant</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-full bg-card shadow-card hover:shadow-card-hover transition-all">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              className="w-full pl-12 pr-4 py-3.5 bg-card rounded-2xl shadow-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-4 -mt-2 mb-6">
        <div className="gradient-primary rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">Votre progression</h3>
              <p className="text-white/80 text-sm mt-1">
                {enrolledCourses.length} cours en cours
              </p>
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-white/80" />
                  <span className="text-white text-xs">{enrolledCourses.reduce((acc, c) => acc + c.lessonsCount, 0)} leçons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-white/80" />
                  <span className="text-white text-xs">3 certificats</span>
                </div>
              </div>
            </div>
            <ProgressRing 
              progress={totalProgress} 
              size={70}
              strokeWidth={5}
              className="[&_circle:last-child]:stroke-white [&_span]:text-white"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Catégories</h2>
          <button className="text-sm text-primary font-medium">Voir tout</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              onClick={() => navigate(`/courses?category=${category.type}`)}
            />
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      {enrolledCourses.length > 0 && (
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Continuer</h2>
            <button 
              onClick={() => navigate('/courses')}
              className="text-sm text-primary font-medium"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {enrolledCourses.slice(0, 2).map((course) => (
              <CourseCard key={course.id} course={course} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {/* Featured Courses */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Cours populaires</h2>
          <button 
            onClick={() => navigate('/courses')}
            className="text-sm text-primary font-medium"
          >
            Voir tout
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-3 shadow-card text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-[10px] text-muted-foreground">Jours actifs</p>
          </div>
          <div className="bg-card rounded-xl p-3 shadow-card text-center">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-warning" />
            </div>
            <p className="text-lg font-bold text-foreground">3</p>
            <p className="text-[10px] text-muted-foreground">Certificats</p>
          </div>
          <div className="bg-card rounded-xl p-3 shadow-card text-center">
            <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-info" />
            </div>
            <p className="text-lg font-bold text-foreground">48</p>
            <p className="text-[10px] text-muted-foreground">Leçons finies</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
