var express = require('express');
var router = express.Router();
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fs = require("fs");
const data = fs.readFileSync("public/data/borrows.json");
let borrows = JSON.parse(data);

//import controller functions
var controller = require('../controllers/borrowController');
const { stringify } = require('querystring');
const { request } = require('node:https');


//alle borrow Vorgänge anzeigen lassen
router.get("/", (req, res, next) => {
    res.status(200).send(borrows);
});

//borrow Vorgang erstellen
router.post("/", (req, res, next) => {
    let obj = {
        id: req.body['id'],  //AusleihID - Datum enthalten für bessere Verwaltung?
        userID: req.body["userID"],   //User der den Artikel ausgeliehen hat
        begin: req.body["begin"],   //beginn Datum
        end: req.body["end"],            //enddatum
        powerbankID: req.body["powerbankID"]  //ID der Powerbank
    }
    borrows.push(obj);

    const out = JSON.stringify(borrows, null, 2);
    fs.writeFileSync("public/data/borrows.json", out);
    res.status(200).send(obj);
});

//borrow Vorgang an id Stelle anzeigen lassen
router.get("/:id", (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    res.status(200).send(borrows[index]);
});


//userID editieren
router.put("/:id/userID/:input", (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    borrows[index].userID = req.params.input;
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('public/data/borrows.json', data);
    res.status(200).send("userID geändert!");

});

//begin editieren
router.put("/:id/begin/:input", (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    borrows[index].begin = req.params.input;
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('public/data/borrows.json', data);
    res.status(200).send("begin geändert!");

});

//end editieren
router.put("/:id/end/:input", (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    borrows[index].end = req.params.input;
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('public/data/borrows.json', data);
    res.status(200).send("end geändert!");

});

//powerbankID editieren
router.put("/:id/powerbankID/:input", (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    borrows[index].powerbankID = req.params.input;
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('public/data/borrows.json', data);
    res.status(200).send("powerbankID geändert!");

});

//borrow Vorgang löschen
router.delete("/:id", (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    borrows.splice(index, 1);
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('public/data/borrows.json', data);
    res.status(200).send("gelöscht");
});



module.exports = router;