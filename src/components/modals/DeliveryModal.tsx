import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, FileText, Link2, ShieldAlert } from 'lucide-react';
import { Project } from '../../types';

interface DeliveryModalProps {
  project: Project;
  onClose: () => void;
  onDeliverySubmitted: (projectId: string) => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  project,
  onClose,
  onDeliverySubmitted,
}) => {
  const [fileAttached, setFileAttached] = useState(true);
  const [deliveryNote, setDeliveryNote] = useState(
    'Olá! Segue a versão final dos cards conforme combinamos, com tipografia ajustada e formatos ideais para feed e stories do Instagram.'
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
        onDeliverySubmitted(project.id);
        onClose();
      }, 1300);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 overflow-hidden relative">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Entrega de Projeto
          </span>
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
              Entrega Enviada!
            </h3>
            <p className="text-[12px] text-slate-500 max-w-xs mx-auto">
              O cliente <strong>{project.client}</strong> foi notificado para revisar. O pagamento de R$ {project.value},00 será liberado após a aprovação.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <span className="text-[11px] text-slate-400 block">{project.client}</span>
              <h2 className="font-bold text-slate-900 text-[15px] leading-snug">
                {project.title}
              </h2>
              <div className="flex items-center justify-between mt-1 text-[12px]">
                <span className="text-slate-500">Valor acordado:</span>
                <span className="font-extrabold text-emerald-600">R$ {project.value},00</span>
              </div>
            </div>

            {/* Attached file card */}
            <div className="space-y-1.5">
              <label className="text-[11.5px] font-bold text-slate-700 block">
                Arquivos da Entrega
              </label>
              {fileAttached ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-[12px] block truncate max-w-[170px]">
                        cards_artesanais_vFinal.zip
                      </span>
                      <span className="text-[10px] text-slate-400">14.2 MB • Canva / PNG</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFileAttached(false)}
                    className="text-[11px] text-rose-600 font-bold hover:underline"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setFileAttached(true)}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  <UploadCloud className="w-6 h-6 mb-1" />
                  <span className="text-[12px] font-semibold">Clique para anexar arquivo</span>
                  <span className="text-[10px] text-slate-400">ZIP, PNG, PDF ou Link</span>
                </button>
              )}
            </div>

            {/* Delivery Note */}
            <div className="space-y-1">
              <label className="text-[11.5px] font-bold text-slate-700 block">
                Observações para o Cliente
              </label>
              <textarea
                rows={3}
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-[12px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-[10.5px] text-slate-500 bg-amber-50/70 border border-amber-100 p-2 rounded-xl">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>O cliente tem até 48h para solicitar ajustes ou aprovar a liberação do pagamento.</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-[12.5px] hover:bg-slate-50"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !fileAttached}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12.5px] shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    Enviar Entrega
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
