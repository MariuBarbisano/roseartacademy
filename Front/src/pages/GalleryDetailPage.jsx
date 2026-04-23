import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { fetchGalleryBySlug } from '../store/slices/galleriesSlice';
import { fetchArtworks } from '../store/slices/artworksSlice';

const GalleryDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentGallery, loading } = useSelector((state) => state.galleries);
  const { artworks } = useSelector((state) => state.artworks);

  useEffect(() => {
    dispatch(fetchGalleryBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentGallery) {
      dispatch(fetchArtworks({ gallery_id: currentGallery.id }));
    }
  }, [dispatch, currentGallery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentGallery) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Galería no encontrada</h2>
        <Link to="/galerias" className="btn-primary">
          Volver a Galerías
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 gradient-dark text-white">
        <div className="container-custom">
          <Link to="/galerias" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <FiArrowLeft className="mr-2" />
            Volver a Galerías
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              {currentGallery.title}
            </h1>
            {currentGallery.description && (
              <p className="text-xl text-gray-300 max-w-3xl">
                {currentGallery.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-6">
              {currentGallery.category_name && (
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  {currentGallery.category_name}
                </span>
              )}
              <span className="text-gray-300">
                {artworks.length} {artworks.length === 1 ? 'obra' : 'obras'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-16">
        <div className="container-custom">
          {artworks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Esta galería aún no tiene obras.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-bold text-xl mb-2">{artwork.title}</h3>
                      {artwork.artist_name && (
                        <p className="text-sm text-white/90 mb-2">Por {artwork.artist_name}</p>
                      )}
                      {artwork.description && (
                        <p className="text-sm text-white/80 line-clamp-2">{artwork.description}</p>
                      )}
                      <div className="flex gap-2 mt-3 text-xs text-white/70">
                        {artwork.technique && <span>• {artwork.technique}</span>}
                        {artwork.year && <span>• {artwork.year}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GalleryDetailPage;
