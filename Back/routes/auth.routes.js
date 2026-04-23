import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user.model.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Validaciones
const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

const registerValidation = [
  body('username').isLength({ min: 3 }).withMessage('El username debe tener al menos 3 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('full_name').notEmpty().withMessage('El nombre completo es requerido')
];

// POST /api/auth/login - Iniciar sesión
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: true, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        error: true, 
        message: 'Credenciales inválidas' 
      });
    }

    // Validar contraseña
    const isValidPassword = await User.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: true, 
        message: 'Credenciales inválidas' 
      });
    }

    // Generar token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al iniciar sesión' 
    });
  }
});

// POST /api/auth/register - Registrar usuario (protegida - solo admin puede crear usuarios)
router.post('/register', authMiddleware, registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: true, errors: errors.array() });
    }

    const { username, email, password, full_name, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        error: true, 
        message: 'El email ya está registrado' 
      });
    }

    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ 
        error: true, 
        message: 'El username ya está en uso' 
      });
    }

    // Crear usuario
    const newUser = await User.create({ username, email, password, full_name, role });

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      user: newUser
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al registrar usuario' 
    });
  }
});

// GET /api/auth/me - Obtener perfil del usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        error: true, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error al obtener perfil' 
    });
  }
});

// POST /api/auth/validate - Validar token
router.post('/validate', authMiddleware, (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: req.user
  });
});

export default router;
