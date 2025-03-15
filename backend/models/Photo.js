const mongoose = require("mongoose")
const {Schema} = mongoose


// timestamps: true - Para a configuração do model, 2 campos serão update e create data. 
// Quando o usuário for criado ou atualizado ele ajusta o valor dos campos.
const fotoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String
},
{
    timestamps: true
})

const Photo = mongoose.model ("Photo",fotoSchema);
module.exports = Photo;