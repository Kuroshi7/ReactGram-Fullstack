const express = require("express")
const router = express.Router()

//funçoes do UserController.js
const {register, login, getCurrentUser, update, getUserById} = require("../controllers/UserController");


//Middlewares
const validate = require("../middleware/HandleValidation")


const {userCreateValidation, loginValidation, userUpdateValidation} = require ("../middleware/userValidation")
const authGuard = require("../middleware/authGuard");

const {imageUpload} = require ("../middleware/imageUpload")


//rotas
router.post("/register", userCreateValidation(),validate,register);
router.post("/login",loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(),validate,imageUpload.single("profileImage"),update)
//nao utiliza middlware, qualquer usuario pode ver qualuqer perfil de outro usuario
router.get("/:id",getUserById)


module.exports = router;