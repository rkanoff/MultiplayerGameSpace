const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const verifyAdmin = require('../middleware/verifyAdmin')

router.route('/createAdmin').post(adminController.createAdmin)
router.route('/removeGame').post(verifyAdmin, adminController.removeGame)
router.route('/getUsers').get(verifyAdmin, adminController.getUsers)
router.route('/removeUser').post(verifyAdmin, adminController.removeUser)

module.exports = router