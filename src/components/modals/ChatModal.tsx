import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, MoreVertical, Phone, CheckCheck } from 'lucide-react';
import { Conversation, ChatMessage } from '../../types';

interface ChatModalProps {
  conversation: Conversation;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  conversation,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Mock client response after a short delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const clientReplies = [
        'Excelente, Ana! Muito obrigado pela agilidade.',
        'Perfeito! Vamos validar aqui internamente e já libero a aprovação.',
        'Combinado! Pode dar continuidade que está ficando impecável.',
        'Recebido com sucesso! Parabéns pela atenção aos detalhes.',
      ];
      const randomReply = clientReplies[Math.floor(Math.random() * clientReplies.length)];

      const clientMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'client',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
      };
      setMessages((prev) => [...prev, clientMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full h-full sm:max-w-md sm:h-[680px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between shadow-2xs shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Avatar & info */}
            <div className="relative">
              {conversation.clientAvatarType === 'image' && conversation.clientAvatarUrl ? (
                <img
                  src={conversation.clientAvatarUrl}
                  alt={conversation.clientName}
                  className="w-10 h-10 rounded-2xl object-cover ring-1 ring-slate-200"
                />
              ) : (
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${conversation.clientAvatarBg}`}>
                  {conversation.clientAvatarText}
                </div>
              )}
              {conversation.clientOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </div>

            <div>
              <h2 className="font-bold text-slate-900 text-[14px] leading-tight flex items-center gap-1.5">
                {conversation.clientName}
              </h2>
              <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                {conversation.clientOnline ? '● Online agora' : 'Visto recentemente'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100">
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project context tag bar */}
        <div className="px-4 py-2 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between text-[11px] shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-indigo-900">Projeto:</span>
            <span className="text-indigo-700 truncate">{conversation.projectTag}</span>
          </div>
          <span className="font-bold text-indigo-600 shrink-0 ml-2">
            {conversation.priceOrStatus}
          </span>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          <div className="text-center my-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
              Negociação Segura Talento Local
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                  <span>{msg.time}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-indigo-500" />}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] bg-white border border-slate-100 px-3 py-2 rounded-2xl w-24">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 py-2 px-3 bg-slate-100 border-none rounded-2xl text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 active:scale-95 transition-all shadow-xs"
          >
            <Send className="w-4 h-4 -ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
