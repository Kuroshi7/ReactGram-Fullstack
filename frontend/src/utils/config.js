export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (method, data, token = null, image = null) => {
  console.log("Funcao requestConfig - config.js")
  let config;
    // se tivermos uma imagem. config é formado pelo dados com headers vazios.
  if (image) {
    console.log("Temos imagem - config.js")
    config = {
      method: method,
      body: data,
      headers: {},
    };
    // data ===null exemplo função de Like.
  } else if (method === "DELETE" || data === null) {
    console.log("Delete ou Like - config.js")
    config = {
      method: method,
      headers: {},
    };
    // quando vem dados para incluir algo no sistema
  } else {
    console.log("Dados ok - config.js")
    console.log("method: ", method)
    console.log("body: ", data)
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    // retornar o objeto de configuração das requisições
  return config;
};
