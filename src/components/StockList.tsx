
import { useState } from 'react';
import { stock, ppeItems, warehouses } from '../mockData';
import { Warehouse, AlertCircle, TrendingDown } from 'lucide-react';

export default function StockList() {
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');

  const filteredStock = selectedWarehouse === 'all' 
    ? stock 
    : stock.filter(s => s.warehouseId === selectedWarehouse);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Складские остатки</h1>
          <p className="text-slate-500 mt-1">Текущее наличие СИЗ на складах</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex">
            <button 
              onClick={() => setSelectedWarehouse('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedWarehouse === 'all' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Все склады
            </button>
            {warehouses.map(w => (
              <button 
                key={w.id}
                onClick={() => setSelectedWarehouse(w.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedWarehouse === w.id ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {w.warehouseName}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
          <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Всего позиций</p>
          <h3 className="text-4xl font-bold mt-2">1,420</h3>
          <div className="mt-4 flex items-center gap-2 text-blue-100 text-xs">
            <Warehouse className="w-4 h-4" />
            <span>Общий объем по всем складам</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Критический остаток</p>
          <h3 className="text-4xl font-bold mt-2 text-rose-500">12</h3>
          <div className="mt-4 flex items-center gap-2 text-rose-500 text-xs font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Требуется пополнение</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Оборачиваемость</p>
          <h3 className="text-4xl font-bold mt-2 text-slate-900">18.4%</h3>
          <div className="mt-4 flex items-center gap-2 text-emerald-500 text-xs font-bold">
            <TrendingDown className="w-4 h-4" />
            <span>За текущий месяц</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-4">Номенклатура</th>
                <th className="px-6 py-4">Склад</th>
                <th className="px-6 py-4">Размер</th>
                <th className="px-6 py-4">Износ</th>
                <th className="px-6 py-4">Количество</th>
                <th className="px-6 py-4 text-right">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStock.map((s) => {
                const item = ppeItems.find(i => i.id === s.ppeItemId);
                const wh = warehouses.find(w => w.id === s.warehouseId);
                const isLow = s.quantity < 10;
                
                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{item?.itemName}</p>
                      <p className="text-xs text-slate-500">{item?.itemType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Warehouse className="w-4 h-4 text-slate-400" />
                        {wh?.warehouseName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded">
                        {s.size || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${s.wearPercent > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${s.wearPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-500">{s.wearPercent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${isLow ? 'text-rose-600' : 'text-slate-900'}`}>
                        {s.quantity} {item?.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isLow ? (
                        <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-lg uppercase border border-rose-100">
                          Мало
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg uppercase border border-emerald-100">
                          В наличии
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
