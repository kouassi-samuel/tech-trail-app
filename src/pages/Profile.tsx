import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Award, 
  BookOpen, 
  Clock, 
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  Moon
} from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { courses } from '@/data/courses';

export default function Profile() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter(c => c.isEnrolled);
  const completedLessons = 48;
  const totalHours = 24;
  const certificates = 3;

  const menuItems = [
    { icon: Bell, label: 'Notifications', badge: '3' },
    { icon: Award, label: 'Mes certificats' },
    { icon: BookOpen, label: 'Cours téléchargés' },
    { icon: Moon, label: 'Mode sombre' },
    { icon: Settings, label: 'Paramètres' },
    { icon: HelpCircle, label: "Centre d'aide" },
  ];

  return (
    <MobileLayout>
      <div className="p-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Profil</h1>
          <button className="p-2.5 rounded-full bg-card shadow-card hover:shadow-card-hover transition-all">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">Apprenant</h2>
              <p className="text-sm text-muted-foreground">apprenant@email.com</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Niveau Intermédiaire
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{enrolledCourses.length}</p>
            <p className="text-xs text-muted-foreground">Cours actifs</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">{certificates}</p>
            <p className="text-xs text-muted-foreground">Certificats</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-info" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalHours}h</p>
            <p className="text-xs text-muted-foreground">Temps total</p>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="bg-card rounded-2xl shadow-card p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Statistiques d'apprentissage</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-3 flex-1">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Leçons complétées</span>
                  <span className="font-medium text-foreground">{completedLessons}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Exercices réussis</span>
                  <span className="font-medium text-foreground">32</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '80%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Jours consécutifs</span>
                  <span className="font-medium text-foreground">12</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Se déconnecter</span>
        </button>
      </div>
    </MobileLayout>
  );
}
