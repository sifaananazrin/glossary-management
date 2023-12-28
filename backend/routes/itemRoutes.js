const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController ');

router.post('/additem', itemController.addItem);
router.put('/edititem/:id', itemController.editItem);
router.delete('/deleteitem/:id', itemController.deleteItem);
router.get('/getallitems', itemController.getAllItems);

module.exports = router;