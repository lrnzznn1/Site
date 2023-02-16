const express = require('express'); //import express
// 1.
const router = express.Router();
// 2.
const userController = require('../controllers/user');
// 3.
router.post('/user/register', userController.register);

router.post('/user/tutor', userController.DiventaTutor);

router.delete('/user/elimina', userController.EliminaAccount);

router.post('/user/login', userController.login);

router.post('/user/password', userController.passwordDimenticata);
// 4.
module.exports = router; // export to use in server.js
