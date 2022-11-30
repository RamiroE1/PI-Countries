import { GET_COUNTRIES, GET_ACTIVITIES, GET_NAME_COUNTRIES, POST_ACTIVITIES, FILTER_BY_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_POPULATION, SORT } from "../actions/action-types.js";


const initialState = {
    allCountries: [],
    countries: [],
    activities: [],
};


function rootReducer (state = initialState, action){
    switch(action.type) {
        case GET_COUNTRIES:
            return{
                ...state,
                allCountries: action.payload,
                countries: action.payload,
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        case GET_NAME_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }



        case POST_ACTIVITIES:
            return{
                ...state,
                countries: [...state.countries, action.payload]
            }



        case FILTER_BY_POPULATION:
            const popu = action.payload === "max"
            ? state.countries.sort((a, b) => {
                return b.population - a.population
            })
            : state.countries.sort((a, b) => {
                return a.population - b.population
            })
            return {
                ...state,
                countries: popu
            }

        case FILTER_BY_CONTINENT:
            const conti= state.allCountries;
            const contiFilter= action.payload === 'All' ? conti : conti.filter(e => e.continents.includes(action.payload))
            return {
                ...state,
                countries: contiFilter
            }



        case FILTER_BY_ACTIVITIES:
            const allCountries = state.allCountries
            let filteredbyActivity = action.payload === 'All'
            ? state.allCountries : allCountries.filter((c) => {
                    const activities = c.activities.map((a) => a.name)
                    return activities.includes(action.payload)
                    });
            return {
                ...state,
                countries: filteredbyActivity
            };


        case SORT:
            const order= action.payload === "alphAsc" ? state.countries.sort((a, b) => {
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1;
                }
                if (b.name.toUpperCase() > a.name.toUpperCase()) {
                    return -1
                }
                return 0;
            }) : state.countries.sort((a, b) => {
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return -1
                }
                if (b.name.toUpperCase() > a.name.toUpperCase()) {
                    return 1
                }
                return 0
            })
            return{
                ...state,
                countries: order
            }

        default:
            return state;
    }
}



export default rootReducer;