// Callback functions. Multer - Para upload de arquivos
const multer = require("multer");
// Auxiliará nos diretórios para upload do arquivo. Métodos e funções para manipular diretórios.
const path = require("path");

// Destination to store image
// Local onde a imagem vai ser salva. vamos mudar o destino padrão.
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";
    // se vier de uma URL que contem users, salva na pasta users.
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    // Configura o destino da imagem.
    cb(null, `uploads/${folder}/`);
  },
  // Vamos ajustar o nome do arquivo da imagem com a data de hoje.
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// vamos validar a imagem e onde ela vai ser instalada.
const imageUpload = multer({
  storage: imageStorage,
  // vamos validar a extensão do arquivo com expressão regular.
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };