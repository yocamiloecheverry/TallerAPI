const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/futbolistas.json');

// Leer archivo JSON
const readFile = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Escribir en archivo JSON
const writeFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
    readFile,
    writeFile
};

