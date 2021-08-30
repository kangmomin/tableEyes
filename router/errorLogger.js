const app = require('express').Router()

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
})

module.exports = app 