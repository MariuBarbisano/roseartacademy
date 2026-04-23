import { query } from '../database/config.js';

export const Artwork = {
  // Obtener todas las obras
  async findAll(filters = {}) {
    let queryText = `
      SELECT a.*, g.title as gallery_title, g.slug as gallery_slug
      FROM artworks a
      LEFT JOIN galleries g ON a.gallery_id = g.id
      WHERE a.is_active = true
    `;
    
    const params = [];
    let paramIndex = 1;

    if (filters.gallery_id) {
      queryText += ` AND a.gallery_id = $${paramIndex}`;
      params.push(filters.gallery_id);
      paramIndex++;
    }

    if (filters.is_featured !== undefined) {
      queryText += ` AND a.is_featured = $${paramIndex}`;
      params.push(filters.is_featured);
      paramIndex++;
    }

    queryText += ' ORDER BY a.order_index ASC, a.created_at DESC';

    const result = await query(queryText, params);
    return result.rows;
  },

  // Obtener obra por ID
  async findById(id) {
    const result = await query(
      `SELECT a.*, g.title as gallery_title, g.slug as gallery_slug
       FROM artworks a
       LEFT JOIN galleries g ON a.gallery_id = g.id
       WHERE a.id = $1 AND a.is_active = true`,
      [id]
    );
    return result.rows[0];
  },

  // Crear obra
  async create(data) {
    const result = await query(
      `INSERT INTO artworks (
        title, description, image_url, thumbnail_url, artist_name, 
        year, technique, dimensions, gallery_id, order_index, is_featured
      ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *`,
      [
        data.title, data.description, data.image_url, data.thumbnail_url,
        data.artist_name, data.year, data.technique, data.dimensions,
        data.gallery_id, data.order_index || 0, data.is_featured || false
      ]
    );
    return result.rows[0];
  },

  // Actualizar obra
  async update(id, data) {
    const result = await query(
      `UPDATE artworks 
       SET title = COALESCE($2, title),
           description = COALESCE($3, description),
           image_url = COALESCE($4, image_url),
           thumbnail_url = COALESCE($5, thumbnail_url),
           artist_name = COALESCE($6, artist_name),
           year = COALESCE($7, year),
           technique = COALESCE($8, technique),
           dimensions = COALESCE($9, dimensions),
           gallery_id = COALESCE($10, gallery_id),
           order_index = COALESCE($11, order_index),
           is_featured = COALESCE($12, is_featured),
           is_active = COALESCE($13, is_active)
       WHERE id = $1 
       RETURNING *`,
      [
        id, data.title, data.description, data.image_url, data.thumbnail_url,
        data.artist_name, data.year, data.technique, data.dimensions,
        data.gallery_id, data.order_index, data.is_featured, data.is_active
      ]
    );
    return result.rows[0];
  },

  // Incrementar vistas
  async incrementViews(id) {
    await query(
      'UPDATE artworks SET views_count = views_count + 1 WHERE id = $1',
      [id]
    );
  },

  // Eliminar obra (soft delete)
  async delete(id) {
    const result = await query(
      'UPDATE artworks SET is_active = false WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};
