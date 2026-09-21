import React from 'react';
import { X, MessageSquare, CheckCircle2, Star, Clock } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
  onNavigateTo: (tab: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onNavigateTo,
}) => {
  const notifications = [
    {
      id: 'n1',
      icon: MessageSquare,
      iconColor: 'bg-indigo-50 text-indigo-600',
      title: 'Nova mensagem recebida',
      description: 'Lucas Mendonça enviou uma proposta para Restaurante Vila Nova.',
      time: 'há 10 minutos',
      actionTab: 'mensagens',
      unread: true,
    },
    {
      id: 'n2',
      icon: CheckCircle2,
      iconColor: 'bg-emerald-50 text-emerald-600',
      title: 'Projeto concluído com sucesso!',
      description: 'Padaria Sabor da Terra aprovou o "Card Instagram". R$ 40,00 liberado na carteira.',
      time: 'há 2 horas',
      actionTab: 'projetos',
      unread: true,
    },
    {
      id: 'n3',
      icon: Star,
      iconColor: 'bg-amber-50 text-amber-500',
      title: 'Nova avaliação 5 estrelas!',
      description: 'Cafeteria Café Bom avaliou seu trabalho com nota máxima.',
      time: 'há 1 dia',
      actionTab: 'perfil',
      unread: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-[16px]">
              Notificações
            </h3>
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center">
              3
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onNavigateTo(item.actionTab);
                  onClose();
                }}
                className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${item.iconColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-slate-900 text-[12.5px] leading-snug">
                      {item.title}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                </div>
                <p className="text-[11.5px] text-slate-600 pl-9">
                  {item.description}
                </p>
                <div className="pl-9 flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-[12px] hover:bg-slate-50 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
