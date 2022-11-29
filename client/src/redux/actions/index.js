import axios from "axios";
import { GET_COUNTRIES, GET_ACTIVITIES, GET_NAME_COUNTRIES, FILTER_BY_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_POPULATION, SORT } from "./action-types.js";

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/countries`);
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    };
}

export function getActivities(){
    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/activities`);
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    };
}

export function getNameCountries(name){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch ({
                type: GET_NAME_COUNTRIES,
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postActivities(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/activities",payload);
        console.log(response)
        return response;
    }
}

export function filterByActivities(payload){
    return{
        type: FILTER_BY_ACTIVITIES,
        payload
    }
}

export function filterByContinent(payload){
    return{
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterByPopulation(payload){
    return{
        type: FILTER_BY_POPULATION,
        payload
    }
}

export function sort(payload){
    return{
        type: SORT,
        payload,
    };
}