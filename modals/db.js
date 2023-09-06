const {Sequelize} = require("sequelize");
const dbConfig = require("../config/db.config");

//Create squalize instance
const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER , dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect :"mysql"
})

//Test teh database connection 
async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testConnection();
module.exports = sequelize;