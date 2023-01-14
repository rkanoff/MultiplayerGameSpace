const newUserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { newUserValidation } = require('../models/userValidation')

// create new user
const register = asyncHandler(async (req, res) => {
    // validate then store new user information
    const { error } = newUserValidation(req.body)
    if (error) return res.status(400).send({ message: error.errors[0].message })
    const { username, email, password } = req.body

    // check if username/email is available
    const nameCheck = await newUserModel.findOne({ username: username })
    if (nameCheck) return res.status(409).send({ message: 'Username is taken, please pick another' })
    const emailCheck = await newUserModel.findOne({ email: email })
    if (emailCheck) return res.status(409).send({ message: 'Email is already in use' })

    // generate hashed password
    const hash = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, hash)

    // create new user model
    const newUser = new newUserModel({
        username: username,
        email: email,
        password: hashedPassword,
    })

    // save new user
    const saveNewUser = await newUser.save()
    
    // send success or error message
    if (saveNewUser)
        res.send(saveNewUser)
    else
        res.status(400).send({ message: 'Error creating new user' })
    
})

module.exports = {
    register
}