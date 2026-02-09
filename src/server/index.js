// src/server/index.js
import 'dotenv/config';
import express from 'express';
import notesRoute from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('src/services/uploads/files/images'));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Backend Fundamental API',
  });
});

app.use(notesRoute);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'failed',
    message: 'Route not found',
  });
});

// Error Handler (harus di paling akhir)
app.use(ErrorHandler);

export default app;