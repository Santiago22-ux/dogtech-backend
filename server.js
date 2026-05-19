const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 1. PRIMERO CREAS LA APP
const app = express(); 

// 2. LUEGO USAS LOS MIDDLEWARES (Aquí ya puedes usar app)
app.use(cors()); 
app.use(express.json());
// Tu conexión original
const MONGO_URI = "mongodb+srv://santi:dogtech@cluster0.pevd03a.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('🚀 ¡Conectado con éxito a MongoDB Atlas!'))
    .catch(err => console.error('❌ Error fatal de conexión:', err));

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', { 
    nombre: String, 
    correo: String, 
    contrasena: String 
});

// Ruta de Registro
app.post('/api/registrar', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;
        const nuevoUsuario = new Usuario({ nombre, correo, contrasena });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor al registrar" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});