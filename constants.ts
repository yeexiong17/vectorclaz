
import { Student, Transaction, AttendanceRecord, Parent } from './types';

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
  photoUrl: 'https://img.freepik.com/premium-photo/passport-photo-portrait-young-man-white-background_1028938-330516.jpg?w=360',
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

export const TEACHER_ATTENDANCE_STUDENTS: Array<{
  id: string;
  name: string;
  className: string;
  attendanceRate: number;
  present: number;
  absent: number;
  late: number;
  lastSeen: string;
  photoUrl: string;
  history: AttendanceRecord[];
}> = [
  {
    id: 'STU-2024-001',
    name: 'Ahmad bin Razak',
    className: '5 Inovasi',
    attendanceRate: 92,
    present: 23,
    absent: 1,
    late: 1,
    lastSeen: 'Today, 7:15 AM',
    photoUrl: CURRENT_STUDENT.photoUrl,
    history: [
      { date: '2024-06-04', status: 'PRESENT', checkInTime: '07:15', checkOutTime: '13:30' },
      { date: '2024-06-03', status: 'PRESENT', checkInTime: '07:14', checkOutTime: '13:30' },
      { date: '2024-06-02', status: 'LATE', checkInTime: '07:45', checkOutTime: '13:20' },
      { date: '2024-06-01', status: 'PRESENT', checkInTime: '07:12', checkOutTime: '13:30' },
      { date: '2024-05-31', status: 'PRESENT', checkInTime: '07:13', checkOutTime: '13:30' },
      { date: '2024-05-30', status: 'ABSENT' },
      { date: '2024-05-29', status: 'PRESENT', checkInTime: '07:11', checkOutTime: '13:28' },
    ],
  },
  {
    id: 'STU-2024-002',
    name: 'Siti Aminah',
    className: '5 Alpha',
    attendanceRate: 88,
    present: 22,
    absent: 2,
    late: 1,
    lastSeen: 'Yesterday, 7:18 AM',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    history: [
      { date: '2024-06-04', status: 'PRESENT', checkInTime: '07:18', checkOutTime: '13:20' },
      { date: '2024-06-03', status: 'ABSENT' },
      { date: '2024-06-02', status: 'PRESENT', checkInTime: '07:16', checkOutTime: '13:25' },
      { date: '2024-06-01', status: 'PRESENT', checkInTime: '07:15', checkOutTime: '13:24' },
      { date: '2024-05-31', status: 'LATE', checkInTime: '07:48', checkOutTime: '13:10' },
      { date: '2024-05-30', status: 'PRESENT', checkInTime: '07:12', checkOutTime: '13:26' },
      { date: '2024-05-29', status: 'PRESENT', checkInTime: '07:14', checkOutTime: '13:22' },
    ],
  },
  {
    id: 'STU-2024-003',
    name: 'Chong Wei',
    className: '5 Beta',
    attendanceRate: 96,
    present: 24,
    absent: 0,
    late: 1,
    lastSeen: 'Today, 7:10 AM',
    photoUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    history: [
      { date: '2024-06-04', status: 'PRESENT', checkInTime: '07:10', checkOutTime: '13:30' },
      { date: '2024-06-03', status: 'PRESENT', checkInTime: '07:09', checkOutTime: '13:30' },
      { date: '2024-06-02', status: 'PRESENT', checkInTime: '07:08', checkOutTime: '13:28' },
      { date: '2024-06-01', status: 'PRESENT', checkInTime: '07:12', checkOutTime: '13:27' },
      { date: '2024-05-31', status: 'LATE', checkInTime: '07:41', checkOutTime: '13:18' },
      { date: '2024-05-30', status: 'PRESENT', checkInTime: '07:11', checkOutTime: '13:29' },
      { date: '2024-05-29', status: 'PRESENT', checkInTime: '07:13', checkOutTime: '13:25' },
    ],
  },
  {
    id: 'STU-2024-004',
    name: 'Muthu Kumar',
    className: '4 Gamma',
    attendanceRate: 81,
    present: 20,
    absent: 3,
    late: 2,
    lastSeen: '2 days ago',
    photoUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
    history: [
      { date: '2024-06-04', status: 'ABSENT' },
      { date: '2024-06-03', status: 'PRESENT', checkInTime: '07:28', checkOutTime: '13:15' },
      { date: '2024-06-02', status: 'LATE', checkInTime: '07:52', checkOutTime: '13:12' },
      { date: '2024-06-01', status: 'PRESENT', checkInTime: '07:25', checkOutTime: '13:18' },
      { date: '2024-05-31', status: 'PRESENT', checkInTime: '07:23', checkOutTime: '13:16' },
      { date: '2024-05-30', status: 'ABSENT' },
      { date: '2024-05-29', status: 'PRESENT', checkInTime: '07:21', checkOutTime: '13:14' },
    ],
  },
];

export const CURRENT_PARENT: Parent = {
  id: 'PAR-2024-001',
  name: 'Razak bin Abdullah',
  icNumber: '700101-10-5678',
  children: [
    CURRENT_STUDENT,
    {
      id: 'STU-2024-002',
      name: 'Siti Aminah binti Razak',
      icNumber: '080815-10-2345',
      schoolName: 'SMK Damansara Utama',
      className: '5 Alpha',
      photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      attendanceRate: 88,
      mealBalance: 12.30,
      subsidyStatus: 'FULL',
      dietaryNeeds: ['HALAL'],
      exams: [
        {
          id: 'EX-SPM-24-SITI',
          name: 'SPM 2024',
          date: '2024-11-05',
          venue: 'Dewan Gemilang',
          status: 'REGISTERED',
          seatNumber: 'B-205'
        },
      ],
      badges: [
        { id: 'b1', name: 'Perfect Week', icon: '⭐', description: '100% Attendance this week', earnedDate: '2024-05-31' },
      ]
    },
    {
      id: 'STU-2024-005',
      name: 'Hassan bin Razak',
      icNumber: '100320-10-3456',
      schoolName: 'SMK Damansara Utama',
      className: '3 Beta',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      attendanceRate: 95,
      mealBalance: 25.00,
      subsidyStatus: 'PARTIAL',
      dietaryNeeds: ['HALAL'],
      exams: [],
      badges: [
        { id: 'b1', name: 'Perfect Month', icon: '🏆', description: '100% Attendance in May', earnedDate: '2024-05-31' },
        { id: 'b2', name: 'Early Bird', icon: '🌅', description: 'Checked in before 7:15 AM for 5 days', earnedDate: '2024-04-12' },
      ]
    }
  ]
};