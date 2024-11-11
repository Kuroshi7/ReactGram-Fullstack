//vem do arq de config
import {api, requestConfig} from "../utils/config";

//funçao Get user details
//vamos obter o perfil do usuario logado.

const profile = async (data, token) =>{
    //extrair dados passando os dados da requisiçao.
    //enviar o token para nao receber "nao autorizado"
    const config = requestConfig("GET", data, token);
    try{
        //acessando backend
        //"then" vem a resposta e transforma em objeto javascript
        //catch pega eventuais erros.
        const res = await fetch(api + "/users/profile", config)
            .then ((res)=> res.json())
            .catch ((err) => err)
        return res;
        } catch (error){
            console.log("Erro identificado em userService.js funçao profile:", error);
        }
    };

    const userService ={
        profile
    }
export default userService