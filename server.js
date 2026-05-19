const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// ... el resto de tu código


app.use(cors()); // <--- ¡ESTA LÍNEA ES LA QUE PERMITE LA CONEXIÓN!
app.use(express.json());
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // ¡Crucial para que el navegador deje pasar la conexión!
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