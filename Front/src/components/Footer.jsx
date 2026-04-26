import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="gradient-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.jpeg" 
                alt="Rose Fine Arts Academy" 
                className="h-20 w-auto rounded-lg"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Escuela de arte dedicada a formar artistas creativos y apasionados por las bellas artes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/galerias" className="text-gray-400 hover:text-white transition-colors">
                  Galerías
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <FiMapPin className="text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-sm">Av. Principal 123, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FiPhone className="text-primary-500" />
                <span className="text-sm">+54 11 1234-5678</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FiMail className="text-primary-500" />
                <span className="text-sm">rose@roseacademy.art</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Seguinos</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiTwitter />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">
                Recibí noticias y novedades
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary-600 text-sm"
                />
                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-lg transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Rose Fine Arts Academy. Todos los derechos reservados.</p>
          <Link 
            to="/admin/login" 
            className="text-gray-600 hover:text-primary-500 text-xs mt-2 inline-block transition-colors"
          >
            Administración
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
