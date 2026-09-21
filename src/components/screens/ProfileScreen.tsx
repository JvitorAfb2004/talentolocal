import React, { useState } from 'react';
import {
  CheckCircle,
  Share2,
  Edit3,
  MapPin,
  Clock,
  Banknote,
  Star,
  Check,
  Plus,
  ArrowRight,
  ExternalLink,
  Award
} from 'lucide-react';
import { currentUser, mockPortfolioItems, mockReviews } from '../../data/mockData';
import { PortfolioItem } from '../../types';

interface ProfileScreenProps {
  onEditProfile: () => void;
  onAddPortfolio: () => void;
  onSelectPortfolioItem: (item: PortfolioItem) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onEditProfile,
  onAddPortfolio,
  onSelectPortfolioItem,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sobre' | 'portfolio' | 'habilidades' | 'avaliacoes'>('portfolio');
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="pb-12 space-y-4 px-4 pt-3">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3.5">
        <div className="flex items-start gap-3.5">
          {/* Avatar with Online Dot */}
          <div className="relative shrink-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/10 shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          {/* User Bio Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="font-extrabold text-slate-900 text-[16px] tracking-tight">
                {currentUser.name}
              </h1>
              {currentUser.isVerified && (
                <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] tracking-tight">
                {currentUser.badge}
              </span>
            </div>

            <p className="text-[12px] text-slate-500 leading-snug mt-0.5">
              {currentUser.headline}
            </p>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.location}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Editar Perfil & Compartilhar */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            id="profile-edit-btn"
            onClick={onEditProfile}
            className="flex-1 py-2.5 px-3 rounded-2xl border border-indigo-200 hover:bg-indigo-50/50 text-indigo-700 font-bold text-[12.5px] flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Editar Perfil
          </button>
          <button
            id="profile-share-btn"
            onClick={handleShare}
            className="w-11 h-11 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all shrink-0"
            aria-label="Compartilhar Perfil"
          >
            {copiedShare ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Profile Completion Card (85%) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-slate-900 text-[13.5px]">
              Perfil 85% completo
            </h3>
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
          </div>
          <p className="text-[11.5px] text-slate-500 leading-snug">
            Adicione mais 1 item ao portfólio para ganhar selo máximo e destaque.
          </p>
          <button
            onClick={onAddPortfolio}
            className="text-[11.5px] font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 pt-0.5"
          >
            Completar perfil
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Progress Circle (85%) */}
        <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-indigo-600"
              strokeDasharray="85, 100"
              strokeLinecap="round"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute font-black text-slate-900 text-xs">85%</span>
        </div>
      </div>

      {/* 4 Stats Cards (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Projetos */}
        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Projetos</span>
            <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
          </div>
          <div className="font-extrabold text-slate-900 text-[20px] leading-tight">
            12
          </div>
          <span className="text-[11px] text-slate-400 block">concluídos</span>
        </div>

        {/* Avaliação */}
        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Avaliação</span>
            <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-3 h-3 fill-amber-500" />
            </div>
          </div>
          <div className="font-extrabold text-slate-900 text-[20px] leading-tight flex items-baseline gap-1">
            4.9
            <span className="text-[11px] font-normal text-slate-400">(15 reviews)</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            ★ Excelente
          </span>
        </div>

        {/* No Prazo */}
        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>No Prazo</span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-3 h-3" />
            </div>
          </div>
          <div className="font-extrabold text-slate-900 text-[20px] leading-tight">
            100%
          </div>
          <span className="text-[11px] text-slate-400 block">taxa de entrega</span>
        </div>

        {/* Ganhos Totais */}
        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Ganhos Totais</span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Banknote className="w-3 h-3" />
            </div>
          </div>
          <div className="font-extrabold text-emerald-600 text-[18px] leading-tight">
            R$ 1.240
          </div>
          <span className="text-[11px] text-slate-400 block">pago com segurança</span>
        </div>
      </div>

