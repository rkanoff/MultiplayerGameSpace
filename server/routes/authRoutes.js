const express = require('express')
const router = express.Router()
const newUserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const loginLimiter = require('../middleware/loginLimiter')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const verifyJWT = require('../middleware/verifyJWT')

// log user in
router.post('/login', loginLimiter, asyncHandler(async (req, res) => {
    const { username, password } = req.body
    
    // check if username exists
    const user = await newUserModel.findOne({ username: username })
    if (!user) res.status(404).json({ message: 'Username or password is incorrect' })

    // check if email matches username
    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) res.status(404).json({ message: 'Username or password is incorrect' })

    // create access token
    const accessToken = jwt.sign({
        "userInfo": {
            "userId": user._id,
            "username": user.username,
            "email": user.email
        }}, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '10s'}
    )
    
    // create refresh token
    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    )

    // create cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
    })

    // send access token
    res.json({ accessToken })
}))

// send user new access token
router.get('/refresh', async (req, res) => {
    const cookies = req.cookies

    // check for jwt cookie
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    // verify jwt cookie 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const user = await newUserModel.findOne({ username: decoded.username })
            if (!user) return res.status(401).json({ message: 'Unauthorized' })
            
            // create new access token for user
            const accessToken = jwt.sign({
                "userInfo": {
                    "userId": user._id,
                    "username": user.username,
                    "email": user.email
                }}, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '10s'}
            )

            res.json({ accessToken })
        })
    )
})

// log user out
router.post('/logout', async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
})

module.exports = router