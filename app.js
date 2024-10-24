const express = require('express');
const futbolistasRoutes = require('./routes/futbolistasRoutes');
const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar el stream de log antes de definir las rutas
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access_log.txt'), { flags: 'a' });

// Middleware para registrar solicitudes HTTP
app.use((req, res, next) => {
    const log = `${dayjs().format('DD-MM-YYYY HH:mm:ss')} ${req.method} ${req.path} ${JSON.stringify(req.headers)}\n`;
    accessLogStream.write(log);
    next();
});

// Usar rutas de futbolistas
app.use('/api', futbolistasRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

