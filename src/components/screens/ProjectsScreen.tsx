import React, { useState } from 'react';
import {
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Banknote,
  UploadCloud,
  MessageSquare,
  HelpCircle,
  Star,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { Project } from '../../types';
import { mockProjects } from '../../data/mockData';

interface ProjectsScreenProps {
  onOpenDeliveryModal: (project: Project) => void;
  onOpenChatForClient: (clientName: string) => void;
  onNewProposal: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onOpenDeliveryModal,
  onOpenChatForClient,
  onNewProposal,
}) => {
  const [activeTab, setActiveTab] = useState<'andamento' | 'aguardando' | 'concluidos'>('andamento');

  return (
    <div className="pb-10 space-y-4 px-4 pt-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          id="projects-search-input"
          type="text"
          placeholder="Buscar serviços, habilidades ou projetos..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-[12.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
        />
      </div>

      {/* Header with Title and + Proposta button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-extrabold text-slate-900 tracking-tight">
            Meus Projetos
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Acompanhe entregas, prazos e histórico de trabalhos.
          </p>
        </div>
        <button
          id="projects-new-proposal-btn"
          onClick={onNewProposal}
          className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12px] flex items-center gap-1 shadow-md shadow-indigo-600/20 active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Proposta
        </button>
      </div>

      {/* Metric Cards (3 items) */}
      <div className="grid grid-cols-3 gap-2">
        {/* Andamento */}
        <div className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Andamento</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          </div>
          <div className="font-extrabold text-slate-900 text-[18px] leading-tight">
            03
          </div>
          <span className="text-[10px] text-slate-400">ativos</span>
        </div>

        {/* Concluídos */}
        <div className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Concluídos</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="font-extrabold text-slate-900 text-[18px] leading-tight">
            12
          </div>
          <span className="text-[10px] text-slate-400">jobs</span>
        </div>

        {/* Ganhos */}
        <div className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Ganhos</span>
            <Banknote className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="font-bold text-slate-900 text-[13px] leading-tight mt-0.5 truncate">
            <span className="text-[10px] text-emerald-600 block">R$</span>
            1.240<span className="text-[10px] font-normal text-slate-400">,00</span>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        <button
          onClick={() => setActiveTab('andamento')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
            activeTab === 'andamento'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          Em andamento 3
        </button>
        <button
          onClick={() => setActiveTab('aguardando')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
            activeTab === 'aguardando'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          Aguardando aprovação 1
        </button>
        <button
          onClick={() => setActiveTab('concluidos')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
            activeTab === 'concluidos'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          Concluídos 12
        </button>
      </div>

      {/* Section: Projetos em Execução */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[12px]">
          <h2 className="font-bold text-slate-900 text-[14px]">Projetos em Execução</h2>
          <span className="text-slate-400 text-[11px]">Ordem de urgência</span>
        </div>

        {/* Card 1: Padaria Sabor da Terra (Urgent: Entrega hoje) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                P
              </span>
              <div>
                <span className="text-[11px] text-slate-500 block">Padaria Sabor da Terra</span>
                <h3 className="font-bold text-slate-900 text-[14px] leading-tight">
                  Card Instagram - Festiv...
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Entrega hoje
            </span>
          </div>

          {/* Time & Price */}
          <div className="flex items-center justify-between text-[12px] pt-0.5">
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Até 19:00
            </span>
            <span className="font-bold text-emerald-600 text-[13px]">
              R$ 40,00 <span className="text-[10px] font-normal text-slate-400">garantido</span>
            </span>
          </div>

          {/* Status & Progress */}
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-600">
                Status: <strong className="text-indigo-600">Revisão final</strong>
              </span>
              <span className="font-bold text-slate-900">75%</span>
            </div>

            {/* Stepper bar */}
            <div className="grid grid-cols-4 gap-1 mb-1">
              <div className="h-1.5 rounded-full bg-indigo-600" />
              <div className="h-1.5 rounded-full bg-indigo-600" />
              <div className="h-1.5 rounded-full bg-indigo-600" />
              <div className="h-1.5 rounded-full bg-slate-100" />
            </div>

            <div className="grid grid-cols-4 text-[9.5px] text-slate-400 text-center">
              <span>Briefing</span>
              <span>Rascunho</span>
              <span className="font-bold text-indigo-600">Revisão</span>
              <span>Envio</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              id="project-send-delivery-btn"
              onClick={() => onOpenDeliveryModal(mockProjects[0])}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12.5px] shadow-sm flex items-center justify-center gap-1.5 active:scale-98 transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              Enviar entrega
            </button>
            <button
              id="project-chat-btn-padaria"
              onClick={() => onOpenChatForClient('Padaria Sabor da Terra')}
              className="w-11 h-11 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all shrink-0"
              aria-label="Abrir conversa"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Loja Estilo Livre */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center">
                E
              </span>
              <div>
                <span className="text-[11px] text-slate-500 block">Loja Estilo Livre</span>
                <h3 className="font-bold text-slate-900 text-[14px] leading-tight">
                  Vídeo Promocional Reels & ...
                </h3>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              2 dias
            </span>
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <span className="text-slate-500 text-[11px]">Cortes e legendas</span>
            <span className="font-extrabold text-emerald-600 text-[13px]">
              R$ 80,00
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Edição bruta finalizada</span>
              <span className="font-bold text-slate-700">40%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '40%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">CapCut</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Reels</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenChatForClient('Loja Estilo Livre')}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenDeliveryModal(mockProjects[1])}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
              >
                Ver detalhes
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Mercado União */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                M
              </span>
              <div>
                <span className="text-[11px] text-slate-500 block">Mercado União</span>
                <h3 className="font-bold text-slate-900 text-[14px] leading-tight">
                  Organização de Planilha de Es...
                </h3>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
              3 dias
            </span>
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <span className="text-slate-500 text-[11px]">Coleta de inventário</span>
            <span className="font-extrabold text-emerald-600 text-[13px]">
              R$ 70,00
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Coleta de dados iniciada</span>
              <span className="font-bold text-slate-700">20%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '20%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Excel / Sheets</span>
            <button
              onClick={() => onOpenDeliveryModal(mockProjects[2])}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
            >
              Ver detalhes
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Section: Última Entrega Avaliada */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-[14px]">Última Entrega Avaliada</h2>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Aprovado
          </span>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center text-base border border-amber-100">
                ☕
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-[13.5px] leading-tight">
                  Identidade Visual Cafeteria
                </h3>
                <span className="text-[11px] text-slate-400">
                  Café Bom • Concluído há 2 dias
                </span>
              </div>
            </div>
            <span className="font-extrabold text-emerald-600 text-[13.5px]">
              + R$ 120,00
            </span>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[11px] font-bold text-slate-700 ml-1">5.0</span>
          </div>

          <p className="text-[12px] text-slate-600 italic bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100/80">
            "Excelente trabalho! Criou o logotipo e o cardápio antes do prazo previsto. Super recomendo a Ana."
          </p>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-50">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Banknote className="w-3.5 h-3.5" />
              Liberado na carteira
            </span>
            <button
              id="projects-view-receipt-btn"
              className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              <FileCheck className="w-3.5 h-3.5" />
              Ver comprovante
            </button>
          </div>
        </div>
      </div>

      {/* Support Card */}
      <div className="rounded-3xl bg-white border border-slate-100 p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-[12.5px] leading-tight">
              Dúvida sobre prazos ou pagamento?
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              O mediador Talento Local ajuda você.
            </p>
          </div>
        </div>
        <button
          id="projects-help-btn"
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-[12px] shrink-0"
        >
          Ajuda
        </button>
      </div>
    </div>
  );
};
