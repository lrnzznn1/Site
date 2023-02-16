const Chat = require('../models/chatschema');
const mongoose = require("mongoose");
const User = require('../models/userschema');
const express = require("express");

const Messaggio = (req,res) => {
    try {
        var dati = req.body;   
        //Cerco se la email del mittente esista nel db  
        User.findOne({email: dati.Sender}, function(err,obj) { 
          if(!obj.length){
            //Se esiste controllo che esista anche quella del destinatario
            User.findOne({email: dati.Receiver}, function(err,obj2){
              if(!obj2.length){
                //Controllo che uno dei due sia un tutor
                if(obj2.Is_tutor===true || obj.Is_tutor===true){
                  const messaggio = new Chat({
                    Sender: dati.Sender,
                    Receiver: dati.Receiver,
                    Time: Date.now(),
                    Text: dati.Text
                  });
                  //Invio il messaggio
                  messaggio.save((err, data) => {
                    if (err) return res.json({ Error: err });
                    return res.status(201).json(data);
                  });
                }
                //Errore uno dei due non è tutor
                else{
                  res.status(400).json("Uno dei due utente non è un tutor");
                }
              }
              //Errore il destinatario non esiste
              else{
                res.status(400).json("Questo destinatario non esiste");
              }
            });
          }
          //Errore il mittente non esiste
          else{
            res.status(400).json("Questo mittente non esiste");
          }
        });
        //Errore generico dentro la funzione
      } catch (err) {
        res.status(400).json(err);
      }
}


const VisualizzaMessaggi = (req,res) => {
    try{
        var dati = req.body;
        Chat.find({Sender : dati.ut2, Receiver: dati.ut1}, function(err,obj){
          Chat.find({Sender: dati.ut1, Receiver: dati.ut2}, function (err,obj2) {
            obj3 = obj.concat(obj2);
            obj3.sort(function(a, b) {
              return a.Time - b.Time;
            });
            let lista = "";
            let promises = [];
    
            for (let i = 0; i < obj3.length; i++) {
              const oggetto = obj3[i];
              promises.push(
                User.findOne({email: oggetto.Sender}).exec()
                .then(trovanome => {
                  let aa = trovanome.name.concat(": ",oggetto.Text,"\n");
                  lista = lista + aa;
                })
              );
            }
    
            Promise.all(promises)
            .then(() => {
              res.status(200).json(lista);
            })
            
          })
        });
      }
      //Errore generico dentro la funzione
      catch (err) {
        res.status(400).json(err);
      }
}

const ModificaMessaggio = (req,res) => {
    try{
        var countpre;
        Chat.countDocuments({}, function(err, count) {
          var dati = req.body;
          Chat.deleteOne({Sender: dati.Sender, Receiver : dati.Receiver, Text: dati.Text , Time: dati.Time},async (err) => {});
          Chat.countDocuments({}, function(err, count2) {
            if(count!=count2){
              const chat = new Chat({
                Sender: dati.Sender,
                Receiver: dati.Receiver,
                Time: dati.Time,
                Text: dati.Text2
              });
              // Salvataggio dell'utente nel database
              chat.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.status(201).json(data);
                })
              //Nessun messaggio trovato
            }else{
              res.status(400).json("Nessun messaggio trovato");
            }
          });
        });
      } catch (err) {
        res.status(400).json(err);
      }
}

module.exports = 
{
    Messaggio,
    VisualizzaMessaggi,
    ModificaMessaggio
}
