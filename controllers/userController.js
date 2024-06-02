var express = require('express');
var router = express.Router();

//create read and write config
const fs = require('fs');
var rawdata = fs.readFileSync('./models/users.json');

if (rawdata.length <= 0) {
  var blog = [];
} else {
  var blog = JSON.parse(rawdata);
}


const getAllUsers = () => {

}

const getSingleUser = () => {

}

const createUser = (postID) => {

}

const changeUser = (postID, post) => {

}

const deleteUser = (postID) => {

}



module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    changeUser,
    deleteUser
}