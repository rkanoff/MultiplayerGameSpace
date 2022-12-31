const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Successfully connected to MongoDB database')
    }
    catch (err) {
        console.log(`${err} could not connect`)
    }
}
module.exports = connectDB