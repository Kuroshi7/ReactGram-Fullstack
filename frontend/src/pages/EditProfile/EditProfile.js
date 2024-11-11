import "./EditProfile.css";
import { uploads } from "../../utils/config";
// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";
// Components
import Message from "../../components/Message";
const EditProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("")
    const handleSubmit = async (e) =>{
        e.preventDefault()
    };
    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">
            Adicione uma imagem de perfil, e conte mais um pouco sobre você...
            </p>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Nome"
                onChange={(e)=> setName(e.target.value)}
                value={name|| ""}
                />
                <input type="email" placeholder="E-Mail" disabled value={email|| ""}/>
                <label>
                    <span>Imagem de Perfil:</span>
                    <input type="file"/>
                </label>
                <label>
                    <span>Bio:</span>
                    <input 
                    type="text"
                    placeholder="Descrição do perfil"
                    onChange={(e)=> setBio(e.target.value)}
                    value={bio||""}
                    />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password"
                    placeholder="Digite sua nova senha..."
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password||""} 
                    />
                </label>
            </form>
        </div>
        );
};
export default EditProfile;
