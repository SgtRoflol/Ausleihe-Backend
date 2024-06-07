var express = require('express');
var router = express.Router();

const fs = require("fs");
const data = fs.readFileSync("models/borrows.json");
let borrows = JSON.parse(data);

//alle borrow Vorgänge anzeigen lassen
const getAllBorrows = (req, res, next) => {
    return borrows;
}

//borrow Vorgang erstellen
const createNewBorrow = (req, res, next) => {
    let begDate = new Date().toISOString().slice(0, 10); //heutiges Datum ohne Uhrzeit
    let endDate = new Date(Date.now() + 12096e5).toISOString().slice(0, 10); //12096e5 = 2 Wochen in Millisekunden

    let obj = {
        id: borrows[borrows.length - 1].id + 1,  //AusleihID - Datum enthalten für bessere Verwaltung?
        userID: Number(req.body["userID"]),   //User der den Artikel ausgeliehen hat
        begin: begDate,   //beginn Datum
        end: endDate,            //enddatum zwei Wochen Ausleihzeit
        powerbankID: Number(req.body["powerbankID"])  //ID der Powerbank
    }
    borrows.push(obj);

    const out = JSON.stringify(borrows, null, 2);
    fs.writeFileSync("models/borrows.json", out);
    return obj;
}

//borrow Vorgang an id Stelle anzeigen lassen
const findID = (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    return borrows[index];
}
//userID editieren
const editBorrows = (req, res, next) => {
    let index = -1
    index = borrows.findIndex(obj => obj.id == req.params.id);
    let obj = {
        id: index != -1 ? borrows[index].id : req.params.id,
        userID: req.body.userID ? req.body.userID : borrows[index].userID,
        begin: req.body.begin ? req.body.begin : borrows[index].begin,
        end: req.body.end ? Number(req.body.end) : Number(borrows[index].end),
        powerbankID: req.body.powerbankID ? Number(req.body.powerbankID) : Number(borrows[index].powerbankID)
    }
    borrows[index] = obj;
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('models/borrows.json', data);
    if (index == -1) {
        return { status: 201, out: obj }
    }
    else {
        return { status: 200, out: obj }
    }
}

//borrow Vorgang löschen
const deleteBorrow = (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    borrows.splice(index, 1);
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('models/borrows.json', data);
    return "gelöscht";

}

module.exports = {
    getAllBorrows,
    createNewBorrow,
    findID,
    editBorrows,
    deleteBorrow
}