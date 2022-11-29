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



        // case FILTER_BY_ACTIVITIES:
        //     const allActivities = state.allCountries;
        //     const filterActivities = action.payload === "Created" ? allActivities.filter(c => c.createdInDb) : allActivities.filter(c => !c.createdInDb)
        //     return{
        //         ...state,
        //         countries: action.payload === "Activities" ? state.allActivities : 
        //     } 

        // case FILTER_BY_CONTINENT:


        // case FILTER_BY_POPULATION:


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