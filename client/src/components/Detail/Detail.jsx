import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdCountries, deleteActivities, clean } from "../../redux/actions";
import s from "./Detail.module.css";
import image3 from "../../img/globe.jpg";
import { useState } from "react";


export default function Detail() {
    const dispatch = useDispatch()

    const countriesDetail = useSelector((state) => state.details);
    const {id}= useParams();
    const [ cambio, setCambio ] = useState(false);

    useEffect(() => {
        dispatch(getIdCountries(id));
        setCambio(true);
        return () => { dispatch(clean()) }
    }, [dispatch, id])

    return (
        <div>
            <img className={s.img} src={image3} alt='globe' />
            <h1> </h1>
            <div className={s.Details} >
                {
                    countriesDetail.length > 0
                    ? <div className={s.content}>
                        <img src={countriesDetail[0].flags} alt='Country img' width='400px' height='400px'/>
                        <h2>{countriesDetail[0].name}</h2>
                        <div className={s.wrapper}>
                            <div>Id: {countriesDetail[0].id}</div>
                            <div>Continent: {countriesDetail[0].continents}</div>
                            <div>Capital: {countriesDetail[0].capital}</div>
                            <div>Subregion: {countriesDetail[0].subregion}</div>
                            <div>Área: {countriesDetail[0].area}</div>
                            <div>Population: {countriesDetail[0].population}</div>
                            <div>Activities: {
                                countriesDetail.activities && countriesDetail.activities.length ?
                                countriesDetail.activities.map((a) => {
                                return (
                                    <div key={a.country_activity.activitiesId}>
                                        <div>
                                        <button onClick={() => dispatch(deleteActivities(a.country_activity.activitiesId),
                                        window.location.reload(false))
                                        }>X</button>
                                        </div>

                                        <h2>{a.name}</h2>
                                        <p>Id: {a.country_activity.activitiesId}</p>
                                        <p>Difficulty: {a.difficulty}</p>
                                        <p>Duration: {a.duration} Hours</p>
                                        <p>Season: {a.season}</p>
                                    </div>
                                )
                            })
                            : <p>This country has no activities</p>
                        }
                        </div>
                        </div>
                        </div> : <p> Charging ...</p>
                }
            <div>
                    <Link to='/home'>
                        <button className={s.button}> Return </button>
                    </Link>
        </div>
        </div>
        </div>
    )
}