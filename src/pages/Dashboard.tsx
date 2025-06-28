import React from 'react';
import { 
  FolderOpen, 
  CheckSquare, 
  Clock, 
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  // بيانات تجريبية للإحصائيات
  const stats = [
    {
      title: 'إجمالي المشاريع',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'blue'
    },
    {
      title: 'المهام المكتملة',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: CheckSquare,
      color: 'green'
    },
    {
      title: 'المهام المتأخرة',
      value: '7',
      change: '-3%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'أعضاء الفريق',
      value: '18',
      change: '+2',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    }
  ];

  // بيانات المخطط الدائري لحالة المهام
  const taskStatusData = [
    { name: 'مكتملة', value: 45, color: '#10B981' },
    { name: 'قيد التنفيذ', value: 30, color: '#2563EB' },
    { name: 'للمراجعة', value: 15, color: '#F59E0B' },
    { name: 'جديدة', value: 10, color: '#6B7280' }
  ];

  // بيانات المخطط الخطي للتقدم الأسبوعي
  const weeklyProgressData = [
    { name: 'السبت', completed: 12, created: 8 },
    { name: 'الأحد', completed: 15, created: 10 },
    { name: 'الاثنين', completed: 18, created: 12 },
    { name: 'الثلاثاء', completed: 22, created: 15 },
    { name: 'الأربعاء', completed: 25, created: 18 },
    { name: 'الخميس', completed: 28, created: 20 },
    { name: 'الجمعة', completed: 30, created: 22 }
  ];

  // بيانات المخطط العمودي لإنتاجية الفريق
  const teamProductivityData = [
    { name: 'أحمد', tasks: 12, hours: 40 },
    { name: 'فاطمة', tasks: 15, hours: 38 },
    { name: 'محمد', tasks: 10, hours: 35 },
    { name: 'سارة', tasks: 18, hours: 42 },
    { name: 'علي', tasks: 8, hours: 30 }
  ];

  // الأنشطة الأخيرة
  const recentActivities = [
    {
      id: 1,
      user: 'سارة أحمد',
      action: 'أكملت مهمة',
      target: 'تصميم واجهة المستخدم',
      time: 'منذ 10 دقائق',
      type: 'completed'
    },
    {
      id: 2,
      user: 'محمد علي',
      action: 'أنشأ مشروع جديد',
      target: 'تطوير تطبيق الجوال',
      time: 'منذ 30 دقيقة',
      type: 'created'
    },
    {
      id: 3,
      user: 'فاطمة محمد',
      action: 'علقت على',
      target: 'مراجعة الكود',
      time: 'منذ ساعة',
      type: 'commented'
    },
    {
      id: 4,
      user: 'أحمد حسن',
      action: 'رفع ملف إلى',
      target: 'مستندات المشروع',
      time: 'منذ ساعتين',
      type: 'uploaded'
    }
  ];

  // المهام القادمة
  const upcomingTasks = [
    {
      id: 1,
      title: 'مراجعة التصميم النهائي',
      project: 'موقع الشركة',
      dueDate: 'غداً',
      priority: 'high',
      assignee: 'سارة أحمد'
    },
    {
      id: 2,
      title: 'اختبار الوحدة',
      project: 'تطبيق الجوال',
      dueDate: 'بعد يومين',
      priority: 'medium',
      assignee: 'محمد علي'
    },
    {
      id: 3,
      title: 'كتابة التوثيق',
      project: 'API الخدمات',
      dueDate: 'الأسبوع القادم',
      priority: 'low',
      assignee: 'أحمد حسن'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'var(--danger-red)';
      case 'medium': return 'var(--warning-orange)';
      case 'low': return 'var(--gray-600)';
      default: return 'var(--gray-600)';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return '✅';
      case 'created': return '➕';
      case 'commented': return '💬';
      case 'uploaded': return '📎';
      default: return '📝';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>لوحة المعلومات</h1>
        <p>مرحباً أحمد، إليك نظرة عامة على مشاريعك اليوم</p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className={`stat-change ${stat.changeType}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* الصف الأول من المخططات */}
      <div className="charts-row">
        {/* مخطط حالة المهام */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>حالة المهام</h3>
            <span className="chart-subtitle">التوزيع الحالي</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              {taskStatusData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* مخطط التقدم الأسبوعي */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>التقدم الأسبوعي</h3>
            <span className="chart-subtitle">المهام المكتملة والجديدة</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="مكتملة"
                />
                <Line 
                  type="monotone" 
                  dataKey="created" 
                  stroke="#2563EB" 
                  strokeWidth={3}
                  name="جديدة"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* الصف الثاني */}
      <div className="dashboard-row">
        {/* إنتاجية الفريق */}
        <div className="chart-card team-productivity">
          <div className="chart-header">
            <h3>إنتاجية الفريق</h3>
            <span className="chart-subtitle">المهام المكتملة هذا الأسبوع</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teamProductivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#2563EB" name="المهام" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* الأنشطة الأخيرة */}
        <div className="activity-card">
          <div className="card-header">
            <h3>الأنشطة الأخيرة</h3>
            <button className="view-all-btn">عرض الكل</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}{' '}
                    <span className="activity-target">{activity.target}</span>
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* المهام القادمة */}
      <div className="upcoming-tasks-card">
        <div className="card-header">
          <h3>المهام القادمة</h3>
          <button className="view-all-btn">عرض جميع المهام</button>
        </div>
        <div className="tasks-list">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-info">
                <h4>{task.title}</h4>
                <p className="task-project">{task.project}</p>
              </div>
              <div className="task-meta">
                <span className="task-assignee">{task.assignee}</span>
                <span className="task-due-date">{task.dueDate}</span>
                <span 
                  className="task-priority"
                  style={{ color: getPriorityColor(task.priority) }}
                >
                  ●
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

