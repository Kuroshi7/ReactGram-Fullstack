const express = require("express");
const router = express.Router();

// Importando funções do Controller
const { register, login, getCurrentUser, update, getUserById 
} = require("../controllers/UserController");

// Middlewares
const validate = require("../middleware/HandleValidation");
const {
  userCreateValidation,
  loginValidation,userUpdateValidation } = require("../middleware/userValidacao");

const authGuard = require("../middleware/authGuard");
const {imageUpload} = require ("../middleware/imageUpload")

  // Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
// Não utilizará middleware, porque qualquer usuário poderá ver qualquer perfil de outro usuário.
router.get ("/:id",getUserById)

module.exports = router;

