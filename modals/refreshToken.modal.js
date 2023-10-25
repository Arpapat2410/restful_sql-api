const config = require ("../config/auth.config");
const {v4:uuidv4} = require ("uuid")

module.exports = (sequelize , Sequelize)=>{
    const RefreshToken = sequelize.define("refreshToken",{
        token : {
            type : Sequelize.STRING,        
        },
        expiryDate : {
            type : Sequelize.DATE,
        }
    })
    //
    RefreshToken.createToken = async function (user) {
        let expiredAt = new Date ()
        expiredAt.setSeconds(expiredAt.getSeconds()+config.jwtRefreshExpiration)
        //uuidv4เป็นไลเบอรี่ เเละไปเก็บที่_token
        let _token = uuidv4()
        let refreshToken = await this.create({
            token : _token,
            userId : user.id,
            expiryDate : expiredAt,
        })
        return refreshToken.token
    }

    RefreshToken.verifyExpiration = (token) => {
        // เช็คว่า เวลาToken น้อยกว่า เวลาปัจจุบัน = เเสดงว่าหมดอายุ true = expired feile = not expired 
        return token.expiryDate.getTime() < new Date().getTime()
    }
    return RefreshToken;
}