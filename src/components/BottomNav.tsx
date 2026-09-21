import React from 'react';
import { Home, Search, Package, MessageCircle, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadMessagesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  unreadMessagesCount = 2,
}) => {
  const tabs = [
    { id: 'inicio' as TabType, label: 'Início', icon: Home },
    { id: 'vagas' as TabType, label: 'Vagas', icon: Search },
    { id: 'projetos' as TabType, label: 'Projetos', icon: Package },
    {
      id: 'mensagens' as TabType,
      label: 'Mensagens',
      icon: MessageCircle,
      badge: unreadMessagesCount > 0,
    },
    { id: 'perfil' as TabType, label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 max-w-lg mx-auto z-30 bg-white/95 backdrop-blur-lg border-t border-slate-100 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 min-w-[60px] rounded-xl transition-all duration-200 active:scale-95 focus:outline-none ${
                isActive
                  ? 'text-indigo-600 font-semibold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-[22px] h-[22px] transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.7]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
