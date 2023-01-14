const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
require('dotenv').config()

const verifyAdmin = (req, res, next) => {
    // retrieve authheader, validate and retrieve token
    const authHeader = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
    const accessToken = authHeader.split(' ')[1]

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err) => {
            if (!err) decoded = jwt_decode(accessToken)
            if (err || !decoded?.userInfo.isAdmin) return res.status(403).json({ message: 'Forbidden' })
            next()
        }
    )
}

module.exports = verifyAdmin