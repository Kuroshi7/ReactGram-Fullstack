export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";
export const requestConfig = (method, data, token = null , image =null) =>{
    let config;
    //se tiver uma imagem. config e formado pelos dados com headers vazios.
    if(image){
        config ={
            method: method,
            body: data,
            headers: {},
        };
        //data ===null exemplo funçao de like.
    } else if( method === "DELETE"|| data === null){
        config ={
            method: method,
            headers: {},
        };
        //qunado vem dados para incluir algo no sistema
    } else{
        config ={
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    //retornar objeto de config das requisiçoes
    return config
}