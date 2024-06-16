/*
Code by: Theresa Böhns
revised by: Tim Feucht
*/
var express = require('express');
var router = express.Router();

const fs = require("fs");
const data = fs.readFileSync("models/borrows.json");
let borrows = JSON.parse(data);
var userdata = fs.readFileSync('./models/users.json');
var equipmentdata = fs.readFileSync('./models/equipments.json');

var users = JSON.parse(userdata);
var equipments = JSON.parse(equipmentdata);

//alle borrow Vorgänge anzeigen lassen
const getAllBorrows = (req, res, next) => {
    if (borrows.length == 0) return { status: 404, out: "Keine borrow Vorgänge vorhanden" };
    return { status: 200, out: borrows };
}

//borrow Vorgang erstellen
const createNewBorrow = (req, res, next) => {

    //Überprüfen ob User und Artikel vorhanden sind
    let userIndex = users.findIndex(element => element.id == post.userId);
    if (userIndex == -1 || users.length <= 0) return { "status": 404, "data": "Kein bestehenden Verwalter gefunden" };
    let equipIndex = equipments.findIndex(element => element.itemnumber == post.itemnumber);
    if (equipIndex != -1) return { "status": 404, "data": "Artikel nicht gefunden" };

    let begDate = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/'); //heutiges Datum 
    let endDate = new Date(Date.now() + 12096e5).toISOString().replace('-', '/').split('T')[0].replace('-', '/'); //12096e5 = 2 Wochen in Millisekunden

    let obj = {
        id: borrows.length != 0 ? borrows[borrows.length - 1].id + 1 : 0,  //ID des borrow Vorgangs
        userID: Number(req.body["userID"]),   //User der den Artikel ausgeliehen hat
        begin: begDate,   //beginn Datum
        end: endDate,            //enddatum zwei Wochen Ausleihzeit
        powerbankID: Number(req.body["powerbankID"])  //ID der Powerbank
    }
    //Überprüfen auf vollständige Angaben
    for (let key in obj) {
        if (obj[key] == undefined || obj[key] == "" || obj[key] == null || !obj[key]) {
            return { status: 400, out: "Bitte alle Angaben machen -> userID; powerbankID" };
        }
    }
    borrows.push(obj);

    const out = JSON.stringify(borrows, null, 2);
    fs.writeFileSync("models/borrows.json", out);
    return { status: 201, out: obj };
}

//borrow Vorgang an id Stelle anzeigen lassen
const findID = (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);

    if (index == -1) return { status: 404, out: "Kein Element mit dieser ID vorhanden" };

    return { status: 200, out: borrows[index] };
}
//userID editieren
const editBorrows = (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    //wenn es keinen Eintrag gibt, wird ein neuer erstellt
    if (index == -1) {
        return createNewBorrow(req);
    }
    let obj = {
        id: Number(req.params.id),
        userID: req.body.userID ? req.body.userID : borrows[index].userID,
        begin: req.body.begin ? req.body.begin : borrows[index].begin,
        end: req.body.end ? req.body.end : borrows[index].end,
        powerbankID: req.body.powerbankID ? Number(req.body.powerbankID) : Number(borrows[index].powerbankID)
    }
    borrows[index] = obj;
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('models/borrows.json', data);
    return { status: 200, out: obj };
}

//borrow Vorgang löschen
const deleteBorrow = (req, res, next) => {
    const index = borrows.findIndex(obj => obj.id == req.params.id);
    if (index == -1) return { status: 404, out: "Kein Element mit dieser ID vorhanden" };
    borrows.splice(index, 1);
    let data = JSON.stringify(borrows, null, 2);
    fs.writeFileSync('models/borrows.json', data);
    return { status: 200, out: "Borrow Vorgang gelöscht" };

}

module.exports = {
    getAllBorrows,
    createNewBorrow,
    findID,
    editBorrows,
    deleteBorrow
}