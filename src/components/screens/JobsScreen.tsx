import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Compass,
  ChevronDown,
  Wifi,
  Clock,
  BellRing,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Job } from '../../types';
import { mockJobs } from '../../data/mockData';

interface JobsScreenProps {
  onSelectJob: (job: Job) => void;
  appliedJobIds: string[];
}

export const JobsScreen: React.FC<JobsScreenProps> = ({
  onSelectJob,
  appliedJobIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [alertActive, setAlertActive] = useState(false);

  const categories = [
    { id: 'Todas', label: 'Todas 42' },
    { id: 'Design', label: '● Design & Arte' },
    { id: 'Edição de Vídeo', label: '● Edição de Vídeo' },
    { id: 'Redes Sociais', label: '● Redes Sociais' },
    { id: 'Excel & Dados', label: '● Excel & Dados' },
  ];

  const filteredJobs = mockJobs.filter((job) => {
    const matchesCategory =
      selectedCategory === 'Todas' ||
      job.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-10 space-y-4 px-4 pt-3">
      {/* Title Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-extrabold text-slate-900 tracking-tight">
              Oportunidades & Vagas
            </h1>
            <Compass className="w-5 h-5 text-indigo-600 shrink-0" />
          </div>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Encontre projetos ideais para suas habilidades e ganhe experiência real.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="jobs-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cargo, habilidade ou empresa..."
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-[12px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <button
          id="jobs-filter-btn"
          className="relative w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shrink-0 active:scale-95 shadow-2xs"
          aria-label="Filtros avançados"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Subheader Bar */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-700">
            {filteredJobs.length} vagas abertas agora
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 font-medium cursor-pointer hover:text-slate-800">
            <span>Recentes</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-1 text-indigo-600 font-medium bg-indigo-50/70 px-2 py-0.5 rounded-full">
            <Wifi className="w-3 h-3" />
            <span>Remoto</span>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-3.5">
        {filteredJobs.map((job, idx) => {
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <React.Fragment key={job.id}>
              {/* Job Card */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${job.categoryBadgeBg} ${job.categoryBadgeText}`}>
                      {job.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[12px] text-slate-700 font-medium">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${job.clientAvatarBg}`}>
                        {job.clientAvatarText}
                      </span>
                      <span className="truncate max-w-[140px]">{job.client}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{job.timeAgo}</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-bold text-slate-900 text-[14.5px] leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                {/* Value & Terms */}
                <div className="flex items-center justify-between py-1 border-y border-slate-50 text-[11.5px]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 text-[11px]">Valor</span>
                    <span className="font-extrabold text-emerald-600 text-[15px]">
                      R$ {job.value},00
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-500">
                    <span className="flex items-center gap-1 text-[11px] bg-slate-50 px-2 py-0.5 rounded-md">
                      <Wifi className="w-3 h-3 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] bg-slate-50 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {job.deadlineDays} dias
                    </span>
                  </div>
                </div>

                {/* Tags & Action Button */}
                <div className="flex items-center justify-between pt-0.5 gap-2">
                  <div className="flex flex-wrap gap-1">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium bg-slate-100/90 text-slate-600 px-2 py-0.5 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    id={`job-apply-btn-${job.id}`}
                    onClick={() => onSelectJob(job)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-[12px] font-bold transition-all active:scale-95 shadow-xs ${
                      isApplied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                    }`}
                  >
                    {isApplied ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Candidatado
                      </span>
                    ) : (
                      'Candidatar-se'
                    )}
                  </button>
                </div>
              </div>

              {/* Callout Banner after 3rd Job (matching Image 4) */}
              {idx === 2 && (
                <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white shadow-md space-y-2.5 relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                      <BellRing className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[14px] text-white">
                        Não encontrou o que procurava?
                      </h4>
                      <p className="text-[11.5px] text-indigo-100 leading-snug mt-0.5">
                        Ative alertas rápidos e receba projetos do seu interesse direto no WhatsApp ou e-mail.
                      </p>
                    </div>
                  </div>

                  <button
                    id="jobs-activate-alerts-btn"
                    onClick={() => setAlertActive(!alertActive)}
                    className="w-full py-2.5 rounded-2xl bg-white text-indigo-700 font-bold text-[12.5px] shadow-sm hover:bg-indigo-50 active:scale-98 transition-all"
                  >
                    {alertActive ? '✓ Alertas Ativados com Sucesso!' : 'Ativar Alertas Grátis'}
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Load More */}
      <div className="pt-2 text-center space-y-1.5">
        <button
          id="jobs-load-more-btn"
          className="w-full py-3 bg-white hover:bg-slate-50 text-indigo-600 font-semibold text-[13px] rounded-2xl border border-slate-200/90 shadow-2xs transition-colors flex items-center justify-center gap-1.5"
        >
          <ChevronDown className="w-4 h-4" />
          Carregar mais vagas (37 restantes)
        </button>
        <p className="text-[11px] text-slate-400">
          Mostrando {filteredJobs.length} de 42 oportunidades disponíveis
        </p>
      </div>
    </div>
  );
};
