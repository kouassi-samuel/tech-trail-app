import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('auth_user', JSON.stringify({ email }));
      toast.success(mode === 'login' ? 'Connexion réussie' : 'Compte créé');
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Decorative gradient header */}
      <div className="relative h-56 gradient-primary overflow-hidden">
        <div className="absolute -top-20 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-10 w-52 h-52 bg-white/10 rounded-full blur-2xl" />
        <div className="relative h-full flex flex-col items-center justify-center text-primary-foreground animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 shadow-card-hover animate-scale-in">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">E-Learning</h1>
          <p className="text-sm text-primary-foreground/80 mt-1">
            {mode === 'login' ? 'Heureux de vous revoir' : 'Rejoignez la communauté'}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-8 px-5 pb-10 relative z-10 animate-slide-up">
        <div className="bg-card rounded-3xl shadow-card-hover p-6 max-w-md mx-auto border border-border/50">
          {/* Tabs */}
          <div className="flex bg-muted rounded-2xl p-1 mb-6">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  mode === m
                    ? 'bg-card text-primary shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                {m === 'login' ? 'Connexion' : 'Inscription'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                EMAIL
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-muted-foreground">
                MOT DE PASSE
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl gradient-primary text-base font-semibold shadow-card hover:shadow-card-hover hover:scale-[1.01] transition-all"
            >
              {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou continuer avec</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-border hover:border-primary hover:bg-primary/5"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-border hover:border-primary hover:bg-primary/5"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            En continuant, vous acceptez nos{' '}
            <span className="text-primary font-medium">Conditions</span> et notre{' '}
            <span className="text-primary font-medium">Politique de confidentialité</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
