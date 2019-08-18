const express = require('express')
const path = require('path')
const app = express()
const PORT = 8080
app.use(express.static(path.join(__dirname, '..', 'public')))

app.listen(process.env.PORT || PORT, function () {
    console.log('server is on: ' + PORT)
})