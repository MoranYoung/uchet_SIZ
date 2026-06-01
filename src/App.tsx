
import { useState } from 'react';
import { 
  Users, 
  Package, 
  Warehouse as WarehouseIcon, 
  ArrowRightLeft, 
  ClipboardList, 
  LayoutDashboard,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  Menu
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Components
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import PpeList from './components/PpeList';
import MovementList from './components/MovementList';
import StockList from './components/StockList';
import NormsList from './components/NormsList';

type Tab = 'dashboard' | 'employees' | 'ppe' | 'stock' | 'movements' | 'norms';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { id: 'employees', label: 'Сотрудники', icon: Users },
    { id: 'ppe', label: 'Номенклатура СИЗ', icon: Package },
    { id: 'stock', label: 'Складские остатки', icon: WarehouseIcon },
    { id: 'norms', label: 'Нормы выдачи', icon: ClipboardList },
    { id: 'movements', label: 'Движение СИЗ', icon: ArrowRightLeft },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <EmployeeList />;
      case 'ppe': return <PpeList />;
      case 'stock': return <StockList />;
      case 'norms': return <NormsList />;
      case 'movements': return <MovementList />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-slate-900 text-white transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">Учет СИЗ</span>}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                  activeTab === item.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors",
            !isSidebarOpen && "justify-center"
          )}>
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-medium">Выйти</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
            >
              {isSidebarOpen ? <Menu className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <h2 className="text-lg font-semibold text-slate-800">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Поиск по системе..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-800 leading-none">Админ</p>
                  <p className="text-xs text-slate-500 mt-1">Системный администратор</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  А
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
