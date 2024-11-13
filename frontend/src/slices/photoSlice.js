import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";



const initialState ={
    photosArray: [],
    photo: {},
    error: false,
    loading: false,
    message: null,
}

//Publicar foto do usuario
export const publishPhoto = createAsyncThunk("photo/publish", async (photo, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.publishPhoto(photo, token);
    console.log(data.errors);
    //checando erros
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
}
)

export const photoSlice = createSlice({
    name: "publish",
    initialState,
    reducers: {
      resetMessage: (state) => {
        state.message = null;
      },
    },

    extraReducers: (builder) => {
        builder
          .addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(publishPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
            state.photosArray.unshift(state.photo);
            state.message = "Foto publicada com sucesso!";
          })
    
          .addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
          })
          .addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photosArray = action.payload;
          })
    },
});

//get user photos
export const getUserPhotos = createAsyncThunk("photo/userphotos", async (id, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);
    console.log(data);
    console.log(data.errors);
    return data;
}
);
//get all photos

export const getPhotos = createAsyncThunk("photo/getall", async()=>{
    const data = await photoService.getPhotos();

    return data
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer