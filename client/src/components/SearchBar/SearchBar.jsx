import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../redux/actions";
import f from "./SearchBar.module.css";





export default function SearchBar (){
    const dispatch= useDispatch();
    const [name, setName]= useState('');


    function handleInputChange (e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameCountries(name));
        setName("");
    }

    return (
        <div>

            <input
            type= "text"
            placeholder= "Search country..."
            onChange= {(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={e => handleSubmit(e)}> Search </button>
        </div>
    )
}