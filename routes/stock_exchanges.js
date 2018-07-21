const express = require('express');
const router = express.Router();
var stockcontroller = require('../controllers/stockExchanges-controller');

/* GET users listing. */
router.get('/crawler', stockcontroller.crawler );
router.get('/performance', stockcontroller.performance );
router.get('/growth', stockcontroller.growth );

module.exports = router;
