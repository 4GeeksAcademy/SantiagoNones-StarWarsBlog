import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CharacterCard = ({ person }) => {
    const {store, dispatch } = useGlobalReducer(); 

    const isFavorite = store.favorites.some(fav => fav.uid === person.uid && fav.hair_color);

    
    return (
        <div className="card" style={{minWidth: "18rem"}}>
            c
            <div className="card-body text-start">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">Gender: {person.gender}</p>
                <p className="card-text">Hair Color: {person.hair_color}</p>
                <p className="card-text">Eye Color: {person.eye_color}</p>


                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/single/${person.uid}`}>     
                        <span className="btn btn-outline-dark">Learn More</span>
                    </Link>

                    <button 
                        className={`btn btn-outline-warning favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={() => dispatch({ type: "ADD_FAVORITE", payload: person })}
                    >
                        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    </button>
                </div>
                    
            </div>
        </div>
        )
}

export default CharacterCard; 