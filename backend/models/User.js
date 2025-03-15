const mongoose = require("mongoose")
const {Schema} = mongoose

// timestamps: true - Para a configuração do model, 2 campos serão update e create data. 
// Quando o usuário for criado ou atualizado ele ajusta o valor dos campos.
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
},
{
    timestamps: true
})

const User = mongoose.model ("User",userSchema);
module.exports = User;