import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNameCountries } from "../../redux/actions";
import s from "./Detail.module.css";
import image3 from "../../img/globe.jpg";


export default function Detail() {
    const dispatch = useDispatch()

    const countriesDetail = useSelector((state) => state.detail);
    const {name}= useParams();

    useEffect(() => {
        dispatch(getNameCountries(name));
    }, [dispatch])

    return (
        <div>
            <img className={s.img} src={image3} alt='globe' />
            <h1> </h1>
            <div className={s.Detail}>
                {
                    countriesDetail.length > 0
                    ? <div className={s.content}>
                        <img src={countriesDetail[0].img} alt='Country img' width='400px' height='400px'/>
                        <h2>{countriesDetail[0].name}</h2>
                        <div> {countriesDetail.types?.map(e => {
                            return <div>{e}</div> 
                        })}
                        </div>
                        <div className={s.wrapper}>
                            <div>Flags: {countriesDetail[0].flags}</div>
                            <div>Name: {countriesDetail[0].name}</div>
                            <div></div>
                            <div>Continent:{countriesDetail[0].continent}</div>
                            <div></div>
                            <div>Capital: {countriesDetail[0].capital}</div>
                            <div>Subregion: {countriesDetail[0].subregion}</div>
                            <div>Área: {countriesDetail[0].area}</div>
                            <div>Population: {countriesDetail[0].population}</div>
                            <div>Activities: {countriesDetail[0].activities}</div>
                        </div>
                        </div> : <p> Charging ...</p>
                }
            </div>
                    <Link to='/home'>
                        <button className={s.button}> Return </button>
                    </Link>
        </div>
        </div>
        </div>
    )
}