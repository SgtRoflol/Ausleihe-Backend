var express = require('express');
var router = express.Router();

const fs = require("fs");
const data = fs.readFileSync("public/data/borrows.json");
let borrows = JSON.parse(data);

//import controller functions
var controller = require('../controllers/borrowController');
const { stringify } = require('querystring');

router.get("/", (req, res, next) => {

})

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
})

module.exports = router;