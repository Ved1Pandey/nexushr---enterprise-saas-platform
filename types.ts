
export type UserRole = 'EMPLOYEE' | 'TL' | 'MANAGER' | 'SR_MANAGER' | 'VP' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department: string;
  email: string;
  avatar: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  level: string;
  type: 'IJP' | 'External';
  postedDate: string;
}

export interface Referral {
  id: string;
  candidateName: string;
  position: string;
  status: 'Applied' | 'Screening' | 'Interviewing' | 'Hired' | 'Rejected';
  referralBonus: string;
}

export interface InternalTransfer {
  id: string;
  targetRole: string;
  targetDept: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';
  requestDate: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'Sick' | 'Vacation' | 'Personal' | 'WFH' | 'Outdoor';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

export interface Ticket {
  id: string;
  category: 'Cleanliness' | 'Water' | 'Infra' | 'Internet' | 'Computer';
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  createdAt: string;
}

export interface Holiday {
  date: string;
  name: string;
  type: 'Public' | 'Company';
}

export interface LearningCourse {
  id: string;
  title: string;
  provider: string;
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
}
