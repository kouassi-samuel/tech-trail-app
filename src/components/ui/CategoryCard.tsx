import { Code, Network, Bot, Cpu, LucideIcon } from 'lucide-react';
import { Category, CategoryType } from '@/types/course';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Network,
  Bot,
  Cpu,
};

const categoryStyles: Record<CategoryType, string> = {
  programming: 'bg-category-programming',
  networks: 'bg-category-networks',
  robotics: 'bg-category-robotics',
  electronics: 'bg-category-electronics',
};

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Code;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center p-4 rounded-2xl transition-all duration-300",
        "hover:scale-105 hover:shadow-card-hover active:scale-95",
        "bg-card shadow-card min-w-[80px]"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-2",
        categoryStyles[category.type]
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-xs font-medium text-foreground text-center leading-tight">
        {category.name}
      </span>
      <span className="text-[10px] text-muted-foreground mt-0.5">
        {category.courseCount} cours
      </span>
    </button>
  );
}
