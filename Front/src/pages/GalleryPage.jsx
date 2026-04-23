import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchGalleries } from '../store/slices/galleriesSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { galleries, loading } = useSelector((state) => state.galleries);
  const { categories } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  useEffect(() => {
    dispatch(fetchGalleries());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredGalleries = selectedCategory === 'all'
    ? galleries
    : galleries.filter(g => g.category_id === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 gradient-dark text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Nuestras Galerías
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explorá las colecciones de arte creadas por nuestros talentosos alumnos y profesores
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-20 z-10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Galleries Grid */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredGalleries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No hay galerías en esta categoría aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredGalleries.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/galerias/${gallery.slug}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-3 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      {gallery.cover_image ? (
                        <img
                          src={gallery.cover_image}
                          alt={gallery.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
                      )}
                      {gallery.category_name && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900 rounded-full">
                            {gallery.category_name}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-center text-lg font-medium text-gray-800 group-hover:text-primary-600 transition-colors px-2">
                      {gallery.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
