const express = require('express');
const moment = require('moment');
const reservationServices = require("../modules/reservation/reservationService.js");
const utils = require("../modules/utils.js");


module.exports = function(app) {
  var apiRoutes = express.Router();

  //get reservation by id
  apiRoutes.get('/reservation/:id', (req, res) => {
      const id = req.params.id;
      reservationServices.getReservationDetail(id, (err, result) => {
        if(err){
          res.send({'error':err});
        }else{
          res.send(result);
        }
      })
  });


  //get all reservation from request query
  apiRoutes.get('/reservations', (req, res) => {
    reservationServices.getReservations(req.query, (err, result) =>{
      if(err){
          res.send({'error':err});
        }else{
          res.send(result);
        }
    })
  });


  //post reservation
  apiRoutes.post('/reservation', (req, res) => {
    if(req.body.arrivalDate && !utils.validateDate(req.body.arrivalDate)){
      res.send({'error':"Invalid arrivalDate"});
      return;
    }
    if(req.body.departureDate && !utils.validateDate(req.body.departureDate)){
      res.send({'error':"Invalid departureDate"});
      return;
    }
  	const reservation = {
  		name: req.body.name,
  		hotelName: req.body.hotelName,
  		arrivalDate: utils.getDispDateByString(req.body.arrivalDate),
  		departureDate: utils.getDispDateByString(req.body.departureDate)
  	};
    reservationServices.saveReservation(reservation, (err, result) =>{
      if(err){
          res.send({'error':err});
        }else{
          res.send(result);
        }
    })
  });

  //update reservation
  apiRoutes.put('/reservations/:id', (req, res) => {
    const id = req.params.id;
    if(req.body.arrivalDate && !utils.validateDate(req.body.arrivalDate)){
      res.send({'error':"Invalid arrivalDate"});
      return;
    }
    if(req.body.departureDate && !utils.validateDate(req.body.departureDate)){
      res.send({'error':"Invalid departureDate"});
      return;
    }
    const reservation = {
      name: req.body.name,
      hotelName: req.body.hotelName,
      arrivalDate: utils.getDispDateByString(req.body.arrivalDate),
      departureDate: utils.getDispDateByString(req.body.departureDate)
    };
    reservationServices.updateReservation(id, reservation, (err, result) =>{
      if(err){
          res.send({'error':err});
        }else{
          res.send(result);
        }
    })
  });

  app.use("/api/",apiRoutes);
};
