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
    number: post.number,
    userId: post.userId //???
  }
  equipments.push(obj);

  var data = JSON.stringify(equipments, null, 2);
  fs.writeFileSync('models/equipments.json', data);
  return {"status": 201, "data": obj};

}

var getIdEquip = (id) =>{
  
}
module.exports = {
    getAllEquip,   
    createEquip,
    getIdEquip
         /*
    putIdEquip,
    deleteIdEquip 
  */
  }