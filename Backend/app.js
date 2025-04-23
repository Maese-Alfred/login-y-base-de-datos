import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js'; // Tus rutas reales

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes); // Prefijo para rutas de usuarios

// Ruta raíz (opcional para probar que el servidor funciona)
app.get('/', (req, res) => {
  res.send('API funcionando');
});

export default app;