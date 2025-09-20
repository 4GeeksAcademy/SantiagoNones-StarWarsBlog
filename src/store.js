export const initialStore = {
    people: [],
    vehicles: [],
    planets: [],
    favorites: []
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case "SET_PEOPLE":
            return {
                ...state,
                people: action.payload
            };

        case "ADD_FAVORITE":
            const isFavorite = state.favorites.find(fav => fav.uid === action.payload.uid);
            if (isFavorite) {
                return state; 
            }
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };

        case "REMOVE_FAVORITE":
            const deleteFavorite = state.favorites.filter(fav => fav.uid !== action.payload.uid);
            return {
                ... state,
                favorites: deleteFavorite
            };

        case "SET_PLANETS":
            return {
                ...state, 
                planets: action.payload
            }; 
        
        case "SET_VEHICLES":
            return {
                ...state, 
                vehicles: action.payload
            }; 


        default:
            return state;
    }
}; 

export default storeReducer;