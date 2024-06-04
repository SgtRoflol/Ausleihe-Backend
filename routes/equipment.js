var express = require('express');
var router = express.Router();

//import controller functions
var controller = require('../controllers/equipmentController');

router.route('/')
    .get((req, res, next) => {
        let response = controller.getAllEquip();
        res.status(response.status).json(response.data);
    })

    .post((req, res, next) => {
        let response = controller.createEquip(req.body);
        res.status(response.status).json(response.data);
    })

router.route('/:id')
    .get((req, res, next) => {
        let response = controller.getIdEquip(req.params.id);
        res.status(response.status).json(response.data);
    })

    .put((req, res, next) => {
        let response = controller.changeEquip(req.params.id, req.body);
        res.status(response.status).json(response.data);
    })
    .delete((req, res, next) => {
        let response = controller.deleteEquip(req.params.id);
        res.status(response.status).json(response.data);
    })

module.exports = router;