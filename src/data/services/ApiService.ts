import axios, { AxiosError } from "axios";

export const ApiService = axios.create({
  baseURL: "https://alunos.treinaweb.com.br/hyperprof",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language":
      "pt-BR" /* Assim, a API vai saber que quem está fazendo a requisição, 
        está fazendo em português.*/,
  },
});

// Interceptar o que se envia (request) e o que se recebe (response).
// use: processamento antes de chegar na API (pegar).
ApiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.request.status === 401) {
      return await handleTokenRefresh(error);
    }
    // Tratar erro 401
    return Promise.reject(error);
  }
);

async function handleTokenRefresh(erro: AxiosError) {
  try {
    const refreshToken = localStorage.getItem("refresh_token_hiperprof");
    // Tentar fazer a requisição.
    await ApiService.post<{ token: string; refresh_token: string }>(
      "api/auth/refresh",
      {
        refresh_token: refreshToken,
      }
    ).then(({ data }) => {
      localStorage.setItem("token_hiperprof", data.token);
      localStorage.setItem("refresh_token_hiperprof", data.refresh_token);
    });

    return await ApiService({
      // Passar um objeto de configuração.
      ...erro.config,
      headers: {
        // config pode acabar vindo undefined (não vai atribuir nada).
        ...erro.config?.headers, // sobrescrever os cabeçalhos.
        Authorization: `Bearer ${localStorage.getItem(
          "token_hiperprof"
        )}` /* Passagem do novo 
            cabeçalho */,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
