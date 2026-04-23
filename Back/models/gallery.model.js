import { query } from '../database/config.js';

export const Gallery = {
  // Obtener todas las galerías con información de categoría
  async findAll(filters = {}) {
    let queryText = `
      SELECT g.*, c.name as category_name, c.slug as category_slug,
             u.username as created_by_name,
             (SELECT COUNT(*) FROM artworks WHERE gallery_id = g.id AND is_active = true) as artworks_count
      FROM galleries g
      LEFT JOIN categories c ON g.category_id = c.id
      LEFT JOIN users u ON g.created_by = u.id
      WHERE g.is_active = true
    `;
    
    const params = [];
    let paramIndex = 1;

    if (filters.category_id) {
      queryText += ` AND g.category_id = $${paramIndex}`;
      params.push(filters.category_id);
      paramIndex++;
    }

    if (filters.is_featured !== undefined) {
      queryText += ` AND g.is_featured = $${paramIndex}`;
      params.push(filters.is_featured);
      paramIndex++;
    }

    queryText += ' ORDER BY g.order_index ASC, g.created_at DESC';

    const result = await query(queryText, params);
    return result.rows;
  },

  // Obtener galería por ID
  async findById(id) {
    const result = await query(
      `SELECT g.*, c.name as category_name, c.slug as category_slug,
              u.username as created_by_name,
              (SELECT COUNT(*) FROM artworks WHERE gallery_id = g.id AND is_active = true) as artworks_count
       FROM galleries g
       LEFT JOIN categories c ON g.category_id = c.id
       LEFT JOIN users u ON g.created_by = u.id
       WHERE g.id = $1 AND g.is_active = true`,
      [id]
    );
    return result.rows[0];
  },

  // Obtener galería por slug
  async findBySlug(slug) {
    const result = await query(
      `SELECT g.*, c.name as category_name, c.slug as category_slug,
              u.username as created_by_name,
              (SELECT COUNT(*) FROM artworks WHERE gallery_id = g.id AND is_active = true) as artworks_count
       FROM galleries g
       LEFT JOIN categories c ON g.category_id = c.id
       LEFT JOIN users u ON g.created_by = u.id
       WHERE g.slug = $1 AND g.is_active = true`,
      [slug]
    );
    return result.rows[0];
  },

  // Crear galería
  async create({ title, slug, description, cover_image, category_id, order_index, is_featured, created_by }) {
    const result = await query(
      `INSERT INTO galleries (title, slug, description, cover_image, category_id, order_index, is_featured, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [title, slug, description, cover_image, category_id, order_index || 0, is_featured || false, created_by]
    );
    return result.rows[0];
  },

  // Actualizar galería
  async update(id, data) {
    const result = await query(
      `UPDATE galleries 
       SET title = COALESCE($2, title),
           slug = COALESCE($3, slug),
           description = COALESCE($4, description),
           cover_image = COALESCE($5, cover_image),
           category_id = COALESCE($6, category_id),
           order_index = COALESCE($7, order_index),
           is_featured = COALESCE($8, is_featured),
           is_active = COALESCE($9, is_active)
       WHERE id = $1 
       RETURNING *`,
      [id, data.title, data.slug, data.description, data.cover_image, 
       data.category_id, data.order_index, data.is_featured, data.is_active]
    );
    return result.rows[0];
  },

  // Eliminar galería (soft delete)
  async delete(id) {
    const result = await query(
      'UPDATE galleries SET is_active = false WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};
