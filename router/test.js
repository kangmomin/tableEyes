const app = require('express').Router()
const fetch = require('node-fetch')

app.get('/test', (req, res) => {
    let array = new Array()
    array.push('a', 'b')
    const data = {
        'name': "hello World",
        'description': "hello World",
        'maxPersonnel': 12,
        'lat': 1.23112,
        'lon': 1.23112,
        'category': array,
        'logo': "koldin.myddns.me"
    }
    fetch(
        "http://koldin.myddns.me:4004/store",
        {
            method: "post",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: "same-origin"
        }
    ).then(() => {
        res.send("end")
    })
})

module.exports = app