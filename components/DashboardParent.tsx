import React, { useState } from 'react';
import {
  Users, Calendar, Utensils, FileText, GraduationCap,
  CheckCircle, TrendingUp, Clock, History, CreditCard,
  ArrowLeft, User, MapPin, Activity, Star, Medal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CURRENT_PARENT, RECENT_TRANSACTIONS, ATTENDANCE_DATA } from '../constants';
import { ViewState, Student } from '../types';

interface DashboardParentProps {
  view: ViewState;
  setView: (view: ViewState) => void;
}

const ParentOverview: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
  const handleChildSelect = (childId: string) => {
    // Store selected child ID in sessionStorage for ChildDetailsView to access
    sessionStorage.setItem('selectedChildId', childId);
    setView('PARENT_CHILD_DETAILS');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">My Children</h2>
        <p className="text-slate-500 text-sm">Manage and monitor your children's academic progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRENT_PARENT.children.map((child) => (
          <div
            key={child.id}
            onClick={() => handleChildSelect(child.id)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={child.photoUrl} alt={child.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 text-lg mb-1 truncate">{child.name}</h3>
                <p className="text-sm text-slate-500">{child.schoolName}</p>
                <p className="text-xs text-slate-400 font-mono">{child.icNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-xs text-green-600 font-medium mb-1">Attendance</p>
                <p className="text-lg font-bold text-green-700">{child.attendanceRate}%</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                <p className="text-xs text-orange-600 font-medium mb-1">Meal Balance</p>
                <p className="text-lg font-bold text-orange-700">RM {child.mealBalance.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{child.className}</span>
              <span className="text-primary-600 font-semibold group-hover:underline">
                View Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Activity size={20} className="text-primary-600" /> Quick Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">Total Children</p>
            <p className="text-2xl font-bold text-slate-800">{CURRENT_PARENT.children.length}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">Average Attendance</p>
            <p className="text-2xl font-bold text-slate-800">
              {Math.round(CURRENT_PARENT.children.reduce((sum, c) => sum + c.attendanceRate, 0) / CURRENT_PARENT.children.length)}%
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">Total Meal Balance</p>
            <p className="text-2xl font-bold text-slate-800">
              RM {CURRENT_PARENT.children.reduce((sum, c) => sum + c.mealBalance, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChildDetailsView: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
  const [selectedChildId, setSelectedChildId] = useState<string>(
    sessionStorage.getItem('selectedChildId') || CURRENT_PARENT.children[0].id
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'exams' | 'meals' | 'transcript'>('overview');
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  // Get selected child
  const selectedChild = CURRENT_PARENT.children.find(c => c.id === selectedChildId) || CURRENT_PARENT.children[0];

  const handleChildChange = (childId: string) => {
    setSelectedChildId(childId);
    sessionStorage.setItem('selectedChildId', childId);
    setShowTopUp(false); // Reset top-up form when switching children
    setTopUpAmount('');
  };

  const handleTopUp = () => {
    // In a real app, this would make an API call
    alert(`Top-up of RM ${topUpAmount} would be processed for ${selectedChild.name}`);
    setShowTopUp(false);
    setTopUpAmount('');
  };

  const AttendanceTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Attendance Trends</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedChild.attendanceRate >= 80 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {selectedChild.attendanceRate}% Overall
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ATTENDANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Medal size={20} className="text-yellow-500" /> Badges
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {selectedChild.badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-xs font-bold text-slate-700 leading-tight">{badge.name}</p>
                <p className="text-[10px] text-slate-400 mt-1">{badge.earnedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ExamsTab = () => {
    const isEligible = selectedChild.attendanceRate >= 80;

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
            <GraduationCap size={20} className="text-primary-600" /> Exam Registration
          </h3>

          <div className="space-y-4">
            {selectedChild.exams.length > 0 ? (
              selectedChild.exams.map((exam) => (
                <div key={exam.id} className="border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:border-primary-200 transition bg-slate-50/30">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-800">{exam.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${exam.status === 'REGISTERED' ? 'bg-green-100 text-green-700' :
                        exam.status === 'COMPLETED' ? 'bg-slate-200 text-slate-600' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                        {exam.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {exam.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {exam.venue}</span>
                    </div>
                    {exam.seatNumber && (
                      <div className="mt-1 text-xs text-primary-600 font-medium">
                        Assigned Seat: {exam.seatNumber}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">No exams registered yet</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MealsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <p className="text-slate-500 text-sm mb-2">Current Meal Balance</p>
        <h2 className="text-5xl font-bold text-slate-800 tracking-tight">RM {selectedChild.mealBalance.toFixed(2)}</h2>
        <div className="flex justify-center gap-2 mt-4">
          {selectedChild.dietaryNeeds.map(need => (
            <span key={need} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
              {need}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition">
            Auto-Reload
          </button>
          <button 
            onClick={() => setShowTopUp(true)}
            className="py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200"
          >
            Top Up Balance
          </button>
        </div>
      </div>

      {showTopUp && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4">Top Up Balance</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Amount (RM)</label>
              <input
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTopUp}
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
              >
                Confirm Top Up
              </button>
              <button
                onClick={() => {
                  setShowTopUp(false);
                  setTopUpAmount('');
                }}
                className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <History size={18} className="text-slate-400" /> Transaction History
          </h3>
        </div>
        <div className="divide-y divide-slate-50">
          {RECENT_TRANSACTIONS.map(tx => (
            <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
              <div>
                <p className="font-medium text-slate-800">{tx.item}</p>
                <p className="text-xs text-slate-500">{tx.date} • {tx.location}</p>
              </div>
              <span className="font-mono text-red-500 font-medium">- RM {tx.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TranscriptTab = () => (
    <div className="space-y-6 h-full">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Verified Digital Transcript</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
          View your child's official academic records and credentials.
        </p>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-w-xs mx-auto">
          <p className="text-sm text-slate-600 mb-2">Student: {selectedChild.name}</p>
          <p className="text-sm text-slate-600 mb-2">School: {selectedChild.schoolName}</p>
          <p className="text-sm text-slate-600">Class: {selectedChild.className}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-semibold mb-4">Credential Wallet</h3>
        <div className="space-y-3">
          {['SPM Trial Results 2024', 'National Robotics Competition - Gold', 'School Prefect Appointment Letter'].map((cert, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-primary-200 transition bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded flex items-center justify-center">
                  <FileText size={14} />
                </div>
                <span className="text-sm font-medium text-slate-700">{cert}</span>
              </div>
              <button className="text-xs text-primary-600 font-bold hover:underline">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
            <img src={selectedChild.photoUrl} alt={selectedChild.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{selectedChild.name}</h2>
            <p className="text-slate-500">{selectedChild.schoolName} • {selectedChild.className}</p>
            <p className="text-xs text-slate-400 font-mono mt-1">{selectedChild.icNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <p className="text-xs text-green-600 font-medium mb-1">Attendance</p>
            <p className="text-2xl font-bold text-green-700">{selectedChild.attendanceRate}%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="text-xs text-orange-600 font-medium mb-1">Meal Balance</p>
            <p className="text-2xl font-bold text-orange-700">RM {selectedChild.mealBalance.toFixed(2)}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-600 font-medium mb-1">Exams</p>
            <p className="text-2xl font-bold text-blue-700">{selectedChild.exams.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <p className="text-xs text-purple-600 font-medium mb-1">Badges</p>
            <p className="text-2xl font-bold text-purple-700">{selectedChild.badges.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Clock size={20} className="text-primary-600" /> Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
            <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1"><CheckCircle size={16} /></div>
            <div>
              <p className="text-sm font-medium text-slate-800">Attendance Logged</p>
              <p className="text-xs text-slate-500">Today, 7:15 AM at Main Gate Reader</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
            <div className="bg-orange-100 p-2 rounded-full text-orange-600 mt-1"><Utensils size={16} /></div>
            <div>
              <p className="text-sm font-medium text-slate-800">Meal Purchase: Nasi Lemak</p>
              <p className="text-xs text-slate-500">Yesterday, 10:30 AM - RM 3.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView('OVERVIEW')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
        >
          <ArrowLeft size={18} /> Back to Children List
        </button>
        
        {CURRENT_PARENT.children.length > 1 && (
          <select
            value={selectedChildId}
            onChange={(e) => handleChildChange(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-slate-800 font-medium"
          >
            {CURRENT_PARENT.children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 flex overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: <User size={18} /> },
            { id: 'attendance', label: 'Attendance', icon: <Calendar size={18} /> },
            { id: 'exams', label: 'Exams', icon: <GraduationCap size={18} /> },
            { id: 'meals', label: 'Meals', icon: <Utensils size={18} /> },
            { id: 'transcript', label: 'Transcript', icon: <FileText size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-700 bg-primary-50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'exams' && <ExamsTab />}
          {activeTab === 'meals' && <MealsTab />}
          {activeTab === 'transcript' && <TranscriptTab />}
        </div>
      </div>
    </div>
  );
};

export const DashboardParent: React.FC<DashboardParentProps> = ({ view, setView }) => {
  switch (view) {
    case 'PARENT_CHILD_DETAILS': return <ChildDetailsView setView={setView} />;
    default: return <ParentOverview setView={setView} />;
  }
};

