require('dotenv').config()

console.log(process.env.HOST,process.env.PASSWORD,process.env.USER);

module.exports = {
    HOST :process.env.HOST,
    USER :process.env.USER,
    PASSWORD : process.env.PASSWORD,
    DB : process.env.DB
}