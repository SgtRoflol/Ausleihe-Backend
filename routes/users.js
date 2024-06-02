var express = require('express');
var router = express.Router();
let usersController = require('../controllers/userController')

router.route('/')
.get((req,res,next) => {
  let response = usersController.getAllUsers();
  res.json(response.data);
})
.post((req,res,next) => {
  let response = usersController.createUser(req.body);
  res.json(response.data);
})

router.route('/:postID')
.get((req,res,next) => {
  let response = usersController.getSingleUser(req.params.postID);
  res.json(response.data);
})
.put((req,res,next) => {
  let repsonse = usersController.changeUser(req.params.postID, req.body);
  res.json(repsonse.data);
})
.delete((req,res,next) => {
  let response = usersController.deleteUser(req.params.postID);
  res.json(response.data);
})

module.exports = router;
