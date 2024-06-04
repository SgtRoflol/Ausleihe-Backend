var express = require('express');
var router = express.Router();

//USE: create read and write config
const fs = require('fs');
var rawdata = fs.readFileSync('./models/users.json');

if (rawdata.length <= 0) {
  var users = [];
} else {
  var users = JSON.parse(rawdata);
}



//GET: 
const getAllUsers = () => {
  return {"status": 200, "data": users};
}

// GET: getSingleUser = (req.params.id)
const getSingleUser = (postID) => {
  var obj = users.find(element => element.id == postID);
  // obj = users[N].id

  if (obj != null) {                          //return obj if found
    return {"status": 200, data: obj};
  } else {                                    //if not found the ID
    return {"status": 204, data: "User Not Found"};
  }
}

//POST: createUser = (req.body)
const createUser = (post) => {

  var currentDate = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  //Make from "Mon Jun 03 2024 15:19:16 GMT+0200 (Mitteleuropäische Sommerzeit)"" >>  "2024/06/0

  let obj  = {
    id: users.length > 0 ? users[users.length-1].id + 1 : 0, //if blog größer länge 0 mache ID, ansonsten mache 0
    name: post.name,
    email: post.email,
    role: post.role,
    password: post.password,
    date: currentDate
  }
    users.push(obj);

  //save File as JSON
  var data = JSON.stringify(users, null, 2);
  fs.writeFileSync('models/users.json', data);
  return {"status": 201, "data": obj};
}

//PUT: changeUser = (req.params.id, req.body)
const changeUser = (postID, post) => {

  for (let i = 0; i<users.length; i++) {
    if (users[i].id == (postID)) {
       let newobj  = {
       id: Number(postID),
       name: post.name,
       email: post.email,
       role: post.role,
       password: post.password,
       date: users[Number(postID)].date
   }
      users[i] = newobj;

      //save File as JSON
      var data = JSON.stringify(users, null, 2);
      fs.writeFileSync('models/users.json', data);
      return {"status": 201, "data": newobj};
    }
  } return {"status": 404, "data": "Wrong user"}; 
  
 
}

//DELETE: deleteUser = (req.params.id)
const deleteUser = (postID) => {
  let index = users.findIndex(element => element.id == postID);
  // index of the user[n].id == postID
  // if file found...
  if (index > -1) {
    users.splice(index, 1);

    //save File as JSON
    var data = JSON.stringify(users, null, 2);
    fs.writeFileSync('models/users.json', data);
  
    return {"status": 200, "data": users};
  } else {
    return {"status": 404, "data": "Wrong user ID"}
  }
 
}


//EXPORTS
module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    changeUser,
    deleteUser
}