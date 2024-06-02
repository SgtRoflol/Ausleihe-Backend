var express = require('express');
var router = express.Router();

//create read and write config
const fs = require('fs');
var rawdata = fs.readFileSync('./models/equipments.json');

if (rawdata.length <= 0) {
    var equipments = [];
  } else {
    var equipments = JSON.parse(rawdata);
  }

  var getAllEquip = () =>{
    return {"status": 200, "data": equipments};
  }


module.exports = {
    getAllEquip
    /*postAllEquip,
    getIdEquip,
    putIdEquip,
    deleteIdEquip
    */
}