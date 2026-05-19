const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🚀 ENLACE DE CONEXIÓN (Copia aquí tu enlace directo con contraseña)
const MONGO_URI = 'mongodb://santi:dogtech2026@ac-fgm3hq1-shard-00-00.pevd03a.mongodb.net:27017,ac-fgm3hq1-shard-00-01.pevd03a.mongodb.net:27017,ac-fgm3hq1-shard-00-02.pevd03a.mongodb.net:27017/?ssl=true&replicaSet=atlas-uv9od6-shard-0&authSource=admin&appName=Cluster0';

// Conexión profesional a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('🚀 ¡Conexión exitosa a MongoDB Atlas!'))
    .catch(err => console.error('❌ Error fatal de conexión:', err));

// Esquema y Modelo simple
const UserSchema = new mongoose.Schema({ nombre: String, correo: String });
const Usuario = mongoose.model('Usuario', UserSchema);

// Ruta de prueba
app.get('/', (req, res) => res.send('Backend DogTech activo y conectado a Atlas.'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
// Define un modelo sencillo
const Usuario = mongoose.model('Usuario', { nombre: String, email: String });

// Crea una ruta para registrar usuarios
app.post('/api/usuarios', async (req, res) => {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).send('Usuario guardado en MongoDB Atlas');
});