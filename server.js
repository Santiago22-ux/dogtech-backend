const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Habilita las conexiones externas
app.use(express.json());

// Tu conexión (Asegúrate de que la contraseña esté escrita correctamente)
const MONGO_URI = "mongodb+srv://santi:<dogtech2026>@cluster0.pevd03a.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a Atlas'))
    .catch(err => console.error('❌ Error:', err));

// RUTA PARA QUE EL NAVEGADOR NO MUESTRE "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Backend DogTech activo y conectado a Atlas.');
});

// TU RUTA DE REGISTRO
app.post('/api/registrar', async (req, res) => {
    // ... lógica de guardado ...
    res.status(201).json({ mensaje: "Registro exitoso" });
});
app.get('/', (req, res) => {
    res.send('Backend DogTech activo y conectado a Atlas.');
});
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));