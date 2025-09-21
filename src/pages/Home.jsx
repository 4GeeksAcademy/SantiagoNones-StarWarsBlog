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
            // 1. Pedimos los 3 resúmenes a la vez y esperamos a que lleguen todos.
            const [peopleSummaryRes, planetsSummaryRes, vehiclesSummaryRes] = await Promise.all([
                fetch("https://www.swapi.tech/api/people/"),
                fetch("https://www.swapi.tech/api/planets/"),
                fetch("https://www.swapi.tech/api/vehicles/")
            ]);

            // Comprobamos que todas las respuestas de resumen son correctas
            if (!peopleSummaryRes.ok || !planetsSummaryRes.ok || !vehiclesSummaryRes.ok) {
                throw new Error("Failed to fetch one of the summary lists");
            }

            // Convertimos todos los resúmenes a JSON
            const peopleSummary = await peopleSummaryRes.json();
            const planetsSummary = await planetsSummaryRes.json();
            const vehiclesSummary = await vehiclesSummaryRes.json();

            // 2. Preparamos TODAS las peticiones de detalles (30 en total) en un solo array
            const peopleDetailPromises = peopleSummary.results.map(p => fetch(p.url).then(res => res.json()));
            const planetsDetailPromises = planetsSummary.results.map(p => fetch(p.url).then(res => res.json()));
            const vehiclesDetailPromises = vehiclesSummary.results.map(v => fetch(v.url).then(res => res.json()));

            // Unimos los 3 arrays de promesas en uno solo
            const allDetailPromises = [...peopleDetailPromises, ...planetsDetailPromises, ...vehiclesDetailPromises];

            // 3. Esperamos a que lleguen TODOS los 30 detalles
            const allDetailedResults = await Promise.all(allDetailPromises);

            // 4. Guardamos todo en el store de una sola vez
            const peopleCount = peopleSummary.results.length;
            const planetsCount = planetsSummary.results.length;

            dispatch({ type: "SET_PEOPLE", payload: allDetailedResults.slice(0, peopleCount).map(data => ({ ...data.result.properties, uid: data.result.uid })) });
            dispatch({ type: "SET_PLANETS", payload: allDetailedResults.slice(peopleCount, peopleCount + planetsCount).map(data => ({ ...data.result.properties, uid: data.result.uid })) });
            dispatch({ type: "SET_VEHICLES", payload: allDetailedResults.slice(peopleCount + planetsCount).map(data => ({ ...data.result.properties, uid: data.result.uid })) });

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