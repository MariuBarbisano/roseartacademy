import { query } from '../database/config.js';

export const Category = {
  // Obtener todas las categorías
  async findAll() {
    const result = await query(
      'SELECT * FROM categories WHERE is_active = true ORDER BY order_index ASC'
    );
    return result.rows;
  },

  // Obtener categoría por ID
  async findById(id) {
    const result = await query(
      'SELECT * FROM categories WHERE id = $1 AND is_active = true',
      [id]
    );
    return result.rows[0];
  },

  // Obtener categoría por slug
  async findBySlug(slug) {
    const result = await query(
      'SELECT * FROM categories WHERE slug = $1 AND is_active = true',
      [slug]
    );
    return result.rows[0];
  },

  // Crear categoría
  async create({ name, slug, description, order_index }) {
    const result = await query(
      `INSERT INTO categories (name, slug, description, order_index) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, slug, description, order_index || 0]
    );
    return result.rows[0];
  },

  // Actualizar categoría
  async update(id, { name, slug, description, order_index, is_active }) {
    const result = await query(
      `UPDATE categories 
       SET name = COALESCE($2, name),
           slug = COALESCE($3, slug),
           description = COALESCE($4, description),
           order_index = COALESCE($5, order_index),
           is_active = COALESCE($6, is_active)
       WHERE id = $1 
       RETURNING *`,
      [id, name, slug, description, order_index, is_active]
    );
    return result.rows[0];
  },

  // Eliminar categoría
  async delete(id) {
    const result = await query(
      'UPDATE categories SET is_active = false WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};
