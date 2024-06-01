var express = require('express');
var router = express.Router();


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
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let year = today.getFullYear();
    let dEnd = dd;
    let mEnd = mm;
    let yEnd = year;
    let lang = false;
    let endDate;
    let begDate;

    // 1,3,5,7,8,10,12 Monate mit 31 Tagen
    if (mm <= 7 && mm % 2 != 0 || mm >= 8 && mm % 2 == 0) {
        lang = true;
    }

    //februar
    if (dd + 14 >= 28 && mm == 1) {
        mEnd++;
        dEnd = (dd + 14) - 28;
        //datumsänderung bei langen Monaten
    } else if (dd + 14 >= 31 && lang) {
        if (mm == 12) {
            mEnd = 0;
            yEnd++;
        }
        mEnd++;
        dEnd = (dd + 14) - 31;
        //datumsänderung bei kurzen Monaten
    } else if (dd + 14 >= 30 && lang == false) {
        if (mm == 12) {
            mEnd = 0;
            yEnd++;
        }
        mEnd++;
        dEnd = (dd + 14) - 30;
    } else {
        dEnd += 14;
    }

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (dEnd < 10) dEnd = '0' + dEnd;
    if (mEnd < 10) mEnd = '0' + mEnd;

    begDate = dd + "." + mm + "." + year;
    endDate = dEnd + "." + mEnd + "." + yEnd;

    let obj = {
        id: borrows[borrows.length - 1].id + 1,  //AusleihID - Datum enthalten für bessere Verwaltung?
        userID: req.body["userID"],   //User der den Artikel ausgeliehen hat
        begin: begDate,   //beginn Datum
        end: endDate,            //enddatum zwei Wochen Ausleihzeit
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