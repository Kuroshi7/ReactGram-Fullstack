const mongoose = require("mongoose")
const {Schema} = mongoose

//timestamps: True - para a configuração do model, 2 campos serao criados UPDATE e CREATE DATA
//quando o usuario for criado ou atualizado ele ajusta o valor dos campos

const userSchema = new Schema({
    name: String,
    email:String,
    password: String,
    profileImage: String,
    bio: String
},
{
    timestamps: true
})

const User = mongoose.model("User",userSchema);
module.exports = User;