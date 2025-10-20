const dotenv = require('dotenv');
const connectDB = require('./connectdb');
const app = require('./app');

dotenv.config();

// Connexion à MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Serveur lancé sur le port ${PORT}`));

