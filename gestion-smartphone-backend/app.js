const express = require('express');
const cors = require('cors');
const smartphoneRoutes = require('./routes/smartphoneRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes API
app.use('/api/smartphones', smartphoneRoutes);

// ✅ Exporter uniquement l'app (pas de connectDB, pas de listen)
module.exports = app;
