const express = require('express');
const router = express.Router();
const publicdataController = require('../controllers/publicdataController');


router.get('/platformlistpublic', publicdataController.getAvailablePlatform); 


module.exports = router;
