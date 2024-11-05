const User = require ("../models/User")
const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

//Gerar token de usuario;
const generateToken = (id) =>{
    return jwt.sign({id},jwtSecret,{
        expiresIn: "7d",
    });
};

//registrar usuario e sing in
const register = async (req,res) =>{
    
    const {name, email, password} = req.body;

    //checar user existe
    const user = await User.findOne({email});
    if(user){
        res.status(422).json({errors: ["Por favor, utilize outro e-mail."]});
        return;
    }

    //Password hash generator
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    //se user for criado com sucesso retornar token
    if(!newUser){
        res.status(422).json({
            errors: ["Houve um erro, por favor tente novamente mais tarde."]
        });
        return;
    }
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

//sign in user
const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    //checar se usuario existe
    if(!user){
        res.status(404).json({errors: ["Usúario não encontrado!"]});
        return;
    }
    //checar se senhas matches
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors:["Senha inválida!"]});
        return;
    }
    // return user with token
    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
};

//Get logged in user
const getCurrentUser = async (req, res) =>{
    const user = req.user;
    res.status(200).json(user);
}

//Disp´as funçoes para rotas. exportar como objeto para importar nos arquivos de rotas de maneira mais simples
module.exports ={
    register,
    login,
    getCurrentUser,
};