const express = require('express')
const app = express()

// routes

app.get('/', (req, res) => {
    res.send('Get API')
})

app.listen(4000, () => {
    console.log('Running on Port 4000')
})