import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail, FiPhone, FiClock, FiCheck, FiTrash2 } from 'react-icons/fi';
import { fetchContactMessages, markAsRead, deleteContactMessage } from '../../store/slices/contactSlice';

const AdminContactPage = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.contact);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    dispatch(fetchContactMessages());
  }, [dispatch]);

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.is_read;
    if (filter === 'read') return msg.is_read;
    return true;
  });

  const handleMarkAsRead = async (id) => {
    await dispatch(markAsRead({ id, notes: '' }));
    setSelectedMessage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      await dispatch(deleteContactMessage(id));
      setSelectedMessage(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900">Mensajes de Contacto</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Todos ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg ${filter === 'unread' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            No Leídos ({messages.filter(m => !m.is_read).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg ${filter === 'read' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Leídos ({messages.filter(m => m.is_read).length})
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Cargando...</div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No hay mensajes</div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                    selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                  } ${!message.is_read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{message.name}</h3>
                    {!message.is_read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">{message.message}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <FiClock className="mr-1" />
                    {new Date(message.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          {!selectedMessage ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Seleccioná un mensaje para ver los detalles
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiMail className="mr-2" />
                      {selectedMessage.email}
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center">
                        <FiPhone className="mr-2" />
                        {selectedMessage.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!selectedMessage.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                      title="Marcar como leído"
                    >
                      <FiCheck />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    title="Eliminar"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-gray-700 mb-2">Mensaje:</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Recibido: {new Date(selectedMessage.created_at).toLocaleString()}</span>
                  {selectedMessage.is_read ? (
                    <span className="text-green-600 flex items-center">
                      <FiCheck className="mr-1" /> Leído
                    </span>
                  ) : (
                    <span className="text-blue-600">Sin leer</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactPage;
