import React from 'react';

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

export interface Student {
  id: string;
  name: string;
  icNumber: string;
  schoolName: string;
  className: string;
  photoUrl: string;
  attendanceRate: number; // 0-100
  mealBalance: number;
  subsidyStatus: 'FULL' | 'PARTIAL' | 'NONE';
  dietaryNeeds: ('HALAL' | 'VEGETARIAN' | 'ALLERGY')[];
  exams: ExamRegistration[];
  badges: Badge[];
}

export interface ExamRegistration {
  id: string;
  name: string; // e.g., SPM 2024, PT3
  date: string;
  venue: string;
  status: 'ELIGIBLE' | 'REGISTERED' | 'COMPLETED' | 'INELIGIBLE' | 'PENDING_REGISTRATION';
  seatNumber?: string;
}

export interface Transaction {
  id: string;
  date: string;
  item: string;
  amount: number;
  location: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  checkInTime?: string;
  checkOutTime?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export type ViewState = 'OVERVIEW' | 'ATTENDANCE' | 'EXAMS' | 'MEALS' | 'TRANSCRIPT' | 'ADMIN_STUDENTS' | 'ADMIN_EXAMS' | 'ADMIN_FINANCE';