import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import pool from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Ejecutando migraciones...');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await client.query(schema);
    
    // Crear usuario admin con hash correcto
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await client.query(`
      INSERT INTO users (username, email, password, full_name, role) 
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO UPDATE 
      SET password = $3, email = $2
    `, ['admin', 'admin@rosefinearts.com', hashedPassword, 'Administrador', 'admin']);
    
    console.log('✅ Migraciones ejecutadas exitosamente');
    console.log('📝 Usuario por defecto: admin@rosefinearts.com / admin123 (¡CAMBIAR EN PRODUCCIÓN!)');
    
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
