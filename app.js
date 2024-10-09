const express = require('express');
const futbolistasRoutes = require('./routes/futbolistasRoutes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas de futbolistas
app.use('/api', futbolistasRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
