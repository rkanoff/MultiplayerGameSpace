const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const gameController = require('../controllers/gameController')
const router = express.Router()

router.route('/create').post(verifyJWT, gameController.create)
router.route('/getAll').get(verifyJWT, gameController.getAll)
router.route('/addPlayer').post(verifyJWT, gameController.addPlayer)
router.route('/removePlayer').post(verifyJWT, gameController.removePlayer)
router.route('/playerList').get(verifyJWT, gameController.playerList)

module.exports = router