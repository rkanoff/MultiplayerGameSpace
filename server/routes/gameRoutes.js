const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const gameController = require('../controllers/gameController')
const router = express.Router()

router.route('/create').post(verifyJWT, gameController.create)
router.route('/getAll').get(verifyJWT, gameController.getAll)

module.exports = router