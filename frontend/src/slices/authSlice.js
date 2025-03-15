import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

// salvamos o usuário no service storage. Se tiver usamos o mesmo com estado inicial.
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // se o usuário estiver no localstorage, ok senão fica nulo
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Register a user and sign in
// auth/register é o nome da função
// thunkAPI nos permite parar a execução e identificar um erro da API.
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // passamos o usuário.
    const data = await authService.register(user);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Logout a user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Sing in a user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user);

  // Check for errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// vamos exportar a função authslice
// chamado auth, este será usado no store.js.
// reducers resetar todos os estados.
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  // parte das execuções que faremos na API. estados atual de cada requisição
  // builder construtor. se a requisição estiver pending?: ....
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })// fulfilled quando der tudo certo na requisição
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })// parou de carregar os dados. vamos pegar o erro para colocar na tela
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