      {/* Sub-Tabs: Sobre, Portfólio 6, Habilidades, Avaliações */}
      <div className="flex gap-2 border-b border-slate-100 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('sobre')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
            activeSubTab === 'sobre'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Sobre
        </button>
        <button
          onClick={() => setActiveSubTab('portfolio')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
            activeSubTab === 'portfolio'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Portfólio <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === 'portfolio' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'}`}>6</span>
        </button>
        <button
          onClick={() => setActiveSubTab('habilidades')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
            activeSubTab === 'habilidades'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Habilidades
        </button>
        <button
          onClick={() => setActiveSubTab('avaliacoes')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
            activeSubTab === 'avaliacoes'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Avaliações
        </button>
      </div>

      {/* Tab: Sobre */}
      {activeSubTab === 'sobre' && (
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-[14px]">Apresentação Profissional</h3>
          <p className="text-[12.5px] text-slate-600 leading-relaxed">
            {currentUser.bio}
          </p>
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11.5px] text-slate-600">
            <div>
              <span className="text-slate-400 block text-[10px]">DISPONIBILIDADE</span>
              <strong>20 horas/semana</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">PREFERÊNCIA</span>
              <strong>Trabalho Remoto</strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Portfólio (Matching Image 1) */}
      {(activeSubTab === 'portfolio' || activeSubTab === 'sobre') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-[14px]">Amostras de Trabalhos</h2>
            <button
              id="portfolio-add-top-btn"
              onClick={onAddPortfolio}
              className="text-[12px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
            >
              + Adicionar
            </button>
          </div>

          {/* 2x2 Grid of Sample Work Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {mockPortfolioItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectPortfolioItem(item)}
                className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between"
              >
                {/* Visual Banner */}
                <div className={`h-24 bg-gradient-to-br ${item.bgColor} p-2.5 flex flex-col justify-between relative`}>
                  <span className={`self-start text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-white/90 shadow-2xs ${
                    item.category === 'Design' ? 'text-amber-700' : item.category === 'Branding' ? 'text-purple-700' : item.category === 'Edição Vídeo' ? 'text-sky-700' : 'text-emerald-700'
                  }`}>
                    {item.category}
                  </span>
                  <div className="self-end w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-sm">
                    {item.iconType === 'bread' ? '🍞' : item.iconType === 'coffee' ? '☕' : item.iconType === 'video' ? '🎬' : '📊'}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3 space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-[12.5px] leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.client}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[11px]">
                    <span className="font-extrabold text-emerald-600 text-[12.5px]">
                      R$ {item.price},00
                    </span>

                    {item.rating ? (
                      <span className="font-bold text-amber-500 flex items-center gap-0.5 text-[11px]">
                        ★ {item.rating.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                        {item.tool}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Large Outlined Add Button */}
          <button
            id="portfolio-add-full-btn"
            onClick={onAddPortfolio}
            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/60 text-indigo-600 font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4" />
            Adicionar Projeto ao Portfólio
          </button>
        </div>
      )}

      {/* Habilidades Validadas */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-[14px]">Habilidades Validadas</h2>
            <span className="text-[11px] text-slate-400">Comprovadas nos cursos Talento Local</span>
          </div>
          <button
            id="profile-view-cert-btn"
            className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Ver certificados
          </button>
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-1.5">
          {currentUser.validatedSkills.map((skill) => (
            <span
              key={skill.name}
              className={`px-3 py-1.5 rounded-xl text-[11.5px] font-semibold flex items-center gap-1 transition-all ${
                skill.verified
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-2xs'
                  : 'bg-slate-100/80 text-slate-700 border border-slate-200/60'
              }`}
            >
              {skill.verified && <Check className="w-3 h-3 text-indigo-600 stroke-[3]" />}
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Últimas Avaliações */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-[14px]">Últimas Avaliações</h2>
          <span className="text-[11px] text-slate-400">15 no total</span>
        </div>

        <div className="space-y-2.5">
          {mockReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-3.5 border border-slate-100 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center border border-amber-100">
                    {rev.clientInitial}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-[13px] leading-tight">
                      {rev.clientName}
                    </h3>
                    <span className="text-[10.5px] text-slate-400 block">
                      {rev.projectTitle}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-[12px] text-slate-600 italic leading-snug">
                "{rev.comment}"
              </p>

              <span className="text-[10px] text-slate-400 block">
                {rev.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
