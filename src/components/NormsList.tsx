

import { ppeNorms, ppeItems, positions } from '../mockData';
import { ClipboardList, Plus, FileText, Calendar, Edit2 } from 'lucide-react';

export default function NormsList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Нормы выдачи</h1>
          <p className="text-slate-500 mt-1">Отраслевые и внутренние нормы обеспечения</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-200">
          <Plus className="w-5 h-5" />
          Новая норма
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {positions.map((pos) => {
          const norms = ppeNorms.filter(n => n.positionId === pos.id);
          
          return (
            <div key={pos.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">{pos.positionName}</h3>
                </div>
                <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 hover:shadow-sm transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-5 flex-1">
                {norms.length > 0 ? (
                  <div className="space-y-4">
                    {norms.map((norm) => {
                      const item = ppeItems.find(i => i.id === norm.ppeItemId);
                      return (
                        <div key={norm.id} className="flex items-start justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{item?.itemName}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <FileText className="w-3 h-3" /> {norm.quantity} {item?.unit}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" /> {norm.wearMonths} мес.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-slate-400 italic">Нормы не установлены</p>
                    <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Добавить</button>
                  </div>
                )}
              </div>

              <div className="px-5 py-4 border-t border-slate-50 bg-slate-50/10 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Всего позиций: {norms.length}</span>
                <button className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">Копировать нормы</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
