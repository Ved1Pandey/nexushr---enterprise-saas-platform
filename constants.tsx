
import { Holiday, LearningCourse, Ticket } from './types';

export const HOLIDAYS: Holiday[] = [
  { date: '2024-01-01', name: 'New Year Day', type: 'Public' },
  { date: '2024-05-01', name: 'Labour Day', type: 'Public' },
  { date: '2024-12-25', name: 'Christmas', type: 'Public' },
  { date: '2024-08-15', name: 'Independence Day', type: 'Public' },
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 'T-101', category: 'Internet', subject: 'Slow WiFi in Block B', description: 'Network keeps dropping.', status: 'Open', assignedTo: 'IT Team', createdAt: '2024-05-20' },
  { id: 'T-102', category: 'Water', subject: 'Cooler empty', description: 'Water cooler near pantry is empty.', status: 'In Progress', assignedTo: 'Facility', createdAt: '2024-05-21' },
];

export const COURSES: LearningCourse[] = [
  { id: 'C1', title: 'Data Privacy for Enterprises', provider: 'Internal Compliance', duration: '2h', status: 'In Progress', progress: 45 },
  { id: 'C2', title: 'Leading Hybrid Teams', provider: 'Nexus Academy', duration: '5h', status: 'Not Started', progress: 0 },
  { id: 'C3', title: 'Agile Project Management', provider: 'Coursera', duration: '12h', status: 'Completed', progress: 100 },
];
