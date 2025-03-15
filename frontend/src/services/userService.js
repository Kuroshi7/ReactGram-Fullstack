// Vem do arquico de configuração
import { api, requestConfig } from "../utils/config";

// Função - Get user details - 
// vamos obter o perfil do usuário logado.
const profile = async (data, token) => {
  // extrair dados passando os dados da requisição. enviar o token para não receber não autorizado.
  const config = requestConfig("GET", data, token);
  try {
    // acessando o backend. 
    // then vem a resposta e transformamos em um objeto javascript.
    // cathc pegará eventuais erros.
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log("Erro identificado em userService.js função profile: ",error);
  }
};

// Update user details
// função assíncrona que espera os dados para atualização e o token para autenticação.
const updateProfile = async (data, token) => {
  // Acionar o verbo PUT para atualizar na API.
  const config = requestConfig("PUT", data, token, true);
  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get user details
const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/users/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
