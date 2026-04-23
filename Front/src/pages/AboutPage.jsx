import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiUsers, FiStar } from 'react-icons/fi';

const AboutPage = () => {
  const values = [
    {
      icon: FiHeart,
      title: 'Pasión',
      description: 'El arte es nuestra pasión y la compartimos con cada alumno que pasa por nuestras aulas.',
    },
    {
      icon: FiUsers,
      title: 'Comunidad',
      description: 'Creamos un espacio donde artistas de todos los niveles pueden crecer juntos.',
    },
    {
      icon: FiAward,
      title: 'Excelencia',
      description: 'Buscamos la excelencia en cada detalle, desde la enseñanza hasta las instalaciones.',
    },
    {
      icon: FiStar,
      title: 'Creatividad',
      description: 'Fomentamos la creatividad y la expresión personal en cada proyecto.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 gradient-dark text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una escuela de arte dedicada a formar artistas creativos y apasionados
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Rose Fine Arts Academy nació hace más de 15 años con un sueño: crear un espacio donde 
                  el arte y la creatividad pudieran florecer sin límites. Fundada por artistas 
                  apasionados, nuestra escuela se ha convertido en un referente en la formación 
                  artística de Argentina.
                </p>
                <p>
                  A lo largo de los años, hemos formado a cientos de artistas que hoy destacan 
                  en diversos campos: pintura, escultura, diseño, fotografía y arte digital. 
                  Nuestro compromiso es brindar educación de calidad, personalizada y accesible 
                  para todos.
                </p>
                <p>
                  Contamos con un equipo de profesores altamente capacitados, instalaciones 
                  modernas y una comunidad vibrante que hace de Rose Fine Arts Academy el lugar ideal 
                  para descubrir y desarrollar tu talento artístico.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600">
              Los pilares que nos guían cada día
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-3xl text-primary-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
              Nuestra Misión
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Inspirar y empoderar a cada persona para que descubra su potencial artístico, 
              brindando educación de excelencia, un ambiente creativo y las herramientas 
              necesarias para que puedan expresarse libremente y alcanzar sus metas en el 
              mundo del arte.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
