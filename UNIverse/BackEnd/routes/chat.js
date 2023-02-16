const express = require('express'); //import express
// 1.
const router = express.Router();
// 2.
const uniController = require('../controllers/chat');
// 3.
router.post('/chat', uniController.Messaggio);
router.get('/chat',uniController.VisualizzaMessaggi);
router.get('/chat/mod', uniController.ModificaMessaggio);

// 4.
module.exports = router; // export to use in server.js
