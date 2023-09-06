const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controller");

//Create a new Restaurant 
//http:/locolhost:500/restaurants
router.post("/restaurants", async(req,res)=>{
    try {
        const newRestaurant = req.body;
        const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
        res.status(201).json(createRestaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to create reataurant"});
    }
});


//get all restaurant 
router.get("/restaurants", async(req,res)=>{
    try {
        const restaurants = await Restaurant.getAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({error: "Failed to get all reataurants"});
    }
}) 

//get reataurant by Id
router.get("/restaurants/:id", async(req, res)=>{
    try {
        const reataurantId = req.params.id;
        const restaurant = await Restaurant.getById(reataurantId);
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({error: "Failed to get reataurants by id"});

    }
})

//update a reataurant data
router.put("/restaurants/:id", async (req,res) =>{
    try {
        const restaurantId = req.params.id;
        const restaurantData = req.body;
        const updateRetaurant = await Restaurant.updateById(restaurantId, restaurantData)
        res.status(200).json(updateRestaurant);
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(400).json("Restaurant not found")
        }else{
            res.status(500).json({error:"failed to Update Restaurant data"});
        }
    }
})


//delete reataurant
router.delete("/restaurants/:id", async (req,res) =>{
    try {
        const restaurantId = req.params.id;
        const isdeleted = await Restaurant.removeById(restaurantId);
        if(isdeleted){
            res.status(200).json({ Message : "Restaurant id " + restaurantId + " is Deleted",
            isdeleted : isdeleted
            });
        }
    } catch (error) {
        if (error.kind === "not_found"){
            res.status(400)({error : "Reataurant not found"});

        } else {
            res.status(500).json({error: "Failed to deleted reataurants data"});
        }
    }
});



module.exports = router;