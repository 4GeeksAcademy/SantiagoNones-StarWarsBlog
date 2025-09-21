
import React from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // 1. Importamos el hook global

export const Single = () => {
    const { theId } = useParams(); // 2. Obtenemos el ID de la URL
    const { store } = useGlobalReducer(); // 3. Nos conectamos al store

    // 4. Buscamos el personaje en la lista que YA TENEMOS. ¡Esto es instantáneo!
    const character = store.people.find(char => char.uid === theId);

    // 5. Si por alguna razón no se encuentra el personaje, mostramos un mensaje.
    if (!character) {
        return <h1 className="text-center">Character not found!</h1>;
    }

    // 6. Mostramos los datos encontrados. Ya no hay "Loading...".
    return (
        <div className="container mt-5">
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <img src="https://placehold.co/800x600" className="img-fluid" alt={character.name} />
                    </div>
                    <div className="col-md-8">
                        <h1>{character.name}</h1>
                        <p>
                            A compelling character from the Star Wars universe, known throughout the galaxy.
                        </p>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row text-danger text-center">
                    <div className="col">
                        <h5>Name</h5>
                        <p>{character.name}</p>
                    </div>
                    <div className="col">
                        <h5>Birth Year</h5>
                        <p>{character.birth_year}</p>
                    </div>
                    <div className="col">
                        <h5>Gender</h5>
                        <p>{character.gender}</p>
                    </div>
                    <div className="col">
                        <h5>Height</h5>
                        <p>{character.height}</p>
                    </div>
                    <div className="col">
                        <h5>Skin Color</h5>
                        <p>{character.skin_color}</p>
                    </div>
                    <div className="col">
                        <h5>Eye Color</h5>
                        <p>{character.eye_color}</p>
                    </div>
                </div>
                <Link to="/" className="btn btn-primary mt-3">
                    Back home
                </Link>
            </div>
        </div>
    );
};
