const db = require("../modals")
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUserOrEmail = (req,res,next) => {
    // console.log("midddddddddd");
    //checkUser 
    //SELECT * FROM USER WHERE username = req.body.username
    User.findOne({
        where: {
            username:req.body.username,
        },
    }).then((user)=> {
        if (user) {
            return  res.status(400).send({message:"failed! Username is already in use!"});
            
        }
        //checkEmail 
        //SELECT * FROM USER WHERE email = req.body.email
        User.findOne({
            where: {
                email:req.body.email
            }
        }).then((user)=> {
            if (user) {
                res.status(400).send({message:"failed! email is already in use!"});
                return;
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) =>{
    if(req.body.roles) {
        for(let i=0; i > req.body.roles.length; i++){
            if (!ROLES.includes(req.body.roles(i))) {
                res.status(400).send({message:"failed! Role does not exist = " + req.body.roles[i]});
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUserOrEmail : checkDuplicateUserOrEmail,
    checkRolesExisted : checkRolesExisted,
};

module.exports = verifySignUp;