const mainRoutes = require("express").Router();
const foods = require("../models/foods");
const foodsRoutes = require("./foodsRoutes");
const authRoutes = require("./authRoutes");

mainRoutes.use("/foods", foodsRoutes);
mainRoutes.use("/auth", authRoutes);


module.exports = mainRoutes;