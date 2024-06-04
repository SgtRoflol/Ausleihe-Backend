var express = require('express');
var router = express.Router();

//import controller functions
var borrowController = require('../controllers/borrowController');
const { stringify } = require('querystring');
const { request } = require('node:https');


router.route("/")
    //alle borrow Vorgänge anzeigen lassen
    .get((req, res, next) => {
        let response = borrowController.getAllBorrows(req);
        res.status(200).send(response);
    })

    //borrow Vorgang erstellen
    .post((req, res, next) => {
        let response = borrowController.createNewBorrow(req);
        res.status(201).send(response);
    });

router.route("/:id")
    //borrow Vorgang an id Stelle anzeigen lassen
    .get((req, res, next) => {
        let response = borrowController.findID(req);
        res.status(200).send(response);
    })
    //userID editieren
    .put((req, res, next) => {
        let response = borrowController.editBorrows(req);
        res.status(response.status).send(response.out);
    })

    //borrow Vorgang löschen
    .delete((req, res, next) => {
        let response = borrowController.deleteBorrow(req);
        res.status(200).send(response);
    });


module.exports = router;