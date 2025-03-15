const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  console.log ("insertPhoto")
  // Titulo vem da requisição
  const { title } = req.body;
  const image = req.file.filename;

  console.log(req.body);
  //res.send ("Fotos foi Inserida.") - remover senão da erro de Header do HTTP
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);
  console.log(user.name);

  // Create photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });
  // If user was photo sucessfully, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }
  res.status(201).json(newPhoto);

};

// Remove a photo from the DB
const deletePhoto = async (req, res) => {
  console.log ("deletePhoto")
  // obter id da foto da URL
  const { id } = req.params;
  // obter usuário pela requisição.
  const reqUser = req.user;
  console.log("Aqui: ",reqUser.name);
  console.log("ID Recebido: ",id);
  try {
        // obter a foto do model, do banco de dados - mongoose - pelo id que veio da URl
      const photo = await Photo.findById(id);
      console.log("Apos findByID: ",photo);
      // Check if photo exists
      if (!photo) {
        res.status(404).json({ errors: ["Foto não encontradaaa!"] });
        return;
      }
      console.log("01")
      // Check if photo belongs to user
      // Mesmo usuário que esta excluíndo deve ser o dono da foto.
      if (!photo.userId.equals(reqUser._id)) {
        res
          .status(422)
          .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
        return;
      }
      // senão houver erro remover a foto do banco de dados.
      await Photo.findByIdAndDelete(photo._id);

      res
        .status(200)
        .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Erro Geral."] });
    return;
  }
};

// Get all photos
const getAllPhotos = async (req, res) => {
  console.log ("getAllPhotos")
  // Recuperando todas as fotos.
  // Ordenado pelos mais novos.
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();
  // json (photos) - Carrega as fotos
  return res.status(200).json(photos);
};

// Get user photos
const getUserPhotos = async (req, res) => {
  console.log ("getUserPhotos")
  // obter id da URL, ele pode pegar as fotos de alguem tambem por isto pegar da URl
  const { id } = req.params;
  // Filtar pelo campo userID
  // Ordenado pelo mais novo
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();
  // retorna 200 com as fotos na saída do Postman.
  return res.status(200).json(photos);
};

// Get photo by id
const getPhotoById = async (req, res) => {
  console.log ("getPhotoById")
  // O ID fato virá pela URL chamada no postman.
  const { id } = req.params;
  try {
    const photo = await Photo.findById(id);
    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
    res.status(200).json(photo);    
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
  }
};

// Update a photo
const updatePhoto = async (req, res) => {
  console.log ("updatePhoto")
  // ID virá da URL quando acionado pelo Postman
  const { id } = req.params;
  // Vamos apensa trocar o Título, pois a foto no Instagram não é permitido
  const { title } = req.body;
  console.log ("Titulo:" , title)
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);
    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
    // Check if photo belongs to user
    // Validará se a foto enviada é do usuário logado.
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, usuário não é o dono da foto. Tente novamente mais tarde"] });
      return;
    }
    if (title) {
      photo.title = title;
    }
    await photo.save();

    let image;
    if (req.file) {
      image = req.file.filename;
    }
  
    if (image) {
      photo.image = image;
    }
    res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });      
  } catch (error) {
    res.status(404).json({ errors: ["Erro Geal!"] });
    return;
  }
};

// Like functionality
const likePhoto = async (req, res) => {
  console.log ("likePhoto")
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);
  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  // Check if user already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu esta foto."] });
    return;
  }
  // Put user id in array of likes
  photo.likes.push(reqUser._id);
  await photo.save();
  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida!" });
};

// Comment functionality
const commentPhoto = async (req, res) => {
  console.log ("commentPhoto")
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;
  // Recuperar dados do usuário do banco de dados
  const user = await User.findById(reqUser._id);
  // Recuperar a foto que será comentada
  const photo = await Photo.findById(id);
  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontradaaaa!"] });
    return;
  }
  // Put comment in the array of comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };
  photo.comments.push(userComment);
  // salvar Foto
  await photo.save();
  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

// Search a photo by title
const searchPhotos = async (req, res) => {
  console.log ("searchPhotos")
  console.log ("Funcao de pesquisa")
  const { q } = req.query;
  console.log ("Funcao de pesquisa: Q->",q)
  // expressão regular.
  // Procurar pelo valor da variável q em qualquer lugar da string/contenha do título
  // i - ignorar case sensitive
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();
  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};