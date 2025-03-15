
import { api, requestConfig } from "../utils/config";

//publicar foto do usuario
const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(api + "/photos", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

//get user photos
const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token);
    try {
        const res = await fetch(api + "/photos/user/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//deletar foto
const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", "", token)

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
};

//atualizar foto
const updatePhoto = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);
    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
};

//get Photo
const getPhoto = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
};

const like = async (id, token) => {
    const config = requestConfig("PUT", null, token);

    try {
        const res = await fetch(api + "/photos/like/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
};

// Add a comment to a photo
const comment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "/photos/comment/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const getPhotos = async () => {
    const config = requestConfig("GET");
    console.log("em getPhotos de photoService.js", config)

    try {
        const res = await fetch(api + "/photos",
            config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}
// Search photos by title
const searchPhotos = async (query, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/search?q=" + query, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    getPhotos,
    searchPhotos,
    comment,
    like
}
export default photoService;