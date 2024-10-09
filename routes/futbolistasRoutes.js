const express = require('express');
const router = express.Router();
const {
    getFutbolistas,
    getFutbolistaById,
    createFutbolista,
    updateFutbolista,
    deleteFutbolista
} = require('../controllers/futbolistasController');

// Rutas
router.get('/futbolistas', getFutbolistas);
router.get('/futbolistas/:futbolistaId', getFutbolistaById);
router.post('/futbolistas', createFutbolista);
router.put('/futbolistas/:futbolistaId', updateFutbolista);
router.delete('/futbolistas/:futbolistaId', deleteFutbolista);

module.exports = router;
