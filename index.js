const express = require('express')
const connectDB =require('./config/db')

const app = express()

connectDB()

app.use(express.json({extended: false}))

app.use('/', require('./routes/indexRoute'))
app.use('/url', require('./routes/urlRoute'))

const PORT = 9000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})