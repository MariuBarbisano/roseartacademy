import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { fetchArtworks, createArtwork, updateArtwork, deleteArtwork } from '../../store/slices/artworksSlice';
import { fetchGalleries } from '../../store/slices/galleriesSlice';

const AdminArtworksPage = () => {
  const dispatch = useDispatch();
  const { artworks, loading } = useSelector((state) => state.artworks);
  const { galleries } = useSelector((state) => state.galleries);
  const [showModal, setShowModal] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    artist_name: '',
    technique: '',
    year: '',
    gallery_id: '',
    image: null
  });

  useEffect(() => {
    dispatch(fetchArtworks());
    dispatch(fetchGalleries());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('artist_name', formData.artist_name);
    data.append('technique', formData.technique);
    data.append('year', formData.year);
    data.append('gallery_id', formData.gallery_id);
    if (formData.image) {
      data.append('image', formData.image);
    }

    if (editingArtwork) {
      await dispatch(updateArtwork({ id: editingArtwork.id, formData: data }));
    } else {
      await dispatch(createArtwork(data));
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      description: artwork.description || '',
      artist_name: artwork.artist_name || '',
      technique: artwork.technique || '',
      year: artwork.year || '',
      gallery_id: artwork.gallery_id || '',
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta obra?')) {
      await dispatch(deleteArtwork(id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      artist_name: '',
      technique: '',
      year: '',
      gallery_id: '',
      image: null
    });
    setEditingArtwork(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900">Obras de Arte</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Nueva Obra
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">Cargando...</div>
        ) : artworks.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">No hay obras aún</div>
        ) : (
          artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{artwork.title}</h3>
                {artwork.artist_name && (
                  <p className="text-sm text-gray-600 mb-2">Por {artwork.artist_name}</p>
                )}
                <p className="text-sm text-gray-500 mb-3">{artwork.gallery_title || 'Sin galería'}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(artwork)}
                    className="flex-1 btn-secondary text-sm py-2"
                  >
                    <FiEdit2 className="inline mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(artwork.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingArtwork ? 'Editar Obra' : 'Nueva Obra'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Título *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                      placeholder="Nombre de la obra"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Galería *</label>
                    <select
                      required
                      value={formData.gallery_id}
                      onChange={(e) => setFormData({...formData, gallery_id: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                    >
                      <option value="">Seleccionar galería</option>
                      {galleries.map(gallery => (
                        <option key={gallery.id} value={gallery.id}>{gallery.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Artista</label>
                    <input
                      type="text"
                      value={formData.artist_name}
                      onChange={(e) => setFormData({...formData, artist_name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                      placeholder="Nombre del artista"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Año</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                      placeholder="2026"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Técnica</label>
                    <input
                      type="text"
                      value={formData.technique}
                      onChange={(e) => setFormData({...formData, technique: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                      placeholder="Ej: Óleo sobre tela"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Descripción</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                      rows="3"
                      placeholder="Descripción de la obra..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Imagen {!editingArtwork && '*'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required={!editingArtwork}
                      onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formatos: JPG, PNG, WEBP. Máx: 5MB</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1 py-3">Guardar</button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="btn-secondary flex-1 py-3"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArtworksPage;
