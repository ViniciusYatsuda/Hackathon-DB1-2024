const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'hackathon',// db
    'postgres',//user
    '123',// senha
    {
        dialect:'postgres',
        host:'localhost',
        port:'5432',
        define:{
            timestamps:false
        }
    }
)

const Product = sequelize.define('produto',{
    id:{
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
    },
    produto:{
        type:Sequelize.DataTypes.STRING(255),
        allowNull:false,
    },
    img:{
        type:Sequelize.DataTypes.STRING(255),
        allowNull:true,
        defaultValue:'Imagem não referenciada',
    },
    categoria:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull:true,
        deffaultValue:null,
    },
    price:{
        type:Sequelize.DataTypes.FLOAT,
        allowNull:false,
        defaultValue:null,
    }
});

module.exports = {
    sequelize,
    Product
};