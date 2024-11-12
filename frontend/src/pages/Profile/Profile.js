import "./Profile.css"

import { uploads } from "../../utils/config"

//components
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import {BsFillEyeFill, BsPencilFill, BsXLg} from "react-icons"

//hooks
import { useEffect, useState, useRef } from "react"
import {useSelector, useDispatch} from "react-redux"
import { useParams } from "react-router-dom"

//redux
import { getUserDetails } from "../../slices/userSlice"

const Profile =() =>{
    const {id} = useParams()
    const dispatch = useDispatch();

    //obter o usuario qual entrou no perfil
    const {user, loading} = useSelector((state)=> state.user);
    //obter o usuario autenticado
    const {user: userAuth} = useSelector((state)=> state.auth);
    //load user data
    useEffect(()=>{
        dispatch(getUserDetails(id));
        //dispatch(getUserPhotos(id));
    }, [dispatch,id])

    /*const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
    } = useSelector((state)=> state.photo); */


const [title, setTitle] = useState();
const [image, setImage] = useState();

const [editId, setEditId ] = useState();
const [editImage, setEditImage] = useState();
const [editTitle, setEditTitle] = useState();

//Novos forms e editar form refs
const newPhotoForm = useRef();
const editPhotoForm = useRef();

//reset component message
/* function resetComponentMessage(){
setTimeout(()=>{
    dispatch(resetMessage*())
    },2000)
    } */

//carregar user data


//publicar nova foto
const submitHandle = (e) =>{
    e.preventDefault();
    const photoData ={
        title,
        image,
    };

    //build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key)=> formData.append(key, photoData[key])
    );
    formData.append("photo", photoFormData);

    //dispatch(publishPhoto(formData));
    setTitle("")
    //resetComponentMessage();
};

    //mudar estado da image
    const handleFile = (e)=>{
        const image = e.target.files[0];
        setImage(image);
    };


    //excluir image
/* const handleDelete = (id)=>{
    dispatch(deletePhoto(id))
    
    resetComponentMessage();
    } */

    //mostrar/esconder forms
    function hideOrShowForms(){
        newPhotoForm.current.classList.toggle("hide");
        editPhotoForm.current.classList.toggle("hide");
    };

    //show edit form
    const handleEdit = (photo) =>{
        if(editPhotoForm.current.classList.contains("hide")){
            hideOrShowForms();   
        }
        setEditId(photo._id);
        setEditImage(photo.image);
        setEditTitle(photo.title);
    };

    //cancelar ediçao
    const handleCancelEdit = () =>{
        hideOrShowForms();
    }

    //update titulo da foto
    const handleUpdate = (e) =>{
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId,
        };

        //dispatch(updatePhoto(photoData));
        //resetComponentMessage()
    };

    if(loading){
        return <p>Carregando...</p>
    }
    return(
        <div id="profile">
            <div className="profile-header">
                {/* carregar imagem do usuario. */}
                {user.profileImage && ( <img src={`${uploads}/users/${user.profileImage}`} alt={user.name}/>)}
                {/*carregar o nome e bio de usuario */}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
            <>
                <div className="new-photo" ref={newPhotoForm}>
                    <h3>Compartilhe seus momentos: </h3>
                    <form onSubmit={submitHandle}>
                        <label>
                            <span>Título para a foto:</span>
                            <input
                                type="text"
                                placeholder="Insira um título"
                                onChange={(e)=> setTitle(e.target.value)}
                                value={title||""}
                                />
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input type="file" onChange={handleFile}/>
                        </label>
                        <input type="submit" value="Postar"/>
                    </form>
                </div>
                <div className="edit-photo hide" ref={editPhotoForm}>
                    <p>Editando:</p>
                    {editImage && (
                        <img src={`${uploads}/photos/${editImage}`} alt={editTitle}/>
                    )}
                    <form onSubmit={handleUpdate}>
                        <input
                        type="text"
                        onChange={(e)=> setEditTitle(e.target.value)}
                        value={editTitle||""}
                        />
                        <input type="submit" value="Atualizar"/>
                        <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar edição</button>
                    </form>
                </div>
                
            </>
        )}
        </div>
 
    )
}

export default Profile