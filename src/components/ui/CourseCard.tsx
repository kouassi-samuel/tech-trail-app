import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Course, CategoryType } from '@/types/course';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const categoryColors: Record<CategoryType, string> = {
  programming: 'bg-category-programming/10 text-category-programming',
  networks: 'bg-category-networks/10 text-category-networks',
  robotics: 'bg-category-robotics/10 text-category-robotics',
  electronics: 'bg-category-electronics/10 text-category-electronics',
};

const categoryLabels: Record<CategoryType, string> = {
  programming: 'Programmation',
  networks: 'Réseaux',
  robotics: 'Robotique',
  electronics: 'Électronique',
};

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact';
}

export function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className="flex gap-3 p-3 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 text-left w-full"
      >
        <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
          <div className={cn(
            "w-full h-full flex items-center justify-center",
            categoryColors[course.category]
          )}>
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground truncate">{course.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{course.instructor}</p>
          {course.isEnrolled && course.progress > 0 && (
            <div className="mt-2">
              <div className="progress-bar h-1.5">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">{course.progress}% complété</span>
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden text-left min-w-[260px] max-w-[280px]"
    >
      <div className="relative h-32 bg-muted">
        <div className={cn(
          "w-full h-full flex items-center justify-center",
          categoryColors[course.category]
        )}>
          <BookOpen className="w-12 h-12 opacity-50" />
        </div>
        <span className={cn(
          "absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-medium",
          categoryColors[course.category]
        )}>
          {categoryLabels[course.category]}
        </span>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
          {course.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>
        
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{course.studentsCount}</span>
          </div>
        </div>

        {course.isEnrolled && course.progress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-muted-foreground">Progression</span>
              <span className="text-[10px] font-medium text-primary">{course.progress}%</span>
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
    </button>
  );
}
