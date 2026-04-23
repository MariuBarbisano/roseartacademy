import express from 'express';
import { body, validationResult } from 'express-validator';
import { Gallery } from '../models/gallery.model.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Validaciones
const galleryValidation = [
  body('title').notEmpty().withMessage('El título es requerido'),
  body('slug').notEmpty().withMessage('El slug es requerido')
];

// GET /api/galleries - Obtener todas las galerías (público)
router.get('/', async (req, res) => {
  try {
    const { category_id, is_featured } = req.query;
    
    const filters = {};
    if (category_id) filters.category_id = category_id;
    if (is_featured !== undefined) filters.is_featured = is_featured === 'true';

    const galleries = await Gallery.findAll(filters);
    
    res.json({
      success: true,
      count: galleries.length,
      galleries
    });
  } catch (error) {
    console.error('Error obteniendo galerías:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener galerías' 
    });
  }
});

// GET /api/galleries/:identifier - Obtener galería por ID o slug (público)
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Intentar buscar por ID (UUID) o slug
    let gallery;
    if (identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      gallery = await Gallery.findById(identifier);
    } else {
      gallery = await Gallery.findBySlug(identifier);
    }
    
    if (!gallery) {
      return res.status(404).json({ 
        error: true, 
        message: 'Galería no encontrada' 
      });
    }

    res.json({
      success: true,
      gallery
    });
  } catch (error) {
    console.error('Error obteniendo galería:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener galería' 
    });
  }
});

// POST /api/galleries - Crear galería (protegida)
router.post('/', 
  authMiddleware, 
  isAdmin, 
  upload.single('cover_image'), 
  galleryValidation, 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, errors: errors.array() });
      }

      const { title, slug, description, category_id, order_index, is_featured } = req.body;
      
      const cover_image = req.file ? req.file.path : null;

      const gallery = await Gallery.create({
        title,
        slug,
        description,
        cover_image,
        category_id: category_id || null,
        order_index: order_index || 0,
        is_featured: is_featured === 'true',
        created_by: req.user.id
      });

      res.status(201).json({
        success: true,
        message: 'Galería creada exitosamente',
        gallery
      });
    } catch (error) {
      console.error('Error creando galería:', error);
      res.status(500).json({ 
        error: true, 
        message: 'Error al crear galería' 
      });
    }
  }
);

// PUT /api/galleries/:id - Actualizar galería (protegida)
router.put('/:id', 
  authMiddleware, 
  isAdmin, 
  upload.single('cover_image'), 
  async (req, res) => {
    try {
      const { title, slug, description, category_id, order_index, is_featured, is_active } = req.body;
      
      const updateData = {
        title,
        slug,
        description,
        category_id,
        order_index,
        is_featured: is_featured === 'true',
        is_active: is_active === 'true'
      };

      // Si se subió una nueva imagen
      if (req.file) {
        updateData.cover_image = req.file.path;
      }

      const gallery = await Gallery.update(req.params.id, updateData);

      if (!gallery) {
        return res.status(404).json({ 
          error: true, 
          message: 'Galería no encontrada' 
        });
      }

      res.json({
        success: true,
        message: 'Galería actualizada exitosamente',
        gallery
      });
    } catch (error) {
      console.error('Error actualizando galería:', error);
      res.status(500).json({ 
        error: true, 
        message: 'Error al actualizar galería' 
      });
    }
  }
);

// DELETE /api/galleries/:id - Eliminar galería (protegida)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const gallery = await Gallery.delete(req.params.id);

    if (!gallery) {
      return res.status(404).json({ 
        error: true, 
        message: 'Galería no encontrada' 
      });
    }

    res.json({
      success: true,
      message: 'Galería eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando galería:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al eliminar galería' 
    });
  }
});

export default router;
