const foodsRoutes = require("express").Router();
const foodsControllers = require("../controllers/foodsControllers");
const authmiddleware = require("../helpers/authmiddleware")

foodsRoutes.get("/", authmiddleware.checkLogin, foodsControllers.getAllfoods);
foodsRoutes.post("/", foodsControllers.postFoods);
foodsRoutes.get("/:id", foodsControllers.getDataById);
foodsRoutes.delete("/:id", foodsControllers.deleteFoods);
foodsRoutes.put("/:id", foodsControllers.updateFoods);

module.exports = foodsRoutes;