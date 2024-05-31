var express = require('express');
var router = express.Router();

const { Product, sequelize} = require('../db.js')
const { Op, Sequelize } = require('sequelize');

//Rota para postagem de mais item //localhost:3000/users
router.post('/',async (request,response)=>{
  try{
    const body = request.body;
    let user = await Product.create(body);
    response.status(201).json(user);
  } catch(err) {
  console.log(err);
  response.status(400).send('Falha ao consultar os usuarios')
}})


//localhost:3000/users
router.get('/home',async (request,response)=>{
  try{
    const body = await Product.findAll();
    response.status(201).json(body);
  } catch(err) {
  console.log(err);
  response.status(400).send('Falha ao consultar os usuarios')
}})


//localhost:3000/users/favoritos?idsProduto=1,2 TUDO que esta depois do ? é parametro
router.get('/favoritos', async function(request, response) {
  console.log("oi-----------------------------------------------------------------------------------------------------------------------------------------------------------------");
  try{
   const idFav = request.query.idsProduto;
   console.log(idFav.split(',').map(id=>Number(id)));
   const product = await Product.findAll({
      where:{
         id:{
            [Op.in]:idFav.split(',').map(id=>Number(id))// Para mostrar a paginacao so com o termo buscado
         }
      }   
   });
  response.status(200).json(product);
}catch(err){
   console.log(err);
   response.status(400).send('Falha ao consultar os usuarios')
}
});


//localhost:3000/users/:id
router.get('/:id', async function(request, response, next) {
  try{
     const users = await Product.findByPk(request.params.id);// findbyPK procura direto pela Chave Primaria
     if(!users){
      response.status(404).send('Usuario nao encontrado');
      return;
     }
     response.status(200).json(users);
  } catch(err) {
     console.log(err);
     response.status(400).send('Falha ao consultar os usuarios')
  }
   }
 );


 router.get('/', async (request, response) => {
  try {
    const { search } = request.query;

    let queryOptions = {};

    const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 4;

      queryOptions = {
        offset: (page - 1) * limit,
        limit,
      };

      queryOptions.where = {
        produto: {
          [Op.like]: `%${search}%`
        },
      };
  
    const body = await Product.findAll(queryOptions);
    response.status(200).json(body);
  } catch (err) {
    console.error(err);
    response.status(500).send('Erro ao consultar os produtos');
  }
});


module.exports = router;
