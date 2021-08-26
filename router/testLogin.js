const app = require('express').Router()
const fetch = require('node-fetch')

app.get('/testLogin', (req, res) => {
    const data = {
        id: "heoshin-test3",
        password: "1234"
    }
    fetch("http://koldin.myddns.me:4004/login", {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: "same-origin"
    }).then(() => {
        res.send("hello World")
    })
})

module.exports = app