import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // 1. Importamos el hook

export const Navbar = () => {

    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Star Wars</span>
                </Link>
                <div className="ml-auto">
                 
                    <div className="dropdown">
                        <button 
                            className="btn btn-dark dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton1" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                          
                            {store.favorites.length > 0 ? (
                                store.favorites.map((fav, index) => (
                                    <li key={index} className="d-flex align-items-center">
                                        <Link className="dropdown-item" to={`/single/${fav.uid}`}>
                                            {fav.name}
                                        </Link>
                                        <button 
										className="btn btn-sm btn-outline-danger me-2"
										onClick={() => dispatch({ type: "REMOVE_FAVORITE", payload: fav})}
										>
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li><span className="dropdown-item text-muted">(empty)</span></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};