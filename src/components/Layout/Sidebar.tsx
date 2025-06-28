import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, currentPath }) => {
  const menuItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'لوحة المعلومات',
      badge: null
    },
    {
      path: '/projects',
      icon: FolderOpen,
      label: 'المشاريع',
      badge: '12'
    },
    {
      path: '/tasks',
      icon: CheckSquare,
      label: 'المهام',
      badge: '24'
    },
    {
      path: '/calendar',
      icon: Calendar,
      label: 'التقويم',
      badge: null
    },
    {
      path: '/reports',
      icon: BarChart3,
      label: 'التقارير',
      badge: null
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'الإعدادات',
      badge: null
    }
  ];

  const isActive = (path: string) => {
    return currentPath === path || (path === '/dashboard' && currentPath === '/');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* شعار التطبيق */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <CheckSquare size={24} />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <h2>Project Manager</h2>
              <span>Pro</span>
            </div>
          )}
        </div>
        <button 
          className="toggle-btn"
          onClick={onToggle}
          aria-label={collapsed ? 'توسيع الشريط الجانبي' : 'طي الشريط الجانبي'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* قائمة التنقل */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="nav-icon">
                    <Icon size={20} />
                  </div>
                  {!collapsed && (
                    <>
                      <span className="nav-label">{item.label}</span>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* معلومات المستخدم */}
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                alt="صورة المستخدم"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTIwIDIxVjE5QTQgNCAwIDAgMCAxNiAxNUg4QTQgNCAwIDAgMCA0IDE5VjIxIiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4KPC9zdmc+';
                }}
              />
            </div>
            <div className="user-details">
              <div className="user-name">أحمد محمد</div>
              <div className="user-role">مدير المشروع</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

