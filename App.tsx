import React, { useState } from 'react';
import Layout from './components/Layout';
import { DashboardStudent } from './components/DashboardStudent';
import { DashboardAdmin } from './components/DashboardAdmin';
import SmartAssistant from './components/SmartAssistant';
import { UserRole, ViewState } from './types';
import { Users, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [view, setView] = useState<ViewState>('OVERVIEW');

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('OVERVIEW'); // Reset view on login
  };

  const handleLogout = () => {
    setRole(null);
  };

  // Login Screen
  if (!role) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
           {/* Left Side - Visual */}
           <div className="w-full md:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="w-64 h-64 bg-white rounded-full absolute -top-10 -left-10 blur-3xl"></div>
                 <div className="w-64 h-64 bg-white rounded-full absolute bottom-10 right-10 blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-4">VectorClaz</h1>
                <p className="opacity-90 text-lg leading-relaxed">
                  The universal identity layer for Malaysian education. Attendance, Exams, Subsidies - One Card.
                </p>
              </div>

              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3 text-sm opacity-80">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    System Online
                 </div>
                 <p className="text-xs opacity-60">© 2024 Ministry of Education Malaysia</p>
              </div>
           </div>

           {/* Right Side - Login Selection */}
           <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Select Portal</h2>
              
              <div className="space-y-4">
                <button 
                  onClick={() => handleRoleSelect(UserRole.STUDENT)}
                  className="w-full p-6 border-2 border-slate-100 rounded-2xl flex items-center gap-4 hover:border-primary-500 hover:bg-primary-50 transition-all group"
                >
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-full group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Users size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Student</h3>
                    <p className="text-slate-500 text-sm">Access results, attendance & meals.</p>
                  </div>
                </button>

                <button 
                  onClick={() => handleRoleSelect(UserRole.ADMIN)}
                  className="w-full p-6 border-2 border-slate-100 rounded-2xl flex items-center gap-4 hover:border-slate-800 hover:bg-slate-50 transition-all group"
                >
                  <div className="bg-slate-100 text-slate-600 p-3 rounded-full group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <Shield size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Admin</h3>
                    <p className="text-slate-500 text-sm">Manage enrollments & reports.</p>
                  </div>
                </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Main App
  return (
    <Layout role={role} currentView={view} setView={setView} onLogout={handleLogout}>
      {role === UserRole.STUDENT ? (
        <DashboardStudent view={view} setView={setView} />
      ) : (
        <DashboardAdmin view={view} setView={setView} />
      )}
      <SmartAssistant role={role} currentView={view} />
    </Layout>
  );
};

export default App;