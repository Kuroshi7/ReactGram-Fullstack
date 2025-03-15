import "./Navbar.css"
//components

import { NavLink, Link } from "react-router-dom"

import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, } from "react-icons/bs";
//hooks
import { useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from "../slices/authSlice"

const Navbar = () => {
    //Usar useAuth.js
    const { auth } = useAuth();
    //Usar dados do usuario que esta no useSlice
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/login");
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    return (
        <nav id="nav">
            <Link to="/">
                <h2>PicNest</h2>
            </Link>
            <form id="search-form" onSubmit={handleSearch}>
                <BsSearch />
                <input type="text"
                    placeholder="Pesquisar"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
            <ul id="nav-links">
                {/*Links para autenticado */}
                {console.log("Estado do auth: ", auth)}
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/profile">
                                <BsFillPersonFill />
                            </NavLink>
                        </li>
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    );
};

export default Navbar;