const mongoose = require('mongoose');

const uri = 'mongodb+srv://santi:dogtech2026@cluster0.pevd03a.mongodb.net/dogtech?retryWrites=true&w=majority';

mongoose.connect(uri)
    .then(() => {
        console.log('✅ ¡Conexión exitosa!');
        process.exit();
    })
    .catch(err => {
        console.error('❌ Error de conexión:', err);
        process.exit(1);
    });
    