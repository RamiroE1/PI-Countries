import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card/Card";
import Paginado from "./Paginado/Paginado";
import SearchBar from "./SearchBar/SearchBar";
import f from "./Home.module.css";
import { getActivities, getCountries, sort } from "../redux/actions";
import imge2 from "../img/image-nasa.jpg";





export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);
    const [order, setOrder] = useState('');
    
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

    // function handleFilterCreated(e){
    //     e.preventDefault();
    //     dispatch(filterByCreated(e.target.value));
    //     setCurrentPage(1);
    // }

    // function handleFilter(e){
    //     e.preventDefault();
    //     dispatch(filterBy(e.target.value));
    // }

    // function handleFilterActivities(e){
    //     e.preventDefault();
    //     dispatch(filterByActivities(e.target.value));
    // }

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
            <select onChange={e => handleSort(e)}>
            <option value=""> Alphabetical order </option>
            <option value="alphAsc"> A-Z </option>
            <option value="alphDesc"> Z-A </option>
            </select>

            {/* <select onChange={e => handleFilterActivities(e)}>
            <option value=""> Activities </option>
            <option value="activity"> All Activities </option>
            <option value="name"> Name </option>
            <option value="difficulty"> Difficulty </option>
            <option value="duration"> Duration </option>
            <option value="season"> Season </option>
            </select>

            <select onChange={e => (e)}>
            <option value=""> Continent </option>
            <option value=""> All Continent </option>
            <option value="">  </option>
            </select>

            <select onChange={e => (e)}>
            <option value=""> Amount of population </option>
            <option value="">  </option>
            <option value="">  </option>
            </select> */}


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