import { useState } from 'react';
import { ArrowLeft, Send, Bot, Sparkles, Lightbulb, Code, Network, Cpu, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface QuickPrompt {
  icon: React.ReactNode;
  label: string;
  prompt: string;
}

const quickPrompts: QuickPrompt[] = [
  {
    icon: <Code className="w-4 h-4" />,
    label: 'Débuter en Python',
    prompt: 'Comment puis-je commencer à apprendre Python ?',
  },
  {
    icon: <Network className="w-4 h-4" />,
    label: 'Bases des réseaux',
    prompt: 'Explique-moi les bases des réseaux informatiques',
  },
  {
    icon: <Cpu className="w-4 h-4" />,
    label: 'Projet Arduino',
    prompt: 'Donne-moi des idées de projets Arduino pour débutant',
  },
  {
    icon: <Zap className="w-4 h-4" />,
    label: 'Électronique',
    prompt: 'Quels composants électroniques dois-je connaître ?',
  },
];

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Bonjour ! 👋 Je suis votre assistant IA e-learning. Je suis là pour vous aider avec vos questions sur la programmation, les réseaux, la robotique et l\'électronique. Comment puis-je vous aider ?',
    sender: 'ai',
    timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  },
];

export default function AIDiscussion() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (content: string = newMessage) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        'Comment puis-je commencer à apprendre Python ?': 
          '🐍 Excellent choix ! Python est parfait pour débuter. Voici mes conseils :\n\n1. **Installez Python** depuis python.org\n2. **Utilisez un éditeur** comme VS Code ou PyCharm\n3. **Commencez par les bases** : variables, boucles, fonctions\n4. **Pratiquez** avec de petits projets\n\nJe vous recommande notre cours "Introduction à Python" dans la section Programmation !',
        'Explique-moi les bases des réseaux informatiques':
          '🌐 Les réseaux permettent aux ordinateurs de communiquer. Voici les concepts clés :\n\n• **IP Address** : L\'identifiant unique de chaque appareil\n• **DNS** : Traduit les noms de domaine en IP\n• **HTTP/HTTPS** : Protocoles pour le web\n• **TCP/IP** : La base de toutes les communications\n\nConsultez notre cours "Fondamentaux des réseaux" pour approfondir !',
        'Donne-moi des idées de projets Arduino pour débutant':
          '🤖 Voici des projets Arduino parfaits pour débuter :\n\n1. **LED clignotante** - Le "Hello World" de l\'électronique\n2. **Feu tricolore** - Contrôle de LEDs avec timing\n3. **Capteur de température** - Affichage sur écran LCD\n4. **Détecteur de mouvement** - Alarme simple\n5. **Robot suiveur de ligne** - Premier robot !\n\nNotre cours "Arduino pour débutants" vous guide étape par étape.',
        'Quels composants électroniques dois-je connaître ?':
          '⚡ Les composants essentiels à connaître :\n\n• **Résistances** : Limitent le courant\n• **LEDs** : Sources lumineuses\n• **Condensateurs** : Stockent l\'énergie\n• **Transistors** : Amplification et commutation\n• **Diodes** : Contrôle du sens du courant\n\nNotre cours "Bases de l\'électronique" vous explique tout en détail !',
      };

      const defaultResponse = 'Merci pour votre question ! Je suis là pour vous aider dans votre apprentissage. N\'hésitez pas à me poser des questions sur la programmation, les réseaux, la robotique ou l\'électronique. 📚';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[content] || defaultResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <MobileLayout hideNav>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/discussions')}
              className="p-2 rounded-full hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Assistant IA</h2>
              <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                <Sparkles className="w-3 h-3" />
                <span>Toujours disponible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card shadow-card rounded-bl-md'
                )}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-1.5 text-primary text-xs font-medium mb-2">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Assistant IA</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={cn(
                    "text-[10px] mt-2",
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card shadow-card rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-medium mb-2">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Assistant IA</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts - only show if no user messages yet */}
          {messages.length === 1 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                <Lightbulb className="w-4 h-4" />
                <span>Suggestions</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt.prompt)}
                    className="flex items-center gap-2 p-3 bg-card rounded-xl shadow-card text-left hover:shadow-card-hover transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                      {prompt.icon}
                    </div>
                    <span className="text-xs font-medium text-foreground">{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="p-4 bg-card shadow-card-hover">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Posez votre question à l'IA..."
              className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!newMessage.trim() || isTyping}
              className="p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
