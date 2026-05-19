const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB usando la variable de entorno que configuraste en Render
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Estas rutas son las que tu Frontend (index.html) está buscando
app.post('/registrar', async (req, res) => {
    // Aquí irá tu lógica de base de datos
    res.status(200).json({ mensaje: "Usuario registrado con éxito" });
});

app.post('/login', async (req, res) => {
    // Aquí irá tu lógica de base de datos
    res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));git add .

