import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowLeftRight, Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface CopilotPanelProps {
  onClose: () => void;
  onToggleSide: () => void;
  side: 'left' | 'right';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your **MediCare AI Copilot** 🩺\n\nI can help you:\n- Understand symptoms\n- Learn about drug interactions\n- Navigate the platform\n- Get health awareness tips\n\nHow can I help you today?",
  },
];

const AI_RESPONSES: Record<string, string> = {
  headache: "**Headache** can be caused by many factors:\n\n- **Tension headache**: Stress, posture\n- **Migraine**: Throbbing, light sensitivity\n- **Cluster headache**: Severe, around one eye\n\n💡 *Try the Symptom Analyzer for a detailed analysis.*",
  fever: "**Fever** (>38°C/100.4°F) is your body fighting infection.\n\n**Common causes:**\n1. Viral infections (flu, cold)\n2. Bacterial infections\n3. Inflammatory conditions\n\n⚠️ Seek medical care if fever exceeds 39.4°C or lasts >3 days.",
  aspirin: "**Aspirin** (acetylsalicylic acid) is used for pain, fever, and inflammation.\n\n⚠️ **Key interactions:**\n- With **Ibuprofen**: Increased GI bleeding risk\n- With **Warfarin**: Severe bleeding risk\n\nUse the **Drug Checker** for a full interaction report.",
  default: "That's a great question! I'd recommend using the **Symptom Analyzer** for a detailed AI analysis, or the **Drug Checker** to verify medicine safety.\n\n🏥 *Always consult a healthcare professional for medical decisions.*",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return AI_RESPONSES.default;
}

export const CopilotPanel: React.FC<CopilotPanelProps> = ({ onClose, onToggleSide, side }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: getAIResponse(userMsg.content) };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Copilot</h3>
            <span className="text-xs text-secondary font-medium">AI Health Assistant</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onToggleSide} className="p-2 rounded-lg hover:bg-muted transition-colors" title={`Move to ${side === 'right' ? 'left' : 'right'}`}>
            <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full gradient-primary flex-shrink-0 flex items-center justify-center mt-1">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm'
              }`}
            >
              <SimpleMarkdown content={msg.content} />
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-start">
            <div className="w-7 h-7 rounded-full gradient-primary flex-shrink-0 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-muted rounded-xl px-4 py-3 rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask a health question..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-muted border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        let processed = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-foreground/10 text-xs">$1</code>');
        
        if (line.startsWith('- ')) {
          processed = `<span class="text-primary mr-1">•</span>${processed.slice(2)}`;
        }
        if (/^\d+\.\s/.test(line)) {
          const num = line.match(/^(\d+)\./)?.[1];
          processed = `<span class="text-primary mr-1 font-semibold">${num}.</span>${processed.replace(/^\d+\.\s/, '')}`;
        }

        return <p key={i} dangerouslySetInnerHTML={{ __html: processed || '&nbsp;' }} />;
      })}
    </div>
  );
};
