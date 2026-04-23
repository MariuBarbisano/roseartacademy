import express from 'express';
import { body, validationResult } from 'express-validator';
import { Artwork } from '../models/artwork.model.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Validaciones
const artworkValidation = [
  body('title').notEmpty().withMessage('El título es requerido'),
  body('gallery_id').notEmpty().withMessage('La galería es requerida')
];

// GET /api/artworks - Obtener todas las obras (público)
router.get('/', async (req, res) => {
  try {
    const { gallery_id, is_featured } = req.query;
    
    const filters = {};
    if (gallery_id) filters.gallery_id = gallery_id;
    if (is_featured !== undefined) filters.is_featured = is_featured === 'true';

    const artworks = await Artwork.findAll(filters);
    
    res.json({
      success: true,
      count: artworks.length,
      artworks
    });
  } catch (error) {
    console.error('Error obteniendo obras:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener obras' 
    });
  }
});

// GET /api/artworks/:id - Obtener obra por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    
    if (!artwork) {
      return res.status(404).json({ 
        error: true, 
        message: 'Obra no encontrada' 
      });
    }

    // Incrementar contador de vistas
    await Artwork.incrementViews(req.params.id);

    res.json({
      success: true,
      artwork
    });
  } catch (error) {
    console.error('Error obteniendo obra:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener obra' 
    });
  }
});

// POST /api/artworks - Crear obra (protegida)
router.post('/', 
  authMiddleware, 
  isAdmin, 
  upload.single('image'), 
  artworkValidation, 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, errors: errors.array() });
      }

      if (!req.file) {
        return res.status(400).json({ 
          error: true, 
          message: 'La imagen es requerida' 
        });
      }

      const { 
        title, description, artist_name, year, technique, 
        dimensions, gallery_id, order_index, is_featured 
      } = req.body;
      
      const image_url = req.file.path;

      const artwork = await Artwork.create({
        title,
        description,
        image_url,
        thumbnail_url: image_url, // Puedes procesar thumbnails después
        artist_name,
        year: year ? parseInt(year) : null,
        technique,
        dimensions,
        gallery_id,
        order_index: order_index || 0,
        is_featured: is_featured === 'true'
      });

      res.status(201).json({
        success: true,
        message: 'Obra creada exitosamente',
        artwork
      });
    } catch (error) {
      console.error('Error creando obra:', error);
      res.status(500).json({ 
        error: true, 
        message: 'Error al crear obra' 
      });
    }
  }
);

// PUT /api/artworks/:id - Actualizar obra (protegida)
router.put('/:id', 
  authMiddleware, 
  isAdmin, 
  upload.single('image'), 
  async (req, res) => {
    try {
      const { 
        title, description, artist_name, year, technique, 
        dimensions, gallery_id, order_index, is_featured, is_active 
      } = req.body;
      
      const updateData = {
        title,
        description,
        artist_name,
        year: year ? parseInt(year) : null,
        technique,
        dimensions,
        gallery_id,
        order_index,
        is_featured: is_featured === 'true',
        is_active: is_active === 'true'
      };

      // Si se subió una nueva imagen
      if (req.file) {
        const image_url = req.file.path;
        updateData.image_url = image_url;
        updateData.thumbnail_url = image_url;
      }

      const artwork = await Artwork.update(req.params.id, updateData);

      if (!artwork) {
        return res.status(404).json({ 
          error: true, 
          message: 'Obra no encontrada' 
        });
      }

      res.json({
        success: true,
        message: 'Obra actualizada exitosamente',
        artwork
      });
    } catch (error) {
      console.error('Error actualizando obra:', error);
      res.status(500).json({ 
        error: true, 
        message: 'Error al actualizar obra' 
      });
    }
  }
);

// DELETE /api/artworks/:id - Eliminar obra (protegida)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const artwork = await Artwork.delete(req.params.id);

    if (!artwork) {
      return res.status(404).json({ 
        error: true, 
        message: 'Obra no encontrada' 
      });
    }

    res.json({
      success: true,
      message: 'Obra eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando obra:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al eliminar obra' 
    });
  }
});

export default router;
