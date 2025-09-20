import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const VehicleCard = ({vehicle}) => {
    const {store, dispatch } = useGlobalReducer(); 

    const isFavorite = store.favorites.some(fav => fav.uid === vehicle.uid); 

    
    return (
        <div className="card" style={{minWidth: "18rem"}}>
            <img className="card-img-top" src="https://placehold.co/400x300" alt={vehicle.name} />
            <div className="card-body text-start">
                <h5 className="card-title">{vehicle.name}</h5>
                <p className="card-text">Model: {vehicle.model}</p>
                <p className="card-text">Class: {vehicle.vehicle_class}</p>


                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/single/${vehicle.uid}`}>     
                        <span className="btn btn-outline-dark">Learn More</span>
                    </Link>

                    <button 
                        className={`btn btn-outline-warning favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={() => dispatch({ type: "ADD_FAVORITE", payload: vehicle })}
                    >
                        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    </button>
                </div>
                    
            </div>
        </div>
        )
}

export default VehicleCard