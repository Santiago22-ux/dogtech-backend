/**
 * SERVIDOR API - DOGTECH (Evidencia GA7-220501096-AA5-EV01)
 * Desarrollador: Santiago Ordóñez
 * Tecnologías: Node.js + Express
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000; // El servidor correrá en el puerto 5000

// Middlewares necesarios para entender JSON y permitir conexión con React
app.use(cors()); 
app.use(express.json()); 

const USERS_FILE = path.join(__dirname, 'users.json');

/**
 * Función para leer los usuarios del archivo JSON
 */
const obtenerUsuarios = () => {
    try {
        const datos = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
};

/**
 * Función para guardar los usuarios en el archivo JSON
 */
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
};

// ==========================================
// RUTA 1: REGISTRO DE USUARIOS
// Requisitos: correo, nombre y contraseña
// ==========================================
app.post('/api/registrar', (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const usuarios = obtenerUsuarios();

    // Validar si el correo ya existe
    const usuarioExistente = usuarios.find(u => u.correo === correo);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Crear el nuevo objeto de usuario
    const nuevoUsuario = {
        id: Date.now(),
        nombre,
        correo,
        contrasena
    };

    // Guardar en el archivo JSON
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    return res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
});

// ==========================================
// RUTA 2: INICIO DE SESIÓN (LOGIN)
// Requisitos: usuario y contraseña
// ==========================================
app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body; // 'usuario' recibe el correo

    if (!usuario || !contrasena) {
        return res.status(400).json({ error: 'Se requiere usuario y contraseña.' });
    }

    const usuarios = obtenerUsuarios();

    // Buscar coincidencia exacta
    const usuarioEncontrado = usuarios.find(u => u.correo === usuario && u.contrasena === contrasena);

    if (usuarioEncontrado) {
        // REQUISITO: Mensaje exacto si es correcto
        return res.status(200).json({ mensaje: 'autenticación satisfactoria' });
    } else {
        // REQUISITO: Mensaje exacto si falla
        return res.status(401).json({ error: 'error de autenticación' });
    }
});

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});