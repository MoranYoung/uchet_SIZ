

import { 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

const data = [
  { name: 'Цех №1', issued: 45, need: 12 },
  { name: 'Цех №2', issued: 30, need: 5 },
  { name: 'Склад', issued: 15, need: 2 },
  { name: 'Админ.', issued: 8, need: 0 },
];

const pieData = [
  { name: 'Спецодежда', value: 400, color: '#3b82f6' },
  { name: 'Спецобувь', value: 300, color: '#10b981' },
  { name: 'СИЗ', value: 300, color: '#f59e0b' },
  { name: 'СиОС', value: 200, color: '#6366f1' },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
        {trend && (
          <div className={cn("flex items-center gap-1 mt-2 text-sm font-medium", trend > 0 ? "text-emerald-600" : "text-rose-600")}>
            <TrendingUp className={cn("w-4 h-4", trend < 0 && "rotate-180")} />
            <span>{Math.abs(trend)}% к прошлому месяцу</span>
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Всего сотрудников" 
          value="156" 
          icon={Users} 
          color="bg-blue-500"
          trend={12}
        />
        <StatCard 
          title="СИЗ на руках" 
          value="1,248" 
          icon={Package} 
          color="bg-emerald-500"
          trend={5}
        />
        <StatCard 
          title="Истекающие сроки" 
          value="24" 
          icon={Clock} 
          color="bg-amber-500"
          trend={-8}
        />
        <StatCard 
          title="Просрочено" 
          value="7" 
          icon={AlertTriangle} 
          color="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Выдача СИЗ по подразделениям</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm px-3 py-2 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500">
              <option>Текущий месяц</option>
              <option>Прошлый месяц</option>
              <option>За год</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="issued" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="need" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-8">Структура запасов</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{item.value} шт.</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Последние операции</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Смотреть все</button>
        </div>
        <div className="space-y-6">
          {[
            { user: 'Иванов И.И.', action: 'Выдано: Костюм сварщика', date: '2 часа назад', type: 'ISSUE' },
            { user: 'Петров П.П.', action: 'Возвращено: Ботинки защитные', date: '5 часов назад', type: 'RETURN' },
            { user: 'Сидоров С.С.', action: 'Списано: Перчатки рабочие', date: 'Вчера, 16:45', type: 'WRITE_OFF' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  item.type === 'ISSUE' ? "bg-emerald-50 text-emerald-600" :
                  item.type === 'RETURN' ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600"
                )}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.action}</p>
                  <p className="text-xs text-slate-500">{item.user}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
