import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PlanetCard = ({planet}) => {
    const {store, dispatch } = useGlobalReducer(); 

    const isFavorite = store.favorites.some(fav => fav.uid === planet.uid); 

    
    return (
        <div className="card" style={{minWidth: "18rem"}}>
            <img className="card-img-top" src="https://placehold.co/400x300" alt={planet.name} />
            <div className="card-body text-start">
                <h5 className="card-title">{planet.name}</h5>
                <p className="card-text">Population: {planet.population}</p>
                <p className="card-text">Terrain: {planet.terrain}</p>


                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/single/${planet.uid}`}>     
                        <span className="btn btn-outline-dark">Learn More</span>
                    </Link>

                    <button 
                        className={`btn btn-outline-warning favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={() => dispatch({ type: "ADD_FAVORITE", payload: planet })}
                    >
                        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    </button>
                </div>
                    
            </div>
        </div>
        )
}

export default PlanetCard