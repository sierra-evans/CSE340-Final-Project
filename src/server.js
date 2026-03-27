import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import pool from './config/db.js';
import flash from './middleware/flash.js';
import indexRoutes from './routes/indexRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Flash Messaging
app.use(flash);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/seller', sellerRoutes);
app.use('/admin', adminRoutes);
app.use('/reviews', reviewRoutes);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Meadow Market running on http://localhost:${PORT}`);
});