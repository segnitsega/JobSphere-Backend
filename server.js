require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./config/db')
const jobRouter = require('./routes/jobs.routes')
const userRouter = require('./routes/user.routes')

const app = express()
app.use(cors())
app.use(express.json())

const startServer = async() => {
    try{
        await connectDb()
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`Server running on port ${port}`))
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

app.use('/api/jobs', jobRouter)
app.use('/api/user', userRouter)

startServer() 