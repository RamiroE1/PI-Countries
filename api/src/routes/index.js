const { Router } = require('express');
const countries = require('./Country.js');
// const activity = require('.postActivities.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', countries);
// router.use('/activities', activity);


module.exports = router;
