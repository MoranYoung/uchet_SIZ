
import { useState } from 'react';
import { employees, departments, positions } from '../mockData';
import { Search, Filter, MoreHorizontal, UserPlus } from 'lucide-react';

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.tabNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Сотрудники</h1>
          <p className="text-slate-500 mt-1">Управление персоналом и размерами</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-200">
          <UserPlus className="w-5 h-5" />
          Добавить сотрудника
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Поиск по ФИО или таб. номеру..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:border-slate-300 transition-all">
              <Filter className="w-4 h-4" />
              Фильтры
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:border-slate-300 transition-all">
              Экспорт
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-4">Сотрудник</th>
                <th className="px-6 py-4">Подразделение</th>
                <th className="px-6 py-4">Должность</th>
                <th className="px-6 py-4">Размеры</th>
                <th className="px-6 py-4">Дата приема</th>
                <th className="px-6 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
                        {emp.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{emp.fullName}</p>
                        <p className="text-xs text-slate-500">Таб. №{emp.tabNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {departments.find(d => d.id === emp.departmentId)?.departmentName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {positions.find(p => p.id === emp.positionId)?.positionName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">Од: {emp.clothingSize}</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded uppercase">Об: {emp.shoeSize}</span>
                      <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded uppercase">Рост: {emp.height}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {emp.hireDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEmployees.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-slate-500 font-medium">Сотрудники не найдены</p>
          </div>
        )}

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-sm text-slate-500">Показано {filteredEmployees.length} из {employees.length} записей</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm disabled:opacity-50" disabled>Пред.</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm disabled:opacity-50" disabled>След.</button>
          </div>
        </div>
      </div>
    </div>
  );
}
