const config = require("../config/db.config.js")

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB,config.USER,config.PASSWORD,{
    host : config.HOST,
    dialect : config.dialect,
    dialectOptions : {
        ssl : {
            require : true ,
            rejectUnauthorized : false
        }
    },
    pool : {
        max : config.pool.max,
        min : config.pool.min,
        acquire : config.pool.acquire,
        idle : config.pool.idle
    }
})

const db = {} ;
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//การ require พร้อมส่ง พารามิเตอร์
db.user = require("./user.model.js")(sequelize,Sequelize);
db.role = require("./role.model.js")(sequelize,Sequelize);
db.refreshToken = require("./refreshToken.modal.js")(sequelize,Sequelize);
//one to many
db.role.belongsToMany(db.user,{
    through: "users_roles"
})
//one to many
db.user.belongsToMany(db.role,{
    through: "users_roles"
})

//one to one
db.refreshToken.belongsTo(db.user,{
   foreignKey : "userId",
   targetKey : "id"
})

db.user.hasOne(db.refreshToken, {
    foreignKey : "userId",
    targetKey : "id"
})

db.ROLES=["user","admin","moderator"]

module.exports = db;