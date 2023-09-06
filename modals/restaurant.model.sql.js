const { query } = require("express");
const sql = require("./db");

//Constructor (สร้าง ชื่อเดียวกับ class)
const Restaurant = function(restaurant){
    //Atrributes
    this.name = restaurant.name;
    this.type = restaurant.type;
    this.img = restaurant.img;
}; 

//Methods
//Create new restaurant
Restaurant.create = (newRestaurant, result) =>{
    //INSERT INTO restaurants SET name, type, img VALUES ("KFC","FastFood","url")
    sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) =>{
        //การมี error เกิดขึ้น
            if (err){
                console.log("err", err);
                result(err, null);
                return;
            }
            //ไม่มี error
            console.log("new restaurant created");
            // ... สลายโครงสร้าง เเละเดิมเข้า object นี้
            result(null,{id:res.id, ...newRestaurant});
    });

}

//Get all reataurant
Restaurant.getAll = (result)=>{
    //SELECT * FROM restaurants
    sql.query("SELECT * FROM restaurants", (err,res)=>{
        if (err){
            console.log("err", err);
            result(err, null);
            return;
        }
        //ไม่มี error
        console.log("get all restaurant");
        // ... สลายโครงสร้าง เเละเดิมเข้า object นี้
        result(null,res); 
    });
}

Restaurant.getById = (restaurantId, result)=>{
    //SELECT * FROM restaurants WHERE id = restaurantId
    sql.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}` ,
    (err,res)=>{
        //มี error เกิดขึ้น
        if(err){
            console.log("err", err);
            result(err,null);
            return;
        }
        //found 1 row
        console.log("get retaurant by ID");
        if(res.length){
            result(null, res[0])
        }
        //not row
        result({kind:"not_found"},null)
        }
    );
};


//Update Restaurant
Restaurant.updateById = (id, restaurant,result)=>{
    //UPDATE restaurants SET name ="name" , type="type" , img ="img" WHERE id "id"
        sql.query("UPDATE restaurants SET name = ? , type = ? , img = ? WHERE id = ?",
        [restaurant.name,restaurant.type,restaurant.img,id],
        (err,res) => {
            if (err) {
                result(err,null);
                return;
            }
            if (res.affectedRows == 0) {
                result ({kind: "not_found"}, null)
                return;
            }
            result(null, {id: id, ...restaurant});
        });
    };

//Delete a reataurant
Restaurant.deleteById = (reataurantId,result)=>{
    //DELETE FROM restaurants WHERE id = 6
    sql.query("DELETE FROM restaurants WHERE id = ?",reataurantId,(err,res)=>{
        if(err) {
            result(err,null);
            return;
        }
        if(res.affectedRows == 0) {
            result({kind :"not_found"},null);
            return;
        }
        console.log("Restaurant id "+ reataurantId + "is delete");
        result(null,res);
    });
}


module.exports = Restaurant;
