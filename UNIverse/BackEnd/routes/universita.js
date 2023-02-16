const express = require('express'); //import express
// 1.
const router = express.Router();
// 2.
const uniController = require('../controllers/universita');
// 3.
router.post('/universita/NewUni', uniController.NewUni);
router.get('/universita/RicercaUni', uniController.RicercaUni);
router.post('/universita/AggiungiPreferiti', uniController.AggiungiPreferiti);


// 4.
module.exports = router; // export to use in server.js
