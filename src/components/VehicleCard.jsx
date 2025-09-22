import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import PropTypes from "prop-types";

// 1. Cambiamos la prop a { vehicle }
const VehicleCard = ({ vehicle }) => {
    const { store, dispatch } = useGlobalReducer();

    // 2. La comprobación de favorito ahora busca una propiedad única de vehículos, como 'model'
    const isFavorite = store.favorites.some(fav => fav._id === vehicle._id);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: vehicle });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: vehicle });
        }
    };

    return (
        <div className="card" style={{ width: "18rem", flexShrink: 0 }}>
            <img 
                src={vehicle.image} 
                className="card-img-top" 
                alt={vehicle.name} 
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{vehicle.name}</h5>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    
                    <Link to={`/single/vehicles/${vehicle._id}`} className="btn btn-outline-primary">
                        Learn More!
                    </Link>
                    <button 
                        onClick={() => dispatch({ type: "ADD_FAVORITE", payload: vehicle })} 
                        className={`btn btn-outline-warning favorite-btn ${isFavorite ? "active" : ""}`}
                    >
                        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

VehicleCard.propTypes = {
    vehicle: PropTypes.object.isRequired
};

export default VehicleCard;