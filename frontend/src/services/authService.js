import {api, requestConfig} from"../utils/config"

//registrar usuario
const register = async(data) =>{
    //funçao do config - requestConfig
    const config = requestConfig("POST", data);

    try{
        const res = await fetch(api +"/users/register", config)
        .then((res)=> res.json())
        .catch((err)=> err)

        if(res){
            //se tiver resposta recebe da um usuario da API
            //vira ID e token do usuario
            //stringfy transforma resposta em string
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res;
    }catch(error){
        console.log(error);
    }
};

//logout usuario

const logout = () =>{
    localStorage.removeItem("user");
};

//sing in usuario
const login = async (data) =>{
    const config = requestConfig("POST", data);
    try{
        const res = await fetch(api+"/users/login",config)
        .then((res)=> res.json())
        .catch((err)=> err);

        if(res){
            localStorage.setItem("user",JSON.stringify(res));
        }
        return res;
    }catch (error){
        console.log(error);
    }
};

const authService ={
    register,
    logout,
    login,
};

export default authService;