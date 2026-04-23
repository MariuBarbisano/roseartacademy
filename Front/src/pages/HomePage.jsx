import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowRight, FiAward, FiUsers, FiHeart } from 'react-icons/fi';
import { fetchGalleries } from '../store/slices/galleriesSlice';
import { fetchArtworks } from '../store/slices/artworksSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { galleries } = useSelector((state) => state.galleries);
  const { artworks } = useSelector((state) => state.artworks);

  useEffect(() => {
    dispatch(fetchGalleries({ is_featured: true }));
    dispatch(fetchArtworks({ is_featured: true }));
  }, [dispatch]);

  const featuredGalleries = galleries.slice(0, 3);
  const featuredArtworks = artworks.slice(0, 6);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background con gradiente */}
        <div className="absolute inset-0 gradient-dark"></div>
        
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-700 rounded-full blur-3xl"></div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-balance">
              Descubrí el Artista que Hay en Vos
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto text-balance">
              Explorá el mundo del arte con nosotros. Clases personalizadas, profesores expertos y una comunidad creativa esperándote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto" className="btn-primary text-lg px-8 py-4">
                Inscribite Ahora
              </Link>
              <Link to="/galerias" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
                Ver Galerías
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Alumnos Satisfechos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Años de Experiencia</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Pasión por el Arte</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Galleries */}
      {featuredGalleries.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Galerías Destacadas
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explorá las obras de nuestros talentosos alumnos y profesores
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featuredGalleries.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/galerias/${gallery.slug}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      {gallery.cover_image ? (
                        <img
                          src={gallery.cover_image}
                          alt={gallery.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
                      )}
                    </div>
                    <h3 className="text-center text-lg font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                      {gallery.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/galerias" className="btn-primary inline-flex items-center">
                Ver Todas las Galerías
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Artworks */}
      {featuredArtworks.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Obras Destacadas
              </h2>
              <p className="text-xl text-gray-600">
                Las creaciones más impresionantes de nuestra comunidad
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-2 shadow-md group-hover:shadow-lg transition-shadow">
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-center text-sm font-medium text-gray-700">{artwork.title}</h4>
                  {artwork.artist_name && (
                    <p className="text-center text-xs text-gray-500 mt-1">{artwork.artist_name}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Comenzar tu Viaje Artístico?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Unite a nuestra comunidad y descubrí tu potencial creativo. Las inscripciones están abiertas.
            </p>
            <Link
              to="/contacto"
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Inscribite Ahora
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
