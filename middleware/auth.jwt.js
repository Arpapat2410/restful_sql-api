const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../modals")
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.header['X-access-token'];
    if (token) {
        return res.status(403).send({
            message: "no token provided!!"
        })
    }
    jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "Unaythorized!!"
            })
        }
        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req, res, next) => {
    //SELECT * FROM user WHERE id = req.userId
    User.findByPk(req.userId).then(user => {
        //SELECT * FROM role,user,user_role WHERE user.id = user.roles.userId and role.id = users_roles.roleId
        user.getRoles().then(role => {
            for (let i = 0; i < roles.length; i++) {
                if (rloes[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requrire Admin Role!!"
            })
            return;
        })
    })
}

isModerator = (req, res, next) => {
    //SELECT * FROM user WHERE id = req.userId
    User.findByPk(req.userId).then(user => {
        //SELECT * FROM role,user,user_role WHERE user.id = user.roles.userId and role.id = users_roles.roleId
        user.getRoles().then(role => {
            for (let i = 0; i < roles.length; i++) {
                if (rloes[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requrire Moderatorn Role!!"
            })
            return;
        })
    })
}

isAdminOrModerator = (req, res, next) => {
    //SELECT * FROM user WHERE id = req.userId
    User.findByPk(req.userId).then(user => {
        //SELECT * FROM role,user,user_role WHERE user.id = user.roles.userId and role.id = users_roles.roleId
        user.getRoles().then(role => {
            for (let i = 0; i < roles.length; i++) {
                if (rloes[i].name === "Admin") {
                    next();
                    return;
                }
            }
            for (let i = 0; i < roles.length; i++) {
                if (rloes[i].name === "Moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requrire AdminOrModeratorn Role!!"
            })
            return;
        })
    })
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin ,
    isModerator : isModerator,
    isAdminOrModerator : isAdminOrModerator,
}

module.exports = authJwt;