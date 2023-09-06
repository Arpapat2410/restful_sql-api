const express = require("express");
const router = express.Router();
const Restaurant = require("../modals/restaurant.model.sql");
const {
    message
} = require("statuses");

//Insert restuarant to database
//http://localhost:5000/restaurants
router.post("/restaurants", (req, res) => {
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        img: req.body.img
    })

    //Insert to DB 
    Restaurant.create(newRestaurant, (err, data) => {
        if (err) {
            res.status(500). send({
                message: err.message || "Some error occured whiile inserting the new retaurant"
            })
        } else {
            res.send(data)
        }
    })
})


//Get all reataurant 
router.get("/restaurants", (req, res) => {
    Restaurant.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while inserting the new retaurant"
            })
        } else {
            res.send(data);
        }
    })
});


//Get restaurant by id
//http://localhost:5000/restaurants/2
router.get("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.getById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: ("Restaurant not found with thid id " + restaurantId)
                })
            } else {
                res.status(500).send({
                    message: err.message || "some error occured while insering the new restaurant"
                });
            }
        } else {
            res.send(data)
        }
    })
});

//Update Restaurant
router.put("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Attributes con not be empyt !!"
        })
    }
    Restaurant.updateById(restaurantId, new Restaurant(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: "Restaurant not found with thid id " + restaurantId
                });
            } else {
                res.status(500).send({
                    message: err.message || "some error occured while update the new restaurant"
                });
            }
        } else {
            res.send(data)
        }
    })
});



router.delete("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.deleteById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: ("Restaurant not found with this id " + restaurantId)
                })
            } else {
                res.status(500).send({
                    message: err.message ||
                        "some error occured while insering the new restaurant"
                });
            }
        } else {
            res.send({
                message: ("Restaurant id " + restaurantId + "is delete")
            });
        }
    })
});

module.exports = router;