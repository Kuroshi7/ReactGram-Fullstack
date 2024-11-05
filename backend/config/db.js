
const mongoose = require ("mongoose")
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async()=>{
    try{
        console.log("Credenciais banco de dados",dbUser)
        //entre back ticks ou crase
        const dbConn = await mongoose.connect
        (`mongodb+srv://${dbUser}:${dbPassword}@cluster1.nzqyo.mongodb.net/?retryWrites=true&w=majority`);//mongodb+srv://victorsoffi:<db_password>@cluster1.nzqyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
        console.log("Conectado ao banco de dados.")
        return dbConn;
    } catch (error){
        console.log("\n****** Problemas ao conectar ao banco de dados. ******\n Mensagem:",error)
    }
};
conn();
module.exports = conn;