/*
Code by: Kaylee Andres
*/
var express = require('express');
var router = express.Router();

//create read and write config
const fs = require('fs');
var rawdata = fs.readFileSync('./models/equipments.json');
var userdata = fs.readFileSync('./models/users.json');//maybe later

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
  if (userdata.length > 0){
  var users = JSON.parse(rawdata);
  for (let i = 0; i < users.length; i++){
    if(users[i].id == post.userId){
      let obj = {
        id: equipments.length > 0 ? equipments[equipments.length - 1].id + 1 : 0, //if blog größer länge 0 mache ID, ansonsten mache 0
        itemnumber: post.itemnumber,
        title: post.title,
        image: post.image, //Später
        description: post.description,
        quantity: Number(post.quantity), //ersteller des Objekts kennt die Anzahl
        userId: Number(post.userId) //???
      }
      equipments.push(obj);
    
      var data = JSON.stringify(equipments, null, 2);
      fs.writeFileSync('models/equipments.json', data);
      return { "status": 201, "data": obj };
    }
  }
  }
  return{ "status": 404, "data": "Kein bestehenden Verwalter gefunden"};
}

//GET ID:
var getIdEquip = (id) => {
  let obj = equipments.find(element => element.id == id);
  if (obj != null) {
    return { "status": 200, "data": obj };
  }
  else {
    return { "status": 204, "data": "Equipment not found" };
  }
}

var changeEquip = (id, post) => {
  if (userdata.length > 0){
    var users = JSON.parse(rawdata);
    for (let i = 0; i < users.length; i++){
      if(users[i].id == post.userId){
  for (let i = 0; i < equipments.length; i++) {
    if (equipments[i].id == id) {
      let newObj = {
        id: Number(id), //Statt eine gernerierte id, die übergebenen überschrieben
        itemnumber: post.itemnumber,
        title: post.title,
        image: post.image,
        description: post.description,
        quantity: Number(post.quantity),
        userId: Number(post.userId)
      }
      equipments[i] = newObj; //ersetzt altes Objekt

      var data = JSON.stringify(equipments, null, 2);
      fs.writeFileSync('models/equipments.json', data);
      return { "status": 201, "data": newObj };
    }
  } return { "status": 404, "data": "No Equipment found" };
      }//user
    }//1.for
}//if
return{ "status": 404, "data": "Kein bestehenden Verwalter gefunden"};
}

var deleteEquip = (id) => {
  let index = equipments.findIndex(element => element.id == id);
  if (index > -1) {//exestiert ein Eintrag
    equipments.splice(index, 1);

    var data = JSON.stringify(equipments, null, 2);
    fs.writeFileSync('models/equipments.json', data);

    return { "status": 200, "data": equipments }; //gefunden
  } else {
    return { "status": 404, "data": "No Equipment found" }
  }
}

module.exports = {
  getAllEquip,
  createEquip,
  getIdEquip,
  changeEquip,
  deleteEquip
}