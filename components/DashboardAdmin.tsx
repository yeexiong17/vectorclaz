import React from 'react';
import {
  Users, AlertTriangle, TrendingUp, Search, Upload,
  CreditCard, MapPin, Monitor, GraduationCap, FileCheck, DollarSign, Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, CartesianGrid } from 'recharts';
import { ADMIN_ANOMALIES, EXAM_ELIGIBILITY_DATA, ATTENDANCE_DATA, CANTEEN_AUDIT_DATA, TEACHER_ATTENDANCE_STUDENTS } from '../constants';
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
                <span className={`px-2 py-1 rounded text-xs font-bold ${item.risk === 'High' ? 'bg-red-100 text-red-700' :
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
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Bar dataKey="percentage" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const StudentManagementView = () => {
  const [search, setSearch] = React.useState('');
  const filtered = React.useMemo(() =>
    TEACHER_ATTENDANCE_STUDENTS.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
    ), [search]
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[600px] space-y-5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800">Student Database</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
            <Upload size={16} /> Bulk Import
          </button>
        </div>
      </div>

      <div className="border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Class</th>
              <th className="px-4 py-3 font-medium">Attendance</th>
              <th className="px-4 py-3 font-medium text-center">Present</th>
              <th className="px-4 py-3 font-medium text-center">Absent</th>
              <th className="px-4 py-3 font-medium text-center">Late</th>
              <th className="px-4 py-3 font-medium text-right">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={s.photoUrl} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{s.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{s.className}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                    {s.attendanceRate}%
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">{s.present}</td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">{s.absent}</td>
                <td className="px-4 py-3 text-center text-amber-600 font-semibold">{s.late}</td>
                <td className="px-4 py-3 text-right text-slate-500 text-xs">{s.lastSeen}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400 text-sm">
                  No students match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ExamManagementView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <GraduationCap size={24} className="text-primary-600" /> Exam Management & Seating
      </h2>

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
          <DollarSign size={24} className="text-green-600" /> Subsidy & Financial Audit
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
            <Tooltip cursor={{ fill: 'transparent' }} />
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

const AttendanceDetailsView = () => {
  const [search, setSearch] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(TEACHER_ATTENDANCE_STUDENTS[0]?.id ?? '');

  const filtered = React.useMemo(() =>
    TEACHER_ATTENDANCE_STUDENTS.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
    ), [search]
  );

  const selected = React.useMemo(() =>
    filtered.find(s => s.id === selectedId) || filtered[0],
    [filtered, selectedId]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 lg:p-5 h-fit">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calendar size={18} className="text-primary-600" /> Students
          </h3>
          <span className="text-xs text-slate-400">{filtered.length} listed</span>
        </div>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, class, ID"
            className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
          {filtered.map((student) => (
            <button
              key={student.id}
              onClick={() => setSelectedId(student.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition ${selected?.id === student.id ? 'border-primary-200 bg-primary-50' : 'border-slate-100 hover:border-slate-200'
                }`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-slate-800 text-sm">{student.name}</p>
                <p className="text-xs text-slate-500">{student.className}</p>
                <p className="text-[11px] text-slate-400 mt-1">Last seen: {student.lastSeen}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{student.attendanceRate}%</p>
                <p className="text-[11px] text-slate-500">attendance</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-xs text-slate-400 py-8 border border-dashed border-slate-200 rounded-xl">
              No students match your search.
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        {selected ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100">
                  <img src={selected.photoUrl} alt={selected.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{selected.name}</h3>
                  <p className="text-sm text-slate-500">{selected.id} • {selected.className}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">{selected.attendanceRate}%</span>
                <p className="text-xs text-slate-500">Attendance Rate</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Present', value: selected.present, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Absent', value: selected.absent, color: 'text-red-600', bg: 'bg-red-50' },
                { label: 'Late', value: selected.late, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat, idx) => (
                <div key={idx} className={`p-3 rounded-xl border border-slate-100 ${stat.bg}`}>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[11px] text-slate-400">Past 30 days</p>
                </div>
              ))}
            </div>

            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <p className="font-semibold text-slate-800 text-sm">Recent Attendance (7 days)</p>
                <p className="text-xs text-slate-500">Newest first</p>
              </div>
              <div className="divide-y divide-slate-100">
                {selected.history.map((record) => (
                  <div key={`${selected.id}-${record.date}`} className="flex items-center justify-between px-4 py-3 text-sm">
                    <div>
                      <p className="font-semibold text-slate-800">{record.date}</p>
                      <p className="text-xs text-slate-500">
                        {record.checkInTime ? `In ${record.checkInTime}` : '—'} · {record.checkOutTime ? `Out ${record.checkOutTime}` : '—'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${record.status === 'PRESENT' ? 'bg-green-100 text-green-700' :
                      record.status === 'LATE' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            Select a student to view attendance details.
          </div>
        )}
      </div>
    </div>
  );
};

export const DashboardAdmin: React.FC<DashboardAdminProps> = ({ view, setView }) => {
  switch (view) {
    case 'ADMIN_STUDENTS': return <StudentManagementView />;
    case 'ADMIN_ATTENDANCE': return <AttendanceDetailsView />;
    case 'ADMIN_EXAMS': return <ExamManagementView />;
    case 'ADMIN_FINANCE': return <FinancialView />;
    default: return <AdminOverview setView={setView} />;
  }
};