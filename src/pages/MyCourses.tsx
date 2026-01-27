import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { CourseCard } from '@/components/ui/CourseCard';
import { courses, categories } from '@/data/courses';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';

type TabType = 'all' | 'enrolled' | 'completed';

export default function MyCourses() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFilter);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'enrolled', label: 'En cours' },
    { id: 'completed', label: 'Terminés' },
  ];

  const filteredCourses = courses.filter(course => {
    // Tab filter
    if (activeTab === 'enrolled' && !course.isEnrolled) return false;
    if (activeTab === 'completed' && course.progress < 100) return false;
    
    // Category filter
    if (selectedCategory && course.category !== selectedCategory) return false;
    
    // Search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  return (
    <MobileLayout>
      <div className="p-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Mes cours</h1>
          <button className="p-2.5 rounded-full bg-card shadow-card hover:shadow-card-hover transition-all">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un cours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card rounded-xl shadow-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
              !selectedCategory
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.type)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                selectedCategory === cat.type
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Course List */}
        <div className="space-y-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} variant="compact" />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun cours trouvé</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
