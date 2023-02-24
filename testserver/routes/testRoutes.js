const express = require('express')
const testController = require('../controllers/testController')
const router = express.Router()

router.route('/receiveGame').post(testController.receiveGame)
router.route('/getCache').get(testController.getCache)
router.route('/setCache').post(testController.updateCache)

module.exports = router