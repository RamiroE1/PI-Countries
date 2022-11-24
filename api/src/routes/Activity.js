const axios= require('axios');
const { Activity, Country }= require('../db.js');
const { Router }= require('express');


const router= Router();

router.get('/activities', async (req,res) => {
    try{
        const acti = await Activity.findAll({
            include: Country
        })
        return res.status(200).send(acti)
    }catch (error) {
        res.status(404).send(error)
    }
})

router.post('/activities', async (req,res) => {
        
    const {
        name,
        difficulty,
        duration,
        season,
        countries
    } = req.body

    try {
        const [createActivity, created] = await Activity.findOrCreate({ 
            where:{
                name,
            },
            defaults:{
                difficulty,
                duration,
                season
            }
        });

        const findCountry = await Country.findAll({
        where: {
            name: countries,
        }
        });
        
        await createActivity.setCountries(findCountry);
        return res.status(200).json(createActivity)
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

// router.put('/activities/:id', async (req,res) => {
//     try{
//         const {id}= req.params;
//         const {name}=req.body;
//         await Activity.update(
//             {name}, 
//             {where:{
//                 id
//             }}
//         )
//         res.status(200).send('Activity modified')
//     } catch{
//         res.status(400).send('Not found');
//     }
// })

// router.delete('/activities/:id', async (req,res) => {
//     try {
//         const {id}= req.params;
//         await Activity.destroy(
//             {where:{
//                 id
//             }}
//             )
//             res.status(200).send('Activity delete')
//     } catch{
//         res.status(400).send('Not found');
//     }
// })


module.exports= router;