import React from 'react'
import"./Auth.css"
import { Link } from 'react-router-dom'

import {useState,useEffect} from "react";

const Register = () => {
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassowrd, setConfirmPassword] = useState("")
    const handleSubmit = (e) =>{
        e.preventDefault();
        const user ={
            name,
            email,
            password,
            confirmPassowrd,
        }
        console.log("Dados do usúario: ", user)
    };
  return (
    <div id="register">
        <h2>PicNest Register</h2>
        <p className="subtitle"> Cadastre-se para ver as fotos dos seus amigos.</p>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Nome' onChange={(e) => setName(e.target.value)}/>
            <input type='email' placeholder='E-mail' onChange={(e)=> setEmail(e.target.value)}/>
            <input type='password' placeholder='Senha' onChange={(e)=> setPassword(e.target.value)}/>
            <input type='password' placeholder='Confirme a senha' onChange={(e)=> setConfirmPassword(e.target.value)}/>
            <input type='submit' value='Cadastrar'/>
        </form>
        <p>
            já tem uma conta? <Link to="/login">Clique aqui</Link>
        </p>
    </div>
    
  )
}

export default Register
