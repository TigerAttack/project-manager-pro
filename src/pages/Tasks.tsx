import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

const Tasks: React.FC = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: 'تصميم واجهة المستخدم الرئيسية',
      description: 'إنشاء تصميم حديث وسهل الاستخدام للصفحة الرئيسية',
      status: 'todo',
      priority: 'high',
      assignee: 'سارة أحمد',
      dueDate: '2024-02-15',
      project: 'موقع الشركة'
    },
    {
      id: 2,
      title: 'تطوير API للمصادقة',
      description: 'إنشاء نظام مصادقة آمن للمستخدمين',
      status: 'in-progress',
      priority: 'high',
      assignee: 'أحمد محمد',
      dueDate: '2024-02-20',
      project: 'تطبيق الجوال'
    },
    {
      id: 3,
      title: 'اختبار الوحدة',
      description: 'كتابة اختبارات شاملة للوحدات الجديدة',
      status: 'review',
      priority: 'medium',
      assignee: 'محمد علي',
      dueDate: '2024-02-18',
      project: 'نظام المخزون'
    },
    {
      id: 4,
      title: 'كتابة التوثيق',
      description: 'توثيق شامل للـ API والوظائف',
      status: 'completed',
      priority: 'low',
      assignee: 'فاطمة محمد',
      dueDate: '2024-02-10',
      project: 'موقع الشركة'
    }
  ]);

  const columns = [
    { id: 'todo', title: 'للعمل', color: '#6B7280' },
    { id: 'in-progress', title: 'قيد التنفيذ', color: '#2563EB' },
    { id: 'review', title: 'للمراجعة', color: '#F59E0B' },
    { id: 'completed', title: 'مكتمل', color: '#10B981' }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <div className="header-content">
          <h1>المهام</h1>
          <p>إدارة ومتابعة المهام بنظام Kanban</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          مهمة جديدة
        </button>
      </div>

      <div className="page-controls">
        <div className="search-filter-section">
          <div className="search-box">
            <Search size={20} />
            <input type="text" placeholder="البحث في المهام..." />
          </div>
          <button className="btn btn-secondary">
            <Filter size={16} />
            فلترة
          </button>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map((column) => (
          <div key={column.id} className="kanban-column">
            <div className="column-header" style={{ borderTopColor: column.color }}>
              <h3>{column.title}</h3>
              <span className="task-count">{getTasksByStatus(column.id).length}</span>
            </div>
            <div className="column-content">
              {getTasksByStatus(column.id).map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <div 
                      className="priority-indicator"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    ></div>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <span className="task-project">{task.project}</span>
                    <span className="task-assignee">{task.assignee}</span>
                    <span className="task-due-date">{new Date(task.dueDate).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;

