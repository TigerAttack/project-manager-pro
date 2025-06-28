import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  Menu,
  Sun,
  Moon,
  User
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const notifications = [
    {
      id: 1,
      title: 'مهمة جديدة',
      message: 'تم تعيين مهمة جديدة لك في مشروع التطوير',
      time: 'منذ 5 دقائق',
      read: false
    },
    {
      id: 2,
      title: 'موعد نهائي قريب',
      message: 'مهمة "تصميم الواجهة" تنتهي غداً',
      time: 'منذ ساعة',
      read: false
    },
    {
      id: 3,
      title: 'تم إكمال المهمة',
      message: 'أكمل سارة مهمة "مراجعة الكود"',
      time: 'منذ ساعتين',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // تنفيذ البحث
    console.log('البحث عن:', searchQuery);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="فتح القائمة"
        >
          <Menu size={20} />
        </button>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="البحث في المشاريع والمهام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>
      </div>

      <div className="header-right">
        {/* زر إضافة جديد */}
        <button className="btn btn-primary header-btn">
          <Plus size={16} />
          <span className="btn-text">جديد</span>
        </button>

        {/* زر تغيير المظهر */}
        <button 
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="تغيير المظهر"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* الإشعارات */}
        <div className="notifications-wrapper">
          <button 
            className="icon-btn notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="الإشعارات"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="dropdown-header">
                <h3>الإشعارات</h3>
                <button className="text-btn">تمييز الكل كمقروء</button>
              </div>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  >
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="text-btn">عرض جميع الإشعارات</button>
              </div>
            </div>
          )}
        </div>

        {/* قائمة المستخدم */}
        <div className="user-menu-wrapper">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="قائمة المستخدم"
          >
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
              alt="صورة المستخدم"
              className="user-avatar-small"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="user-avatar-fallback hidden">
              <User size={16} />
            </div>
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="user-info-header">
                  <h4>أحمد محمد</h4>
                  <p>ahmed@example.com</p>
                </div>
              </div>
              <div className="dropdown-menu">
                <button className="dropdown-item">
                  <User size={16} />
                  الملف الشخصي
                </button>
                <button className="dropdown-item">
                  الإعدادات
                </button>
                <button className="dropdown-item">
                  المساعدة
                </button>
                <hr className="dropdown-divider" />
                <button className="dropdown-item text-danger">
                  تسجيل الخروج
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

