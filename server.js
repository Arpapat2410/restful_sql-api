const express = require("express");
const cors = require("cors");
const restaurantRouter = require("./routes/restaurant.router")
const sql = require("./modals/db.js");
const PORT = 5000;
const db = require("./modals/index")
const role = db.role
//dev mode 
db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and rsync DB');
    initial();
})

function initial(){
    role.create({
        id : 1 ,
        name : "user",
    });
    role.create({
        id : 2 ,
        name : "moderator",
    });
    role.create({
        id : 3 ,
        name : "admin",
    });
}


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.send("<h1>This is a restaurant API</h1>")
})

app.use("/", restaurantRouter);

app.listen(PORT, ()=>{
    console.log("Server is runing  on http://localhost:" + PORT);
})