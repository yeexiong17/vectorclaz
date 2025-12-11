
import { Student, Transaction, AttendanceRecord } from './types';

export const CURRENT_STUDENT: Student & { 
  address: string;
  postcode: string;
  city: string;
  state: string;
  bloodType: string;
  religion: string;
  gender: string;
} = {
  id: 'STU-2024-001',
  name: 'Ahmad bin Razak',
  icNumber: '060512-10-1234',
  schoolName: 'SMK Damansara Utama',
  className: '5 Inovasi',
  photoUrl: 'https://picsum.photos/200/200',
  attendanceRate: 92,
  mealBalance: 18.50,
  subsidyStatus: 'FULL',
  dietaryNeeds: ['HALAL'],
  // Extended Details for Back of Card
  address: 'No. 88, Jalan Teknokrat 3, Cyberjaya',
  postcode: '63000',
  city: 'Cyberjaya',
  state: 'Selangor',
  bloodType: 'O+',
  religion: 'ISLAM',
  gender: 'LELAKI',
  exams: [
    {
      id: 'EX-SPM-24',
      name: 'SPM 2024', // Shortened for display
      date: '2024-11-05',
      venue: 'Dewan Gemilang',
      status: 'REGISTERED',
      seatNumber: 'A-105'
    },
    {
      id: 'EX-TRIAL-24',
      name: 'Percubaan SPM',
      date: '2024-08-15',
      venue: 'Classroom 5I',
      status: 'COMPLETED',
    },
    {
      id: 'EX-ENG-ORAL',
      name: 'English Oral',
      date: '2024-12-10',
      venue: 'Lab B',
      status: 'PENDING_REGISTRATION',
    }
  ],
  badges: [
    { id: 'b1', name: 'Perfect Month', icon: '🏆', description: '100% Attendance in May', earnedDate: '2024-05-31' },
    { id: 'b2', name: 'Early Bird', icon: '🌅', description: 'Checked in before 7:15 AM for 5 days', earnedDate: '2024-04-12' },
    { id: 'b3', name: 'Scholar', icon: '📚', description: 'Registered for all eligible exams', earnedDate: '2024-06-01' }
  ]
};

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 'TX-1', date: '2024-05-20 10:30 AM', item: 'Nasi Lemak Set', amount: 3.00, location: 'Canteen A' },
  { id: 'TX-2', date: '2024-05-19 10:25 AM', item: 'Chicken Rice', amount: 4.50, location: 'Canteen B' },
  { id: 'TX-3', date: '2024-05-18 10:35 AM', item: 'Mineral Water', amount: 1.00, location: 'Co-op Store' },
  { id: 'TX-4', date: '2024-05-17 10:40 AM', item: 'Curry Mee', amount: 4.00, location: 'Canteen A' },
];

export const ATTENDANCE_DATA = [
  { name: 'Jan', percentage: 95 },
  { name: 'Feb', percentage: 98 },
  { name: 'Mar', percentage: 88 },
  { name: 'Apr', percentage: 92 },
  { name: 'May', percentage: 100 },
];

export const ADMIN_ANOMALIES = [
  { id: 1, student: 'Siti Aminah', class: '4 Alpha', issue: 'Absent 3 days consecutively', risk: 'High' },
  { id: 2, student: 'Chong Wei', class: '5 Beta', issue: 'Meal subsidy used twice in 10 mins', risk: 'Medium' },
  { id: 3, student: 'Muthu K.', class: '3 Gamma', issue: 'Late arrival > 5 times this month', risk: 'Low' },
];

export const EXAM_ELIGIBILITY_DATA = [
  { name: 'Eligible', value: 850, fill: '#0ea5e9' },
  { name: 'Ineligible (<80%)', value: 45, fill: '#ef4444' },
];

export const CANTEEN_AUDIT_DATA = [
  { name: 'Canteen A', sales: 4500, claims: 1200 },
  { name: 'Canteen B', sales: 3200, claims: 800 },
  { name: 'Co-op', sales: 1500, claims: 200 },
];