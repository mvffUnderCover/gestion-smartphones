const express = require('express');
const router = express.Router();
const controller = require('../controllers/smartphoneController');
const checkDeleteCode = require('../middleware/checkCode');

// Routes CRUD
router.post('/', controller.addSmartphone);
router.get('/', controller.getAllSmartphones);
router.get('/:id', controller.getSmartphoneById);
router.put('/:id', controller.updateSmartphone);
router.delete('/:id', checkDeleteCode, controller.deleteSmartphone);

module.exports = router;
