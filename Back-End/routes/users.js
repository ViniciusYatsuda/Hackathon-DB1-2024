var express = require('express');
var router = express.Router();

const { Product, sequelize} = require('../db.js')

//Rota para postagem de mais item
router.post('/',async (request,response)=>{
  try{
    const body = request.body;
    let user = await Product.create(body);
    response.status(201).json(user);
  }catch(err){
  console.log(err);
  response.status(400).send('Falha ao consultar os usuarios')
}})

router.get('/',async (request,response)=>{
  try{
    const body = await Product.findAll();
    response.status(201).json(body);
  }catch(err){
  console.log(err);
  response.status(400).send('Falha ao consultar os usuarios')
}})



module.exports = router;
