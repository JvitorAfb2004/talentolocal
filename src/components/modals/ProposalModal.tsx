import React, { useState } from 'react';
import { X, Sparkles, Check, Briefcase } from 'lucide-react';

interface ProposalModalProps {
  onClose: () => void;
  onCreated: (title: string) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  onClose,
  onCreated,
}) => {
  const [client, setClient] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Design Gráfico');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !value) return;
    setDone(true);
    setTimeout(() => {
      onCreated(title);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-[16px]">
              Nova Proposta
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {done ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-[15px]">Proposta Gerada!</h4>
            <p className="text-[12px] text-slate-500">
              O cliente receberá o link seguro para aprovação e depósito da garantia.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase">Cliente / Negócio Local</label>
              <input
                type="text"
                required
                placeholder="Ex: Floricultura Primavera"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase">Nome do Projeto</label>
              <input
                type="text"
                required
                placeholder="Ex: Cardápio Digital QR Code"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase">Valor (R$)</label>
                <input
                  type="number"
                  required
                  placeholder="Ex: 100"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Design Gráfico</option>
                  <option>Edição de Vídeo</option>
                  <option>Redes Sociais</option>
                  <option>Excel & Dados</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-[12px] hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12px] shadow-sm flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Criar Proposta
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
