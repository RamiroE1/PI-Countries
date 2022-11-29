import React from "react";
import s from "./Card.module.css";

export default function Card({ flags, name, continents }) {

    return(
        <div  className={s.container}>
            <img className={s.img} src={flags} alt="Not found" />
            <div className={s.name}><h3>{name}</h3></div>
            <div className={s.conContainer}>
                <span className={s.conName}>Continents:</span>
                <h5>{continents}</h5>
            </div>
        </div>
    );
}