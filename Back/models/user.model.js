import { query } from '../database/config.js';
import bcrypt from 'bcryptjs';

export const User = {
  // Crear usuario
  async create({ username, email, password, full_name, role = 'admin' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (username, email, password, full_name, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, username, email, full_name, role, created_at`,
      [username, email, hashedPassword, full_name, role]
    );
    return result.rows[0];
  },

  // Buscar por email
  async findByEmail(email) {
    const result = await query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    );
    return result.rows[0];
  },

  // Buscar por username
  async findByUsername(username) {
    const result = await query(
      'SELECT * FROM users WHERE username = $1 AND is_active = true',
      [username]
    );
    return result.rows[0];
  },

  // Buscar por ID
  async findById(id) {
    const result = await query(
      'SELECT id, username, email, full_name, role, created_at FROM users WHERE id = $1 AND is_active = true',
      [id]
    );
    return result.rows[0];
  },

  // Validar contraseña
  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};
