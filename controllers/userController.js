/*
Code by: Korel Öztekin
Date: 04.06.2024
revised by: Tim Feucht
*/

//Import routes
var express = require('express');
var router = express.Router();
var md5 = require('js-md5');

//USE: create read and write config
const fs = require('fs');
var rawdata = fs.readFileSync('./models/users.json');


// if: users.json has no object, create array []
if (rawdata.length <= 0) {
  var users = [];
} else {
  //else: JSON to javascript object
  var users = JSON.parse(rawdata);
}



//GET: 
const getAllUsers = () => {
  return { "status": 200, "data": users };
}

// GET: getSingleUser = (req.params.id)
const getSingleUser = (postID) => {
  var obj = users.find(element => element.id == postID);
  //returns the object in the array with the same ID as in URL
  //if found..
  if (obj != null) {
    return { "status": 200, data: obj };
  } else {
    //else if not found...                       
    return { "status": 404, data: "Nutzer nicht gefunden" };
  }
}

//POST: createUser = (req.body)
const createUser = (post) => {

  var currentDate = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  //Make from "Mon Jun 03 2024 15:19:16 GMT+0200 (Mitteleuropäische Sommerzeit)"" >>  "2024/06/0
  //day is enough information

  //create the object from the body
  let obj = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 0, //if blog item is not empty, check id of last item and add 1
    name: post.name,
    email: post.email,
    role: post.role,
    password: md5(post.password),
    date: currentDate //automatic created
  }

  //check if all fields are filled
  for (let key in obj) {
    if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
      return { "status": 400, "data": "Bitte alle Angaben machen -> name; email; role; password" };
    }
  }
  users.push(obj);

  //save new Array as JSON
  var data = JSON.stringify(users, null, 2);
  fs.writeFileSync('models/users.json', data);
  return { "status": 201, "data": obj };
}

//PUT: changeUser = (req.params.id, req.body)
const changeUser = (postID, post) => {
  const index = users.findIndex(element => element.id == postID);
  if (index == -1) return createUser(post);
  let newobj = {
    id: Number(users[index].id),
    name: post.name ? post.name : users[index].name,
    email: post.email ? post.email : users[index].email,
    role: post.role ? post.role : users[index].role,
    password: post.password ? md5(post.password) : users[index].password,
    date: users[Number(postID)].date
  }
  users[index] = newobj;

  //save new File as JSON
  var data = JSON.stringify(users, null, 2);
  fs.writeFileSync('models/users.json', data);
  return { "status": 200, "data": newobj };
}


//DELETE: deleteUser = (req.params.id)
const deleteUser = (postID) => {
  let index = users.findIndex(element => element.id == postID);
  // returns int; the number of the index with the same id as the URL
  // if file found...
  if (index == -1) { return { "status": 404, "data": "Nutzer nicht gefunden" } }

  users.splice(index, 1);

  //save File as JSON
  var data = JSON.stringify(users, null, 2);
  fs.writeFileSync('models/users.json', data);

  return { "status": 200, "data": "Nutzer gelöscht" };
}


//EXPORTS
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  changeUser,
  deleteUser
}