
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
    
    const { type, _id } = useParams();
    
    const [item, setItem] = useState(null);


    useEffect(() => {
        const loadItemDetails = async () => {
            try {

                let endpoint = "";
                if (type === "people") endpoint = "characters";
                else if (type === "planets") endpoint = "locations";
                else if (type === "vehicles") endpoint = "vehicles";

                if (!endpoint) return;

                const response = await fetch(`https://starwars-databank-server.vercel.app/api/v1/${endpoint}/${_id}`);
                if (!response.ok) throw new Error("Item not found");
                
                const data = await response.json();

                setItem(data); 

            } catch (error) {
                console.error("Hubo un problema cargando los detalles:", error);
            }
        };

        loadItemDetails();
    }, [_id, type]);

    return (
        <div className="container mt-5">
            {item ? (
        
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={item.image} className="img-fluid" alt={item.name} />
                        </div>
                        <div className="col-md-8">
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                        </div>
                    </div>
                    <hr className="my-4" />

                    <div className="row text-danger text-center">
                        {type === "people" && (
                            <>
                                <div className="col"><h5>Height</h5><p>{item.height}</p></div>
                                <div className="col"><h5>Mass</h5><p>{item.mass}</p></div>
                                <div className="col"><h5>Hair Color</h5><p>{item.hair_color}</p></div>
                                <div className="col"><h5>Skin Color</h5><p>{item.skin_color}</p></div>
                                <div className="col"><h5>Eye Color</h5><p>{item.eye_color}</p></div>
                                <div className="col"><h5>Birth Year</h5><p>{item.birth_year}</p></div>
                            </>
                        )}
                        {type === "planets" && (
                            <>
                                <div className="col"><h5>Diameter</h5><p>{item.diameter}</p></div>
                                <div className="col"><h5>Rotation Period</h5><p>{item.rotation_period}</p></div>
                                <div className="col"><h5>Climate</h5><p>{item.climate}</p></div>
                                <div className="col"><h5>Terrain</h5><p>{item.terrain}</p></div>
                                <div className="col"><h5>Population</h5><p>{item.population}</p></div>
                            </>
                        )}
                        {type === "vehicles" && (
                            <>
                                <div className="col"><h5>Model</h5><p>{item.model}</p></div>
                                <div className="col"><h5>Manufacturer</h5><p>{item.manufacturer}</p></div>
                                <div className="col"><h5>Class</h5><p>{item.vehicle_class}</p></div>
                                <div className="col"><h5>Passengers</h5><p>{item.passengers}</p></div>
                            </>
                        )}
                    </div>
                    <Link to="/" className="btn btn-primary mt-3">
                        Back home
                    </Link>
                </div>
            ) : (
                
                <h1 className="text-center" style={{color: "black"}}>Loading...</h1>
            )}
        </div>
    );
};