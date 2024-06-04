var express = require('express');
var router = express.Router();
let usersController = require('../controllers/userController')

//GET, POST
router.route('/')
.get((req,res,next) => {
  let response = usersController.getAllUsers();
  res.status(response.status).json(response.data);
})
.post((req,res,next) => {
  let response = usersController.createUser(req.body);
  res.status(response.status).json(response.data);
})

//GET, PUT, DELETE
router.route('/:postID')
.get((req,res,next) => {
  let response = usersController.getSingleUser(req.params.postID);
  res.status(response.status).json(response.data);
})
.put((req,res,next) => {
  let response = usersController.changeUser(req.params.postID, req.body);
  res.status(response.status).json(response.data);
})
.delete((req,res,next) => {
  let response = usersController.deleteUser(req.params.postID);
  res.status(response.status).json(response.data);
})

module.exports = router;
