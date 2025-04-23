import sql from './config/db.js'; // Asegúrate de que esta ruta es correcta

const testConnection = async () => {
  try {
    const result = await sql`SELECT 1`;
    console.log('✅ Conexión exitosa:', result);
    process.exit(0); // Finaliza el proceso
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1); // Finaliza con error
  }
};

testConnection();