import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import indexRoutes from './routes/indexRoutes.js';
import authRoutes from './routes/authRoutes.js';

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

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Meadow Market running on http://localhost:${PORT}`);
});