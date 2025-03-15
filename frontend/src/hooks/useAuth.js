import { useState, useEffect } from "react";
// obter dados da storage do auth
import { useSelector } from "react-redux";
// exportar o hook
export const useAuth = () => {
  // obter usuário de um use select do state.Auth. state de autenticação.
  const { user } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  // Será ativado sempre que o usuário mudar.
  useEffect(() => {
    if (user) {
      // usuário esta autenticado
      setAuth(true);
    } else {
      // usuário NÃO esta autenticado      
      setAuth(false);
    }
    setLoading(false);
  }, [user]);
  return { auth, loading };
};
