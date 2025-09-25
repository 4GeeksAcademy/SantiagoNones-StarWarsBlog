import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer"; // La única importación que necesitamos para el store

const CharacterCard = ({ person }) => {

    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(fav => fav._id === person._id);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: person });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: person });
        }
    };

    return (
        <div className="card" style={{ width: "18rem", flexShrink: 0 }}>
            <img 
                src={person.image} 
                className="card-img-top" 
                alt={person.name} 
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{person.name}</h5>

                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/single/people/${person._id}`} className="btn btn-outline-primary">
                        Learn More!
                    </Link>
                    <button 
                        onClick={() => dispatch({ type: "ADD_FAVORITE", payload: person })} 
                        className={`btn btn-outline-warning favorite-btn ${isFavorite ? "active" : ""}`}
                    >
                        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

CharacterCard.propTypes = {
    person: PropTypes.object.isRequired
};

export default CharacterCard;