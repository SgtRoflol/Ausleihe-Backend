/*
Code by: Kaylee Andres
revised by: Tim Feucht
*/
var express = require('express');
var router = express.Router();

//create read and write config
const fs = require('fs');
var rawdata = fs.readFileSync('./models/equipments.json');//reads model
var userdata = fs.readFileSync('./models/users.json');//reads users

//if there is no Object in equipments create an array, else JSON to js Objekt
if (rawdata.length <= 0) {
  var equipments = [];
} else {
  var equipments = JSON.parse(rawdata);
}



//GET:
var getAllEquip = () => {
  return { "status": 200, "data": equipments };
}

//POST:
var createEquip = (post) => {
  var users = JSON.parse(userdata);
  //Verwalter finden

  let obj = {
    id: equipments.length > 0 ? equipments[equipments.length - 1].id + 1 : 0, //if blog größer länge 0 mache ID, ansonsten mache 0
    itemnumber: post.itemnumber, //Artikelnummer
    title: post.title, //Titel 
    image: post.image ? "public/images/" + post.image : -1, //Bild ist optional
    description: post.description ? post.description : "Eine Powerbank", //Beschreibung ist optional
    quantity: Number(post.quantity), //ersteller des Objekts kennt die Anzahl
    userId: Number(post.userId) //Verwalter
  }
  //Auf Vollständigkeit prüfen
  for (let key in obj) {
    if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
      return { status: 400, data: "Bitte alle Angaben machen -> itemnumber; title; (image); description; quantity; userId" };
    }
  }
  //Bildpfad prüfen
  if (obj.image != -1) {
    if (!fs.existsSync(obj.image)) {
      return { status: 400, data: "Es Existiert kein Bild an diesem Pfad! Bild hochladen oder Feld leer lassen!" };
    }
  }
  //Objekt in Array pushen und in JSON schreiben
  equipments.push(obj);
  var data = JSON.stringify(equipments, null, 2);
  fs.writeFileSync('models/equipments.json', data);
  return { "status": 201, "data": obj };
}


//GET ID:
var getIdEquip = (id) => {
  let obj = equipments.find(element => element.id == id);
  if (obj != null) {
    return { "status": 200, "data": obj };
  }
  else {
    return { "status": 404, "data": "Equipment nicht gefunden" };
  }
}

var changeEquip = (id, post) => {
  var users = JSON.parse(userdata);
  const index = equipments.findIndex(element => element.id == id);
  if (index == -1) return (createEquip(post)); //wenn es keinen Eintrag gibt, wird ein neuer erstellt

  //Prüfen ob Verwalter existiert
  const userIndex = users.findIndex(element => post.userId ? element.id == post.userId : equipments[index].userId == element.id);
  if (userIndex == -1 || users.length <= 0) return { "status": 404, "data": "Kein bestehenden Verwalter gefunden" };

  //neues Objekt erstellen
  let newObj = {
    id: Number(id),
    itemnumber: post.itemnumber ? post.itemnumber : equipments[index].itemnumber,
    title: post.title ? post.title : equipments[index].title,
    image: post.image ? "public/images/" + post.image : equipments[index].image,
    description: post.description ? post.description : equipments[index].description,
    quantity: Number(post.quantity) ? Number(post.quantity) : equipments[index].quantity,
    userId: Number(post.userId) ? Number(post.userId) : equipments[index].userId
  }
  equipments[index] = newObj; //ersetzt altes Objekt

  //neue Daten in JSON schreiben
  var data = JSON.stringify(equipments, null, 2);
  fs.writeFileSync('models/equipments.json', data);
  return { "status": 200, "data": newObj };
}


//DELETE:
var deleteEquip = (id) => {
  let index = equipments.findIndex(element => element.id == id);
  if (index == -1) { return { "status": 404, "data": "Equipment nicht gefunden" } }
  equipments.splice(index, 1);

  var data = JSON.stringify(equipments, null, 2);
  fs.writeFileSync('models/equipments.json', data);

  return { "status": 200, "data": "Equipment gelöscht" }; //gefunden
}


module.exports = {
  getAllEquip,
  createEquip,
  getIdEquip,
  changeEquip,
  deleteEquip
}