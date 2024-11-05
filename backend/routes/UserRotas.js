const express = require("express")
const router = express.Router()

//funçoes do UserController.js
const {register, login, getCurrentUser} = require("../controllers/UserController");


//Middlewares
const validate = require("../middleware/HandleValidation")


const {userCreateValidation, loginValidation} = require ("../middleware/userValidation")
const authGuard = require("../middleware/authGuard");


//rotas
router.post("/register", userCreateValidation(),validate,register);
router.post("/login",loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

module.exports = router;