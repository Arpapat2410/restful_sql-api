const {DataTypes } = require("sequelize");
const sequelize = require("./db");

//Define the restaurant model ประกาศโครงสร้างตาราง
const Restaurant = sequelize.define("restaurant",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    img:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue :DataTypes.NOW,
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue :DataTypes.NOW,
    }
})

Restaurant.sync({ force : false })
    .then(()=>{
        console.log("table create or already exists");
    })
    .catch((error) => {
        console.error("error creating table :" , error);
    })

module.exports = Restaurant;

