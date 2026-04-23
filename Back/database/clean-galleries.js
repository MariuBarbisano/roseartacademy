import pool from './config.js';

async function cleanGalleries() {
  try {
    console.log('🔍 Verificando galerías en la base de datos...\n');
    
    // Ver todas las galerías
    const galleries = await pool.query('SELECT id, title, slug, is_active FROM galleries');
    
    if (galleries.rows.length === 0) {
      console.log('✅ No hay galerías en la base de datos.');
      process.exit(0);
    }
    
    console.log(`📊 Galerías encontradas: ${galleries.rows.length}\n`);
    galleries.rows.forEach((g) => {
      console.log(`  - ID: ${g.id}`);
      console.log(`    Título: ${g.title}`);
      console.log(`    Slug: ${g.slug}`);
      console.log(`    Activa: ${g.is_active ? '✅' : '❌'}\n`);
    });
    
    // Eliminar TODAS las galerías
    console.log('🗑️  Eliminando todas las galerías...');
    await pool.query('DELETE FROM galleries');
    
    console.log('✅ Todas las galerías eliminadas exitosamente.\n');
    console.log('🎯 Ahora podés crear una nueva galería sin problemas.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanGalleries();
