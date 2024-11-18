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
          .addCase(deletePhoto.pending,(state)=>{
            state.loading = true;
            state.error = null;
          })
          .addCase(deletePhoto.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photosArray = state.photosArray.filter((photo)=>{
              return photo._id !== action.payload.id;
            });
            state.message = action.payload.message;
          })
          .addCase(deletePhoto.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
          })
          .addCase(updatePhoto.pending,(state)=>{
            state.loading = true;
            state.error = null;
          })
          .addCase(updatePhoto.fulfilled,(state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photosArray.map((photo) => {
              if (photo._id === action.payload.photo._id) {
                return (photo.title = action.payload.photo.title);
              }
              return photo;
            });

            state.message = action.payload.message;
          })
          .addCase(updatePhoto.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
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
//Deletar fotos
export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    console.log(data.errors);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

//atualizar foto
export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
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