import { useState } from 'react';
import { ArrowLeft, Search, Plus, MessageCircle, ThumbsUp, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { cn } from '@/lib/utils';

interface Discussion {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  timeAgo: string;
  isResolved: boolean;
}

const discussions: Discussion[] = [
  {
    id: '1',
    title: 'Comment installer Python sur Windows 11 ?',
    author: 'Marie D.',
    category: 'Programmation',
    replies: 12,
    likes: 24,
    timeAgo: 'Il y a 2h',
    isResolved: true,
  },
  {
    id: '2',
    title: 'Problème de connexion réseau avec Raspberry Pi',
    author: 'Pierre L.',
    category: 'Réseaux',
    replies: 8,
    likes: 15,
    timeAgo: 'Il y a 4h',
    isResolved: false,
  },
  {
    id: '3',
    title: 'Quel capteur utiliser pour un robot suiveur de ligne ?',
    author: 'Sophie M.',
    category: 'Robotique',
    replies: 6,
    likes: 18,
    timeAgo: 'Il y a 6h',
    isResolved: true,
  },
  {
    id: '4',
    title: 'Différence entre Arduino Uno et Nano',
    author: 'Jean B.',
    category: 'Électronique',
    replies: 15,
    likes: 32,
    timeAgo: 'Hier',
    isResolved: true,
  },
  {
    id: '5',
    title: 'Erreur "IndentationError" en Python',
    author: 'Lucas R.',
    category: 'Programmation',
    replies: 4,
    likes: 8,
    timeAgo: 'Hier',
    isResolved: false,
  },
];

const categoryColors: Record<string, string> = {
  'Programmation': 'bg-category-programming/10 text-category-programming',
  'Réseaux': 'bg-category-networks/10 text-category-networks',
  'Robotique': 'bg-category-robotics/10 text-category-robotics',
  'Électronique': 'bg-category-electronics/10 text-category-electronics',
};

export default function CommunityDiscussion() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'resolved' | 'unresolved'>('all');

  const filteredDiscussions = discussions.filter(d => {
    if (filter === 'resolved' && !d.isResolved) return false;
    if (filter === 'unresolved' && d.isResolved) return false;
    if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <MobileLayout>
      <div className="p-4 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/discussions')}
            className="p-2 rounded-full bg-card shadow-card hover:shadow-card-hover transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Communauté</h1>
            <p className="text-xs text-muted-foreground">Échangez avec les apprenants</p>
          </div>
          <button className="p-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une discussion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card rounded-xl shadow-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'resolved', label: 'Résolues' },
            { id: 'unresolved', label: 'En attente' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Discussions List */}
        <div className="space-y-3">
          {filteredDiscussions.map((discussion) => (
            <button
              key={discussion.id}
              className="w-full bg-card rounded-xl shadow-card p-4 text-left hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-medium text-foreground text-sm leading-tight line-clamp-2">
                  {discussion.title}
                </h3>
                {discussion.isResolved && (
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                    Résolu
                  </span>
                )}
              </div>
              
              <span className={cn(
                "inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-3",
                categoryColors[discussion.category]
              )}>
                {discussion.category}
              </span>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{discussion.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{discussion.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{discussion.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{discussion.timeAgo}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredDiscussions.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Aucune discussion trouvée</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
