import React from 'react';
import { Bell, Mail, Settings, MapPin } from 'lucide-react';
import { TabType } from '../types';
import { currentUser } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenNotifications: () => void;
  unreadMessagesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenNotifications,
  unreadMessagesCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5">
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="header-brand-button"
          onClick={() => onTabChange('inicio')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white transition-transform active:scale-95">
            <div className="relative flex items-center justify-center">
              <MapPin className="w-5 h-5 fill-white text-indigo-600" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-600 top-1.5" />
            </div>
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-[15px] tracking-tight text-slate-900 block">Talento</span>
            <span className="font-bold text-[13px] tracking-tight text-indigo-600 block -mt-1">Local</span>
          </div>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Bell Notifications */}
          <button
            id="header-notification-button"
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors active:scale-95"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute 0 top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white shadow-sm">
              3
            </span>
          </button>

          {/* Messages shortcut */}
          <button
            id="header-messages-button"
            onClick={() => onTabChange('mensagens')}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors active:scale-95"
            aria-label="Mensagens"
          >
            <Mail className="w-5 h-5 stroke-[1.8]" />
            {unreadMessagesCount > 0 && currentTab !== 'mensagens' && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 border border-white" />
            )}
          </button>

          {/* Profile Avatar or Settings */}
          {currentTab === 'perfil' ? (
            <button
              id="header-settings-button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors active:scale-95"
              aria-label="Configurações"
            >
              <Settings className="w-5 h-5 stroke-[1.8]" />
            </button>
          ) : (
            <button
              id="header-profile-avatar-button"
              onClick={() => onTabChange('perfil')}
              className="relative ml-0.5 focus:outline-none active:scale-95 transition-transform"
              aria-label="Ir para o Perfil"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
