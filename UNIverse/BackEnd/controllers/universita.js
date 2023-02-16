/*const newUser = (req, res, next) => {
    res.json({message: "POST new user"}); // dummy function for now
    };
module.exports = {newUser};*/

const uni = require('../models/unischema');
const mongoose = require("mongoose");
const User = require('../models/userschema');
const express = require("express");

const  NewUni = (req,res) => {
    try {
        // Creazione di una nuova università con i dati inviati dalla form
        var dati = req.body;  
        User.findById(dati.id, function (err, utt) {
          if(utt.Is_Admin==true){
            uni.find({UniName: dati.UniName}, function(err,obj) { 
              //se non presente aggiungo l'università nuova
              if(!obj.length){
                const universitàS = new uni({
                  UniName : dati.UniName,
                  MIURcode: dati.MIURcode,
                  Location: dati.Location,
                  DgCourse: dati.DgCourse,
                  StudentsNumber: dati.StudentsNumber
                });
                // Salvataggio dell'università nel database
                universitàS.save((err, data) => {
                  if (err) return res.json({ Error: err });
                  return res.status(201).json(data);
                }) 
              }
              //Errore Università già esistente nel database
              else{
                res.status(409).json("Università già presente");
              }
            });
          }else{
            res.status(400).json("Non sei un admin");
          }
        });
        //Errore generico dento la funzione
      } catch (err) {
        res.status(400).json(err);
      }
}

const RicercaUni = (req,res) => {
    var dati = req.body;  
    uni.find({UniName: { $regex: new RegExp(dati.UniName, "i") }}, function(err,obj){
    if(obj.length){
      let lista = "";
      obj.forEach(element => {
        let aa = element.UniName + "\n";
        lista = lista + aa ;
      });
      res.status(200).json(lista);
    }else{
      //Non trovato
      res.status(400).json("Università non trovata");
    }
  });
}

const AggiungiPreferiti = (req,res) => {
    try{
        var dati = req.body;
    
      } catch (err) {
        res.status(400).json(err);
      }
};



module.exports = {
    NewUni,
    RicercaUni,
    AggiungiPreferiti
};