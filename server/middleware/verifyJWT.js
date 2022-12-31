const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    // retrieve authheader, validate and retrieve token
    const authHeader = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
    const accessToken = authHeader.split(' ')[1]

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.username = decoded.username
            req.email = decoded.email
            req.userId = decoded.userId
            next()
        }
    )
}

module.exports = verifyJWT