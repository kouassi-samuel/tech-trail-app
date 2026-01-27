import { useState } from 'react';
import { ArrowLeft, Send, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Teacher {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'online' | 'offline';
  responseTime: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'teacher';
  timestamp: string;
  teacherName?: string;
}

const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Amadou Diallo',
    specialty: 'Programmation Python & Java',
    avatar: 'AD',
    status: 'online',
    responseTime: '~5 min',
  },
  {
    id: '2',
    name: 'Prof. Fatou Ndiaye',
    specialty: 'Réseaux & Sécurité',
    avatar: 'FN',
    status: 'online',
    responseTime: '~10 min',
  },
  {
    id: '3',
    name: 'Ing. Moussa Touré',
    specialty: 'Robotique & Arduino',
    avatar: 'MT',
    status: 'offline',
    responseTime: '~1h',
  },
  {
    id: '4',
    name: 'Dr. Aïssatou Ba',
    specialty: 'Électronique',
    avatar: 'AB',
    status: 'online',
    responseTime: '~15 min',
  },
];

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Bonjour ! Comment puis-je vous aider avec votre apprentissage aujourd\'hui ?',
    sender: 'teacher',
    timestamp: '10:00',
    teacherName: 'Dr. Amadou Diallo',
  },
];

export default function TeacherDiscussion() {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate teacher response
    setTimeout(() => {
      const teacherResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Merci pour votre question ! Je vais l\'examiner et vous répondre dans les plus brefs délais.',
        sender: 'teacher',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        teacherName: selectedTeacher?.name,
      };
      setMessages(prev => [...prev, teacherResponse]);
    }, 1500);
  };

  if (!selectedTeacher) {
    return (
      <MobileLayout hideNav>
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
              <h1 className="text-xl font-bold text-foreground">Enseignants</h1>
              <p className="text-xs text-muted-foreground">Choisissez un enseignant</p>
            </div>
          </div>

          {/* Teachers List */}
          <div className="space-y-3">
            {teachers.map((teacher) => (
              <button
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className="w-full bg-card rounded-xl shadow-card p-4 text-left hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {teacher.avatar}
                    </div>
                    <div className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card",
                      teacher.status === 'online' ? 'bg-primary' : 'bg-muted-foreground'
                    )} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{teacher.name}</h3>
                    <p className="text-xs text-muted-foreground">{teacher.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "text-xs font-medium mb-1",
                      teacher.status === 'online' ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {teacher.status === 'online' ? 'En ligne' : 'Hors ligne'}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{teacher.responseTime}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 bg-card shadow-card">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTeacher(null)}
              className="p-2 rounded-full hover:bg-muted transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                {selectedTeacher.avatar}
              </div>
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
                selectedTeacher.status === 'online' ? 'bg-primary' : 'bg-muted-foreground'
              )} />
            </div>
            <div className="flex-1">
              <h2 className="font-medium text-foreground text-sm">{selectedTeacher.name}</h2>
              <p className="text-xs text-muted-foreground">{selectedTeacher.specialty}</p>
            </div>
            <GraduationCap className="w-5 h-5 text-primary" />
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
                  "max-w-[80%] rounded-2xl px-4 py-2.5",
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card shadow-card rounded-bl-md'
                )}>
                  {message.sender === 'teacher' && message.teacherName && (
                    <p className="text-xs text-primary font-medium mb-1">{message.teacherName}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className={cn(
                    "text-[10px] mt-1",
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 bg-card shadow-card-hover">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Posez votre question..."
              className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
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
