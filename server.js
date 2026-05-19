const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB (Asegúrate de que la variable MONGO_URI esté en Render)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

app.post('/registrar', async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;
    // Lógica para guardar en BD aquí
    res.status(200).json({ mensaje: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "No se pudo registrar" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    // Lógica para buscar en BD aquí
    res.status(200).json({ mensaje: "Sesión iniciada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Credenciales inválidas" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));