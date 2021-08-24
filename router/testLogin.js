const app = require('express').Router()
const axios = require('axios')

app.get('/testLogin', (req, res) => {
    axios.post(
        "http://koldin.myddns.me:4004/login",
        {
            id: "heoshin-test3",
            password: "1234"
        },
        {
            withCredentials: true
        }
        ).then(() => {
            res.send("hello World")
        })
})

module.exports = app