import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

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
app.get('/', (req, res) => {
  res.render('home');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Meadow Market running on http://localhost:${PORT}`);
});