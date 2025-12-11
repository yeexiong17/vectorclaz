
import React, { useState } from 'react';
import { 
  CreditCard, Calendar, Utensils, FileText, QrCode, 
  CheckCircle, AlertCircle, TrendingUp, Clock, History,
  GraduationCap, Medal, Star, ArrowRight, User, RotateCw, MapPin, Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CURRENT_STUDENT, RECENT_TRANSACTIONS, ATTENDANCE_DATA } from '../constants';
import { ViewState } from '../types';

interface DashboardStudentProps {
  view: ViewState;
  setView: (view: ViewState) => void;
}

const InteractiveMyKad = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full max-w-md mx-auto md:mx-0 cursor-pointer group" 
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="relative w-full aspect-[1.586/1]"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-in-out',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            backgroundColor: '#fff' // Fallback
          }}
        >
          <div className="h-full w-full bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white relative">
            <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-9 bg-yellow-300 rounded-md bg-opacity-90 border border-yellow-500/50 shadow-inner flex items-center justify-center relative overflow-hidden">
                   <div className="w-8 h-6 border border-yellow-600/40 rounded-sm"></div>
                   <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-bold tracking-widest opacity-80 uppercase">Malaysia</span>
                  <span className="text-[10px] font-bold tracking-widest opacity-80 uppercase mt-0.5">Digital Student ID</span>
                </div>
              </div>
              <span className="bg-green-400/20 text-green-100 text-[10px] font-bold px-2 py-1 rounded-full border border-green-400/30 flex items-center gap-1 uppercase tracking-wider">
                Active
              </span>
            </div>
            
            <div className="flex justify-between items-end relative z-10">
              <div className="flex flex-col justify-end space-y-1 pr-4 flex-1">
                <h2 className="text-xl font-bold tracking-wider leading-tight text-white drop-shadow-sm line-clamp-2">{CURRENT_STUDENT.name.toUpperCase()}</h2>
                <p className="text-sm font-mono tracking-widest text-primary-100 mb-2">{CURRENT_STUDENT.icNumber}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider opacity-70">School</p>
                        <p className="text-xs font-semibold truncate">{CURRENT_STUDENT.schoolName}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider opacity-70">Class</p>
                        <p className="text-xs font-semibold">{CURRENT_STUDENT.className}</p>
                    </div>
                </div>
              </div>
              
              {/* Photo Area */}
              <div className="w-24 h-32 bg-slate-200 rounded-lg border-2 border-white/30 flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0 relative">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-300/50"></div>
                 <User size={48} className="text-slate-400" />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 md:hidden animate-pulse">
               <RotateCw size={16} className="text-white/50" />
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
           className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden bg-slate-100 text-slate-800 border border-slate-300"
           style={{ 
             backfaceVisibility: 'hidden', 
             WebkitBackfaceVisibility: 'hidden',
             transform: 'rotateY(180deg)',
           }}
        >
             <div className="h-full w-full p-6 relative">
                <div className="flex justify-between items-start mb-4 opacity-50">
                   <div className="text-[10px] font-bold uppercase tracking-widest">Jabatan Pendaftaran Negara</div>
                   <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                </div>
                
                <div className="space-y-3 text-xs">
                   <div>
                      <span className="block text-[10px] uppercase text-slate-500">Address</span>
                      <span className="font-semibold block">{CURRENT_STUDENT.address}</span>
                      <span className="font-semibold block">{CURRENT_STUDENT.postcode} {CURRENT_STUDENT.city}, {CURRENT_STUDENT.state}</span>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <span className="block text-[10px] uppercase text-slate-500">Gender</span>
                         <span className="font-semibold">{CURRENT_STUDENT.gender}</span>
                      </div>
                      <div>
                         <span className="block text-[10px] uppercase text-slate-500">Religion</span>
                         <span className="font-semibold">{CURRENT_STUDENT.religion}</span>
                      </div>
                      <div>
                         <span className="block text-[10px] uppercase text-slate-500">Blood Type</span>
                         <span className="font-bold text-red-600">{CURRENT_STUDENT.bloodType}</span>
                      </div>
                   </div>
                </div>

                <div className="absolute bottom-4 right-6 text-[10px] text-slate-400">
                  Tap to flip
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

