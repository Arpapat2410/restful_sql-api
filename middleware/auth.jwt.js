const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../modals")
const User = db.user;

verifyToken = (req,res,next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({message:"no token provided!!"});
    }
    jwt.verify(token, config.secret, (err,decode)=>{
        if (err) {
            return res.status(401).send({message:"Unauthorized!"});
        }
        req.userId = decode.id;
        next();
    });
};

isAdmin = (req,res,next) => {
    //SELECT * FROM user WHERE id = req.userId
    User.findByPk(req.userId).then (user =>{
        //SELECT * FROM roles WHERE  = 
        user.getRoles().then (roles => {
            for (let i=0; i<roles.length; i++){
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({message:"Require Admin Role!"});
            return;
        });
    });
};

isModerator = (req,res,next) => {
    //SELECT * FROM user WHERE id = req.userId
    User.findByPk(req.userId).then (user =>{
        //SELECT * FROM roles WHERE  = 
        user.getRoles().then (roles => {
            for (let i=0; i<roles.length; i++){
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({message:"Require Moderator Role!"});
            return;
        });
    });
};
isModeratorOrAdmin = (req,res,next) => {
    //SELECT * FROM user WHERE id = req.userId
    User.findByPk(req.userId).then (user =>{
        //SELECT * FROM roles WHERE  = 
        user.getRoles().then (roles => {
            for (let i=0; i<roles.length; i++){
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({message:"Require Role!"});
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
}

module.exports = authJwt;