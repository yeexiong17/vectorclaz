import React from 'react';
import { 
  Users, AlertTriangle, TrendingUp, Search, Upload, 
  CreditCard, MapPin, Monitor, GraduationCap, FileCheck, DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, CartesianGrid } from 'recharts';
import { ADMIN_ANOMALIES, EXAM_ELIGIBILITY_DATA, ATTENDANCE_DATA, CANTEEN_AUDIT_DATA } from '../constants';
import { ViewState } from '../types';

interface DashboardAdminProps {
  view: ViewState;
  setView: (view: ViewState) => void;
}

const AdminOverview: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* KPI Cards */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm">Total Students</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">1,245</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
        </div>
        <div className="mt-4 flex items-center text-xs text-green-600">
           <TrendingUp size={14} className="mr-1" /> +12 this month
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm">Avg. Attendance</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">94.2%</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><MapPin size={20} /></div>
        </div>
        <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
           <div className="bg-green-500 h-full w-[94%]"></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm">Subsidy Usage</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">RM 4.2k</h3>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><CreditCard size={20} /></div>
        </div>
        <p className="mt-4 text-xs text-slate-500">Today's total redemption</p>
      </div>
    </div>

    {/* Anomalies Section */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
       <div className="p-5 border-b border-slate-50 flex justify-between items-center">
         <h3 className="font-bold text-slate-800 flex items-center gap-2">
           <AlertTriangle size={18} className="text-red-500" /> Action Required: Anomalies
         </h3>
         <button className="text-xs text-primary-600 font-bold hover:underline">View All</button>
       </div>
       <table className="w-full text-sm text-left">
         <thead className="bg-slate-50 text-slate-500">
           <tr>
             <th className="px-5 py-3 font-medium">Student</th>
             <th className="px-5 py-3 font-medium">Issue</th>
             <th className="px-5 py-3 font-medium">Risk Level</th>
             <th className="px-5 py-3 font-medium">Action</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-slate-50">
           {ADMIN_ANOMALIES.map((item) => (
             <tr key={item.id} className="hover:bg-slate-50/50">
               <td className="px-5 py-3">
                 <div className="font-medium text-slate-800">{item.student}</div>
                 <div className="text-xs text-slate-400">{item.class}</div>
               </td>
               <td className="px-5 py-3 text-slate-600">{item.issue}</td>
               <td className="px-5 py-3">
                 <span className={`px-2 py-1 rounded text-xs font-bold ${
                   item.risk === 'High' ? 'bg-red-100 text-red-700' :
                   item.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                 }`}>
                   {item.risk}
                 </span>
               </td>
               <td className="px-5 py-3">
                 <button className="text-primary-600 hover:text-primary-800 font-medium">Investigate</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Exam Eligibility</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie 
                   data={EXAM_ELIGIBILITY_DATA} 
                   innerRadius={60} 
                   outerRadius={80} 
                   paddingAngle={5} 
                   dataKey="value"
                 >
                   {EXAM_ELIGIBILITY_DATA.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs font-medium">
             <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div> Eligible</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#ef4444] rounded-full"></div> Ineligible</div>
          </div>
       </div>

       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">School-wide Attendance</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={ATTENDANCE_DATA}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                 <YAxis hide />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                 <Bar dataKey="percentage" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
          </div>
       </div>
    </div>
  </div>
);

const StudentManagementView = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[600px]">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h2 className="text-xl font-bold text-slate-800">Student Database</h2>
      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
           <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input type="text" placeholder="Search ID or Name..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
          <Upload size={16} /> Bulk Import
        </button>
      </div>
    </div>
    
    <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
       <Users size={48} className="mb-4 opacity-50"/>
       <p>Select a student to view detailed profile or perform actions.</p>
    </div>
  </div>
);

const ExamManagementView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <GraduationCap size={24} className="text-primary-600"/> Exam Management & Seating
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         <div className="bg-primary-50 border border-primary-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-primary-700 text-sm font-semibold">Total Eligible Candidates</p>
              <h3 className="text-3xl font-bold text-primary-900">850</h3>
            </div>
            <FileCheck size={32} className="text-primary-300"/>
         </div>
         <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-red-700 text-sm font-semibold">Ineligible (Attendance &lt; 80%)</p>
              <h3 className="text-3xl font-bold text-red-900">45</h3>
            </div>
            <AlertTriangle size={32} className="text-red-300"/>
         </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
         <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-semibold text-slate-700">Upcoming Sessions</div>
         <div className="p-4 space-y-3">
            {[
              { name: 'SPM 2024 - Bahasa Melayu (Paper 1)', date: 'Nov 5, 2024', hall: 'Dewan Gemilang', seats: '350/400' },
              { name: 'SPM 2024 - History', date: 'Nov 6, 2024', hall: 'Dewan Gemilang', seats: '350/400' },
              { name: 'PT3 2024 - Science', date: 'Dec 1, 2024', hall: 'Exam Hall B', seats: '120/150' },
            ].map((exam, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition border border-slate-100">
                 <div>
                    <h4 className="font-bold text-slate-800 text-sm">{exam.name}</h4>
                    <p className="text-xs text-slate-500">{exam.date} • {exam.hall}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs font-bold text-slate-600 mb-1">Seating Filled</p>
                    <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
                       <div className="bg-green-500 h-full w-[85%]"></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{exam.seats}</p>
                 </div>
              </div>
            ))}
         </div>
         <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 text-center">
            <button className="text-primary-600 text-sm font-bold hover:underline">Manage Seating Plans</button>
         </div>
      </div>
    </div>
  </div>
);

const FinancialView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
           <DollarSign size={24} className="text-green-600"/> Subsidy & Financial Audit
         </h2>
         <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-slate-800">
           Export Report
         </button>
       </div>

       <div className="h-72 w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={CANTEEN_AUDIT_DATA} barSize={40}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} />
               <XAxis dataKey="name" axisLine={false} tickLine={false} />
               <YAxis />
               <Tooltip cursor={{fill: 'transparent'}} />
               <Bar dataKey="sales" name="Total Sales (RM)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
               <Bar dataKey="claims" name="Subsidized Claims (RM)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
             </BarChart>
          </ResponsiveContainer>
       </div>

       <h3 className="font-bold text-slate-800 mb-3">Daily Transaction Logs</h3>
       <div className="overflow-hidden border border-slate-200 rounded-xl">
         <table className="w-full text-sm text-left">
           <thead className="bg-slate-50 text-slate-500">
             <tr>
               <th className="px-4 py-2">Time</th>
               <th className="px-4 py-2">Vendor</th>
               <th className="px-4 py-2">Student ID</th>
               <th className="px-4 py-2 text-right">Amount</th>
               <th className="px-4 py-2 text-center">Status</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {[1, 2, 3, 4, 5].map((_, i) => (
               <tr key={i} className="hover:bg-slate-50">
                 <td className="px-4 py-2 text-slate-500">10:{30 + i} AM</td>
                 <td className="px-4 py-2">Canteen A</td>
                 <td className="px-4 py-2 font-mono text-slate-600">STU-2024-00{i + 1}</td>
                 <td className="px-4 py-2 text-right font-medium">RM 4.50</td>
                 <td className="px-4 py-2 text-center">
                   <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">Verified</span>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    </div>
  </div>
);

export const DashboardAdmin: React.FC<DashboardAdminProps> = ({ view, setView }) => {
  switch (view) {
    case 'ADMIN_STUDENTS': return <StudentManagementView />;
    case 'ADMIN_EXAMS': return <ExamManagementView />;
    case 'ADMIN_FINANCE': return <FinancialView />;
    default: return <AdminOverview setView={setView} />;
  }
};