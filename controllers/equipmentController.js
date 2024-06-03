var express = require('express');
var router = express.Router();

//create read and write config
const fs = require('fs');
var rawdata = fs.readFileSync('./models/equipments.json');
var userdata = fs.readFileSync('./models/users.json');//maybe later

if (rawdata.length <= 0) {
    var equipments = [];
  } else {
    var equipments = JSON.parse(rawdata);
  }

  var getAllEquip = () =>{
    return {"status": 200, "data": equipments};
  }

var createEquip = (post) =>{
  let obj  = {
    id: equipments.length > 0 ? equipments[equipments.length-1].id + 1 : 0, //if blog größer länge 0 mache ID, ansonsten mache 0
    itemnumber: post.itemnumber,
    title: post.title,
    image: post.image, //Später
    description: post.description,
    number: Number(post.number),
    userId: Number(post.userId) //???
  }
  equipments.push(obj);

  var data = JSON.stringify(equipments, null, 2);
  fs.writeFileSync('models/equipments.json', data);
  return {"status": 201, "data": obj};

}

var getIdEquip = (id) =>{
  let obj = equipments.find(element => element.id == id);
if (obj != null){
  return {"status": 200, "data": obj};
}
else{
  return {"status": 204, "data": "Equipment not found"};
}
}

var putIdEquip = (id,post) =>{
  for (let i = 0; i < equipments.length; i++){
    if(equipments[i].id == id){
      let newObj  = {
        id: Number(id), //Statt eine gernerierte id, die übergebenen überschrieben
        itemnumber: post.itemnumber,
        title: post.title,
        image: post.image, 
        description: post.description,
        number: Number(post.number),
        userId: Number(post.userId) 
      }
      equipments[i] = newObj; //ersetzt altes

  var data = JSON.stringify(equipments, null, 2);
  fs.writeFileSync('models/equipments.json', data);
  return {"status": 201, "data": newObj};
    }
  }  return {"status": 404, "data": "No Equipment found"};
 
}

var    deleteIdEquip  = (id) =>{
  let index = equipments.findIndex(element => element.id == id);
  if (index > -1) {//exestiert ein Eintrag
    equipments.splice(index, 1);

    var data = JSON.stringify(equipments, null, 2);
    fs.writeFileSync('models/equipments.json', data);
  
    return {"status": 200, "data": equipments}; //gefunden
  } else {
    return {"status": 404, "data": "No Equipment found"}
  }
}

module.exports = {
    getAllEquip,   
    createEquip,
    getIdEquip,       
    putIdEquip,
    deleteIdEquip 
  }