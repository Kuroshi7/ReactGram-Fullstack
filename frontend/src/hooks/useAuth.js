import { useState, useEffect } from "react";
//obter dados da storage do auth
import { useSelector } from "react-redux";
//exportar o hook
export const useAuth = () =>{
    //obter usuario de um use sleectt do state.auth state de autenticaçao
    const{user} = useSelector((state)=> state.auth);
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true);
    //sera ativado sempre que o usuario mudar.
    useEffect(()=>{
        if(user){
            //usuario autenticado
            setAuth(true);
        }else{
            //usuario NAO autenticado
            setAuth(false);
        }
        setLoading(false);
    }, [user]);
    return {auth, loading};
};