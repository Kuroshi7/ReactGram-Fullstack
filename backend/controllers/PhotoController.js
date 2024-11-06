const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");

//inserir foto com usuario relacionado
const insertPhoto = async (req, res) =>{
    //titulo da req
    const {title} = req.body;
    const image = req.file.filename;
    console.log(req.body);
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);
    console.log(user.name)

    //create photo 
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });

    //se user photo sucessfully, retorna data
    if(!newPhoto){
        res.status(422).json({
            errors:["Houve um erro, por favor tente novamente mais tarde."],
        });
        return;
    }

    res.status(201).json(newPhoto);
};

//remover photo do Banco de dados
const deletePhoto = async (req, res) =>{
    //obtendo id da foto da URL
    const {id} = req.params;
    //obtendo usuario pela requisiçao
    const reqUser = req.user;
    console.log("Aqui: ", reqUser.name)
    console.log("ID recebido: ", id);
  try{
    //obtendo a foto do model, do BD mongoose pelo id na URL
    const photo = await Photo.findById((id));
    console.log("Apos findById: ", photo)
//checar se foto existe

    if(!photo){
        res.status(404).json({errors:["Foto não encontrada!"]})
        return;
    }

    //checar se foto pertence ao usuario
    //mesmo usuario excluindo deve ser o dono
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors:["Ocorreu um erro, tente novamente mais tarde"]})
        return;
    }
    //se nao houver erro remove a foto do BD
    await Photo.findByIdAndDelete(photo._id);
    res.status(200).json({id:photo._id, message:"Foto exclúida com sucesso."})
  } catch (error){
    res.status(404).json({errors:["Erro Geral."]})
  } 

};

// GET all photos
const getAllPhotos = async (req,res) =>{
    //recuperando todas as fotos
    //ordenando pelo mais novo
    const photos = await Photo.find({})
    .sort([["createdAt", -1]]).exec();
    //json (photos) carrega as fotos
    return res.status(200).json(photos);
};

//GET user photos

const getUserPhotos = async (req, res) =>{
    //obter id da URL
    const {id} = req.params;
// filtrar pelo campo userID
//ordenado pelo mais novo
    const photos = await Photo.find({userId:id}).sort([["createdAt",-1]]).exec();
//retorna 200 com as fotos na saida do Postman
    return res.status(200).json(photos);
};

//Foto por id

const getPhotoById = async (req, res) =>{
    //ID vira pela URL chamada no postman
    const {id} = req.params;

    const photo = await Photo.findById((id));

    //checar existencia
    if(!photo){
        res.status(404).json({errors:["Foto não encontrada!"]})
        return;
    }
    res.status(200).json(photo);
};

//atualizar foto

const updatePhoto = async (req, res) =>{
    //Id vindo do URL
    const {id} = req.params;
    //Trocar apenas titulo
    const{title} = req.body;
    const reqUser = req.user;

    try{
        const photo = await Photo.findById(id);

        //checar se foto existe
    
        if(!photo){
            res.status(404).json({erros:["Foto não encontrada!"]});
            return;
        }
    
        //checar se pertence a usuario//valida se foto enviada e do usuario logado
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors:["Ocorreu um erro, usúario não é o dono da foto. Tente novamente mais tarde"]})
            return;
        }
        if(title){
            photo.title = title;
        }
        await photo.save()
        let image;
        if(req.file){
            image = req.file.filename;
        }
        if(image){
            photo.image = image;
        }
    

    
        res.status(200).json({photo, message: "Foto atualizada com sucesso!"});
    } catch (error){
        res.status(404).json({errors:["Erro Geral!"]})
        return;
    }
};

//funçao de likes
const likePhoto = async (req, res) =>{
    const {id} = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(id);

    //checar se foto existe

    if(!photo){
        res.status(404).json({errors:"Foto não encontrada"})
        return;
    }

    //checar se usuario ja curtiu
    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({erros:["Você já curtiu esta foto."]})
        return;
    }


    //colocar user id no array de likes

    photo.likes.push(reqUser._id);

    await photo.save()
    res.status(200).json({ photoId:id, userId: reqUser._id, message:"A foto foi curitda!"})
};


//funçao de comentario
const commentPhoto = async (req, res) =>{
    const {id} = req.params;
    const{comment} = req.body;
    const reqUser = req.user;
    //recuperar dados do usario no BD
    const user = await User.findById(reqUser._id);
    //recuperar foto comentada
    const photo = await Photo.findById(id);

    //checar se foto existe

    if(!photo){
        res.status(404).json({errors:["Foto não encontrada!"]})
        return;
    }

    //colocar comentario em array de comentarios
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();
    
    res.status(200).json({
        comment: userComment,
        message: "Comentário adicionado com sucesso!"
    });
};

//busca foto por titulo
const searchPhotos = async (req, res) =>{
    const {q} = req.query;
    //REGEX
    //procurar pelo valor q em qualquer lugar da string do titulo
    //i ignorar case sensitive
    const photos = await Photo.find({title: new RegExp(q,"i")}).exec();
    res.status(200).json(photos);
}



module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
}