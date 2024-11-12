import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "../services/userService";

const initialState ={
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};
//get user details, for edit data
export const profile = createAsyncThunk("user/profile", async(user, thunkAPI)=>{
    //obter o token do redux
    //auth.user.token salvo no authslice.jhs
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.profile(user, token);
    console.log("Logando userslice.js funçao profile: ", data)
    return data;
}
);

export const updateProfile = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) =>{
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.updateProfile(user, token);

        //checando erros
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        console.log(data)
        return data
    }
);

//criando o reducer do usuario
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        resetMessage: (state) =>{
            state.message = null;
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(profile.pending, (state)=>{
            state.loading = true;
            state.error = null; // ou false
        })
        .addCase(profile.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(updateProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled,(state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso!"
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            console.log("Corrige o null do atualizar em EditProfile")
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        })
    },
});



export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;