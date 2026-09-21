import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, Clock, Banknote } from 'lucide-react';
import { Job } from '../../types';
import { currentUser } from '../../data/mockData';

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
  onApplySuccess: (jobId: string) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  onClose,
  onApplySuccess,
}) => {
  const [proposalText, setProposalText] = useState(
    `Olá! Sou a Ana Silva, Designer Gráfica certificada pela plataforma Talento Local. Tenho experiência com ${job.tags.join(', ')} e garanto entrega ágil e profissional dentro do prazo de ${job.deadlineDays} dias.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      setTimeout(() => {
        onApplySuccess(job.id);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${job.categoryBadgeBg} ${job.categoryBadgeText}`}>
              {job.category}
            </span>
            <span className="text-[12px] text-slate-500 font-medium">
              {job.client}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-in zoom-in-75">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-[18px]">
              Candidatura Enviada!
            </h3>
            <p className="text-[12.5px] text-slate-500 max-w-xs mx-auto">
              Sua proposta foi enviada para <strong>{job.client}</strong>. Acompanhe a resposta na aba Mensagens.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <h2 className="font-bold text-slate-900 text-[15px] leading-snug">
                {job.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-[12px] text-slate-600">
                <span className="flex items-center gap-1 font-bold text-emerald-600 text-[14px]">
                  <Banknote className="w-4 h-4" />
                  R$ {job.value},00
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  Prazo: {job.deadlineDays} dias
                </span>
              </div>
            </div>

            {/* Candidate summary */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-900 text-[13px]">{currentUser.name}</span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-semibold">Pro</span>
                </div>
                <span className="text-[11px] text-slate-500 block truncate">
                  ★ 4.9 • 100% no prazo
                </span>
              </div>
            </div>

            {/* Proposal Message Input */}
            <div className="space-y-1">
              <label className="text-[11.5px] font-bold text-slate-700">
                Mensagem de Apresentação
              </label>
              <textarea
                rows={3}
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[12px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-emerald-50/70 border border-emerald-100 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pagamento fica retido com segurança até sua entrega ser aprovada.</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-[12.5px] hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12.5px] shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Enviar Proposta
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
