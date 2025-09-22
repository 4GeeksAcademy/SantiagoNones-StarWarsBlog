import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // 1. Importamos nuestro hook
import CharacterCard from "../components/CharacterCard.jsx";
import PlanetCard from "../components/PlanetCard.jsx";
import VehicleCard from "../components/VehicleCard.jsx";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer();

    
    useEffect(() => {
        const loadSummaries = async () => {
            try {
                // Pedimos los 3 resúmenes a la vez
                const [peopleRes, planetsRes, vehiclesRes] = await Promise.all([
                    fetch("https://starwars-databank-server.vercel.app/api/v1/characters"),
                    fetch("https://starwars-databank-server.vercel.app/api/v1/locations"),
                    fetch("https://starwars-databank-server.vercel.app/api/v1/vehicles")
                ]);

                if (!peopleRes.ok || !planetsRes.ok || !vehiclesRes.ok) throw new Error("A summary fetch failed");

                const peopleData = await peopleRes.json();
                const planetsData = await planetsRes.json();
                const vehiclesData = await vehiclesRes.json();

                // Guardamos directamente la lista de resúmenes (que está en la propiedad .data)
                dispatch({ type: "SET_PEOPLE", payload: peopleData.data });
                dispatch({ type: "SET_PLANETS", payload: planetsData.data });
                dispatch({ type: "SET_VEHICLES", payload: vehiclesData.data });

            } catch (error) {
                console.error("Hubo un problema cargando los resúmenes:", error);
            }
        };

        loadSummaries();
    }, []);

    return (
    <div className="container">
       
        {store.people.length === 0 && store.planets.length === 0 && store.vehicles.length === 0 ? (
            <h1 className="text-center">Loading data from a galaxy far, far away...</h1>
        ) : (
            <>
                <h1 className="text-danger my-4">Characters</h1>
                <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
                    {store.people.map((person, index) => (
                        <CharacterCard key={index} person={person} />
                    ))}
                </div>

                <h1 className="text-danger my-4">Planets</h1>
                <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
                    {store.planets.map((planet, index) => (
                        <PlanetCard key={index} planet={planet} />
                    ))}
                </div>
                
                <h1 className="text-danger my-4">Vehicles</h1>
                <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
                    {store.vehicles.map((vehicle, index) => (
                        <VehicleCard key={index} vehicle={vehicle} />
                    ))}
                </div>
            </>
        )}
    </div>
);
};