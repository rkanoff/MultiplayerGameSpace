const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowsMs: 60 * 1000, // 1 minute
    max: 5, // limit IP to 5 login attempts per minuter
    message: {
        message: 'Too many login attempts from this IP, please try again after 60 seconds'
    },
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = loginLimiter