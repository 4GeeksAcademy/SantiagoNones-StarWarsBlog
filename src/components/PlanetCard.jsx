import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import PropTypes from "prop-types";


const PlanetCard = ({ planet }) => {
    const { store, dispatch } = useGlobalReducer();

    // 2. La comprobación de favorito ahora busca una propiedad única de planetas, como 'population'
    const isFavorite = store.favorites.some(fav => fav._id === planet._id);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: planet });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: planet });
        }
    };

    return (
        <div className="card" style={{ width: "18rem", flexShrink: 0 }}>
            <img 
                src={planet.image} 
                className="card-img-top" 
                alt={planet.name} 
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{planet.name}</h5>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <Link to={`/single/planets/${planet._id}`} className="btn btn-outline-primary">
                        Learn More!
                    </Link>
                    <button 
                        onClick={() => dispatch({ type: "ADD_FAVORITE", payload: planet })} 
                        className={`btn btn-outline-warning favorite-btn ${isFavorite ? "active" : ""}`}
                    >
                        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    </button>
            </div>
        </div>
    </div>
    );
};

PlanetCard.propTypes = {
    planet: PropTypes.object.isRequired // 4. La prop se llama 'planet'
};

export default PlanetCard;