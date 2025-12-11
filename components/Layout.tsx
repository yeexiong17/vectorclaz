import React from 'react';
import { 
  Menu, X, LayoutDashboard, Calendar, Utensils, FileText, 
  Settings, LogOut, Users, ShieldAlert, BarChart3, GraduationCap 
} from 'lucide-react';
import { UserRole, ViewState, NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, currentView, setView, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const studentNav: NavItem[] = [
    { id: 'OVERVIEW', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'ATTENDANCE', label: 'Attendance', icon: <Calendar size={20} /> },
    { id: 'EXAMS', label: 'Exam Registration', icon: <GraduationCap size={20} /> },
    { id: 'MEALS', label: 'Subsidy Wallet', icon: <Utensils size={20} /> },
    { id: 'TRANSCRIPT', label: 'Transcript', icon: <FileText size={20} /> },
  ];

  const adminNav: NavItem[] = [
    { id: 'OVERVIEW', label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { id: 'ADMIN_STUDENTS', label: 'Students', icon: <Users size={20} /> },
    { id: 'ADMIN_EXAMS', label: 'Exams & Attendance', icon: <ShieldAlert size={20} /> },
    { id: 'ADMIN_FINANCE', label: 'Financials', icon: <CreditCardIcon size={20} /> },
  ];

  const navItems = role === UserRole.STUDENT ? studentNav : adminNav;

  // Small helper icon since CreditCard imported in other files
  function CreditCardIcon({ size }: { size: number }) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <span className="font-bold text-lg text-primary-700 tracking-tight">VectorClaz</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        md:translate-x-0 md:static md:h-screen flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-50">
           <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
           <span className="font-bold text-xl text-slate-800 tracking-tight">VectorClaz</span>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id as ViewState);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                currentView === item.id 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-50">
          <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 mb-3">
             <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                {role === UserRole.STUDENT ? (
                  <img src={role === UserRole.STUDENT ? "https://picsum.photos/200/200" : "https://picsum.photos/100"} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500"><Settings size={14} /></div>
                )}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold truncate text-slate-800">
                 {role === UserRole.STUDENT ? 'Ahmad Razak' : 'Admin Officer'}
               </p>
               <p className="text-xs text-slate-500 truncate capitalize">{role.toLowerCase()}</p>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-2 text-slate-400 hover:text-red-500 text-sm transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
           {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;