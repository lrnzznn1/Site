/*const newUser = (req, res, next) => {
    res.json({message: "POST new user"}); // dummy function for now
    };
module.exports = {newUser};*/

const User = require('../models/userschema');
const mongoose = require("mongoose");
const express = require("express");
const nodemailer = require('nodemailer');
//const nodemailer = require('nodemailer');

const register = async(req,res) => {
    try {
        // Creazione di un nuovo utente con i dati inviati dalla form
        var dati = req.body;
        //controllo che le password siano uguali 
        if(dati.password==dati.password2){
          //controllo email esistente
          User.find({email: dati.email}, function(err,obj) { 
            //se non presente aggiungo nuovo utente
            if(!obj.length){
              const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                //Is_tutor: req.body.Is_tutor,
                //universita_seguite: req.body.universita_seguite
              });
              // Salvataggio dell'utente nel database
              user.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.status(201).json(data);
                })
            }
            //Errore utente già esistente
            else{
              res.status(409).json("Email già presente");
            }
          });  
        }
        //Errore password diverse
        else{
          res.status(409).json("Password Diverse");
        }
        //Errore generico dento la funzione
      } catch (err) {      
        res.status(400).json(err);
      }
}

const  login = (req,res) => {
    try {
        var dati = req.body;
        //Controllo se l'utente esiste nel db
        User.find({email: dati.email,password: dati.password}, function(err,obj){
          //Utente trovato
          if(obj.length){
            res.status(200).json(dati.email);
          }
          //Utente non trovato
          else{
            res.status(400).json("Utente non esistente");
          }
        })  
        //Errore generico dento la funzione
      } catch (err) {
        res.status(400).json(err);
      }
}

const  EliminaAccount = (req,res) => {
    try {
        var dati = req.body;
        User.find({email: dati.email,password: dati.password}, function(err,obj){
          //Utente trovato
          if(obj.length){
            User.deleteOne({email:dati.email},function (err) {
              if (err) return handleError(err);
            })
            res.status(200).json("Utente eliminato");
          }
          //Utente non trovato
          else{
            res.status(400).json("Utente non esistente");
          }
        }) 
        //Errore generico dento la funzione
      } catch (err) {
        res.status(400).json(err);
      }
}

const  DiventaTutor = (req,res) => {
    try{
        var dati = req.body;
        var rich="Richiesta Tutor "+dati.email;
        User.find({email: dati.email}, function(err,obj){
          if(obj.length){
            recEmail(dati.email, rich, JSON.stringify(obj[0]));
            res.status(200).json("Inviata");
          }else{
            res.status(400).json("Email non esiste nel database");
          }
        });
      //Errore generico dento la funzione
    } catch (err) {
      res.status(400).json(err);
    }
}

const passwordDimenticata = (req,res) => {
  try{
    var dati = req.body;
      var rich="Richiesta Passowrd Dimenticata Universe "+dati.email;
      User.findOne({email: dati.email}, function(err,obj){
        if(!obj.length){
          
          sendEmail(dati.email,rich,"la tua password è:" + obj.password);
          res.status(200).json("Inviata");
        }else{
          res.status(400).json("Email non esiste nel database");
        }
      });

  }catch (err) {
    res.status(400).json(err);
  }
}



async function recEmail(from, subject, message) {
    // Configurazione del transporter per l'invio di email
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true per 465, false per altre porte
      auth: {
        user: "peterthemarinaretto@gmail.com", // Inserire qui la propria email
        pass: "kmhmqnmptgdifzqe", // Inserire qui la propria password
      },
    });
  
    // Creazione del messaggio di posta elettronica
    let mailOptions = {
      from: from, // Inserire qui la propria email
      to: "peterthemarinaretto@gmail.com",
      subject: subject,
      text: message,
    };
  
    // Invio dell'email
    let info = await transporter.sendMail(mailOptions);

  }


  async function sendEmail(to, subject, message) {
    // Configurazione del transporter per l'invio di email
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true per 465, false per altre porte
      auth: {
        user: "peterthemarinaretto@gmail.com", // Inserire qui la propria email
        pass: "kmhmqnmptgdifzqe", // Inserire qui la propria password
      },
    });
  
    // Creazione del messaggio di posta elettronica
    let mailOptions = {
      from: "peterthemarinaretto@gmail.com", // Inserire qui la propria email
      to: to,
      subject: subject,
      text: message,
    };
  
    // Invio dell'email
    let info = await transporter.sendMail(mailOptions);
  
}


module.exports = {
    register,
    login,
    EliminaAccount,
    DiventaTutor,
    passwordDimenticata
};