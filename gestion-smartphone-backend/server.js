const dotenv = require('dotenv');
const connectDB = require('./connectdb');
const app = require('./app');

dotenv.config();

// Connexion à MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
