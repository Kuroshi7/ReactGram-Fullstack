const User = require("../models/User");

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    // o item vai vir do postman - authorization
  const authHeader = req.headers["authorization"];
  // O Token virá sempre com o formato:
  // Bearer TOKEN do Postman. Vamos pegar a segunda parte, o TOKEN.
  const token = authHeader && authHeader.split(" ")[1];

  // Check if header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);

    // Vamos preparar o objeto user para ser passado para outras páginas ou funções.
    // Evita de ficar indo no banco de dados. Colocamos o usuário na sessão do browser.
    // Obtemos o objeto e tiramos a senha (menos -password) para não trafegar entre as páginas.
    req.user = await User.findById(verified.id).select("-password");

    next();
  } catch (err) {
    res.status(400).json({ errors: ["O Token é inválido!"] });
  }
};

module.exports = authGuard;