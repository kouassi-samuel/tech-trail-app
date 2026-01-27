import { Users, GraduationCap, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { cn } from '@/lib/utils';

interface DiscussionType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}

const discussionTypes: DiscussionType[] = [
  {
    id: 'community',
    title: 'Communauté',
    description: 'Échangez avec les autres apprenants, partagez vos expériences et entraidez-vous',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-category-programming text-white',
    route: '/discussions/community',
  },
  {
    id: 'teacher',
    title: 'Enseignant',
    description: 'Posez vos questions directement à nos enseignants experts',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'bg-category-networks text-white',
    route: '/discussions/teacher',
  },
  {
    id: 'ai',
    title: 'Assistant IA',
    description: 'Obtenez des réponses instantanées grâce à notre assistant intelligent',
    icon: <Bot className="w-8 h-8" />,
    color: 'bg-primary text-primary-foreground',
    route: '/discussions/ai',
  },
];

export default function DiscussionSelect() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="p-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Discussions</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Choisissez avec qui vous souhaitez discuter
        </p>

        <div className="space-y-4">
          {discussionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => navigate(type.route)}
              className="w-full bg-card rounded-2xl shadow-card p-5 text-left hover:shadow-card-hover transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-xl transition-transform group-hover:scale-110",
                  type.color
                )}>
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
