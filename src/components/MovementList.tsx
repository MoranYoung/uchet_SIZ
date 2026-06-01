
import { useState } from 'react';
import { movements, employees, warehouses } from '../mockData';
import { 
  ArrowRightLeft, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  Trash2, 
  Calendar,
  User,
  MoreVertical,
  FileText
} from 'lucide-react';

export default function MovementList() {
  const [showAddModal, setShowAddModal] = useState(false);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'ISSUE': return { label: 'Выдача', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: ArrowUpRight };
      case 'RETURN': return { label: 'Возврат', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: ArrowDownLeft };
      case 'TRANSFER': return { label: 'Перемещение', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: RefreshCw };
      case 'WRITE_OFF': return { label: 'Списание', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: Trash2 };
      default: return { label: 'Операция', color: 'bg-slate-50 text-slate-600 border-slate-100', icon: FileText };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Движение СИЗ</h1>
          <p className="text-slate-500 mt-1">История операций по складу и сотрудникам</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-200"
          >
            <Plus className="w-5 h-5" />
            Новая операция
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-4">Документ</th>
                <th className="px-6 py-4">Тип</th>
                <th className="px-6 py-4">Дата</th>
                <th className="px-6 py-4">Сотрудник / Склад</th>
                <th className="px-6 py-4">Примечание</th>
                <th className="px-6 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {movements.map((m) => {
                const styles = getTypeStyles(m.movementType);
                const Icon = styles.icon;
                const emp = employees.find(e => e.id === m.employeeId);
                const wh = warehouses.find(w => w.id === m.fromWarehouseId);
                
                return (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <FileText className="w-4 h-4 text-slate-500" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{m.movementNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${styles.color}`}>
                        <Icon className="w-3 h-3" />
                        {styles.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {m.movementDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {emp ? (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{emp.fullName}</span>
                        </div>
                      ) : wh ? (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                          {wh.warehouseName}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                      {m.comment || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simplified Modal Backdrop (Just a placeholder for now) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">Новая операция</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Тип операции</label>
                  <select className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="ISSUE">Выдача</option>
                    <option value="RETURN">Возврат</option>
                    <option value="TRANSFER">Перемещение</option>
                    <option value="WRITE_OFF">Списание</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Дата</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Сотрудник</label>
                  <select className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="">Выберите сотрудника...</option>
                    {employees.map(e => <option key={e.id} value={e.id}>{e.fullName} ({e.tabNumber})</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Основание / Примечание</label>
                  <textarea className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none h-24" placeholder="Укажите причину или номер приказа..."></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Отмена
                </button>
                <button 
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                >
                  Создать документ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
