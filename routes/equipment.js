var express = require('express');
var router = express.Router();

//import controller functions
var controller = require('../controllers/equipmentController');

router.route('/')
.get((res,req,next)=>{
    let response = controller.getAll;
})
module.exports = router;