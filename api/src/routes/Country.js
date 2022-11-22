const { getInfoDB } = require('../Controllers/getCountries.js');
const { Router } = require('express');
const { Op } = require('sequelize');
const {Country, Activity} = require('../db.js');



const router = Router();


router.get('/countries', async (req,res) => {
    const {name}= req.query;
    try{
        const infTotal = await getInfoDB();
        if(name){
            const countriName= infTotal?.filter((e) => e.name.toLowerCase().startsWith(name.toLowerCase()));
            console.log(countriName);
            countriName? res.status(200).send(countriName) : res.status(404).json("err");
        }else{
            res.status(200).json(infTotal)
        }
    } catch (error) {
        res.status(500).send('Countries not found')
    }
})



// router.get('/countries/:id', async (req,res) => {
//     const {id}= req.params;
//     try{
//         const infoId= await getInfoDB();
//         if(id){
//         let countriesId= await infoId.filter((e) => e.id == id)
//         countriesId.length?
//         res.status(200).send(countriesId) :
//         res.status(404).send("Countrie not found")
//     }} catch(error) {
//         console.log(error);
//     }
// });


module.exports= router;