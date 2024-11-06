const {body} = require("express-validator");
const photoIsertValidation = () =>{
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório")
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({min: 3})
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),
        //validaçao customizada
        body("image").custom((value, {req})=>{
            if(!req.file){
                //testando se imagem recebida e é um arquivo
                throw new Error("A imagem é obrigatória");
            }
            return true;
        }),
    ];
};

const photoUpdateValidation = () =>{
    return[
        body("image")
            .optional()
            .custom((value,{req})=>{
                if(!req.file){
                    throw new Error("A imagem é obrigatória");
                }
                return true;
            }),
        body("title")
            .optional()
            .isString()
            .withMessage("O titulo é obrigatorio")
            .isLength({min:3})
            .withMessage("O nome precisa ter no minimo 3 caracteres."),
    ];
};

const commentValidation = () =>{
    return[body("comment").isString().withMessage("O comentário é obrigatório")];
}

module.exports = {
    photoIsertValidation,
    photoUpdateValidation,
    commentValidation,
}