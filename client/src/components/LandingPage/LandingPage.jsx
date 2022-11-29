import React from "react";
import { Link } from "react-router-dom";
import f from "./LandingPage.module.css";
import image1 from "../../img/digital-w.jpg";




export default function LandingPage(){
    return(
        <div>
            <img className={f.img} src={image1} alt='digital-w' />
            <h1 className={f.h1}>Welcome to Countries</h1>
            <Link to ='/home'>
                <button className={f.btn}>Get Into</button>
            </Link>
        </div>
    );
}