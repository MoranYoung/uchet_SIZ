
import { useState } from 'react';
import { ppeItems } from '../mockData';
import { Search, Plus, Filter, MoreHorizontal, Package, Tag, ShieldCheck, Sun } from 'lucide-react';

export default function PpeList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPpe = ppeItems.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Номенклатура СИЗ</h1>
          <p className="text-slate-500 mt-1">Каталог средств индивидуальной защиты</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-200">
          <Plus className="w-5 h-5" />
          Добавить позицию
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Поиск по наименованию..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white transition-all">
              <Filter className="w-4 h-4" />
              Фильтры
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredPpe.map((item) => (
            <div key={item.id} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-2.5 py-1 bg-white border border-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase shadow-sm">
                    {item.unit}
                  </span>
                  {item.isSeasonal && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg uppercase shadow-sm border border-amber-100">
                      <Sun className="w-3 h-3" /> Сезонный
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  <Tag className="w-3 h-3" />
                  {item.itemType}
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {item.itemName}
                </h3>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Срок носки</span>
                  <span className="text-sm font-bold text-slate-700">{item.defaultWearMonths} мес.</span>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Decorative Background Icon */}
              <ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-100 opacity-50 group-hover:text-blue-50 group-hover:opacity-100 transition-all pointer-events-none" />
            </div>
          ))}
        </div>
        
        {filteredPpe.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-500 font-medium">Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
}
