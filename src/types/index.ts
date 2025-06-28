// أنواع البيانات الأساسية لتطبيق إدارة المشاريع

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member';
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: Date;
  endDate: Date;
  budget?: number;
  progress: number; // 0-100
  teamMembers: string[]; // User IDs
  managerId: string; // User ID
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectId: string;
  assigneeId?: string; // User ID
  creatorId: string; // User ID
  startDate?: Date;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  dependencies: string[]; // Task IDs
  subtasks: string[]; // Task IDs
  attachments: Attachment[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string; // User ID
  taskId: string;
  parentId?: string; // للردود على التعليقات
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string; // User ID
  uploadedAt: Date;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  description: string;
  hours: number;
  date: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'task_completed' | 'project_updated' | 'deadline_approaching' | 'comment_added';
  title: string;
  message: string;
  userId: string;
  relatedId?: string; // Task ID or Project ID
  read: boolean;
  createdAt: Date;
}

export interface Dashboard {
  totalProjects: number;
  activeProjects: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  teamUtilization: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'project_created' | 'task_created' | 'task_completed' | 'comment_added' | 'file_uploaded';
  description: string;
  userId: string;
  relatedId?: string;
  createdAt: Date;
}

export interface Filter {
  status?: string[];
  priority?: string[];
  assignee?: string[];
  project?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'ar' | 'en';
  notifications: {
    email: boolean;
    desktop: boolean;
    sound: boolean;
  };
  workingHours: {
    start: string;
    end: string;
    workingDays: number[]; // 0-6 (Sunday-Saturday)
  };
  autoSave: boolean;
  defaultView: 'dashboard' | 'projects' | 'tasks' | 'calendar';
}

// أنواع للحالات والأحداث
export type ProjectStatus = Project['status'];
export type TaskStatus = Task['status'];
export type Priority = Task['priority'];
export type UserRole = User['role'];

// أنواع للنماذج
export interface CreateProjectForm {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: Priority;
  teamMembers: string[];
  tags: string[];
  budget?: number;
}

export interface CreateTaskForm {
  title: string;
  description: string;
  projectId: string;
  assigneeId?: string;
  priority: Priority;
  dueDate?: Date;
  estimatedHours?: number;
  tags: string[];
  dependencies: string[];
}

export interface UpdateTaskForm extends Partial<CreateTaskForm> {
  status?: TaskStatus;
  actualHours?: number;
}

// أنواع للاستجابات
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// أنواع للمخططات والتقارير
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimelineData {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  dependencies: string[];
  color?: string;
}

export interface ReportData {
  period: {
    start: Date;
    end: Date;
  };
  projectsCompleted: number;
  tasksCompleted: number;
  totalHours: number;
  teamProductivity: ChartData[];
  projectProgress: ChartData[];
  tasksByStatus: ChartData[];
  tasksByPriority: ChartData[];
}

