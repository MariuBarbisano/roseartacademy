import { query } from '../database/config.js';

export const Contact = {
  // Crear mensaje de contacto
  async create({ name, email, phone, message }) {
    const result = await query(
      `INSERT INTO contact_messages (name, email, phone, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, email, phone, message]
    );
    return result.rows[0];
  },

  // Obtener todos los mensajes
  async findAll(filters = {}) {
    let queryText = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (filters.is_read !== undefined) {
      queryText += ` AND is_read = $${paramIndex}`;
      params.push(filters.is_read);
      paramIndex++;
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await query(queryText, params);
    return result.rows;
  },

  // Obtener mensaje por ID
  async findById(id) {
    const result = await query(
      'SELECT * FROM contact_messages WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Marcar como leído
  async markAsRead(id, notes) {
    const result = await query(
      'UPDATE contact_messages SET is_read = true, notes = $2 WHERE id = $1 RETURNING *',
      [id, notes]
    );
    return result.rows[0];
  },

  // Eliminar mensaje
  async delete(id) {
    const result = await query(
      'DELETE FROM contact_messages WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};
