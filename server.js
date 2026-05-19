const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

// Sustituye <tu_contraseña> por tu clave real, sin los signos <>
const MONGO_URI = "mongodb+srv://santi:tu_contraseña_real@cluster0.pevd03a.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a Atlas'))
    .catch(err => console.error('❌ Error:', err));

// RUTA RAIZ
app.get('/', (req, res) => {
    res.send('Backend DogTech activo y conectado a Atlas.');
});

// RUTA DE REGISTRO - Coincide con el fetch del index
app.post('/registrar', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;
        // Aquí iría tu lógica de Mongoose para guardar
        res.status(201).json({ mensaje: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));