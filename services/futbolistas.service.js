import { sequelize } from "../libs/sequelize.js";

async function index() {
  console.log('INDEX /api/futbolistas');
  const futbolistas = await sequelize.models.futbolistas.findAll();
  return futbolistas
}

async function create(task) {
  const newFutbolistas = await sequelize.models.futbolistas.create({
    title: futbolistas.title
  });
  return newFutbolistas;
}
async function show(id) {
  console.log('SHOW /api/futbolistas:id');
  const futbolistas = await sequelize.models.futbolistas.findByPk(id);
  return futbolistas;
}
async function update(id, futbolistas) {
  console.log('UPDATE /api/futbolistas:id');
  const searchFutbolistas = await sequelize.models.futbolistas.findByPk(id);
  if (!searchFutbolistas) {
    return false
  }
  const [rowsAffected, [updatedTask]] = await sequelize.models.futbolistas.update({
    title: futbolistas.title
  }, {
    where: {
      id
    },
    returning: true
  });
  return updatedTask;
}
function destroy() {
  //buscar, si la tarea existe, eliminarla, de lo contrario, devolver false .delete 
  console.log('DESTROY /api/futbolistas:id');
}

export {
    index,
    create,
    show,
    update,
    destroy
}