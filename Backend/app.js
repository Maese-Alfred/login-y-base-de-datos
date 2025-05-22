import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import activityRoutes from './routes/activityRoutes.js'; 
import billRoutes from './routes/billRoutes.js'; 
import billStatusRoutes from './routes/billStatusRoutes.js'; 
import bookingRoutes from './routes/bookingRoutes.js'; 
import clientRoutes from './routes/clientRoutes.js';
import payMethodRoutes from './routes/payMethodRoutes.js';
import productCategoryRoutes from './routes/productCategoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import saleProductRoutes from './routes/saleProductRoutes.js';
import zoneRoutes from './routes/zoneRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 


const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes); 
app.use('/api/activities', activityRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/bill-status', billStatusRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/pay-methods', payMethodRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/sale-products', saleProductRoutes);
app.use('/api/zones', zoneRoutes);


// Ruta raíz (opcional para probar que el servidor funciona)
app.get('/', (req, res) => {
  res.send('API funcionando');
});

export default app;