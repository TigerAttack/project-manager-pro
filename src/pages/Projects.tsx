import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List, Calendar, Users, Clock } from 'lucide-react';

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات تجريبية للمشاريع
  const projects = [
    {
      id: 1,
      name: 'موقع الشركة الجديد',
      description: 'تطوير موقع إلكتروني حديث للشركة مع نظام إدارة المحتوى',
      status: 'active',
      priority: 'high',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-03-30',
      teamMembers: ['أحمد محمد', 'سارة أحمد', 'محمد علي'],
      tasksCount: 24,
      completedTasks: 18
    },
    {
      id: 2,
      name: 'تطبيق الجوال',
      description: 'تطوير تطبيق جوال لنظامي iOS و Android',
      status: 'planning',
      priority: 'medium',
      progress: 25,
      startDate: '2024-02-01',
      endDate: '2024-06-15',
      teamMembers: ['فاطمة محمد', 'علي حسن'],
      tasksCount: 32,
      completedTasks: 8
    },
    {
      id: 3,
      name: 'نظام إدارة المخزون',
      description: 'تطوير نظام شامل لإدارة المخزون والمبيعات',
      status: 'completed',
      priority: 'high',
      progress: 100,
      startDate: '2023-10-01',
      endDate: '2024-01-31',
      teamMembers: ['أحمد محمد', 'محمد علي', 'سارة أحمد', 'فاطمة محمد'],
      tasksCount: 45,
      completedTasks: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--primary-blue)';
      case 'planning': return 'var(--warning-orange)';
      case 'completed': return 'var(--success-green)';
      case 'on-hold': return 'var(--gray-600)';
      default: return 'var(--gray-600)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'planning': return 'تخطيط';
      case 'completed': return 'مكتمل';
      case 'on-hold': return 'متوقف';
      default: return 'غير محدد';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="projects-page">
      <div className="page-header">
        <div className="header-content">
          <h1>المشاريع</h1>
          <p>إدارة ومتابعة جميع مشاريعك</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          مشروع جديد
        </button>
      </div>

      <div className="page-controls">
        <div className="search-filter-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="البحث في المشاريع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={16} />
            فلترة
          </button>
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={16} />
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className={`projects-container ${viewMode}`}>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-title">
                <h3>{project.name}</h3>
                <span 
                  className="project-status"
                  style={{ color: getStatusColor(project.status) }}
                >
                  {getStatusText(project.status)}
                </span>
              </div>
              <span className={`priority-badge priority-${project.priority}`}>
                {getPriorityText(project.priority)}
              </span>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-progress">
              <div className="progress-header">
                <span>التقدم</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="project-stats">
              <div className="stat">
                <Clock size={16} />
                <span>{project.completedTasks}/{project.tasksCount} مهمة</span>
              </div>
              <div className="stat">
                <Users size={16} />
                <span>{project.teamMembers.length} أعضاء</span>
              </div>
              <div className="stat">
                <Calendar size={16} />
                <span>{new Date(project.endDate).toLocaleDateString('ar-SA')}</span>
              </div>
            </div>
            
            <div className="project-team">
              {project.teamMembers.slice(0, 3).map((member, index) => (
                <div key={index} className="team-avatar" title={member}>
                  {member.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
              {project.teamMembers.length > 3 && (
                <div className="team-avatar more">
                  +{project.teamMembers.length - 3}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

