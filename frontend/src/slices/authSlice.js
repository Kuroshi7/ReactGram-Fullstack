import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import authService from "../services/authService"
//salvamos usuario no service storage. Se tiver usamos o mesmo com estado inicial.
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    //se usuario estiver no localstorag, ok senao fica nulo
    user: user ? user:null,
    error: false,
    succsess: false,
    loading: false,
};

//Registrar usuairo e sing in
//auth/register é o nome da funçao
//thinkAPI nos permite parar a excuçao e identificar um erro da API.

export const register = createAsyncThunk("auth/register",async(user, thunkAPI) =>{
    //passamos usuario
    const data = await authService.register(user);
    //checando por erros
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
}
);

//logout usuario
export const logout = createAsyncThunk("auth/logout", async()=>{
    await authService.logout();
});

//sing in usuario
export const login = createAsyncThunk("auth/login", async(user, thunkAPI)=>{
   const data = await authService.login(user)

   //checando por erros
   if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0]);
   }
   return data;
});

//exportar funçao authslice
//chamando auth, sera usado no store.js
//reducers resetar todos os estados

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset:(state) =>{
            state.loading= false;
            state.error= false;
            state.succsess= false;
        },
    },

    //parte das execuçoes a ser feitas na API. estados atual de cada requisiçao
    //builder constructor, se a requesiçao estiver pending?:...
    extraReducers: (builder) =>{
        builder
        .addCase(register.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })// fulfilled quando der tudo certo na requisiçao
        .addCase (register.fulfilled, (state, action)=>{
            state.loading = false;
            state.succsess = true;
            state.error =null;
            state.user = action.payload;
        }) //parou de carregar os dados. vamos pegar o erro para colocar na tela
        .addCase(register.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) =>{
            state.user = null;
            state.loading = false;
            state.succsess = true;
            state.error = null;
        })
        .addCase (login.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase (login.fulfilled, (state, action)=>{
            state.loading = false;
            state.succsess = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            state.user = null;
        })
    },
});
export const {reset} = authSlice.actions;
export default authSlice.reducer;