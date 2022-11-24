const axios = require('axios');
const {Activity, Country } = require('../db.js');


const getApiInfo = async () => {
    const countries = await axios.get(`https://restcountries.com/v3/all`);
    const countrieData = countries.data;
    const countrie = countrieData.map(e => {
        return{
            id: e.cca3,
            name: e.name.common,
            flags: e.flags[1],
            continents: e.continents[0],
            capital: e.capital != null ? e.capital[0] : "No se encuentra Capital",
            subregion: e.subregion,
            area: e.area,
            population: e.population,
            maps: e.maps.googleMaps || ["Maps not found"],
        };
    });
    // console.log('getApiInfo: ',countrie);
    return countrie;
};


const getInfoDB = async () => {
    const countriesDB = await Country.findAll({
        include: {
            model: Activity,
            attributes:['name','difficulty','duration','season'],
                through: {
                    attributes: [],
            },
    }})


    if(!countriesDB.length) {
        return await Country.bulkCreate(await getApiInfo()); // Ejecuta las ceraciones en la DB de forma mucho mas rapida, sin la necesidad de consultar a la Api.
    }  else {
        return countriesDB
    }

};

module.exports= {getInfoDB}