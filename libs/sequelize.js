import { Sequelize } from 'sequelize';
//const define models = require('../models');
import { defineModels } from '../controllers/futbolistasController.js';

//Option 2: Passing parameters separately (sqlite)
export const sequelize = new Sequelize({
    host: '127.0.0.1',
    port: '5432',
    username: 'postgres',
    password: 'Kmilo1120',
    database: 'API-Futbolistas',
    dialect: 'postgres'
});

defineModels(sequelize);

sequelize.sync()

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}