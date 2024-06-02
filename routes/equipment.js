var express = require('express');
var router = express.Router();

//import controller functions
var controller = require('../controllers/equipmentController');

router.route('/')
.get((res,req,next)=>{
    let response = controller.getAllEquip();
    res.json(response.data);
    //res.json(status.status);
})
/* npm
.post((res,req,next)=>{
    let response = controller.postAllEquip;
})

router.route('/:id')
.get((res,req,next) =>{
    let response = controller.getIdEquip;    
})
.put((res,req,next) =>{
    let response = controller.putIdEquip;    
})
.delete((res,req,next) =>{
    let response = controller.deleteIdEquip;    
})
*/
//blala
module.exports = router;