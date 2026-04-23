import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import GalleryDetailPage from './pages/GalleryDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminGalleriesPage from './pages/admin/AdminGalleriesPage';
import AdminArtworksPage from './pages/admin/AdminArtworksPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminContactPage from './pages/admin/AdminContactPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Actions
import { validateToken } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Validar token al cargar la app
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="galerias" element={<GalleryPage />} />
        <Route path="galerias/:slug" element={<GalleryDetailPage />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
      </Route>

      {/* Login (sin layout) */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Rutas de Administración (Protegidas) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="galerias" element={<AdminGalleriesPage />} />
        <Route path="obras" element={<AdminArtworksPage />} />
        <Route path="categorias" element={<AdminCategoriesPage />} />
        <Route path="contactos" element={<AdminContactPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-600">404</h1>
          <p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
          <a href="/" className="btn-primary mt-6 inline-block">Volver al inicio</a>
        </div>
      </div>} />
    </Routes>
  );
}

export default App;
