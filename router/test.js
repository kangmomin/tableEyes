const app = require('express').Router()
const axios = require('axios')

app.get('/test', (req, res) => {
    let array = new Array()
    array.push('a', 'b')
    axios.post(
        "http://koldin.myddns.me:4004/store",
        {
            'name': "hello World",
            'description': "hello World",
            'maxPersonnel': 12,
            'lat': 1.23112,
            'lon': 1.23112,
            'category': array,
            'logo': "koldin.myddns.me"
        },
        {
            headers: {
                withCredentials: true
            }
        }
    )
    res.send("end")
})

module.exports = app