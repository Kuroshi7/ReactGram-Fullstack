//bloquear acesso a rotas que usuario precisa estar logado

const User = require ("../models/User")
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    //item vem do postman - authorization
    const authHeader = req.headers["authorization"];
    //token sempre com o formato:
    // Bearer TOKEN postman.  pegar a segunda parte do TOKEN.
    const token = authHeader && authHeader.split(" ")[1];

    //checar se header tem um token
    if(!token) return res.status(401).json({errors:["Acesso negado!"]});
        //checando validade do token
    try{
        const verified = jwt.verify(token, jwtSecret);
            //preparando o objeto "USER" para ser passado para outras paginas ou funçoes
            //evitar consultando banco de dados, colocar usuario na sessao do browser.
            //obeter objeto e tirar senha (menos-password) par nao trafegar entre paginas
        req.user = await
    User.findById(verified.id).select("-password");

        next();
    } catch (err){
        res.status(400).json({errors:["O Token é inválido!"]})
    }

}

module.exports = authGuard;