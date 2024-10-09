const { readFile, writeFile } = require('../utils/fileOperation');
const Joi = require('joi');

// Validar datos del futbolista
const validateFutbolista = (futbolista) => {
    const schema = Joi.object({
        camiseta: Joi.string().min(1).required(),
        nombre: Joi.string().min(3).required(),
        apellido: Joi.string().min(3).required(),
        edad: Joi.number().integer().min(18).max(45).required(),
        equipo: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        retirado: Joi.boolean().required()
    });
    return schema.validate(futbolista);
};

// Obtener todos los futbolistas
const getFutbolistas = (req, res) => {
    const futbolistas = readFile();
    res.json(futbolistas);
};

// Obtener futbolista por ID
const getFutbolistaById = (req, res) => {
    const futbolistas = readFile();
    const futbolista = futbolistas.find(f => f.id === parseInt(req.params.futbolistaId));
    if (!futbolista) return res.status(404).json({ message: "Futbolista no encontrado" });
    res.json(futbolista);
};

// Crear nuevo futbolista
const createFutbolista = (req, res) => {
    const { error } = validateFutbolista(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const futbolistas = readFile();
    const newFutbolista = {
        id: futbolistas.length + 1,
        ...req.body
    };
    futbolistas.push(newFutbolista);
    writeFile(futbolistas);
    res.status(201).json(newFutbolista);
};

// Actualizar futbolista
const updateFutbolista = (req, res) => {
    const { error } = validateFutbolista(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const futbolistas = readFile();
    const futbolistaIndex = futbolistas.findIndex(f => f.id === parseInt(req.params.futbolistaId));
    if (futbolistaIndex === -1) return res.status(404).json({ message: "Futbolista no encontrado" });

    futbolistas[futbolistaIndex] = { id: parseInt(req.params.futbolistaId), ...req.body };
    writeFile(futbolistas);
    res.json(futbolistas[futbolistaIndex]);
};

// Eliminar futbolista
const deleteFutbolista = (req, res) => {
    const futbolistas = readFile();
    const updatedFutbolistas = futbolistas.filter(f => f.id !== parseInt(req.params.futbolistaId));
    if (futbolistas.length === updatedFutbolistas.length) return res.status(404).json({ message: "Futbolista no encontrado" });

    writeFile(updatedFutbolistas);
    res.status(204).json();
};

module.exports = {
    getFutbolistas,
    getFutbolistaById,
    createFutbolista,
    updateFutbolista,
    deleteFutbolista
};
