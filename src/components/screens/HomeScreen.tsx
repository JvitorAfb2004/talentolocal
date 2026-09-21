import React from 'react';
import {
  Search,
  ArrowRight,
  Smartphone,
  Palette,
  BarChart3,
  GraduationCap,
  Users,
  CheckCircle2,
  Star,
  Clock,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { TabType, Job } from '../../types';
import { mockJobs, mockCourses, currentUser } from '../../data/mockData';

interface HomeScreenProps {
  onTabChange: (tab: TabType) => void;
  onSelectJob: (job: Job) => void;
  onOpenChat: (convId: string) => void;
  onOpenProfileCompletion: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onTabChange,
  onSelectJob,
  onOpenChat,
  onOpenProfileCompletion,
}) => {
  return (
    <div className="pb-8 space-y-5 px-4 pt-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          id="home-search-input"
          type="text"
          placeholder="Buscar serviços, habilidades ou projetos..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
        />
      </div>

      {/* Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-violet-50/50 border border-indigo-100/70 p-4 shadow-sm relative overflow-hidden">
        <div className="space-y-2 mb-4">
          <h1 className="text-[21px] font-extrabold text-slate-900 tracking-tight leading-[1.25]">
            Conectando talentos a{' '}
            <span className="text-indigo-600 block sm:inline">oportunidades reais.</span>
          </h1>
          <p className="text-[13px] text-slate-600 leading-relaxed max-w-[95%]">
            Jovens com habilidades. Negócios com ideias. Juntos, fortalecemos nossa comunidade.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 mb-4">
          <button
            id="home-find-opportunities-btn"
            onClick={() => onTabChange('vagas')}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-indigo-600 text-white font-semibold text-[13px] shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all text-center"
          >
            Encontrar oportunidades
          </button>
          <button
            id="home-entrepreneur-btn"
            onClick={() => onTabChange('projetos')}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-white border border-indigo-200 text-indigo-700 font-semibold text-[13px] hover:bg-indigo-50/50 active:scale-95 transition-all text-center shadow-xs"
          >
            Sou empreendedor
          </button>
        </div>

        {/* Hero Image with Impact Floating Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=700"
            alt="Jovens colaborando"
            className="w-full h-44 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

          {/* Impact Stats Floating Card */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-white/80 shadow-md">
            <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block mb-1.5 text-center">
              IMPACTO QUE GERAMOS
            </span>
            <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
              <div>
                <span className="block font-black text-slate-900 text-sm">1.245</span>
                <span className="text-[10px] text-slate-500">jovens</span>
              </div>
              <div>
                <span className="block font-black text-slate-900 text-sm">832</span>
                <span className="text-[10px] text-slate-500">projetos</span>
              </div>
              <div>
                <span className="block font-black text-slate-900 text-sm flex items-center justify-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" /> 4,8
                </span>
                <span className="text-[10px] text-slate-500">avaliação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-slate-900 text-[14px]">Seu perfil está completo!</h3>
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
          </div>
          <p className="text-[12px] text-slate-500 leading-snug">
            Complete seu perfil para receber mais oportunidades.
          </p>
          <button
            id="home-complete-profile-btn"
            onClick={onOpenProfileCompletion}
            className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 pt-1 group"
          >
            Completar perfil
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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

      {/* Oportunidades para você */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-bold text-slate-900 text-[15px]">Oportunidades para você</h2>
          <button
            id="home-see-all-jobs-btn"
            onClick={() => onTabChange('vagas')}
            className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Ver todas
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 snap-x">
          {mockJobs.slice(0, 3).map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="min-w-[240px] max-w-[240px] bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between shrink-0 snap-start active:scale-[0.98]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${job.categoryBadgeBg} ${job.categoryBadgeText}`}>
                    {job.category}
                  </span>
                  <span className="text-sm">
                    {job.category === 'Design' ? '🍞' : job.category === 'Edição de Vídeo' ? '🎬' : '☕'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-[13px] line-clamp-1 mb-0.5">
                  {job.title}
                </h3>
                <p className="text-[11px] text-slate-500 mb-2">{job.client}</p>
                <div className="text-[15px] font-extrabold text-emerald-600 mb-2">
                  R$ {job.value},00
                </div>
              </div>

              <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                <span>{job.location} • {job.deadlineDays} dias</span>
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                  {job.tags[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desenvolva suas habilidades */}
      <div>
        <h2 className="font-bold text-slate-900 text-[15px] mb-2.5">
          Desenvolva suas habilidades
        </h2>
        <div className="space-y-2.5">
          {mockCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                {course.icon === 'phone' ? (
                  <Smartphone className="w-5 h-5 text-purple-600" />
                ) : course.icon === 'palette' ? (
                  <Palette className="w-5 h-5 text-amber-500" />
                ) : (
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 text-[13px] truncate">
                  {course.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>{course.level} • {course.lessons} aulas</span>
                  <span className="font-bold text-indigo-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      course.icon === 'phone'
                        ? 'bg-indigo-600'
                        : course.icon === 'palette'
                        ? 'bg-sky-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Ver mais cursos */}
          <button
            id="home-more-courses-btn"
            className="w-full bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-[13px]">Ver mais cursos</h4>
                <p className="text-[11px] text-slate-500">Aprenda novas habilidades e aumente suas chances.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          </button>
        </div>
      </div>

      {/* Community Banner */}
      <div className="rounded-3xl bg-indigo-50/80 border border-indigo-100/90 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-[13px] text-slate-700 leading-snug pt-0.5">
            <strong className="text-slate-900">Talento Local</strong> é mais que uma plataforma. É uma comunidade que transforma realidades.
          </p>
        </div>
        <button
          id="home-know-more-btn"
          className="w-full py-2.5 rounded-2xl bg-indigo-600 text-white font-semibold text-[13px] shadow-sm hover:bg-indigo-700 active:scale-98 transition-all"
        >
          Saiba mais
        </button>
      </div>

      {/* Atividade recente */}
      <div className="space-y-2.5">
        <h2 className="font-bold text-slate-900 text-[15px]">Atividade recente</h2>
        <div className="space-y-2">
          {/* Item 1 */}
          <div
            onClick={() => onOpenChat('conv-2')}
            className="flex items-start gap-3 p-2.5 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:bg-slate-50/80 transition-colors cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120"
              alt="Lucas"
              className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-slate-700 leading-tight">
                Você recebeu uma nova mensagem de <strong className="text-slate-900">Lucas</strong>
              </p>
              <span className="text-[10px] text-slate-400">há 10 minutos</span>
            </div>
          </div>

          {/* Item 2 */}
          <div
            onClick={() => onTabChange('projetos')}
            className="flex items-start gap-3 p-2.5 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:bg-slate-50/80 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-slate-700 leading-tight">
                Seu projeto <strong className="text-slate-900">"Card Instagram"</strong> foi concluído e avaliado!
              </p>
              <span className="text-[10px] text-slate-400">há 2 horas</span>
            </div>
          </div>

          {/* Item 3 */}
          <div
            onClick={() => onTabChange('perfil')}
            className="flex items-start gap-3 p-2.5 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:bg-slate-50/80 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-slate-700 leading-tight">
                Você recebeu <strong className="text-slate-900">5 estrelas</strong> no projeto de edição de vídeo!
              </p>
              <span className="text-[10px] text-slate-400">há 1 dia</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-1">
          <button
            id="home-all-activities-btn"
            onClick={() => onTabChange('projetos')}
            className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Ver todas as atividades
          </button>
        </div>
      </div>
    </div>
  );
};
