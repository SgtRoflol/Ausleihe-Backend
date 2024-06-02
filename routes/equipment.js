var express = require('express');
var router = express.Router();

//import controller functions
var controller = require('../controllers/equipmentController');

router.route('/')
.get((req,res,next)=>{
    let response = controller.getAllEquip();
 res.status(response.status).json(response.data);
})

.post((req,res,next)=>{
    let response = controller.createEquip(req.body);
    res.status(response.status).json(response.data);
})
/*
router.route('/:id')
.get((req,res,next) =>{
    let response = controller.getIdEquip;    
})
.put((req,res,next) =>{
    let response = controller.putIdEquip;    
})
.delete((req,res,next) =>{
    let response = controller.deleteIdEquip;    
})
*/
//blala
module.exports = router;