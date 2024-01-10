const userModel = require('../model/user')

async function listUsers(){
  const users = await userModel.findAll();
  return users;
}

async function createUser(item){
    return await userModel.create(item);
}

async function getUser(id_parame){
  return await userModel.findOne({where: {id:`${id_parame}`}})
}



async function deleteUser(id_parame){
  await userModel.destroy({where: {id:`${id_parame}`}})
}

async function UpdateUser(id_param, itemAtalualizado){

  const existeItem = await userModel.findOne({ where: { id: `${id_param}` } });

  if (!existeItem) {
    throw new Error(`Item com ID ${id_param} nao foi encontrado`);
  }

  await userModel.update(itemAtalualizado, { where: { id: `${id_param}` } });

  const atualizado = await userModel.findOne({ where: { id: `${id_param}` } });

  return atualizado;
}





module.exports = {createUser, getUser, listUsers, deleteUser,UpdateUser}