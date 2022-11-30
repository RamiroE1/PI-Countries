import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card/Card";
import Paginado from "./Paginado/Paginado";
import SearchBar from "./SearchBar/SearchBar";
import f from "./Home.module.css";
import { filterByContinent, filterByPopulation, filterByActivities, getActivities, getCountries, sort } from "../redux/actions";
import imge2 from "../img/image-nasa.jpg";





export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);
    let [order, setOrder] = useState('');
    
    let [currentPage, setCurrentPage] = useState(1);
    let [countriesPerPage, setCountriesPerPage] = useState(10);
    if(currentPage === 1) countriesPerPage = 9;
    const indexOfLastCountries = currentPage * countriesPerPage;
    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        paginado(1)
    },[allCountries])

    useEffect (() => {
        dispatch(getActivities());
        dispatch(getCountries());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterByPopulation(e){
            e.preventDefault();
            dispatch(filterByPopulation(e.target.value));
            setCurrentPage(1);
            setOrder(`Ordenado ${e.target.value}`)
        };

    function handleFilterByContinent(e){
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleFilterByActivities(e){
        e.preventDefault();
        dispatch(filterByActivities(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(sort(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    return (
        <div>
            <img className={f.img} src={imge2} alt='image-nasa' />
        <Link to= '/activities'> Create activities </Link>
        <h1>COUNTRIES</h1>
        <button onClick={e=>{handleClick(e)}}>
            Reload all Countries
        </button>



        <div>
            <h3> Alphabetical order </h3>
            <select onChange={e => handleSort(e)}>
            <option value="alphAsc"> A-Z </option>
            <option value="alphDesc"> Z-A </option>
            </select>

            <h3> Activities </h3>
            <select onChange={e => handleFilterByActivities(e)}>
            <option value="All"> All Activities </option>
            {allActivities.map((a) => (
            <option value={ a.name } key={ a.id }>{a.name}</option>
            ))}
            </select>

            <h3> Continent </h3>
            <select onChange={e => handleFilterByContinent(e)}>
            <option value="All"> All Continent </option>
            <option value="Europe"> Europe </option>
            <option value="Oceania"> Oceania </option>
            <option value="North America"> North America </option>
            <option value="South America"> South America </option>
            <option value="Africa"> Africa </option>
            <option value="Asia"> Asia </option>
            <option value="Antarctic"> Antartica </option>
            </select>

            <h3> Amount of population </h3>
            <select onChange={e => handleFilterByPopulation(e)}>
            <option value="max"> Maximum Population </option>
            <option value="min"> Minimum Population </option>
            </select>


        </div>
        <SearchBar/>    
        <Paginado
        countriesPerPage= {countriesPerPage}
        allCountries= {allCountries.length}
        currentPage= {currentPage}
        paginado = {paginado}
        />
        <div className={f.card}> 
        {
            currentCountries?.map(el => {
                return(
                    <div key={el.id}>
                    <Link to={"/home/" + el.id}>
                    <Card name={el.name} flags={el.flags} continents={el.continents} key={el.id}/>
                    </Link>
                    </div>
                );
            })
        }
        </div>
        </div>
    )

};