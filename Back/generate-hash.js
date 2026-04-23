import bcrypt from 'bcryptjs';

// Generar hash para "admin123"
const password = 'admin123';
const hash = await bcrypt.hash(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);

// Verificar que funciona
const isValid = await bcrypt.compare(password, hash);
console.log('Verificación:', isValid ? '✅ Correcto' : '❌ Error');

process.exit(0);
