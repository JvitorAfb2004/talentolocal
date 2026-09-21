import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Plus,
  HelpCircle,
  Check,
  Clock
} from 'lucide-react';
import { Conversation } from '../../types';
import { mockConversations } from '../../data/mockData';

interface MessagesScreenProps {
  onSelectConversation: (conv: Conversation) => void;
  onNewConversation: () => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  onSelectConversation,
  onNewConversation,
}) => {
  const [filter, setFilter] = useState<'todas' | 'nao_lidas' | 'ativos' | 'propostas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter((conv) => {
    if (filter === 'nao_lidas' && conv.unreadCount === 0) return false;
    if (filter === 'ativos' && !conv.clientOnline) return false;
    if (filter === 'propostas' && !conv.statusBadge?.includes('proposta')) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        conv.clientName.toLowerCase().includes(q) ||
        conv.projectTag.toLowerCase().includes(q) ||
        conv.lastMessageSnippet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pb-16 space-y-4 px-4 pt-3 relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          id="messages-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar conversas, clientes ou projetos..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-[12.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
        />
      </div>

      {/* Header */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <h1 className="text-[20px] font-extrabold text-slate-900 tracking-tight">
            Mensagens
          </h1>
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10.5px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            2 Não lidas
          </span>
        </div>
        <p className="text-[12px] text-slate-500">
          Converse com clientes, tire dúvidas e alinhe entregas.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        <button
          onClick={() => setFilter('todas')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
            filter === 'todas'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          Todas 6
        </button>
        <button
          onClick={() => setFilter('nao_lidas')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
            filter === 'nao_lidas'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          Não lidas 2
        </button>
        <button
          onClick={() => setFilter('ativos')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
            filter === 'ativos'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          Clientes ativos
        </button>
        <button
          onClick={() => setFilter('propostas')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
            filter === 'propostas'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          Propostas
        </button>
      </div>

      {/* Security Tip Banner */}
      <div className="rounded-2xl bg-indigo-50/70 border border-indigo-100 p-3 flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <p className="text-[11.5px] text-slate-700 leading-snug">
          <strong className="text-slate-900 font-bold">Dica de Segurança:</strong> Negocie e receba sempre pelo Talento Local para manter a garantia do seu pagamento protegida.
        </p>
      </div>

      {/* Conversations List */}
      <div className="space-y-2.5">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            id={`message-conv-${conv.id}`}
            onClick={() => onSelectConversation(conv)}
            className="bg-white rounded-3xl p-3.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer active:scale-[0.99] space-y-2"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                {/* Avatar with online dot */}
                <div className="relative shrink-0">
                  {conv.clientAvatarType === 'image' && conv.clientAvatarUrl ? (
                    <img
                      src={conv.clientAvatarUrl}
                      alt={conv.clientName}
                      className="w-11 h-11 rounded-2xl object-cover ring-1 ring-slate-100"
                    />
                  ) : (
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${conv.clientAvatarBg}`}>
                      {conv.clientAvatarText}
                    </div>
                  )}
                  {conv.clientOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-[13.5px] leading-tight">
                    {conv.clientName}
                  </h3>

                  {/* Tag and Status Badge */}
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md">
                      {conv.projectTag}
                    </span>

                    {conv.statusBadge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          conv.statusBadgeColor === 'red'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : conv.statusBadgeColor === 'purple'
                            ? 'bg-purple-50 text-purple-700 border border-purple-100'
                            : conv.statusBadgeColor === 'yellow'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}
                      >
                        {conv.statusBadgeColor === 'red' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        )}
                        {conv.statusBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Time */}
              <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                {conv.lastMessageTime}
              </span>
            </div>

            {/* Message Snippet */}
            <p className="text-[12px] text-slate-600 leading-snug line-clamp-1 pl-1">
              {conv.lastMessageSnippet}
            </p>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[11px]">
              <span
                className={`font-semibold ${
                  conv.priceOrStatus.includes('+') || conv.priceOrStatus.includes('garantido')
                    ? 'text-emerald-600'
                    : 'text-slate-500'
                }`}
              >
                {conv.priceOrStatus}
              </span>

              {conv.unreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                  {conv.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Intermediation Help Card */}
      <div className="rounded-3xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-[12px] leading-tight">
              Precisa de intermediação?
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Nossa equipe auxilia em prazos e entregas.
            </p>
          </div>
        </div>
        <button
          id="messages-support-btn"
          className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-[11.5px] shrink-0"
        >
          Ajuda
        </button>
      </div>

      {/* Floating Action Button */}
      <div className="sticky bottom-4 flex justify-end pointer-events-none pr-1">
        <button
          id="messages-new-chat-fab"
          onClick={onNewConversation}
          className="pointer-events-auto py-2.5 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[13px] shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Nova conversa
        </button>
      </div>
    </div>
  );
};
