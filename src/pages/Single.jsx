
import { Link, useParams } from "react-router-dom";  
import PropTypes from "prop-types";  
import useGlobalReducer from "../hooks/useGlobalReducer";  
import { useEffect, useState } from "react";

export const Single = () => {
    const { theId } = useParams();
    
    // 2. Creamos el estado local. Esta línea crea la función setCharacter.
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/people/${theId}`)
            .then(response => response.json())
            .then(data => {
                console.log("Datos del personaje:", data.result);
                // 3. Ahora setCharacter sí es una función y podemos usarla.
                setCharacter(data.result.properties);
            })
            .catch(error => console.log(error));
    }, [theId]);

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${theId}`);

                if (!response.ok) {
                    throw new Error ("Error fetching character"); 
                }

                const data = await response.json();

                setCharacter (data.result.properties); 

            } catch (error) {
                console.error("Hubo un problema con la petición fetch:", error); 
            }
        }

        loadCharacter(); 
    }, [theId]);

    return (
        <div className="container mt-5">
            {character ? (
                // Si 'character' TIENE datos, mostramos la vista de detalles
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`https://placehold.co/800x600`} className="img-fluid" alt={character.name} />
                        </div>
                        <div className="col-md-8 text-center">
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
                </div>
            ) : (
                // Si 'character' es NULL (aún no ha cargado), mostramos esto
                <h1 className="text-center">Loading...</h1>
            )}
        </div>
    );
};