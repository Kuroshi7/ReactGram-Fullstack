//Callback functions multer, upload de arquivos
const multer = require ("multer")
//Aux nos dir para upload de arq. metodos e funçoes para manipular dir
const path = require("path");

//Destino para armaz de imagem
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder ="";
        //se vier de uma url que contem users, salva na pasta users
        if(req.baseUrl.includes("users")){
            folder = "users";
        }else if (req.baseUrl.includes("photos")){
            folder = "photos";
        }
        //configura o destino da imagem.
        cb(null,`uploads/${folder}/`);
    },
    //ajustar o nome do arquivo da imagem com a data do dia.
    filename:(req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    },
});

//validar imagem e onde ser instalada.
const imageUpload = multer({
    storage: imageStorage,
    //validar extensao do arquivo com Regex.
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //upload apenas formatos jpg e png
            return cb(new Error("Por favor, evie apenas png ou jpg!"))
        }
        cb(undefined, true);
    },
});

module.exports = {imageUpload};