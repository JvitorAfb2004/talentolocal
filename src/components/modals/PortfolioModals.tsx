import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface AddPortfolioModalProps {
  onClose: () => void;
  onAdd: (item: PortfolioItem) => void;
}

export const AddPortfolioModal: React.FC<AddPortfolioModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [price, setPrice] = useState('60');
  const [category, setCategory] = useState('Design');
  const [tool, setTool] = useState('Canva');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      category,
      categoryTagColor: 'bg-indigo-100 text-indigo-800',
      title,
      client: client || 'Comércio Local',
      price: Number(price) || 50,
      tool,
      iconType: category === 'Design' ? 'bread' : category === 'Edição Vídeo' ? 'video' : 'chart',
      bgColor: 'from-purple-100/80 to-indigo-100/40',
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-[16px]">
            Adicionar ao Portfólio
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 uppercase">Título do Trabalho</label>
            <input
              type="text"
              required
              placeholder="Ex: Identidade Visual para Hamburgueria"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 uppercase">Cliente</label>
            <input
              type="text"
              placeholder="Ex: Burger & Beer Artesanal"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Design</option>
                <option>Branding</option>
                <option>Edição Vídeo</option>
                <option>Planilha</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase">Ferramenta</label>
              <input
                type="text"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                placeholder="Ex: Canva / Figma"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 uppercase">Valor Recebido (R$)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
              <Check className="w-3.5 h-3.5" />
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface PortfolioDetailModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export const PortfolioDetailModal: React.FC<PortfolioDetailModalProps> = ({
  item,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
            {item.category}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className={`h-36 rounded-2xl bg-gradient-to-br ${item.bgColor} flex items-center justify-center text-4xl shadow-inner`}>
          {item.iconType === 'bread' ? '🍞' : item.iconType === 'coffee' ? '☕' : item.iconType === 'video' ? '🎬' : '📊'}
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-[16px] leading-tight">
            {item.title}
          </h3>
          <p className="text-[12px] text-slate-500 mt-1">
            Cliente: <strong>{item.client}</strong>
          </p>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[12px]">
          <div>
            <span className="text-slate-400 block text-[10px]">VALOR DO JOB</span>
            <span className="font-extrabold text-emerald-600 text-sm">R$ {item.price},00</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">FERRAMENTA</span>
            <span className="font-bold text-slate-700">{item.tool}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">AVALIAÇÃO</span>
            <span className="font-bold text-amber-500">★ {item.rating ? item.rating.toFixed(1) : '5.0'}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[12px] transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
