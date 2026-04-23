import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { 
  FiHome, FiImage, FiGrid, FiTag, FiMail, 
  FiMenu, FiX, FiLogOut, FiUser 
} from 'react-icons/fi';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard', exact: true },
    { path: '/admin/galerias', icon: FiImage, label: 'Galerías' },
    { path: '/admin/obras', icon: FiGrid, label: 'Obras de Arte' },
    { path: '/admin/categorias', icon: FiTag, label: 'Categorías' },
    { path: '/admin/contactos', icon: FiMail, label: 'Contactos' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-dark-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <Link to="/admin" className="flex items-center justify-center">
            {sidebarOpen ? (
              <img 
                src="/logo.jpeg" 
                alt="Rose Fine Arts Academy" 
                className="h-12 w-auto rounded-lg"
              />
            ) : (
              <img 
                src="/logo.jpeg" 
                alt="RFA" 
                className="h-10 w-10 object-contain mx-auto rounded-lg"
              />
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                } ${!sidebarOpen && 'justify-center'}`}
              >
                <item.icon className="text-xl flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <FiUser />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.full_name || user?.username}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-colors ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <FiLogOut className="text-xl" />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              Ver sitio público
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
