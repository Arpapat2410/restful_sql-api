const db = require("../modals")
const config = require("../config/auth.config")
// const User = db.user;
// const Role = db.role;
// const RefreshToken = db.RefreshToken;
//เรียกตัวเล็กมาใช้ เเต่ใช้ตัวใหญ๋
const { user:User , role:Role , refreshToken:RefreshToken } = db
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Op = db.Sequelize.Op

//SignUp
exports.signup =async (req,res) => {
    //save user to DB
    console.log(req.body);
    User.create({
        username: req.body.username,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password, 8),
    }).then (user =>{
        if (req.body.role) {
            Role.findAll({
                where:{
                    name:{
                        [Op.or]: req.body.roles
                    },
                },
                }).then (roles => {
                    user.setRoles(roles).then(()=>{
                        res.send({message: "User was registered successfully!"});
                    });
                });
            }else{
                //User roleid =1 (user)
                user.setRoles([1])
                    res.send({message: "User was registered successfully!"});
            }
    })
    .catch((err)=>{
        res.status(500).send({message: err.message});
        // next(err)
    });
}

//SignIn
exports.signin =  (req, res) => {
    //SELECT * FROM users WHERE username = req.body.username
    User.findOne({
        where: {
            username : req.body.username
        }
    }).then(async user => {
        if(!user){
            return res.status(404).send({message : "User not found!!"})
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken : null,
                message : "Invalid Password",
            })
        }
        const token = jwt.sign({id:user.id},
            config.secret,
            {
                algorithm : "HS256",
                allowInsecureKeySizes:true,
                expiresIn: config.jwtExpiration,
            })
            const refreshToken = await RefreshToken.createToken(user)
            let authorities = [];
            user.getRoles().then((roles) => {
                for(let i=0; i<roles.length; i++){
                    authorities.push("ROLES_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id : user.id,
                    username : user.username,
                    email : user.email,
                    roles : authorities,
                    accessToken : token,
                    refreshToken: refreshToken
                })
            })
    }).catch(err =>{
        res.status(500).send({message : err.message})
    })
}

exports.refreshToken = async (req,res)=>{
    //check if refresh token is provied
    const {refreshToken:requesToken} = req.body
    if (requesToken == null ){
        return res.status(403).json({message : "Refresh token is required!"})
    }
    try {
        let refreshToken = await RefreshToken.findOne({
            where: {
                token : requesToken,
            }
        })
        //if  Toekn is not in database
        if(!refreshToken) {
            res.status(403).json({message : "Refresh Toekn is not in database"})
            return
        }
        //if  Toekn was expired. 
        if(RefreshToken.verifyExpiration(refreshToken)){
            RefreshToken.destroy({where:{id:refreshToken.id}}) 
            res.status(403).json({message : "Refresh Toekn was expired. Please make a new signin request"})
            return     
        }
        const user = await refreshToken.getUser()
        let newAccessToken = jwt.sign({id:user.id},
            config.secret,
            {
                algorithm : "HS256",
                allowInsecureKeySizes:true,
                expiresIn: config.jwtExpiration,
            }) 

            return res.status(200).json({
                accessToken : newAccessToken,
                refreshToken:refreshToken.token
            })
    } catch (error) {
        return res.status(500).send({message : error})
    }
}


