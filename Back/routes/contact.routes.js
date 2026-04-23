import express from 'express';
import { body, validationResult } from 'express-validator';
import { Contact } from '../models/contact.model.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Validaciones
const contactValidation = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('message').notEmpty().withMessage('El mensaje es requerido')
];

// POST /api/contact - Enviar mensaje de contacto (público)
router.post('/', contactValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: true, errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;

    const contact = await Contact.create({ name, email, phone, message });

    res.status(201).json({
      success: true,
      message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.',
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email
      }
    });
  } catch (error) {
    console.error('Error enviando mensaje:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al enviar mensaje' 
    });
  }
});

// GET /api/contact - Obtener todos los mensajes (protegida)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { is_read } = req.query;
    
    const filters = {};
    if (is_read !== undefined) filters.is_read = is_read === 'true';

    const messages = await Contact.findAll(filters);
    
    res.json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener mensajes' 
    });
  }
});

// GET /api/contact/:id - Obtener mensaje por ID (protegida)
router.get('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        error: true, 
        message: 'Mensaje no encontrado' 
      });
    }

    res.json({
      success: true,
      message
    });
  } catch (error) {
    console.error('Error obteniendo mensaje:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener mensaje' 
    });
  }
});

// PUT /api/contact/:id/read - Marcar mensaje como leído (protegida)
router.put('/:id/read', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { notes } = req.body;
    
    const message = await Contact.markAsRead(req.params.id, notes);

    if (!message) {
      return res.status(404).json({ 
        error: true, 
        message: 'Mensaje no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Mensaje marcado como leído',
      data: message
    });
  } catch (error) {
    console.error('Error marcando mensaje como leído:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al marcar mensaje como leído' 
    });
  }
});

// DELETE /api/contact/:id - Eliminar mensaje (protegida)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const message = await Contact.delete(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        error: true, 
        message: 'Mensaje no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Mensaje eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando mensaje:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al eliminar mensaje' 
    });
  }
});

export default router;
