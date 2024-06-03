var express = require('express');
var router = express.Router();

const { Product, sequelize} = require('../db.js')
const { Op, Sequelize } = require('sequelize');

router.post('/',async (request,response)=>{
  try{
    const body = request.body;
    let user = await Product.create(body);
    response.status(201).json(user);
  } catch(err) {
  console.log(err);
  response.status(400).send('Falha ao consultar os usuarios')
}})

router.get('/home',async (request,response)=>{
  try{
    const body = await Product.findAll();
    response.status(201).json(body);
  } catch(err) {
  console.log(err);
  response.status(400).send('Falha ao consultar os usuarios')
}})

router.get('/favoritos', async function(request, response) {
  try{
   const idFav = request.query.idsProduto;
   console.log(idFav.split(',').map(id=>Number(id)));
   const product = await Product.findAll({
      where:{
         id:{
            [Op.in]:idFav.split(',').map(id=>Number(id))//
         }
      }   
   });
  response.status(200).json(product);
}catch(err){
   console.log(err);
   response.status(400).send('Falha ao consultar os usuarios')
}
});

router.get('/:id', async function(request, response, next) {
  try{
     const users = await Product.findByPk(request.params.id);
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
    const { search} = request.query;

    const page = parseInt(request.query.page) || 1;
    const pageSize = parseInt(request.query.pageSize) || 3;
    const offset = (page - 1)*pageSize;
    const queryOptions = {
      where: {
        produto: {
          [Op.like]: `%${search}%`
        },
      },
      limit: pageSize,
      offset: offset,
    };
  
    const {count, rows} = await Product.findAndCountAll(queryOptions);
    const body = {
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      data: rows,
    };
    response.status(200).json(body);
  } catch (err) {
    console.error(err);
    response.status(500).send('Erro ao consultar os produtos');
}
});

module.exports = router;
