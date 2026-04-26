import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuración de la base de datos
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

// Debug: Verificar variables de entorno (sin mostrar password)
console.log('🔍 Configuración de Base de Datos:');
console.log('DB_USER:', process.env.DB_USER || 'UNDEFINED');
console.log('DB_HOST:', process.env.DB_HOST || 'UNDEFINED');
console.log('DB_PORT:', process.env.DB_PORT || 'UNDEFINED');
console.log('DB_NAME:', process.env.DB_NAME || 'UNDEFINED');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '****** (SET)' : 'UNDEFINED');

// Crear pool de conexiones
const pool = new Pool(dbConfig);

// Verificar conexión al inicio
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Conectado a PostgreSQL'))
  .catch(err => {
    console.error('❌ Error al conectar a PostgreSQL:', err);
    process.exit(-1);
  });

// Evento de error
pool.on('error', (err) => {
  console.error('❌ Error inesperado en PostgreSQL:', err);
  process.exit(-1);
});

// Función helper para queries
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // console.log('Query ejecutada', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
};

// Función helper para obtener un cliente del pool
export const getClient = () => pool.connect();

export default pool;
