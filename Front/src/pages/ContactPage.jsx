import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { sendContactMessage } from '../store/slices/contactSlice';

const ContactPage = () => {
  const dispatch = useDispatch();
  const { sendingMessage } = useSelector((state) => state.contact);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(sendContactMessage(data));
    if (result.meta.requestStatus === 'fulfilled') {
      reset();
    }
  };

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
              Contactanos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              ¿Tenés preguntas o querés inscribirte? Estamos acá para ayudarte
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                  Envianos un Mensaje
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'El nombre es requerido' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="Tu nombre"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'El email es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="+54 11 1234-5678"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      {...register('message', { required: 'El mensaje es requerido' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                      placeholder="Contanos qué te gustaría aprender o consultarnos..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sendingMessage}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingMessage ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h2>
                <p className="text-gray-600 mb-8">
                  También podés contactarnos por cualquiera de estos medios. ¡Estamos para ayudarte!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">
                      Av. Principal 123<br />
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">rose@roseacademy.art</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiClock className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Horarios</h3>
                    <p className="text-gray-600">
                      Lunes a Viernes: 9:00 - 18:00<br />
                      Sábados: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-64 bg-gray-200 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-white">
                  <p className="text-lg font-semibold">Mapa de ubicación</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
