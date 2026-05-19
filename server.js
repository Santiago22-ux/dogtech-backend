const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB usando variable de entorno (Configúrala en el panel de Render)
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('🚀 ¡Conectado con éxito a MongoDB Atlas!'))
    .catch(err => console.error('❌ Error fatal de conexión:', err));

// Definición de modelo "a prueba de errores"
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', { 
    nombre: String, 
    email: String 
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Backend DogTech activo y conectado a Atlas.');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en puerto ${PORT}`);
});