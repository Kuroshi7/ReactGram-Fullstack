import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
  // função do config.js - requestConfig
  const config = requestConfig("POST", data);

  try {
    console.log("Executnado API /users/register ")
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      // se tiver resposta recebemos da APi um usuário.
      // Virá o ID e o token do usuário.
      // stringify transforma a resposta em string
      localStorage.setItem("user", JSON.stringify(res));
    }
    // Sem este return nenhuma mensagem será mostrada no Browser informando que faltam dados.
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
