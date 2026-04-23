import express from 'express';
import { body, validationResult } from 'express-validator';
import { Category } from '../models/category.model.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Validaciones
const categoryValidation = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('slug').notEmpty().withMessage('El slug es requerido')
];

// GET /api/categories - Obtener todas las categorías (público)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener categorías' 
    });
  }
});

// GET /api/categories/:id - Obtener categoría por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        error: true, 
        message: 'Categoría no encontrada' 
      });
    }

    res.json({
      success: true,
      category
    });
  } catch (error) {
    console.error('Error obteniendo categoría:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener categoría' 
    });
  }
});

// POST /api/categories - Crear categoría (protegida)
router.post('/', authMiddleware, isAdmin, categoryValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: true, errors: errors.array() });
    }

    const { name, slug, description, order_index } = req.body;

    const category = await Category.create({ name, slug, description, order_index });

    res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      category
    });
  } catch (error) {
    console.error('Error creando categoría:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al crear categoría' 
    });
  }
});

// PUT /api/categories/:id - Actualizar categoría (protegida)
router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, slug, description, order_index, is_active } = req.body;

    const category = await Category.update(req.params.id, { 
      name, slug, description, order_index, is_active 
    });

    if (!category) {
      return res.status(404).json({ 
        error: true, 
        message: 'Categoría no encontrada' 
      });
    }

    res.json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      category
    });
  } catch (error) {
    console.error('Error actualizando categoría:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al actualizar categoría' 
    });
  }
});

// DELETE /api/categories/:id - Eliminar categoría (protegida)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const category = await Category.delete(req.params.id);

    if (!category) {
      return res.status(404).json({ 
        error: true, 
        message: 'Categoría no encontrada' 
      });
    }

    res.json({
      success: true,
      message: 'Categoría eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando categoría:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al eliminar categoría' 
    });
  }
});

export default router;
