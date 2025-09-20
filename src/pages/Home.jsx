import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // 1. Importamos nuestro hook
import CharacterCard from "../components/CharacterCard.jsx";
import PlanetCard from "../components/PlanetCard.jsx";
import VehicleCard from "../components/VehicleCard.jsx";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const loadAllData = async () => {
            try {
                // --- Cargar Personajes ---
                const peopleResponse = await fetch("https://www.swapi.tech/api/people/");
                if (!peopleResponse.ok) throw new Error("Cannot fetch people list");
                const peopleSummary = await peopleResponse.json();
                const peopleDetailPromises = peopleSummary.results.map(p => fetch(p.url).then(res => res.json()));
                const peopleDetailedResults = await Promise.all(peopleDetailPromises);
                const finalCharacters = peopleDetailedResults.map(data => ({ ...data.result.properties, uid: data.result.uid }));
                dispatch({ type: "SET_PEOPLE", payload: finalCharacters });

                // --- Cargar Planetas ---
                const planetsResponse = await fetch("https://www.swapi.tech/api/planets/");
                if (!planetsResponse.ok) throw new Error("Cannot fetch planets list");
                const planetsSummary = await planetsResponse.json();
                const planetsDetailPromises = planetsSummary.results.map(p => fetch(p.url).then(res => res.json()));
                const planetsDetailedResults = await Promise.all(planetsDetailPromises);
                const finalPlanets = planetsDetailedResults.map(data => ({ ...data.result.properties, uid: data.result.uid }));
                dispatch({ type: "SET_PLANETS", payload: finalPlanets });

                // --- Cargar Vehículos ---
                const vehiclesResponse = await fetch("https://www.swapi.tech/api/vehicles/");
                if (!vehiclesResponse.ok) throw new Error("Cannot fetch vehicles list");
                const vehiclesSummary = await vehiclesResponse.json();
                const vehiclesDetailPromises = vehiclesSummary.results.map(v => fetch(v.url).then(res => res.json()));
                const vehiclesDetailedResults = await Promise.all(vehiclesDetailPromises);
                const finalVehicles = vehiclesDetailedResults.map(data => ({ ...data.result.properties, uid: data.result.uid }));
                dispatch({ type: "SET_VEHICLES", payload: finalVehicles }); // 
            } catch (error) {
                console.error("Hubo un problema cargando los datos detallados:", error);
            }
        };

        loadAllData();
    }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="text-start m-5">Characters</h1>
            <div className="d-flex flex-row overflow-auto gap-3 m-5">
                {store.people.map((person, index) => (
                    <CharacterCard
                        key={index}
                        person={person}
                    /> 
                ))}
            </div>

            <h1 className="text-start m-5">Planets</h1>
            <div className="d-flex flex-row overflow-auto gap-3 m-5">
                {store.planets.map((planet, index) => (
                    <PlanetCard
                        key={index}
                        planet={planet}
                    /> 
                ))}
            </div>

            <h1 className="text-start m-5">Vehicles</h1>
            <div className="d-flex flex-row overflow-auto gap-3 m-5">
                {store.vehicles.map((vehicle, index) => (
                    <VehicleCard
                        key={index}
                        vehicle={vehicle}
                    /> 
                ))}
            </div>
            
        </div>
    );
};