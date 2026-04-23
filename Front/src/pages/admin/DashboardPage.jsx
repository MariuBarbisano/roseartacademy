import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiImage, FiGrid, FiMail, FiTag, FiTrendingUp } from 'react-icons/fi';
import { fetchGalleries } from '../../store/slices/galleriesSlice';
import { fetchArtworks } from '../../store/slices/artworksSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchContactMessages } from '../../store/slices/contactSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { galleries } = useSelector((state) => state.galleries);
  const { artworks } = useSelector((state) => state.artworks);
  const { categories } = useSelector((state) => state.categories);
  const { messages } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchGalleries());
    dispatch(fetchArtworks());
    dispatch(fetchCategories());
    dispatch(fetchContactMessages());
  }, [dispatch]);

  const unreadMessages = messages.filter(m => !m.is_read).length;

  const stats = [
    {
      title: 'Galerías',
      value: galleries.length,
      icon: FiImage,
      color: 'bg-blue-500',
      link: '/admin/galerias'
    },
    {
      title: 'Obras de Arte',
      value: artworks.length,
      icon: FiGrid,
      color: 'bg-purple-500',
      link: '/admin/obras'
    },
    {
      title: 'Categorías',
      value: categories.length,
      icon: FiTag,
      color: 'bg-green-500',
      link: '/admin/categorias'
    },
    {
      title: 'Mensajes Sin Leer',
      value: unreadMessages,
      icon: FiMail,
      color: 'bg-red-500',
      link: '/admin/contactos'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Bienvenido al panel de administración de Rose Fine Arts Academy
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={stat.link}
              className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <FiTrendingUp className="text-green-500 text-xl" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Galleries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Galerías Recientes</h2>
            <Link to="/admin/galerias" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver todas →
            </Link>
          </div>
          <div className="space-y-3">
            {galleries.slice(0, 5).map((gallery) => (
              <div key={gallery.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{gallery.title}</p>
                  <p className="text-sm text-gray-500">{gallery.artworks_count} obras</p>
                </div>
              </div>
            ))}
            {galleries.length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay galerías aún</p>
            )}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Mensajes Recientes</h2>
            <Link to="/admin/contactos" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="space-y-3">
            {messages.slice(0, 5).map((message) => (
              <div key={message.id} className={`p-3 rounded-lg ${message.is_read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-gray-900">{message.name}</p>
                  {!message.is_read && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Nuevo</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{message.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(message.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay mensajes aún</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
