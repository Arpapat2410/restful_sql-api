const Restaurant = require("../modals/restaurant.model")

//Insert Data
Restaurant.createRestaurant = async(newRestaurant)=>{
    try {
        const createRestaurant = await Restaurant.create(newRestaurant);
        console.log("Created Reataurant: ", createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (error) {
        console.log("err",error);
        throw error;
    }
}

//get all restaurants
Restaurant.getAll = async () => {
    try {
        const restaurants = await Restaurant.findAll();
        console.log(restaurants);
        return restaurants.map(restaurant => restaurant.toJSON());
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}

//get restaurant By Id
Restaurant.getById = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findByPk(restaurantId);
        if(restaurant){
            return restaurant.toJSON();
        }
        else{
            throw{kind: "not_found"};
        }
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}

//update a restaurants 
Restaurant.updateById = async (id, restaurantData) =>{
    try {
        const [rowUpdated] = await Restaurant.update(restaurantData, {
            where: {id},
        });
        if (rowUpdated === 0) {
            throw{kind: "not_found"};
        }
        return {id:id, ...restaurantData};
    } catch (error) {
        console.log("error:", error);
        throw error;
    }
}


//Delete reayaurant
Restaurant.removeById = async (id)=>{
    try {
        const rowDeleted = await Restaurant.destroy({ where : {id} });
        if(rowDeleted === 0){
            throw {kind : "not_found"};
        }
        return true;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}

module.exports = Restaurant;