const ExamCountdown = () => {
  // Find next upcoming exam
  const upcomingExam = CURRENT_STUDENT.exams
    .filter(e => e.status === 'REGISTERED' || e.status === 'PENDING_REGISTRATION')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  if (!upcomingExam) return null;

  const daysLeft = Math.ceil((new Date(upcomingExam.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-xl p-4 text-white shadow-lg flex items-center justify-between">
      <div>
        <p className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">Upcoming Exam</p>
        <h3 className="font-bold text-lg leading-none mb-1">{upcomingExam.name}</h3>
        <p className="text-xs opacity-70 flex items-center gap-1"><Calendar size={12}/> {upcomingExam.date}</p>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-[80px]">
        <span className="block text-2xl font-bold leading-none">{daysLeft > 0 ? daysLeft : 'Today'}</span>
        <span className="text-[10px] uppercase opacity-80">{daysLeft === 1 ? 'Day' : 'Days'} Left</span>
      </div>
    </div>
  );
};

const StudentOverview: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Interactive MyKad */}
      <InteractiveMyKad />
      
      {/* Right Column: Countdown & Notifications */}
      <div className="space-y-4">
        <ExamCountdown />
        
        {/* Quick Actions Grid (Compacted) */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Attendance', icon: <CheckCircle size={18} className="text-green-600" />, action: () => setView('ATTENDANCE'), sub: '92% Rate' },
            { label: 'Meals', icon: <Utensils size={18} className="text-orange-600" />, action: () => setView('MEALS'), sub: `RM ${CURRENT_STUDENT.mealBalance.toFixed(2)}` },
            { label: 'Exams', icon: <GraduationCap size={18} className="text-primary-600" />, action: () => setView('EXAMS'), sub: '2 Reg.' },
            { label: 'Transcript', icon: <FileText size={18} className="text-purple-600" />, action: () => setView('TRANSCRIPT'), sub: 'Verified' },
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={item.action}
              className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-left group flex flex-col justify-between h-24"
            >
              <div className="p-1.5 bg-slate-50 rounded-lg w-fit group-hover:bg-slate-100 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">{item.label}</h3>
                <p className="text-[10px] text-slate-500">{item.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Recent Activity */}
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

const AttendanceCalendar = () => {
  // Generate dummy days for a month view
  const days = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const isWeekend = (day % 7 === 6) || (day % 7 === 0);
    const isAbsent = !isWeekend && (day === 3 || day === 14); // Mock absences
    const isFuture = day > 20; // Mock current date is 20th
    
    return { day, isWeekend, isAbsent, isFuture };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
         <Calendar size={20} className="text-primary-600"/> Monthly Overview
      </h3>
      <div className="grid grid-cols-7 gap-2 mb-2">
         {['M','T','W','T','F','S','S'].map((d, i) => (
           <div key={i} className="text-center text-xs font-bold text-slate-400">{d}</div>
         ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
         {days.map((d) => (
           <div 
             key={d.day}
             className={`
               aspect-square rounded-lg flex items-center justify-center text-xs font-medium
               ${d.isFuture ? 'bg-slate-50 text-slate-300' : 
                 d.isWeekend ? 'bg-slate-100 text-slate-400' : 
                 d.isAbsent ? 'bg-red-100 text-red-600 border border-red-200' : 
                 'bg-green-100 text-green-600 border border-green-200'}
             `}
           >
             {d.day}
           </div>
         ))}
      </div>
      <div className="flex gap-4 mt-4 text-[10px] text-slate-500 justify-center">
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Present</div>
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Absent</div>
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Weekend</div>
      </div>
    </div>
  );
};

const AttendanceView = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Attendance Trends</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${CURRENT_STUDENT.attendanceRate >= 80 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {CURRENT_STUDENT.attendanceRate}% Overall
          </span>
        </div>
        
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ATTENDANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
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
      
      {/* New Calendar Heatmap Component */}
      <div className="md:col-span-1">
        <AttendanceCalendar />
      </div>
    </div>

    {/* Gamification Section */}
    <div className="grid md:grid-cols-2 gap-6">
       <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
             <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><Star className="fill-white" size={20}/> Current Streak</h3>
             <div className="text-5xl font-bold mb-2">12 Days</div>
             <p className="text-sm opacity-90">You have been present every day for the last 2 weeks! Keep it up to earn the 'Perfect Month' badge.</p>
          </div>
          <Star className="absolute -right-6 -bottom-6 w-32 h-32 text-white opacity-20 rotate-12" />
       </div>

       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Medal size={20} className="text-yellow-500" /> My Badges
          </h3>
          <div className="grid grid-cols-3 gap-2">
             {CURRENT_STUDENT.badges.map(badge => (
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

const ExamsView = () => {
  const isEligible = CURRENT_STUDENT.attendanceRate >= 80;

  return (
    <div className="space-y-6">
      {/* Eligibility Banner */}
      <div className={`rounded-2xl p-6 text-white flex justify-between items-center ${isEligible ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
        <div>
          <h2 className="text-2xl font-bold mb-1">{isEligible ? 'Eligible for Exams' : 'Attendance Warning'}</h2>
          <p className="opacity-90 text-sm">
            {isEligible 
              ? 'Your attendance is above 80%. You can register for upcoming exams.' 
              : 'Your attendance is below 80%. Please consult your class teacher immediately.'}
          </p>
        </div>
        <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
           {isEligible ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
         <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
           <GraduationCap size={20} className="text-primary-600"/> Exam Registration
         </h3>
         
         <div className="space-y-4">
           {CURRENT_STUDENT.exams.map((exam) => (
             <div key={exam.id} className="border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:border-primary-200 transition bg-slate-50/30">
                <div className="mb-3 md:mb-0">
                   <div className="flex items-center gap-2 mb-1">
                     <h4 className="font-bold text-slate-800">{exam.name}</h4>
                     <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                       exam.status === 'REGISTERED' ? 'bg-green-100 text-green-700' :
                       exam.status === 'COMPLETED' ? 'bg-slate-200 text-slate-600' :
                       'bg-blue-100 text-blue-700'
                     }`}>
                       {exam.status.replace('_', ' ')}
                     </span>
                   </div>
                   <div className="flex gap-4 text-sm text-slate-500">
                     <span className="flex items-center gap-1"><Calendar size={14}/> {exam.date}</span>
                     <span className="flex items-center gap-1"><TrendingUp size={14}/> {exam.venue}</span>
                   </div>
                   {exam.seatNumber && (
                      <div className="mt-1 text-xs text-primary-600 font-medium">
                        Assigned Seat: {exam.seatNumber}
                      </div>
                   )}
                </div>
                
                <div>
                   {exam.status === 'PENDING_REGISTRATION' && isEligible && (
                     <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary-700 transition flex items-center gap-2">
                       Register Now <ArrowRight size={16} />
                     </button>
                   )}
                   {exam.status === 'REGISTERED' && (
                     <button disabled className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200 cursor-not-allowed">
                       Registered
                     </button>
                   )}
                </div>
             </div>
           ))}
         </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
         <div className="mt-1 text-blue-600"><AlertCircle size={18} /></div>
         <div>
            <h4 className="font-bold text-blue-900 text-sm">Exam Rules & Regulations</h4>
            <p className="text-xs text-blue-700 mt-1">
              Please ensure you bring your MyKad for identity verification on exam day. 
              Smart watches and mobile phones are strictly prohibited in the exam hall.
            </p>
         </div>
      </div>
    </div>
  );
};

const MealsView = () => (
  <div className="space-y-6">
     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <p className="text-slate-500 text-sm mb-2">Current Meal Balance</p>
        <h2 className="text-5xl font-bold text-slate-800 tracking-tight">RM {CURRENT_STUDENT.mealBalance.toFixed(2)}</h2>
        <div className="flex justify-center gap-2 mt-4">
           {CURRENT_STUDENT.dietaryNeeds.map(need => (
             <span key={need} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
               {need}
             </span>
           ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition">
             Auto-Reload
          </button>
          <button className="py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200">
            Top Up Balance
          </button>
        </div>
     </div>

     <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <History size={18} className="text-slate-400"/> Transaction History
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

const TranscriptView = () => {
  const [showQR, setShowQR] = React.useState(false);

  return (
    <div className="space-y-6 h-full">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Verified Digital Transcript</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
          Generate a cryptographically signed QR code to share your official results with colleges or employers.
        </p>

        {showQR ? (
          <div className="animate-in fade-in zoom-in duration-300 py-6 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto">
             <div className="w-48 h-48 bg-white mx-auto p-2 rounded-lg shadow-sm">
                {/* Simulated QR Code */}
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-xs text-center p-4">
                  [SECURE QR CODE GENERATED BY MYKAD SYSTEM]
                </div>
             </div>
             <p className="mt-4 text-xs font-mono text-slate-500 break-all px-4">
               hash: 8f434346004e938f3...
             </p>
             <p className="text-xs text-green-600 font-bold mt-2 flex items-center justify-center gap-1">
               <CheckCircle size={12}/> Valid for 15 mins
             </p>
             <button 
               onClick={() => setShowQR(false)}
               className="mt-4 text-sm text-slate-500 underline hover:text-primary-600"
             >
               Close
             </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 mx-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            <QrCode size={18} /> Generate Verification QR
          </button>
        )}
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
};

export const DashboardStudent: React.FC<DashboardStudentProps> = ({ view, setView }) => {
  switch (view) {
    case 'ATTENDANCE': return <AttendanceView />;
    case 'EXAMS': return <ExamsView />;
    case 'MEALS': return <MealsView />;
    case 'TRANSCRIPT': return <TranscriptView />;
    default: return <StudentOverview setView={setView} />;
  }
};
