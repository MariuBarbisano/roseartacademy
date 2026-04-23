import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const phoneNumber = '5491112345678'; // Cambiar por el número real
  const defaultMessage = 'Hola! Me gustaría obtener más información sobre la escuela de arte.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
    setShowDialog(false);
  };

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        onClick={() => setShowDialog(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <FaWhatsapp className="text-3xl" />
      </motion.button>

      {/* Diálogo de WhatsApp */}
      <AnimatePresence>
        {showDialog && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDialog(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-green-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-green-500 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold">Rose Fine Arts Academy</h3>
                    <p className="text-xs opacity-90">En línea</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDialog(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    👋 ¡Hola! ¿En qué podemos ayudarte?
                  </p>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Hacé clic en el botón de abajo para chatear con nosotros en WhatsApp.
                </p>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Abrir WhatsApp</span>
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Horario de atención: Lun-Vie 9:00-18:00
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
